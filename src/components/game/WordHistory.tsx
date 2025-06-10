
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { CheckCircle, XCircle } from 'lucide-react';
import { WordResult } from '@/types/game';

interface WordHistoryProps {
  wordHistory: WordResult[];
  onSpeakWord: () => void;
  onWordClick: (word: string) => void; 
}

const WordHistory: React.FC<WordHistoryProps> = ({ wordHistory,onSpeakWord,onWordClick }) => {
  const correctWords = wordHistory.filter(word => word.isCorrect);
  const incorrectWords = wordHistory.filter(word => !word.isCorrect);

  if (wordHistory.length === 0) {
    return null;
  }

  return (
    <div className="mt-6 space-y-4">
      {/* Correct Words Section */}
      {correctWords.length > 0 && (
        <Card className="border-green-200 bg-green-50">
          <CardHeader className="pb-3">
            <CardTitle className="text-lg text-green-700 flex items-center gap-2">
              <CheckCircle className="w-5 h-5" />
              คำที่ตอบถูก ({correctWords.length})
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
              {correctWords.map((wordResult, index) => (
                <div key={index} className="bg-white p-3 rounded-lg shadow-sm">
                  <div className="font-semibold text-green-800" onClick={() => onWordClick(wordResult.word)} >{wordResult.word}</div>
                  {wordResult.translation && (
                    <div className="text-sm text-green-600">แปลว่า: {wordResult.translation}</div>
                  )}
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      )}

      {/* Incorrect Words Section */}
      {incorrectWords.length > 0 && (
        <Card className="border-red-200 bg-red-50">
          <CardHeader className="pb-3">
            <CardTitle className="text-lg text-red-700 flex items-center gap-2">
              <XCircle className="w-5 h-5" />
              คำที่ตอบผิด ({incorrectWords.length})
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
              {incorrectWords.map((wordResult, index) => (
                <div key={index} className="bg-white p-3 rounded-lg shadow-sm">
                  <div className="font-semibold text-red-800" onClick={() => onWordClick(wordResult.word)} >{wordResult.word}</div>
                  {wordResult.translation && (
                    <div className="text-sm text-red-600">แปลว่า: {wordResult.translation}</div>
                  )}
                  <div className="text-xs text-gray-500">
                    คำตอบของคุณ: {wordResult.userAnswer}
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
};

export default WordHistory;
