
import React from 'react';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { Home } from 'lucide-react';
import { GameStats } from '@/types/game';

interface GameHeaderProps {
  currentWordIndex: number;
  totalWords: number;
  gameStats: GameStats;
  progress: number;
  onExit: () => void;
}

const GameHeader: React.FC<GameHeaderProps> = ({ 
  currentWordIndex, 
  totalWords, 
  gameStats, 
  progress, 
  onExit 
}) => {
  return (
    <div className="mb-6">
      <div className="flex items-center justify-between mb-4">
        <Button
          onClick={onExit}
          variant="outline"
          className="border-2 border-gray-300 hover:border-gray-400"
        >
          <Home className="w-4 h-4 mr-2" />
          กลับหน้าหลัก
        </Button>
        <div className="text-center">
          <div className="text-lg font-bold text-gray-700">
            คำที่ {currentWordIndex + 1} จาก {totalWords}
          </div>
        </div>
        <div className="text-right">
          <div className="text-sm text-gray-600">คะแนน: {gameStats.correct}/{gameStats.total}</div>
        </div>
      </div>
      <Progress value={progress} className="h-3 bg-gray-200" />
    </div>
  );
};

export default GameHeader;
