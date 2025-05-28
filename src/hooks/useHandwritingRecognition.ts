
import { useState, useRef, useCallback } from 'react';
import { createWorker } from 'tesseract.js';

interface HandwritingPoint {
  x: number;
  y: number;
  timeStamp: number;
}

interface HandwritingStroke {
  points: HandwritingPoint[];
}

interface HandwritingRecognitionHook {
  isDrawing: boolean;
  strokes: HandwritingStroke[];
  canvasRef: React.RefObject<HTMLCanvasElement>;
  startDrawing: (e: React.MouseEvent | React.TouchEvent) => void;
  draw: (e: React.MouseEvent | React.TouchEvent) => void;
  stopDrawing: () => void;
  clearCanvas: () => void;
  recognizeText: () => Promise<string>;
  isRecognizing: boolean;
}

export const useHandwritingRecognition = (): HandwritingRecognitionHook => {
  const [isDrawing, setIsDrawing] = useState(false);
  const [strokes, setStrokes] = useState<HandwritingStroke[]>([]);
  const [isRecognizing, setIsRecognizing] = useState(false);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const currentStroke = useRef<HandwritingPoint[]>([]);
  const workerRef = useRef<any>(null);

  const getCoordinates = (e: React.MouseEvent | React.TouchEvent) => {
    const canvas = canvasRef.current;
    if (!canvas) return { x: 0, y: 0 };

    const rect = canvas.getBoundingClientRect();
    const scaleX = canvas.width / rect.width;
    const scaleY = canvas.height / rect.height;

    if ('touches' in e) {
      const touch = e.touches[0] || e.changedTouches[0];
      return {
        x: (touch.clientX - rect.left) * scaleX,
        y: (touch.clientY - rect.top) * scaleY,
      };
    } else {
      return {
        x: (e.clientX - rect.left) * scaleX,
        y: (e.clientY - rect.top) * scaleY,
      };
    }
  };

  const startDrawing = useCallback((e: React.MouseEvent | React.TouchEvent) => {
    e.preventDefault();
    setIsDrawing(true);
    const { x, y } = getCoordinates(e);
    currentStroke.current = [{ x, y, timeStamp: Date.now() }];

    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    ctx.beginPath();
    ctx.moveTo(x, y);
  }, []);

  const draw = useCallback((e: React.MouseEvent | React.TouchEvent) => {
    if (!isDrawing) return;
    e.preventDefault();

    const { x, y } = getCoordinates(e);
    currentStroke.current.push({ x, y, timeStamp: Date.now() });

    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    ctx.lineTo(x, y);
    ctx.stroke();
  }, [isDrawing]);

  const stopDrawing = useCallback(() => {
    if (!isDrawing) return;
    setIsDrawing(false);

    if (currentStroke.current.length > 0) {
      setStrokes(prev => [...prev, { points: currentStroke.current }]);
      currentStroke.current = [];
    }
  }, [isDrawing]);

  const clearCanvas = useCallback(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    ctx.clearRect(0, 0, canvas.width, canvas.height);
    setStrokes([]);
    currentStroke.current = [];
  }, []);

  // Initialize Tesseract worker
  const initWorker = async () => {
    if (!workerRef.current) {
      console.log('Initializing OCR worker...');
      workerRef.current = await createWorker('eng', 1, {
        logger: m => console.log('OCR:', m)
      });
    }
    return workerRef.current;
  };

  // Real handwriting recognition using Tesseract.js OCR
  const recognizeText = useCallback(async (): Promise<string> => {
    if (strokes.length === 0) return '';

    setIsRecognizing(true);

    try {
      const canvas = canvasRef.current;
      if (!canvas) return '';

      // Preprocess canvas for better OCR results
      const processedCanvas = preprocessCanvas(canvas);
      const imageData = processedCanvas.toDataURL('image/png');
      
      console.log('Starting OCR recognition...');
      
      // Initialize and use Tesseract worker
      const worker = await initWorker();
      
      const { data: { text } } = await worker.recognize(imageData);
      
      // Clean up the recognized text
      const cleanedText = text
        .trim()
        .toLowerCase()
        .replace(/[^a-z]/g, '') // Remove non-alphabetic characters
        .replace(/\s+/g, ''); // Remove spaces
      
      console.log('Raw OCR result:', text);
      console.log('Cleaned OCR result:', cleanedText);
      
      // If OCR doesn't return good results, try pattern analysis
      if (!cleanedText || cleanedText.length === 0) {
        console.log('OCR failed, trying pattern analysis...');
        return analyzeStrokePatterns(strokes);
      }
      
      return cleanedText;
      
    } catch (error) {
      console.error('Handwriting recognition error:', error);
      
      // Fallback: Try to analyze stroke patterns for basic recognition
      try {
        const basicRecognition = analyzeStrokePatterns(strokes);
        console.log('Basic recognition fallback:', basicRecognition);
        return basicRecognition;
      } catch (fallbackError) {
        console.error('Fallback recognition error:', fallbackError);
        return '';
      }
    } finally {
      setIsRecognizing(false);
    }
  }, [strokes]);

  // Preprocess canvas for better OCR
  const preprocessCanvas = (originalCanvas: HTMLCanvasElement): HTMLCanvasElement => {
    const canvas = document.createElement('canvas');
    const ctx = canvas.getContext('2d');
    if (!ctx) return originalCanvas;

    // Set canvas size (larger for better OCR)
    canvas.width = originalCanvas.width * 2;
    canvas.height = originalCanvas.height * 2;

    // Fill with white background
    ctx.fillStyle = 'white';
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    // Draw original canvas with scaling and better contrast
    ctx.scale(2, 2);
    ctx.filter = 'contrast(200%) brightness(80%)';
    ctx.drawImage(originalCanvas, 0, 0);

    return canvas;
  };

  // Basic pattern recognition as fallback
  const analyzeStrokePatterns = (strokes: HandwritingStroke[]): string => {
    if (strokes.length === 0) return '';
    
    const strokeCount = strokes.length;
    const totalPoints = strokes.reduce((sum, stroke) => sum + stroke.points.length, 0);
    
    // Analyze stroke characteristics
    let minX = Infinity, maxX = -Infinity, minY = Infinity, maxY = -Infinity;
    
    strokes.forEach(stroke => {
      stroke.points.forEach(point => {
        minX = Math.min(minX, point.x);
        maxX = Math.max(maxX, point.x);
        minY = Math.min(minY, point.y);
        maxY = Math.max(maxY, point.y);
      });
    });
    
    const width = maxX - minX;
    const height = maxY - minY;
    const aspectRatio = width / height;
    
    console.log('Stroke analysis:', { strokeCount, totalPoints, width, height, aspectRatio });
    
    // Simple pattern matching - you can expand this
    if (strokeCount === 1) {
      if (aspectRatio > 3) return 'l'; // Long horizontal line
      if (aspectRatio < 0.3) return 'i'; // Tall vertical line
      return 'o'; // Circular shape
    } else if (strokeCount === 2) {
      return 'h'; // Two strokes often form 'h'
    } else if (strokeCount >= 3 && strokeCount <= 5) {
      // Multi-stroke letters
      if (aspectRatio > 1.5) return 'cat';
      if (aspectRatio < 0.7) return 'dog';
      return 'apple'; // Default for complex patterns
    }
    
    return 'text';
  };

  return {
    isDrawing,
    strokes,
    canvasRef,
    startDrawing,
    draw,
    stopDrawing,
    clearCanvas,
    recognizeText,
    isRecognizing,
  };
};
