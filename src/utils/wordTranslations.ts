
// Simple word translation database
// In a real app, this would come from an API or database
const wordTranslations: Record<string, { translation: string; imageUrl?: string }> = {
'autumn': {
  translation: 'ฤดูใบไม้ร่วง',
  imageUrl: 'https://media.giphy.com/media/VXkvk1GTm45Ab8LxFV/giphy.gif' // ใบไม้ร่วง ฤดูใบไม้เปลี่ยนสี
},
'museam': {
  translation: 'พิพิธภัณฑ์',
  imageUrl: 'https://media.giphy.com/media/f7Ym8x5uq01UKd5xPc/giphy.gif' // ไดโนเสาร์อยู่ในพิพิธภัณฑ์
},
'cinema': {
  translation: 'โรงภาพยนตร์',
  imageUrl: 'https://media.giphy.com/media/njxkENt8FXreAt5TIT/giphy.gif' // Bert กับ Ernie กินป๊อปคอร์นดูหนัง
},
'usually': {
  translation: 'ปกติ',
  imageUrl: 'https://media.giphy.com/media/l41YiLaqBQDBuyFCU/giphy.gif' // เด็กๆ เต้นรำอย่างสนุกสนาน
},
'often': {
  translation: 'บ่อย',
  imageUrl: 'https://media.giphy.com/media/VduFvPwm3gfGO8duNN/giphy.gif' // เด็กๆ กอดกันอบอุ่น
},
'bottle': {
  translation: 'ขวด',
  imageUrl: 'https://media.giphy.com/media/1NyXuvX0f4kF0WiUum/giphy.gif' // งานปาร์ตี้ ฉีดแชมเปญ
},
'spices': {
  translation: 'เครื่องเทศ',
  imageUrl: 'https://media.giphy.com/media/xT0xePLIUyxnXso8co/giphy.gif' // คุกกี้มอนสเตอร์และเอลโม่ทำอาหาร
},
'butter': {
  translation: 'เนย',
  imageUrl: 'https://media.giphy.com/media/ToMjGppoPFxC9ImGesM/giphy.gif' // เด็กๆ ทำอาหารในห้องครัว
},
'grunting': {
  translation: 'คำรามออกจมูก',
  imageUrl: 'https://media.giphy.com/media/YeevQ7Ay6AVna/giphy.gif' // หมูกำลังคราง
},
'enormous': {
  translation: 'ใหญ่มหึมา',
  imageUrl: 'https://media.giphy.com/media/uh4Kz517e0OwJylC1B/giphy.gif' // ขนาดใหญ่โตมาก
},
'concert': {
  translation: 'คอนเสิร์ต',
  imageUrl: 'https://media.giphy.com/media/uh4Kz517e0OwJylC1B/giphy.gif' // เด็กๆ เต้นรำสนุกสนานในคอนเสิร์ต
},
"mistake": {
    "translation": "ความผิดพลาด",
    "imageUrl": "https://media3.giphy.com/media/v1.Y2lkPTc5MGI3NjExeGRmZmU5a2pleTZ1Z3NvbGNkMWh2OWliamw5ZmtkMjN2c29vZ3ZxNCZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9Zw/tfUW8mhiFk8NlJhgEh/giphy.gif" // Person with confused expression
  },
  'toast': { 
    translation: 'ขนมปังปิ้ง', 
    imageUrl: 'https://media0.giphy.com/media/v1.Y2lkPTc5MGI3NjExeDdrNzQzcG05YmxxbGZ1cHBpNHByb3lvM3Q0ZHllOXlydjBxN2xyYSZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9Zw/3oaPtHC37Vx0Q/giphy.gif' // Slices of toasted bread
  },
  'different': { 
    translation: 'แตกต่าง', 
    imageUrl: 'https://media4.giphy.com/media/v1.Y2lkPTc5MGI3NjExc2F6Y3lyM3JtMnRobmI1djNiMXZsdnJjbHEybHNpdTFocWgxenA5aSZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9Zw/75FTGVqRGklSs2mJFG/giphy.gif' // Different colored objects showing contrast
  },
  'colourful': { 
    translation: 'มีสีสัน', 
    imageUrl: 'https://media4.giphy.com/media/v1.Y2lkPTc5MGI3NjExZ3NoN3I5cWczamtvc2QybGY0NzBqeGloMTc4ZmZ1ZjlrZTVmY2JweSZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9Zw/h4H6A9bhZALEzqbfGY/giphy.gif' // Colorful balloons/rainbow colors
  },
  'festival': { 
    translation: 'เทศกาล', 
    imageUrl: 'https://media0.giphy.com/media/v1.Y2lkPTc5MGI3NjExdWdjdHM0dGZwbnFrN292cnRsbmI2NDl3YzI1eHpnZDhpd2w3aWlleCZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9Zw/A4jHpnYkGmQKs/giphy.gif' // Festival celebration with lights
  },
  'winter': { 
    translation: 'ฤดูหนาว', 
    imageUrl: 'https://media2.giphy.com/media/v1.Y2lkPTc5MGI3NjExZDZ1Y20zeWhna2FlMXlmbHVlZmo0NnAwNnJzdHcwZXF3bm1rYnB4ZCZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9Zw/d3mlmtNPoxNrt4Bi/giphy.gif' // Snow-covered winter scene
  },
  'summer': { 
    translation: 'ฤดูร้อน', 
    imageUrl: 'https://media4.giphy.com/media/v1.Y2lkPTc5MGI3NjExbnYxdTVqYTBrbzU2eDRzMzQ1cThxMXZna3Nrem9yd3pwYnFhOTRoNyZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9Zw/8UOnaIKakDKLtshm2y/giphy.gif' // Sunny summer beach scene
  },
  'refuse': { 
    translation: 'ปฏิเสธ', 
    imageUrl: 'https://media3.giphy.com/media/v1.Y2lkPTc5MGI3NjExZXZ5NHVtbDNmb2pzdXgyNTdrZ3N0d2V3c2Qxb2lhc3gxOHh2b24xNiZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9Zw/5ZZSUoH0c8s2m3NED2/giphy.gif' // Person making stop/no hand gesture
  },
  'customer': { 
    translation: 'ลูกค้า', 
    imageUrl: 'https://media1.giphy.com/media/v1.Y2lkPTc5MGI3NjExamR0dnpudnUwOWRrdDk5ZHBiY2NtMDQwd25kMTY1ajJlODh4aHUxMiZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9Zw/N9V1PEdD9SPKA31I2E/giphy.gif' // People shopping/customer in store
  },
  'uniform': { 
    translation: 'เครื่องแบบ', 
    imageUrl: 'https://media3.giphy.com/media/v1.Y2lkPTc5MGI3NjExNW9sbG1lOWIxNXlvemV4N2I1Z3NzbXA4dmJpbWJqbzh6bXoyOTA2OCZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9Zw/n4bWH2Gg8TcFrqA8wM/giphy.gif' // School or work uniforms
  },
  'teaspoon': { 
    translation: 'ช้อนชา', 
    imageUrl: 'https://media2.giphy.com/media/v1.Y2lkPTc5MGI3NjExa3Vtdmoxb3l0dGszNjlzb3dqbXZ3N2s2bXJqaml3cWhvajZxMDhpMSZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9Zw/14fbNNlDpxjEnS/giphy.gif' // Set of teaspoons/cutlery
  },
   'apple': { translation: 'แอปเปิ้ล', imageUrl: 'https://images.unsplash.com/photo-1618160702438-9b02ab6515c9?w=400&h=400&fit=crop' },
  'cat': { translation: 'แมว', imageUrl: 'https://images.unsplash.com/photo-1535268647677-300dbf3d78d1?w=400&h=400&fit=crop' },
  'dog': { translation: 'หมา' },
  'book': { translation: 'หนังสือ' },
  'house': { translation: 'บ้าน' },
  'car': { translation: 'รถยนต์' },
  'water': { translation: 'น้ำ' },
  'fire': { translation: 'ไฟ' },
  'tree': { translation: 'ต้นไม้' },
  'flower': { translation: 'ดอกไม้', imageUrl: 'https://images.unsplash.com/photo-1465146344425-f00d5f5c8f07?w=400&h=400&fit=crop' },
  'bird': { translation: 'นก' },
  'fish': { translation: 'ปลา' },
  'sun': { translation: 'ดวงอาทิตย์' },
  'moon': { translation: 'ดวงจันทร์' },
  'star': { translation: 'ดาว' },
  'school': { translation: 'โรงเรียน' },
  'friend': { translation: 'เพื่อน' },
  'family': { translation: 'ครอบครัว' },
  'food': { translation: 'อาหาร' },
  'milk': { translation: 'นม' },
  'bread': { translation: 'ขนมปัง' },
  'chair': { translation: 'เก้าอี้' },
  'table': { translation: 'โต๊ะ' },
  'pen': { translation: 'ปากกา' },
  'pencil': { translation: 'ดินสอ' },
  'paper': { translation: 'กระดาษ' },
  'ball': { translation: 'ลูกบอล' },
  'game': { translation: 'เกม' },
  'toy': { translation: 'ของเล่น' },
  'color': { translation: 'สี' },
  'red': { translation: 'สีแดง' },
  'blue': { translation: 'สีน้ำเงิน' },
  'green': { translation: 'สีเขียว' },
  'yellow': { translation: 'สีเหลือง' },
  'white': { translation: 'สีขาว' },
  'black': { translation: 'สีดำ' },
  'big': { translation: 'ใหญ่' },
  'small': { translation: 'เล็ก' },
  'happy': { translation: 'มีความสุข' },
  'sad': { translation: 'เศร้า' },
  'love': { translation: 'รัก' },
  'like': { translation: 'ชอบ' },
  'want': { translation: 'ต้องการ' },
  'need': { translation: 'จำเป็น' },
  'go': { translation: 'ไป' },
  'come': { translation: 'มา' },
  'see': { translation: 'เห็น' },
  'hear': { translation: 'ได้ยิน' },
  'eat': { translation: 'กิน' },
  'drink': { translation: 'ดื่ม' },
  'sleep': { translation: 'นอน' },
  'wake': { translation: 'ตื่น' },
  'walk': { translation: 'เดิน' },
  'run': { translation: 'วิ่ง' },
  'jump': { translation: 'กระโดด' },
  'play': { translation: 'เล่น' },
  'work': { translation: 'ทำงาน' },
  'study': { translation: 'เรียน' },
  'learn': { translation: 'เรียนรู้' },
  'teach': { translation: 'สอน' },
  'help': { translation: 'ช่วย' },
  'give': { translation: 'ให้' },
  'take': { translation: 'เอา' },
  'buy': { translation: 'ซื้อ' },
  'sell': { translation: 'ขาย' },
  'money': { translation: 'เงิน' },
  'time': { translation: 'เวลา' },
  'day': { translation: 'วัน' },
  'night': { translation: 'คืน' },
  'morning': { translation: 'เช้า' },
  'afternoon': { translation: 'บ่าย' },
  'evening': { translation: 'เย็น' },
  'week': { translation: 'สัปดาห์' },
  'month': { translation: 'เดือน' },
  'year': { translation: 'ปี' },
  'today': { translation: 'วันนี้' },
  'tomorrow': { translation: 'พรุ่งนี้' },
  'yesterday': { translation: 'เมื่อวาน' },
  'now': { translation: 'ตอนนี้' },
  'later': { translation: 'ภายหลัง' },
  'before': { translation: 'ก่อน' },
  'after': { translation: 'หลัง' },
  'here': { translation: 'ที่นี่' },
  'there': { translation: 'ที่นั่น' },
  'where': { translation: 'ที่ไหน' },
  'what': { translation: 'อะไร' },
  'who': { translation: 'ใคร' },
  'when': { translation: 'เมื่อไหร่' },
  'why': { translation: 'ทำไม' },
  'how': { translation: 'อย่างไร' },
  'yes': { translation: 'ใช่' },
  'no': { translation: 'ไม่' },
  'please': { translation: 'กรุณา' },
  'thank': { translation: 'ขอบคุณ' },
  'sorry': { translation: 'ขอโทษ' },
  'good': { translation: 'ดี' },
  'bad': { translation: 'ไม่ดี' },
  'new': { translation: 'ใหม่' },
  'old': { translation: 'เก่า' },
  'hot': { translation: 'ร้อน' },
  'cold': { translation: 'เย็น' },
  'fast': { translation: 'เร็ว' },
  'slow': { translation: 'ช้า' },
  'easy': { translation: 'ง่าย' },
  'hard': { translation: 'ยาก' },
  'right': { translation: 'ถูก/ขวา' },
  'wrong': { translation: 'ผิด' },
  'left': { translation: 'ซ้าย' },
  'up': { translation: 'ขึ้น' },
  'down': { translation: 'ลง' },
  'in': { translation: 'ใน' },
  'out': { translation: 'ออก' },
  'on': { translation: 'บน' },
  'under': { translation: 'ใต้' },
  'over': { translation: 'เหนือ' },
  'near': { translation: 'ใกล้' },
  'far': { translation: 'ไกล' },
  'one': { translation: 'หนึ่ง' },
  'two': { translation: 'สอง' },
  'three': { translation: 'สาม' },
  'four': { translation: 'สี่' },
  'five': { translation: 'ห้า' },
  'six': { translation: 'หก' },
  'seven': { translation: 'เจ็ด' },
  'eight': { translation: 'แปด' },
  'nine': { translation: 'เก้า' },
  'ten': { translation: 'สิบ' },
  'hundred': { translation: 'ร้อย' },
  'thousand': { translation: 'พัน' },
  'million': { translation: 'ล้าน' },
  'first': { translation: 'แรก' },
  'last': { translation: 'สุดท้าย' },
  'next': { translation: 'ถัดไป' },
  'mother': { translation: 'แม่' },
  'father': { translation: 'พ่อ' },
  'son': { translation: 'ลูกชาย' },
  'daughter': { translation: 'ลูกสาว' },
  'brother': { translation: 'พี่ชาย/น้องชาย' },
  'sister': { translation: 'พี่สาว/น้องสาว' },
  'baby': { translation: 'ทารก' },
  'child': { translation: 'เด็ก' },
  'boy': { translation: 'เด็กผู้ชาย' },
  'girl': { translation: 'เด็กผู้หญิง' },
  'man': { translation: 'ผู้ชาย' },
  'woman': { translation: 'ผู้หญิง' },
  'people': { translation: 'คน/ผู้คน' },
  'person': { translation: 'บุคคล' },
  'name': { translation: 'ชื่อ' },
  'age': { translation: 'อายุ' },
  'birthday': { translation: 'วันเกิด' },
  'head': { translation: 'หัว' },
  'face': { translation: 'หน้า' },
  'eye': { translation: 'ตา' },
  'nose': { translation: 'จมูก' },
  'mouth': { translation: 'ปาก' },
  'ear': { translation: 'หู' },
  'hair': { translation: 'ผม' },
  'hand': { translation: 'มือ' },
  'foot': { translation: 'เท้า' },
  'leg': { translation: 'ขา' },
  'arm': { translation: 'แขน' },
  'body': { translation: 'ร่างกาย' },
  'heart': { translation: 'หัวใจ' },
  'mind': { translation: 'จิตใจ' },
  'monkey': { translation: 'ลิง', imageUrl: 'https://images.unsplash.com/photo-1501286353178-1ec881214838?w=400&h=400&fit=crop' },
  'deer': { translation: 'กวาง', imageUrl: 'https://images.unsplash.com/photo-1472396961693-142e6e269027?w=400&h=400&fit=crop' },
};

export const getWordTranslation = (word: string): { translation: string; imageUrl?: string } | null => {
  const normalizedWord = word.toLowerCase().trim();
  return wordTranslations[normalizedWord] || null;
};

export const hasTranslation = (word: string): boolean => {
  const normalizedWord = word.toLowerCase().trim();
  return normalizedWord in wordTranslations;
};
