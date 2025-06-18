
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Textarea } from '@/components/ui/textarea';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Plus, Save, Trash2, Edit3, Download } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { GripVertical } from 'lucide-react'; // ไอคอนสำหรับลาก
import {
  DndContext,
  closestCenter,
  DragEndEvent,
} from '@dnd-kit/core';
import {
  arrayMove,
  SortableContext,
  useSortable,
  verticalListSortingStrategy,
} from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';

interface WordManagerProps {
  words: string[];
  onWordsUpdate: (words: string[]) => void;
}

// ⭐ เพิ่ม: คอมโพเนนต์ Sortable
const SortableWordItem = ({ id, onRemove, onSpeak }: {
  id: string;
  onRemove: (word: string) => void;
  onSpeak: (word: string) => void;
}) => {
  const { attributes, listeners, setNodeRef, transform, transition } = useSortable({ id });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
  };

  return (
    <div
      ref={setNodeRef}
      style={style}
      {...attributes}      
      className="flex items-center justify-between bg-white p-2 rounded border cursor-move"
    >
      {/* 🎯 ใช้ไอคอนเฉพาะเป็น drag handle */}
      <button {...listeners} className="cursor-move text-gray-400 hover:text-gray-600">
          <GripVertical className="w-4 h-4" />
      </button>
      
      <span className="text-sm font-medium" onClick={() => onSpeak(id)}>
        {id}
      </span>
      
      <Button
        onClick={() => onRemove(id)}
        size="sm"
        variant="ghost"
        className="text-red-500 hover:text-red-700 hover:bg-red-50 p-1 h-auto"
      >
        <Trash2 className="w-3 h-3" />
      </Button>
    </div>
  );
};

const WordManager: React.FC<WordManagerProps> = ({ words, onWordsUpdate }) => {
  const [newWord, setNewWord] = useState('');
  const [bulkWords, setBulkWords] = useState('');
  const [showBulkInput, setShowBulkInput] = useState(false);
  const { toast } = useToast();

  const addSingleWord = () => {
    if (!newWord.trim()) {
      toast({
        title: "กรุณากรอกคำ",
        description: "พิมพ์คำที่ต้องการเพิ่ม",
        variant: "destructive",
      });
      return;
    }
    
    const trimmedWord = newWord.trim();
    if (words.includes(trimmedWord)) {
      toast({
        title: "คำนี้มีอยู่แล้ว",
        description: "กรุณาใส่คำอื่น",
        variant: "destructive",
      });
      return;
    }

    const updatedWords = [...words, trimmedWord];
    onWordsUpdate(updatedWords);
    setNewWord('');
    
    toast({
      title: "เพิ่มคำสำเร็จ! ✨",
      description: `เพิ่มคำ "${trimmedWord}" แล้ว`,
    });
  };

  const addBulkWords = () => {
    if (!bulkWords.trim()) {
      toast({
        title: "กรุณากรอกคำ",
        description: "พิมพ์คำที่ต้องการเพิ่ม",
        variant: "destructive",
      });
      return;
    }

    const newWordsList = bulkWords
      .split('\n')
      .map(word => word.trim())
      .filter(word => word.length > 0)
      .filter(word => !words.includes(word));

    if (newWordsList.length === 0) {
      toast({
        title: "ไม่มีคำใหม่",
        description: "คำที่ใส่มีอยู่แล้วหรือไม่ถูกต้อง",
        variant: "destructive",
      });
      return;
    }

    const updatedWords = [...words, ...newWordsList];
    onWordsUpdate(updatedWords);
    setBulkWords('');
    setShowBulkInput(false);
    
    toast({
      title: "เพิ่มคำสำเร็จ! 🎉",
      description: `เพิ่ม ${newWordsList.length} คำแล้ว`,
    });
  };

  const removeWord = (wordToRemove: string) => {
    const updatedWords = words.filter(word => word !== wordToRemove);
    onWordsUpdate(updatedWords);
    
    toast({
      title: "ลบคำสำเร็จ",
      description: `ลบคำ "${wordToRemove}" แล้ว`,
    });
  };

  const saveWordsToFile = () => {
    if (words.length === 0) {
      toast({
        title: "ไม่มีคำให้บันทึก",
        description: "กรุณาเพิ่มคำก่อน",
        variant: "destructive",
      });
      return;
    }

    const content = words.join('\n');
    const blob = new Blob([content], { type: 'text/plain;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `vocabulary_${new Date().getTime()}.txt`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);

    toast({
      title: "บันทึกไฟล์สำเร็จ! 💾",
      description: "ดาวน์โหลดไฟล์คำศัพท์แล้ว",
    });
  };

  
  const speakWord = (word: string) => {
    if ('speechSynthesis' in window) {
      const utterance = new SpeechSynthesisUtterance(word);
      utterance.lang = 'en-EN';
      utterance.rate = 0.6;
      utterance.pitch = 1.1;
      speechSynthesis.speak(utterance);

      
    } else {
      toast({
        title: "ไม่สามารถอ่านเสียงได้",
        description: "เบราว์เซอร์ของคุณไม่รองรับการอ่านเสียง",
        variant: "destructive",
      });
    }
  };

  return (
    <Card className="border-2 border-green-200 shadow-lg bg-white/80 backdrop-blur-sm">
      <CardHeader className="text-center pb-4">
        <CardTitle className="text-2xl text-green-700 flex items-center justify-center gap-2">
          <Edit3 className="w-6 h-6" />
          จัดการคำศัพท์
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        {/* Add single word */}
        <div className="space-y-2">
          <Label htmlFor="single-word" className="text-lg font-semibold text-gray-700">
            เพิ่มคำทีละคำ:
          </Label>
          <div className="flex gap-2">
            <Input
              id="single-word"
              value={newWord}
              onChange={(e) => setNewWord(e.target.value)}
              placeholder="พิมพ์คำที่ต้องการเพิ่ม..."
              className="flex-1"
              onKeyPress={(e) => e.key === 'Enter' && addSingleWord()}
            />
            <Button
              onClick={addSingleWord}
              className="bg-green-600 hover:bg-green-700 text-white"
            >
              <Plus className="w-4 h-4" />
            </Button>
          </div>
        </div>

        {/* Bulk add toggle */}
        <div className="flex justify-center">
          <Button
            onClick={() => setShowBulkInput(!showBulkInput)}
            variant="outline"
            className="border-green-300 text-green-600 hover:bg-green-50"
          >
            {showBulkInput ? 'ซ่อน' : 'เพิ่มหลายคำพร้อมกัน'}
          </Button>
        </div>

        {/* Bulk add */}
        {showBulkInput && (
          <div className="space-y-2">
            <Label htmlFor="bulk-words" className="text-lg font-semibold text-gray-700">
              เพิ่มหลายคำ (หนึ่งบรรทัดหนึ่งคำ):
            </Label>
            <Textarea
              id="bulk-words"
              value={bulkWords}
              onChange={(e) => setBulkWords(e.target.value)}
              placeholder="apple&#10;banana&#10;orange"
              className="min-h-32"
            />
            <Button
              onClick={addBulkWords}
              className="w-full bg-green-600 hover:bg-green-700 text-white"
            >
              <Plus className="w-4 h-4 mr-2" />
              เพิ่มทั้งหมด
            </Button>
          </div>
        )}

{/* Current words display */}
{words.length > 0 && (
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <Label className="text-lg font-semibold text-gray-700">
                คำศัพท์ปัจจุบัน ({words.length} คำ):
              </Label>
              <Button
                onClick={saveWordsToFile}
                size="sm"
                className="bg-blue-600 hover:bg-blue-700 text-white"
              >
                <Download className="w-4 h-4 mr-1" />
                ดาวน์โหลด
              </Button>
            </div>

            <div className="max-h-screen overflow-y-auto bg-gray-50 border rounded-lg p-3">
              {/* ⭐ เปลี่ยน: ใช้ DndContext */}
              <DndContext
                collisionDetection={closestCenter}
                onDragEnd={(event: DragEndEvent) => {
                  const { active, over } = event;
                  if (active.id !== over?.id) {
                    const oldIndex = words.findIndex(w => w === active.id);
                    const newIndex = words.findIndex(w => w === over?.id);
                    const newWords = arrayMove(words, oldIndex, newIndex);
                    onWordsUpdate(newWords);
                  }
                }}
              >
                <SortableContext
                  items={words}
                  strategy={verticalListSortingStrategy}
                >
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                    {words.map((word) => (
                      <SortableWordItem
                        key={word}
                        id={word}
                        onRemove={removeWord}
                        onSpeak={speakWord}
                      />
                    ))}
                  </div>
                </SortableContext>
              </DndContext>
            </div>
          </div>
        )}
        
        {/* Current words display */}
        {/*words.length > 0 && (
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <Label className="text-lg font-semibold text-gray-700">
                คำศัพท์ปัจจุบัน ({words.length} คำ):
              </Label>
              <Button
                onClick={saveWordsToFile}
                size="sm"
                className="bg-blue-600 hover:bg-blue-700 text-white"
              >
                <Download className="w-4 h-4 mr-1" />
                ดาวน์โหลด
              </Button>
            </div>

            <div className="max-h-screen overflow-y-auto bg-gray-50 border rounded-lg p-3">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                {words.map((word, index) => (
                  <div
                    key={index}
                    className="flex items-center justify-between bg-white p-2 rounded border"
                  >
                    <span className="text-sm font-medium" onClick={() => speakWord(word)}>{word}</span>
                    <Button
                      onClick={() => removeWord(word)}
                      size="sm"
                      variant="ghost"
                      className="text-red-500 hover:text-red-700 hover:bg-red-50 p-1 h-auto"
                    >
                      <Trash2 className="w-3 h-3" />
                    </Button>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )*/}
        

        {/* Save button */}
        {words.length > 0 && (
          <Button
            onClick={() => {
              localStorage.setItem('vocabularyWords', JSON.stringify(words));
              toast({
                title: "บันทึกสำเร็จ! 💾",
                description: "เก็บคำศัพท์ไว้ในเครื่องแล้ว",
              });
            }}
            className="w-full bg-purple-600 hover:bg-purple-700 text-white"
          >
            <Save className="w-4 h-4 mr-2" />
            บันทึกคำศัพท์
          </Button>
        )}
      </CardContent>
    </Card>
  );
};

export default WordManager;
