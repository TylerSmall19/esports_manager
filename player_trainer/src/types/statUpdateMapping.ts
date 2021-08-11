import { PlayerStatType, TeamStatType } from "./trainingRequest";

export type PlayerUpdateMapping = {
  entityId: string;
  statToChange: PlayerStatType | TeamStatType;
  modifierToAdd: number; // Negative stats should be negative numbers
};

export type StatUpdateMapping = {
  playerUpdates: PlayerUpdateMapping[]
};