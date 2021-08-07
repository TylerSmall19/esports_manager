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
  salary: number;
  
  // Trainable Stats
  overall: number;
  proactive: number;
  mechanics: number;
  safety: number;
  awareness: number;
  leadership: number;

  // Other
  traits?: any[];
}

export enum Region {
  'KOR' = 'KOR',
  'NA' = 'NA',
  'EU' = 'EU',
  'JP' = 'JP',
  'CHN' = 'CHN'
}