export class PlayerInfo {
  // Static info
  id: string = '';

  firstName: string = '';
  lastName: string = '';
  ign: string = '';
  region: Region = Region.KOR;
  salary: number = 0;
  overall: number = 0;

  stats : PlayerStats = new PlayerStats();

  statsCount: number = Object.keys(this.stats).length;
}

class PlayerStats {
  // Non-Trainable Stats
  nerves: PlayerStat = {
    value: 0,
    isTrainable: false,
    isPositive: false,
    name: 'nerves',
    displayName: 'Nerves',
  };

  ego: PlayerStat = {
    value: 0,
    isTrainable: false,
    isPositive: false,
    name: 'ego',
    displayName: 'Ego',
  };

  // Trainable Stats
  proactive: PlayerStat = {
    value: 0,
    isTrainable: true,
    isPositive: true,
    name: 'proactive',
    displayName: 'Proactivity',
  };

  mechanics: PlayerStat = {
    value: 0,
    isTrainable: true,
    isPositive: true,
    name: 'mechanics',
    displayName: 'Mechanics',
  };

  safety: PlayerStat = {
    value: 0,
    isTrainable: true,
    isPositive: true,
    name: 'safety',
    displayName: 'Safety',
  };

  awareness: PlayerStat = {
    value: 0,
    isTrainable: true,
    isPositive: true,
    name: 'awareness',
    displayName: 'Awareness',
  };

  leadership: PlayerStat = {
    value: 0,
    isTrainable: true,
    isPositive: true,
    name: 'leadership',
    displayName: 'Leadership'
  };
}

export type PlayerStat = {
  value: number;
  readonly isPositive: boolean;
  readonly isTrainable: boolean;
  readonly name: string;
  readonly displayName: string;
};

export enum Region {
  'KOR' = 'KOR',
  'NA' = 'NA',
  'EU' = 'EU',
  'JP' = 'JP',
  'CHN' = 'CHN'
}