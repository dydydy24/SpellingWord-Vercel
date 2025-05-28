
import React from 'react';
import { Card, CardContent } from '@/components/ui/card';

interface WordTranslationProps {
  word: string;
  translation: string;
  imageUrl?: string;
}

const WordTranslation: React.FC<WordTranslationProps> = ({ word, translation, imageUrl }) => {
  return (
    <Card className="border-2 border-green-200 bg-green-50">
      <CardContent className="p-6 text-center">
        <div className="space-y-4">
          <div className="text-2xl font-bold text-green-700">
            🎉 ยอดเยี่ยม! 🎉
          </div>
          
          <div className="bg-white rounded-lg p-4 shadow-sm">
            <div className="text-xl font-bold text-gray-800 mb-2">
              {word}
            </div>
            <div className="text-lg text-blue-600 font-semibold">
              แปลว่า: {translation}
            </div>
          </div>

          {imageUrl && (
            <div className="flex justify-center">
              <img 
                src={imageUrl} 
                alt={`${word} - ${translation}`}
                className="w-48 h-48 object-cover rounded-lg shadow-md border-2 border-gray-200"
                onError={(e) => {
                  const target = e.target as HTMLImageElement;
                  target.style.display = 'none';
                }}
              />
            </div>
          )}

          <div className="text-sm text-green-600 font-medium">
            จดจำคำนี้ไว้นะ! 📚✨
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default WordTranslation;
