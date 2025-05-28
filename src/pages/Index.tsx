import React, { useState, useRef, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useToast } from '@/hooks/use-toast';
import { Upload, FileText, Play, RotateCcw, CheckCircle, Star } from 'lucide-react';
import SpellingGame from '@/components/SpellingGame';

const Index = () => {
  const [words, setWords] = useState<string[]>([]);
  const [gameStarted, setGameStarted] = useState(false);
  const [fileName, setFileName] = useState<string>("");
  const fileInputRef = useRef<HTMLInputElement>(null);
  const { toast } = useToast();

  // Listen for retry incorrect words event
  useEffect(() => {
    const handleRetryIncorrect = (event: CustomEvent) => {
      const { incorrectWords } = event.detail;
      setWords(incorrectWords);
      setGameStarted(true);
    };

    window.addEventListener('retryIncorrectWords', handleRetryIncorrect as EventListener);
    
    return () => {
      window.removeEventListener('retryIncorrectWords', handleRetryIncorrect as EventListener);
    };
  }, []);

  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file && file.type === 'text/plain') {
      const reader = new FileReader();
      reader.onload = (e) => {
        const content = e.target?.result as string;
        const wordList = content
          .split(/\r?\n/)
          .map(word => word.trim())
          .filter(word => word.length > 0);
        
        if (wordList.length > 0) {
          setWords(wordList);
          setFileName(file.name);
          toast({
            title: "โหลดไฟล์สำเร็จ! 🎉",
            description: `พบคำศัพท์ ${wordList.length} คำ`,
          });
        } else {
          toast({
            title: "ไฟล์ว่าง",
            description: "กรุณาเลือกไฟล์ที่มีคำศัพท์",
            variant: "destructive",
          });
        }
      };
      reader.readAsText(file, 'UTF-8');
    } else {
      toast({
        title: "รูปแบบไฟล์ไม่ถูกต้อง",
        description: "กรุณาเลือกไฟล์ .txt เท่านั้น",
        variant: "destructive",
      });
    }
  };

  const startGame = () => {
    if (words.length === 0) {
      toast({
        title: "ยังไม่มีคำศัพท์",
        description: "กรุณาอัปโหลดไฟล์คำศัพท์ก่อน",
        variant: "destructive",
      });
      return;
    }
    setGameStarted(true);
  };

  const resetGame = () => {
    setGameStarted(false);
    setWords([]);
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  if (gameStarted) {
    return <SpellingGame words={words} onExit={() => setGameStarted(false)} />;
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-pink-100 via-purple-50 to-blue-100 p-4">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="text-center mb-8 pt-8">
          <div className="inline-flex items-center gap-3 mb-4">
            <div className="text-6xl">📝</div>
            <h1 className="text-5xl font-bold bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
              แอปฝึกสะกดคำ
            </h1>
            <div className="text-6xl">✨</div>
          </div>
          <p className="text-xl text-gray-600 font-medium">
            เรียนรู้การสะกดคำด้วยความสนุก! 🎈
          </p>
        </div>

        {/* Main Content */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Upload Section */}
          <Card className="border-2 border-purple-200 shadow-lg hover:shadow-xl transition-all duration-300 bg-white/80 backdrop-blur-sm">
            <CardHeader className="text-center pb-4">
              <CardTitle className="text-2xl text-purple-700 flex items-center justify-center gap-2">
                <Upload className="w-6 h-6" />
                อัปโหลดไฟล์คำศัพท์
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="text-center">
                <div className="text-8xl mb-4">📂</div>
                <Label htmlFor="file-upload" className="text-lg text-gray-700 block mb-4">
                  เลือกไฟล์ .txt ที่มีคำศัพท์ (หนึ่งบรรทัดหนึ่งคำ)
                </Label>
                <Input
                  id="file-upload"
                  type="file"
                  accept=".txt"
                  onChange={handleFileUpload}
                  ref={fileInputRef}
                  className="cursor-pointer border-2 border-dashed border-purple-300 hover:border-purple-400 transition-colors p-4 h-auto"
                />
              </div>
              
              {words.length > 0 && (
                <div className="bg-green-50 border-2 border-green-200 rounded-lg p-4 text-center">
                  <div className="flex items-center justify-center gap-2 text-green-700 font-semibold text-lg">
                    <CheckCircle className="w-5 h-5" />
                    พร้อมแล้ว! มีคำศัพท์ {words.length} คำ
                  </div>
                  <div className="mt-2 text-sm text-green-600">
                    ตัวอย่าง: {words.slice(0, 3).join(', ')}{words.length > 3 ? '...' : ''}
                  </div>
                </div>
              )}
            </CardContent>
          </Card>

          {/* Game Start Section */}
          <Card className="border-2 border-blue-200 shadow-lg hover:shadow-xl transition-all duration-300 bg-white/80 backdrop-blur-sm">
            <CardHeader className="text-center pb-4">
              <CardTitle className="text-2xl text-blue-700 flex items-center justify-center gap-2">
                <Star className="w-6 h-6" />
                เริ่มเกมสะกดคำ
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="text-center">
                <div className="text-8xl mb-4">🎮</div>
                <p className="text-lg text-gray-700 mb-6 leading-relaxed">
                  เมื่อพร้อมแล้ว กดปุ่มเพื่อเริ่มเกม!<br/>
                  คุณจะได้ฟังเสียงคำและลองสะกด
                </p>
                
                <div className="space-y-4">
                  <Button
                    onClick={startGame}
                    disabled={words.length === 0}
                    className="w-full py-6 text-xl font-bold bg-gradient-to-r from-green-500 to-blue-500 hover:from-green-600 hover:to-blue-600 text-white shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105"
                  >
                    <Star className="w-6 h-6 mr-2" />
                    เริ่มเกม! 🚀
                  </Button>
                  
                  {words.length > 0 && (
                    <Button
                      onClick={resetGame}
                      variant="outline"
                      className="w-full py-4 text-lg border-2 border-gray-300 hover:border-gray-400 hover:bg-gray-50"
                    >
                      <RotateCcw className="w-5 h-5 mr-2" />
                      เริ่มใหม่
                    </Button>
                  )}
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Instructions */}
        <Card className="mt-8 border-2 border-yellow-200 bg-yellow-50/80 backdrop-blur-sm">
          <CardContent className="p-6">
            <h3 className="text-xl font-bold text-yellow-800 mb-4 flex items-center gap-2">
              <div className="text-2xl">💡</div>
              วิธีใช้งาน
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-yellow-700">
              <div className="flex items-start gap-3">
                <div className="text-2xl">1️⃣</div>
                <div>
                  <strong>อัปโหลดไฟล์:</strong><br/>
                  เลือกไฟล์ .txt ที่มีคำศัพท์ (หนึ่งบรรทัดหนึ่งคำ)
                </div>
              </div>
              <div className="flex items-start gap-3">
                <div className="text-2xl">2️⃣</div>
                <div>
                  <strong>เริ่มเกม:</strong><br/>
                  กดปุ่ม "เริ่มเกม" และฟังเสียงคำที่จะอ่านให้
                </div>
              </div>
              <div className="flex items-start gap-3">
                <div className="text-2xl">3️⃣</div>
                <div>
                  <strong>สะกดคำ:</strong><br/>
                  พิมพ์คำที่ได้ยินและดูผลคะแนน!
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Index;
