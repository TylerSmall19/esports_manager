import { PlayerStatType } from "../types/trainingTypes/TrainingRequest";

export const TRAINING_CONFIG = {
  statsToImproveCount: 1,
  statsToDecayCount: 2,
  statsToMaintainCount: 2,
  statsToAffectMax: 5,
  trainableStats: [PlayerStatType.awareness, PlayerStatType.leadership, PlayerStatType.mechanics, PlayerStatType.proactive, PlayerStatType.safety],
}