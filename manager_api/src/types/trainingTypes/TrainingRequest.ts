export enum TrainingTypes {
  team = 'team',
  solo = 'solo',
  stream = 'stream',
}

export enum PlayerStatType {
  nerves = "nerves",
  ego = "ego",
  proactive = "proactive",
  mechanics = "mechanics",
  safety = "safety",
  awareness = "awareness",
  leadership = "leadership",
}

export enum TeamStatType {
  coordination = 'coordination',
}

export enum StatAffect {
  maintain = 'maintain',
  improve = 'improve',
  decay = 'decay',
}

export type PlayerStatTraining = {
  // This can be a team ID or a player ID
  entityId: string;
  statsToTrain: PlayerStatType[] | TeamStatType[];
  statAffect: StatAffect;
}

export type TrainingRequest = {
  _id: string;
  teamId: string;
  cycleTimeInMS: number;
  numberOfCyclesToTrain: number;

  trainingType: TrainingTypes;

  statTrainings: PlayerStatTraining[];
}