
export interface GameStats {
  correct: number;
  incorrect: number;
  total: number;
}

export interface WordResult {
  word: string;
  userAnswer: string;
  isCorrect: boolean;
  translation?: string;
}

export interface GameState {
  currentWordIndex: number;
  userInput: string;
  gameStats: GameStats;
  showResult: boolean;
  gameComplete: boolean;
  isAnswered: boolean;
  showTranslation: boolean;
  currentTranslation: { translation: string; imageUrl?: string } | null;
  wordHistory: WordResult[];
}
