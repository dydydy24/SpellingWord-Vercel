
import React, { useRef ,useEffect} from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Volume2, CheckCircle, XCircle, Star, Target, Trophy, Mic, MicOff } from 'lucide-react';
import { useSpeechRecognition } from '@/hooks/useSpeechRecognition';
import HandwritingCanvas from '@/components/HandwritingCanvas';

interface GameControlsProps {
  currentWord: string;
  userInput: string;
  showResult: boolean;
  isAnswered: boolean;
  currentWordIndex: number;
  totalWords: number;
  onUserInputChange: (value: string) => void;
  onKeyPress: (e: React.KeyboardEvent) => void;
  onSpeakWord: () => void;
  onCheckSpelling: () => void;
  onNextWord: () => void;
  inputRef: React.RefObject<HTMLInputElement>; // ✅ เพิ่มบรรทัดนี้
}

const GameControls: React.FC<GameControlsProps> = ({
  currentWord,
  userInput,
  showResult,
  isAnswered,
  currentWordIndex,
  totalWords,
  onUserInputChange,
  onKeyPress,
  onSpeakWord,
  onCheckSpelling,
  onNextWord,
  inputRef
}) => {
  const {
    isListening,
    transcript,
    startListening,
    stopListening,
    resetTranscript,
    isSupported
  } = useSpeechRecognition();

  // Update user input when speech transcript changes
  useEffect(() => {
    if (transcript && !showResult) {
      onUserInputChange(transcript);
    }
  }, [transcript, onUserInputChange, showResult]);

  // Reset transcript when moving to next word
  useEffect(() => {
    if (!showResult && !isAnswered) {
      resetTranscript();
    }
  }, [currentWordIndex, showResult, isAnswered, resetTranscript]);

  const handleVoiceInput = () => {
    if (isListening) {
      stopListening();
    } else {
      startListening();
    }
  };

  const handleHandwritingRecognized = (text: string) => {
    if (!showResult) {
      onUserInputChange(text);
    }
  };

  return (
    <Card className="border-2 border-purple-200 shadow-2xl bg-white/90 backdrop-blur-sm">
      <CardHeader className="text-center pb-4">
        <CardTitle className="text-2xl text-purple-700 flex items-center justify-center gap-2">
          <Target className="w-6 h-6" />
          ฟังและสะกดคำ
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        {/* Word display and audio */}
        <div className="text-center">
          <div className="text-8xl mb-4">🎧</div>
          <p className="text-lg text-gray-700 mb-4">
            กดปุ่มลำโพงเพื่อฟังคำอีกครั้ง
          </p>
          <Button
            onClick={onSpeakWord}
            className="py-4 px-8 text-lg bg-gradient-to-r from-purple-500 to-blue-500 hover:from-purple-600 hover:to-blue-600 text-white font-bold shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105"
          >
            <Volume2 className="w-6 h-6 mr-2" />
            ฟังคำ 🔊
          </Button>
        </div>

        {/* Input options section */}
        <div className="space-y-4">
          <label className="block text-lg font-semibold text-gray-700 text-center">
            เลือกวิธีการตอบ:
          </label>
          
          {/* Input methods grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {/* Handwriting input */}
            <HandwritingCanvas
              onTextRecognized={handleHandwritingRecognized}
              disabled={showResult}
            />

            {/* Voice and text input */}
            <div className="space-y-4">
              {/* Voice input section */}
              {isSupported && (
                <div className="flex justify-center">
                  <Button
                    onClick={handleVoiceInput}
                    disabled={showResult}
                    className={`py-3 px-6 text-lg font-bold shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105 ${
                      isListening 
                        ? 'bg-gradient-to-r from-red-500 to-pink-500 hover:from-red-600 hover:to-pink-600 animate-pulse' 
                        : 'bg-gradient-to-r from-green-500 to-emerald-500 hover:from-green-600 hover:to-emerald-600'
                    } text-white`}
                  >
                    {isListening ? (
                      <>
                        <MicOff className="w-5 h-5 mr-2" />
                        หยุดฟัง 🔴
                      </>
                    ) : (
                      <>
                        <Mic className="w-5 h-5 mr-2" />
                        พูดคำตอบ 🎙️
                      </>
                    )}
                  </Button>
                </div>
              )}

          {/* Status indicator */}
          {isListening && (
            <div className="text-center text-lg text-red-600 font-semibold animate-pulse">
              🎙️ กำลังฟัง... พูดคำตอบได้เลย!
            </div>
          )}

              {/* Text input */}
              <div className="space-y-2">
                <label className="block text-sm font-medium text-gray-600">
                  หรือพิมพ์คำตอบ:
                </label>
                <Input
                  value={userInput}
                  onChange={(e) => onUserInputChange(e.target.value)}
                  onKeyPress={onKeyPress}
                  placeholder="พิมพ์คำที่ได้ยินที่นี่..."
                  //disabled={showResult || isListening}
                  className="text-center text-xl py-4 border-2 border-purple-300 focus:border-purple-500 text-gray-800 font-semibold"
                  autoFocus
                />
              </div>

              {/* Speech not supported warning */}
              {!isSupported && (
                <div className="text-center text-sm text-orange-600 bg-orange-50 p-2 rounded">
                  ⚠️ เบราว์เซอร์ของคุณไม่รองรับการรู้จำเสียง กรุณาใช้การพิมพ์หรือเขียน
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Result display */}
        {showResult && (
          <div className={`text-center p-4 rounded-lg border-2 ${
            userInput.trim().toLowerCase() === currentWord.toLowerCase()
              ? 'bg-green-50 border-green-200 text-green-700'
              : 'bg-red-50 border-red-200 text-red-700'
          }`}>
            <div className="flex items-center justify-center gap-2 text-2xl font-bold mb-2">
              {userInput.trim().toLowerCase() === currentWord.toLowerCase() ? (
                <>
                  <CheckCircle className="w-8 h-8" />
                  ถูกต้อง! 🎉
                </>
              ) : (
                <>
                  <XCircle className="w-8 h-8" />
                  ลองใหม่นะ! 💪
                </>
              )}
            </div>
            <div className="text-lg">
              คำที่ถูกต้อง: <strong>"{currentWord}"</strong>
            </div>
            {userInput.trim().toLowerCase() !== currentWord.toLowerCase() && (
              <div className="text-lg">
                คำตอบของคุณ: <strong>"{userInput}"</strong>
              </div>
            )}
          </div>
        )}

        {/* Action buttons */}
        <div className="flex gap-4">
          {!showResult ? (
            <Button
              onClick={onCheckSpelling}
              className="w-full py-4 text-xl font-bold bg-gradient-to-r from-green-500 to-blue-500 hover:from-green-600 hover:to-blue-600 text-white shadow-lg hover:shadow-xl transition-all duration-300"
              disabled={!userInput.trim()}
            >
              <CheckCircle className="w-6 h-6 mr-2" />
              ตรวจคำตอบ ✨
            </Button>
          ) : (
            <Button
              onClick={onNextWord}
              className="w-full py-4 text-xl font-bold bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 text-white shadow-lg hover:shadow-xl transition-all duration-300"
            >
              {currentWordIndex < totalWords - 1 ? (
                <>
                  <Star className="w-6 h-6 mr-2" />
                  คำต่อไป 🚀
                </>
              ) : (
                <>
                  <Trophy className="w-6 h-6 mr-2" />
                  ดูผลคะแนน 🏆
                </>
              )}
            </Button>
          )}
        </div>

        {/* Help text */}
        <div className="text-center text-sm text-gray-500">
          {showResult 
            ? "กด Enter หรือปุ่มด้านบนเพื่อไปคำต่อไป"
            : "เขียน, พิมพ์, พูด หรือกด Enter เพื่อส่งคำตอบ"
          }
        </div>
      </CardContent>
    </Card>
  );
};

export default GameControls;
