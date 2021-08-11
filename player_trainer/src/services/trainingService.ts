import { PlayerUpdateMapping, StatUpdateMapping } from "../types/statUpdateMapping";
import { PlayerStatTraining, PlayerStatType, StatAffect, TeamStatType, TrainingRequest, TrainingTypes } from "../types/trainingRequest";
import { TrainingDatabaseService } from "./database/trainingDatabaseService"

// Solo Practice
// - "Maintain" skills stay where they are each cycle -- 0
// - "Improve" skills go up by 2 every 3 cycles       -- .666
// - "Decaying" skills go down by 1 every 2 cycles    -- .5

// Team Practice
// 

// Stream Practice
// 

export const PRACTICE_VALUES = {
  [TrainingTypes.solo]: { [StatAffect.maintain]: 0, [StatAffect.decay]: -.25, [StatAffect.improve]: .5 },
  [TrainingTypes.team]: { [StatAffect.maintain]: 0, [StatAffect.decay]: 0, [StatAffect.improve]: 0 },
  [TrainingTypes.stream]: { [StatAffect.maintain]: 0, [StatAffect.decay]: 0, [StatAffect.improve]: 0 }
};

export const mapPlayerStatChanges = (statToTrain : PlayerStatType | TeamStatType, statAffect : StatAffect, entityId: string, trainingType: TrainingTypes) : PlayerUpdateMapping => 
{
  let mapping = {
    entityId,
    // Use the StatAffect provided to index the correct value from it
    modifierToAdd: PRACTICE_VALUES[trainingType][statAffect],
    statToChange: statToTrain
  };

  return mapping;
}

export const handleSoloTraining = (trainings : PlayerStatTraining[]) : StatUpdateMapping => {
  let statUpdateMapping = { playerUpdates: [] } as StatUpdateMapping;

  const mapping = trainings.forEach(tr => {
    tr.statsToTrain.forEach((stat : PlayerStatType | TeamStatType) => {
      statUpdateMapping.playerUpdates.push(mapPlayerStatChanges(stat, tr.statAffect, tr.entityId, TrainingTypes.solo));
    });
  });

  return statUpdateMapping;
};

export const beginTraining = async () => {
  const db = new TrainingDatabaseService();

  const trainingList =  await db.pullTrainingQueue();

  trainingList?.forEach(training => {
    switch (training.trainingType) {
      case TrainingTypes.solo:
        handleSoloTraining(training.statTrainings);
        break;
      
      default:
        break;
    }
  });
};