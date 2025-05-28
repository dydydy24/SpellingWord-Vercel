
import React, { useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { PenTool, RotateCcw, Eye, Loader2, Info } from 'lucide-react';
import { useHandwritingRecognition } from '@/hooks/useHandwritingRecognition';

interface HandwritingCanvasProps {
  onTextRecognized: (text: string) => void;
  disabled?: boolean;
}

const HandwritingCanvas: React.FC<HandwritingCanvasProps> = ({
  onTextRecognized,
  disabled = false
}) => {
  const {
    isDrawing,
    strokes,
    canvasRef,
    startDrawing,
    draw,
    stopDrawing,
    clearCanvas,
    recognizeText,
    isRecognizing,
  } = useHandwritingRecognition();

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    // Set up canvas styling for better handwriting
    ctx.strokeStyle = '#2563eb';
    ctx.lineWidth = 4;
    ctx.lineCap = 'round';
    ctx.lineJoin = 'round';
  }, []);

  const handleRecognize = async () => {
    console.log('Starting handwriting recognition...');
    const recognizedText = await recognizeText();
    console.log('Recognition result:', recognizedText);
    
    if (recognizedText) {
      onTextRecognized(recognizedText);
      // Don't clear canvas immediately so user can see what was recognized
      setTimeout(() => {
        clearCanvas();
      }, 2000);
    }
  };

  const handleClear = () => {
    clearCanvas();
  };

  return (
    <Card className="border-2 border-indigo-200 shadow-lg bg-white/90 backdrop-blur-sm">
      <CardHeader className="text-center pb-3">
        <CardTitle className="text-xl text-indigo-700 flex items-center justify-center gap-2">
          <PenTool className="w-5 h-5" />
          เขียนคำด้วยนิ้วมือ
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        {/* Canvas area */}
        <div className="relative">
          <canvas
            ref={canvasRef}
            width={265}
            height={150}
            className={`border-2 border-dashed border-indigo-300 rounded-lg bg-white cursor-crosshair touch-none ${
              disabled ? 'opacity-50 pointer-events-none' : ''
            }`}
            onMouseDown={startDrawing}
            onMouseMove={draw}
            onMouseUp={stopDrawing}
            onMouseLeave={stopDrawing}
            onTouchStart={startDrawing}
            onTouchMove={draw}
            onTouchEnd={stopDrawing}
          />
          {strokes.length === 0 && (
            <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
              <p className="text-gray-400 text-sm">✍️ เขียนคำที่นี่</p>
            </div>
          )}
        </div>

        {/* Instructions */}
        <div className="bg-blue-50 border border-blue-200 rounded-lg p-3">
          <div className="flex items-start gap-2">
            <Info className="w-4 h-4 text-blue-600 mt-0.5" />
            <div className="text-sm text-blue-700">
              <p className="font-medium mb-1">เคล็ดลับการเขียนให้ได้ผลดี:</p>
              <ul className="text-xs space-y-1">
                <li>• เขียนตัวอักษรให้ชัดเจนและใหญ่</li>
                <li>• เขียนเป็นตัวพิมพ์เล็กภาษาอังกฤษ</li>
                <li>• หลีกเลี่ยงการเขียนทับซ้อนกัน</li>
              </ul>
            </div>
          </div>
        </div>

        {/* Control buttons */}
        <div className="flex gap-2">
          <Button
            onClick={handleClear}
            variant="outline"
            size="sm"
            disabled={strokes.length === 0 || disabled || isRecognizing}
            className="flex-1 border-red-300 text-red-600 hover:bg-red-50"
          >
            <RotateCcw className="w-4 h-4 mr-1" />
            ลบ
          </Button>
          <Button
            onClick={handleRecognize}
            size="sm"
            disabled={strokes.length === 0 || disabled || isRecognizing}
            className="flex-1 bg-indigo-600 hover:bg-indigo-700 text-white"
          >
            {isRecognizing ? (
              <Loader2 className="w-4 h-4 mr-1 animate-spin" />
            ) : (
              <Eye className="w-4 h-4 mr-1" />
            )}
            {isRecognizing ? 'กำลังแปลง...' : 'แปลงเป็นข้อความ'}
          </Button>
        </div>

        {/* Recognition status */}
        {isRecognizing && (
          <div className="text-center text-sm text-indigo-600 bg-indigo-50 p-2 rounded">
            🔍 กำลังวิเคราะห์ลายมือ... กรุณารอสักครู่
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default HandwritingCanvas;
