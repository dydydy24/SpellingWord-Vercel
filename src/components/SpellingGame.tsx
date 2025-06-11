import React, { useState, useEffect, useRef } from 'react';
import { useToast } from '@/hooks/use-toast';
import WordTranslation from './WordTranslation';
import GameComplete from './game/GameComplete';
import GameHeader from './game/GameHeader';
import GameControls from './game/GameControls';
import WordHistory from './game/WordHistory';
import { getWordTranslation } from '@/utils/wordTranslations';
import { GameStats, GameState, WordResult } from '@/types/game';

interface SpellingGameProps {
  words: string[];
  onExit: () => void;
}

const SpellingGame: React.FC<SpellingGameProps> = ({ words, onExit }) => {
  const [gameState, setGameState] = useState<GameState>({
    currentWordIndex: 0,
    userInput: '',
    gameStats: { correct: 0, incorrect: 0, total: 0 },
    showResult: false,
    gameComplete: false,
    isAnswered: false,
    showTranslation: false,
    currentTranslation: null,
    wordHistory: [],
  });

  const inputRef = useRef<HTMLInputElement>(null);

  const { toast } = useToast();

  const currentWord = words[gameState.currentWordIndex];
  const progress = ((gameState.currentWordIndex + (gameState.isAnswered ? 1 : 0)) / words.length) * 100;

  const speakWord = (word: string) => {
    if ('speechSynthesis' in window) {
      const utterance = new SpeechSynthesisUtterance(word);
      utterance.lang = 'en-EN';
      utterance.rate = 0.6;
      utterance.pitch = 1.1;
      speechSynthesis.speak(utterance);

      setTimeout(() => {
        inputRef.current?.focus();
      }, 100); // รอให้ input render ใหม่ก่อน
    } else {
      toast({
        title: "ไม่สามารถอ่านเสียงได้",
        description: "เบราว์เซอร์ของคุณไม่รองรับการอ่านเสียง",
        variant: "destructive",
      });
    }
  };

  const checkSpelling = () => {
    if (!gameState.userInput.trim()) {
      toast({
        title: "กรุณากรอกคำตอบ",
        description: "พิมพ์คำที่คุณได้ยินลงในช่อง",
        variant: "destructive",
      });
      return;
    }

    const isCorrect = gameState.userInput.trim().toLowerCase() === currentWord.toLowerCase();
    const translation = getWordTranslation(currentWord);
    
    // Create word result for history
    const wordResult: WordResult = {
      word: currentWord,
      userAnswer: gameState.userInput.trim(),
      isCorrect,
      translation: translation?.translation,
    };
    
    setGameState(prev => ({
      ...prev,
      gameStats: {
        correct: prev.gameStats.correct + (isCorrect ? 1 : 0),
        incorrect: prev.gameStats.incorrect + (isCorrect ? 0 : 1),
        total: prev.gameStats.total + 1
      },
      showResult: true,
      isAnswered: true,
      showTranslation: isCorrect,
      currentTranslation: isCorrect ? translation : null,
      wordHistory: [...prev.wordHistory, wordResult],
    }));

    if (isCorrect) {
      toast({
        title: "ถูกต้อง! 🎉",
        description: `เก่งมาก! คำตอบคือ "${currentWord}"`,
      });
      speakWord("Good job");
    } else {
      toast({
        title: "ลองใหม่นะ! 💪",
        description: `คำที่ถูกต้องคือ "${currentWord}"`,
        variant: "destructive",
      });
      speakWord("Try again");
    }
    // ✅ หลังตรวจเสร็จ ให้ focus กลับไปที่ input
    setTimeout(() => {
      inputRef.current?.focus();
    }, 100); // รอให้ input render ใหม่ก่อน
  };

  const nextWord = () => {
    if (gameState.currentWordIndex < words.length - 1) {
      setGameState(prev => ({
        ...prev,
        currentWordIndex: prev.currentWordIndex + 1,
        userInput: '',
        showResult: false,
        isAnswered: false,
        showTranslation: false,
        currentTranslation: null,
      }));
      // ✅ หลังตรวจเสร็จ ให้ focus กลับไปที่ input
      setTimeout(() => {
        inputRef.current?.focus();
      }, 100); // รอให้ input render ใหม่ก่อน
    } else {
      setGameState(prev => ({ ...prev, gameComplete: true }));
    }
  };

  const restartGame = () => {
    setGameState({
      currentWordIndex: 0,
      userInput: '',
      gameStats: { correct: 0, incorrect: 0, total: 0 },
      showResult: false,
      gameComplete: false,
      isAnswered: false,
      showTranslation: false,
      currentTranslation: null,
      wordHistory: [],
    });
  };

  const retryIncorrectWords = () => {
    const incorrectWords = gameState.wordHistory.filter(word => !word.isCorrect);
    if (incorrectWords.length > 0) {
      // Replace current words with only incorrect ones
      const incorrectWordsList = incorrectWords.map(word => word.word);
      // Restart the game with incorrect words only
      setGameState({
        currentWordIndex: 0,
        userInput: '',
        gameStats: { correct: 0, incorrect: 0, total: 0 },
        showResult: false,
        gameComplete: false,
        isAnswered: false,
        showTranslation: false,
        currentTranslation: null,
        wordHistory: [],
      });
      
      // Update the words array by calling parent component
      // We'll pass the incorrect words back to parent
      const event = new CustomEvent('retryIncorrectWords', { 
        detail: { incorrectWords: incorrectWordsList } 
      });
      window.dispatchEvent(event);
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      if (gameState.showResult) {
        nextWord();
      } else {
        checkSpelling();
      }
    }
  };

  // Handle word click from WordHistory component
  const handleWordClick = (word: string) => {
    speakWord(word);
  };
  // Auto-speak current word when it changes
  useEffect(() => {
    if (currentWord && !gameState.gameComplete) {
      setTimeout(() => speakWord(currentWord), 500);
    }
  }, [gameState.currentWordIndex, gameState.gameComplete]);

  if (gameState.gameComplete) {
    return (
      <GameComplete
        gameStats={gameState.gameStats}
        wordHistory={gameState.wordHistory}
        onRestart={restartGame}
        onRetryIncorrect={retryIncorrectWords}
        onExit={onExit}
      />
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-100 via-purple-50 to-pink-100 p-4">
      <div className="max-w-2xl mx-auto pt-8">
        <GameHeader
          currentWordIndex={gameState.currentWordIndex}
          totalWords={words.length}
          gameStats={gameState.gameStats}
          progress={progress}
          onExit={onExit}
        />        

        <GameControls
          currentWord={currentWord}
          userInput={gameState.userInput}
          showResult={gameState.showResult}
          isAnswered={gameState.isAnswered}
          currentWordIndex={gameState.currentWordIndex}
          totalWords={words.length}
          onUserInputChange={(value) => setGameState(prev => ({ ...prev, userInput: value }))}
          onKeyPress={handleKeyPress}
          onSpeakWord={() => speakWord(currentWord)}
          onCheckSpelling={checkSpelling}
          onNextWord={nextWord}
          inputRef={inputRef} // ✅ ส่งเข้าไป
          onWordClick={handleWordClick}
        />

{/* Show translation when answer is correct */}
        {gameState.showTranslation && gameState.currentTranslation && (
          <div className="mb-6">
            <WordTranslation
              word={currentWord}
              translation={gameState.currentTranslation.translation}
              imageUrl={gameState.currentTranslation.imageUrl}
            />
          </div>
        )}

        {/* Word History Section */}
        <WordHistory wordHistory={gameState.wordHistory}
         onSpeakWord={() => speakWord(currentWord)}
         onWordClick={handleWordClick}
        />
      </div>
    </div>
  );
};

export default SpellingGame;
