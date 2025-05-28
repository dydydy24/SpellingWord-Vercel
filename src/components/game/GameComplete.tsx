
import React from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Home, RotateCcw, Target } from 'lucide-react';
import { GameStats, WordResult } from '@/types/game';

interface GameCompleteProps {
  gameStats: GameStats;
  wordHistory: WordResult[];
  onRestart: () => void;
  onRetryIncorrect: () => void;
  onExit: () => void;
}

const GameComplete: React.FC<GameCompleteProps> = ({ 
  gameStats, 
  wordHistory, 
  onRestart, 
  onRetryIncorrect, 
  onExit 
}) => {
  const accuracy = gameStats.total > 0 ? (gameStats.correct / gameStats.total) * 100 : 0;
  const incorrectWords = wordHistory.filter(word => !word.isCorrect);
  let grade = '';
  let emoji = '';
  
  if (accuracy >= 90) {
    grade = 'เยี่ยมมาก!';
    emoji = '🏆';
  } else if (accuracy >= 80) {
    grade = 'เก่งมาก!';
    emoji = '🌟';
  } else if (accuracy >= 70) {
    grade = 'ดีมาก!';
    emoji = '👏';
  } else if (accuracy >= 60) {
    grade = 'ดี!';
    emoji = '👍';
  } else {
    grade = 'ลองใหม่นะ!';
    emoji = '💪';
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-100 via-blue-50 to-purple-100 p-4">
      <div className="max-w-2xl mx-auto pt-8">
        <Card className="border-2 border-green-200 shadow-2xl bg-white/90 backdrop-blur-sm">
          <CardHeader className="text-center pb-4">
            <div className="text-8xl mb-4">{emoji}</div>
            <CardTitle className="text-4xl text-green-700 mb-2">
              เกมจบแล้ว!
            </CardTitle>
            <p className="text-2xl font-bold text-purple-600">{grade}</p>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="bg-gradient-to-r from-blue-50 to-purple-50 rounded-lg p-6">
              <h3 className="text-xl font-bold text-gray-800 mb-4 text-center">📊 สรุปผลคะแนน</h3>
              <div className="grid grid-cols-3 gap-4 text-center">
                <div className="bg-green-100 rounded-lg p-4">
                  <div className="text-3xl font-bold text-green-600">{gameStats.correct}</div>
                  <div className="text-sm text-green-700">ถูก</div>
                </div>
                <div className="bg-red-100 rounded-lg p-4">
                  <div className="text-3xl font-bold text-red-600">{gameStats.incorrect}</div>
                  <div className="text-sm text-red-700">ผิด</div>
                </div>
                <div className="bg-blue-100 rounded-lg p-4">
                  <div className="text-3xl font-bold text-blue-600">{accuracy.toFixed(1)}%</div>
                  <div className="text-sm text-blue-700">ความแม่นยำ</div>
                </div>
              </div>
            </div>

            <div className="flex flex-col gap-3">
              <Button
                onClick={onRestart}
                className="w-full py-4 text-lg bg-gradient-to-r from-green-500 to-blue-500 hover:from-green-600 hover:to-blue-600 text-white font-bold"
              >
                <RotateCcw className="w-5 h-5 mr-2" />
                เล่นใหม่ทั้งหมด
              </Button>
              
              {incorrectWords.length > 0 && (
                <Button
                  onClick={onRetryIncorrect}
                  className="w-full py-4 text-lg bg-gradient-to-r from-orange-500 to-red-500 hover:from-orange-600 hover:to-red-600 text-white font-bold"
                >
                  <Target className="w-5 h-5 mr-2" />
                  เล่นเฉพาะคำที่ผิด ({incorrectWords.length} คำ)
                </Button>
              )}
              
              <Button
                onClick={onExit}
                variant="outline"
                className="w-full py-4 text-lg border-2 border-gray-300 hover:border-gray-400 hover:bg-gray-50"
              >
                <Home className="w-5 h-5 mr-2" />
                กลับหน้าหลัก
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default GameComplete;
