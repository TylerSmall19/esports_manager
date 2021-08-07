export type PlayerInfo = {
  // Static info
  id: string;
  firstName: string;
  lastName: string;
  ign: string;
  region: Region;
  
  // Non-Trainable Stats
  nerves: number;
  ego: number;
  
  // Trainable Stats
  overall: number;
  agression: number;
  mechanics: number;
  safety: number;
  awareness: number;
  leadership: number;

  // Other
  traits?: any[];
}

export enum Region {
  'KOR', 'NA', 'EU', 'JP', 'CHN'
}