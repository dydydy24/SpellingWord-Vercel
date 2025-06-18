// translationService.ts

export interface TranslationResult {
  //translation: string;
  imageUrl?: string; // ถ้ามีฐานภาพก็ใส่ logic เพิ่มเติมได้
}

export const getWordTranslation = async (word: string): Promise<{ translation: string, imageUrl?: string } | null> => {
  const normalizedWord = word.toLowerCase().trim();
  try {
    const response = await fetch(`https://api.dictionaryapi.dev/api/v2/entries/en/${normalizedWord}`);
    if (!response.ok) throw new Error('Word not found');

    const data = await response.json();
    const translation = data[0]?.meanings?.[0]?.definitions?.[0]?.definition || 'ไม่พบคำแปล';

    return {
      translation,
    };
  } catch (error) {
    console.error(error);
    return null;
  }
};
