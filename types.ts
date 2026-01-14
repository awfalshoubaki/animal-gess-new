
export interface Animal {
  id: string;
  name: string;
  image: string;
  sound: string;
}

export interface LevelConfig {
  id: number;
  name: string;
  animalPool: string[]; // List of animal IDs that can appear in this level
  unlockedAt: number;   // ID of level needed to unlock this
}

export interface LevelProgress {
  levelId: number;
  stars: number;
  unlocked: boolean;
}

export enum GameState {
  MAP = 'MAP',
  PLAYING = 'PLAYING',
  LEVEL_COMPLETE = 'LEVEL_COMPLETE'
}
