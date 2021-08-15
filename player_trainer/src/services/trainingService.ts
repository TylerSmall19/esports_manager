import { PlayerUpdateMapping, StatUpdateMapping } from "../types/statUpdateMapping";
import { PlayerStatTraining, PlayerStatType, StatAffect, TeamStatType, TrainingTypes } from "../types/trainingRequest";
import { TrainingDatabaseService } from "./database/trainingDatabaseService"

// Solo Practice
// - "Maintain" skills stay where they are 
// - "Improve" skills go up by .5 every cycle
// - "Decaying" skills go down by .25 every cycles

// Team Practice
// 

// Stream Practice
// 

// Map the enums to some config values that drive the player growth
export const PRACTICE_VALUES = {
  [TrainingTypes.solo]: { [StatAffect.maintain]: 0, [StatAffect.decay]: -.25, [StatAffect.improve]: .5 },
  [TrainingTypes.team]: { [StatAffect.maintain]: 0, [StatAffect.decay]: -.2, [StatAffect.improve]: .5 },
  [TrainingTypes.stream]: { [StatAffect.maintain]: 0, [StatAffect.decay]: -.1, [StatAffect.improve]: .2 }
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

export const generateTrainings = (trainings : PlayerStatTraining[], trainingType : TrainingTypes) : StatUpdateMapping => {
  let statUpdateMapping = { playerUpdates: [] } as StatUpdateMapping;

  trainings.forEach(tr => {
    tr.statsToTrain.forEach((stat : PlayerStatType | TeamStatType) => {
      statUpdateMapping.playerUpdates.push(mapPlayerStatChanges(stat, tr.statAffect, tr.entityId, trainingType));
    });
  });

  return statUpdateMapping;
};

export const trainStats = async (mapping : StatUpdateMapping, db : TrainingDatabaseService) => {
  mapping.playerUpdates.forEach(async (update) => {
    await db.trainPlayerStat(update);
  });
}

export const beginTraining = async (db : TrainingDatabaseService) => {
  const trainingList =  await db.pullTrainingQueue();

  trainingList?.forEach(async training => {
    // Create the trainings listings
    // Alter the player stats according to the generated mappings
    await trainStats(generateTrainings(training.statTrainings, training.trainingType), db);
    await db.removeTrainingRequestById(training._id);
  });
};