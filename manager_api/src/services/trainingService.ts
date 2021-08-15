import { TRAINING_CONFIG } from "../constants/trainingConfig";
import { PlayerStatTraining, PlayerStatType, StatAffect, TrainingRequest, TrainingTypes } from "../types/trainingTypes/TrainingRequest";

// const exampleTrainingRequest = {
//   teamId: '61121b33751af7cf09489182',
//   trainingType: TrainingTypes.solo,
//   cycleTimeInMS: 5000,
//   numberOfCyclesToTrain: 1,
//   statTrainings: [
//     { entityId: '6110578209a1e6110b9b5c35', statAffect: StatAffect.improve, statsToTrain: [PlayerStatType.leadership] },
//     { entityId: '6110578209a1e6110b9b5c35', statAffect: StatAffect.decay, statsToTrain: [PlayerStatType.proactive, PlayerStatType.awareness] },
//     { entityId: '6110578209a1e6110b9b5c35', statAffect: StatAffect.maintain, statsToTrain: [PlayerStatType.mechanics, PlayerStatType.safety] },
//   ] as PlayerStatTraining[],
// } as TrainingRequest

export type TrainingAssignment = {
  playerId: string;

  statsToImprove: PlayerStatType[];
  statsToDecay: PlayerStatType[];
  statsToMaintain: PlayerStatType[];
}

function hasDuplicates(array : any[]) {
  return (new Set(array)).size !== array.length;
}

export const validatePlayerAssignments = (assignment : TrainingAssignment) : boolean => {
  try {
    if (assignment.statsToDecay.length !== TRAINING_CONFIG.statsToDecayCount)
      throw new Error();

    if (assignment.statsToImprove.length !== TRAINING_CONFIG.statsToImproveCount)
        throw new Error();

    if (assignment.statsToMaintain.length !== TRAINING_CONFIG.statsToMaintainCount)
        throw new Error();

    const completeStats = assignment.statsToDecay.concat(assignment.statsToImprove, assignment.statsToMaintain);

    if (hasDuplicates(completeStats))
      throw new Error();

    if (completeStats.length !== TRAINING_CONFIG.statsToAffectMax)
      throw new Error();

    completeStats.forEach(stat => {
      if (!TRAINING_CONFIG.trainableStats.includes(stat))
        throw new Error();
    });

    return true;
  }
  catch (err) {
    return false;
  }
}

export const trainPlayers = (teamId: string, trainingType: TrainingTypes, playerAssignments: TrainingAssignment[]) => {
  // TODO: Validate the team belongs to the user that submitted it
  // TODO: Validate the player IDs don't exist in the training tables already before putting it in there
  let request = {
    cycleTimeInMS: 0,
    numberOfCyclesToTrain: 1,
    teamId,
    trainingType,
    statTrainings: []
  } as TrainingRequest;

  playerAssignments.forEach((assignment) => {
    // Check if they're valid and assign if they are. Otherwise don't touch them
    if (validatePlayerAssignments(assignment)) {
      request.statTrainings.push({ entityId: assignment.playerId, statAffect: StatAffect.improve, statsToTrain: assignment.statsToImprove });
      request.statTrainings.push({ entityId: assignment.playerId, statAffect: StatAffect.decay, statsToTrain: assignment.statsToDecay });
      request.statTrainings.push({ entityId: assignment.playerId, statAffect: StatAffect.maintain, statsToTrain: assignment.statsToMaintain });
    }
    else {
      throw new Error(`Error with assignment validations: ${JSON.stringify(assignment)}`);
    }
  });


};