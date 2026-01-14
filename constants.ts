
import { Animal, LevelConfig } from './types';

export const ANIMALS: Record<string, Animal> = {
  lion: {
    id: 'lion',
    name: 'أسد',
    image: 'https://images.unsplash.com/photo-1614027126733-757680ce9d8d?auto=format&fit=crop&q=80&w=400',
    sound: 'https://www.soundjay.com/nature/lion-roar-01.mp3'
  },
  cow: {
    id: 'cow',
    name: 'بقرة',
    image: 'https://images.unsplash.com/photo-1546445317-29f4545e9d53?auto=format&fit=crop&q=80&w=400',
    sound: 'https://www.soundjay.com/nature/cow-moo-1.mp3'
  },
  elephant: {
    id: 'elephant',
    name: 'فيل',
    image: 'https://images.unsplash.com/photo-1557050543-4d5f4e07ef46?auto=format&fit=crop&q=80&w=400',
    sound: 'https://cdn.pixabay.com/audio/2021/11/24/audio_349d4791e8.mp3'
  },
  duck: {
    id: 'duck',
    name: 'بطة',
    image: 'https://images.unsplash.com/photo-1555848962-6e79363ec58f?auto=format&fit=crop&q=80&w=400',
    sound: 'https://www.soundjay.com/nature/duck-quack-1.mp3'
  },
  rooster: {
    id: 'rooster',
    name: 'ديك',
    image: 'https://images.unsplash.com/photo-1548550023-2bdb3c5beed7?auto=format&fit=crop&q=80&w=400',
    sound: 'https://www.soundjay.com/nature/rooster-crowing-1.mp3'
  },
  sheep: {
    id: 'sheep',
    name: 'خروف',
    image: 'https://images.unsplash.com/photo-1484557918186-7b4e571d4b12?auto=format&fit=crop&q=80&w=400',
    sound: 'https://www.soundjay.com/nature/sheep-1.mp3'
  },
  cat: {
    id: 'cat',
    name: 'قطة',
    image: 'https://images.unsplash.com/photo-1514888286974-6c03e2ca1dba?auto=format&fit=crop&q=80&w=400',
    sound: 'https://www.soundjay.com/nature/cat-meow-1.mp3'
  },
  dog: {
    id: 'dog',
    name: 'كلب',
    image: 'https://images.unsplash.com/photo-1517849845537-4d257902454a?auto=format&fit=crop&q=80&w=400',
    sound: 'https://www.soundjay.com/nature/dog-bark-1.mp3'
  },
  horse: {
    id: 'horse',
    name: 'حصان',
    image: 'https://images.unsplash.com/photo-1553284965-83fd3e82fa5a?auto=format&fit=crop&q=80&w=400',
    sound: 'https://www.soundjay.com/nature/horse-neigh-1.mp3'
  },
  monkey: {
    id: 'monkey',
    name: 'قرد',
    image: 'https://images.unsplash.com/photo-1540573133985-87b6da6d54a9?auto=format&fit=crop&q=80&w=400',
    sound: 'https://cdn.pixabay.com/audio/2022/03/24/audio_32c8646b95.mp3'
  },
  frog: {
    id: 'frog',
    name: 'ضفدع',
    image: 'https://images.unsplash.com/photo-1559133965-f81d33194a08?auto=format&fit=crop&q=80&w=400',
    sound: 'https://cdn.pixabay.com/audio/2022/03/10/audio_51f1f50567.mp3'
  },
  owl: {
    id: 'owl',
    name: 'بومة',
    image: 'https://images.unsplash.com/photo-1543531405-a04836d57ad1?auto=format&fit=crop&q=80&w=400',
    sound: 'https://cdn.pixabay.com/audio/2022/03/24/audio_28941f175a.mp3'
  },
  pig: {
    id: 'pig',
    name: 'خنزير',
    image: 'https://images.unsplash.com/photo-1544225071-cc7099a3c740?auto=format&fit=crop&q=80&w=400',
    sound: 'https://cdn.pixabay.com/audio/2023/04/10/audio_c36f264879.mp3'
  },
  bee: {
    id: 'bee',
    name: 'نحلة',
    image: 'https://images.unsplash.com/photo-1473973266408-ed4e27abdd47?auto=format&fit=crop&q=80&w=400',
    sound: 'https://cdn.pixabay.com/audio/2021/08/09/audio_472b64d008.mp3'
  },
  wolf: {
    id: 'wolf',
    name: 'ذئب',
    image: 'https://images.unsplash.com/photo-1551609189-eba71b3a8566?auto=format&fit=crop&q=80&w=400',
    sound: 'https://cdn.pixabay.com/audio/2022/03/24/audio_9247d51b3a.mp3'
  }
};

export const LEVELS: LevelConfig[] = [
  { id: 1, name: "أصدقاء المزرعة", animalPool: ['cow', 'duck', 'rooster', 'sheep'], unlockedAt: 0 },
  { id: 2, name: "حيوانات المنزل", animalPool: ['cat', 'dog', 'horse', 'pig'], unlockedAt: 0 },
  { id: 3, name: "زئير الغابة", animalPool: ['lion', 'elephant', 'monkey', 'wolf'], unlockedAt: 0 },
  { id: 4, name: "ليل الغابة", animalPool: ['owl', 'wolf', 'bee', 'cat'], unlockedAt: 0 },
  { id: 5, name: "حياة البركة", animalPool: ['frog', 'duck', 'bee', 'dog'], unlockedAt: 0 },
  { id: 6, name: "خليط الثدييات", animalPool: ['elephant', 'cow', 'horse', 'pig'], unlockedAt: 0 },
  { id: 7, name: "المخلوقات الصغيرة", animalPool: ['bee', 'frog', 'duck', 'cat'], unlockedAt: 0 },
  { id: 8, name: "مغامرات برية", animalPool: ['lion', 'wolf', 'monkey', 'owl'], unlockedAt: 0 },
  { id: 9, name: "العرض الكبير", animalPool: ['elephant', 'lion', 'horse', 'cow'], unlockedAt: 0 },
  { id: 10, name: "خبير الحيوانات", animalPool: Object.keys(ANIMALS), unlockedAt: 0 }
];

export const SFX = {
  correct: 'https://cdn.pixabay.com/audio/2021/08/04/audio_bbd13043c9.mp3',
  incorrect: 'https://cdn.pixabay.com/audio/2022/03/10/audio_f5f6b216f4.mp3',
  victory: 'https://cdn.pixabay.com/audio/2021/08/04/audio_33215274d4.mp3',
  click: 'https://cdn.pixabay.com/audio/2022/03/15/audio_2910777592.mp3',
  star: 'https://cdn.pixabay.com/audio/2021/08/04/audio_062129c546.mp3'
};
