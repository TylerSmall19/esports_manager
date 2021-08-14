import { StatUpdateMapping } from "../types/statUpdateMapping";
import { PlayerStatTraining, PlayerStatType, StatAffect, TrainingRequest, TrainingTypes } from "../types/trainingRequest";
import * as db from "./database/trainingDatabaseService";
import * as trainingService from "./trainingService";

jest.mock('./database/trainingDatabaseService', () => {
  return {
    TrainingDatabaseService: jest.fn().mockImplementation(() => {
       return mockDbService;
    })
  };
});

const mockTrainings = [{ entityId: 'foo', statAffect: StatAffect.improve, statsToTrain: [] }] as PlayerStatTraining[];

const mockDbService = {
  pullTrainingQueue: jest.fn(async () => ([
    { statTrainings: mockTrainings, trainingType: TrainingTypes.solo }
  ] as TrainingRequest[]))
};

describe('trainingService', () => {
  describe('MapPlayerStatChanges', () => {
    describe('solo training', () => {
      test('calculates correct values for `improve` stats', () => {
        const expectedStatType = PlayerStatType.leadership;
        const expectedEntityId = 'foo:bar';
        const expectedStatAffect = StatAffect.improve;
        const expectedTrainingType = TrainingTypes.solo;

        const res = trainingService.mapPlayerStatChanges(expectedStatType, expectedStatAffect, expectedEntityId, expectedTrainingType);

        expect(res.entityId).toBe(expectedEntityId);
        expect(res.modifierToAdd).toBe(trainingService.PRACTICE_VALUES.solo[expectedStatAffect]);
        expect(res.statToChange).toBe(expectedStatType);
      });
  
      test('calculates correct values for `decay` stats', () => {
        const expectedStatType = PlayerStatType.mechanics;
        const expectedEntityId = 'foo:bar';
        const expectedStatAffect = StatAffect.decay;
        const expectedTrainingType = TrainingTypes.solo;
  
        const res = trainingService.mapPlayerStatChanges(expectedStatType, expectedStatAffect, expectedEntityId, expectedTrainingType);
  
        expect(res.entityId).toBe(expectedEntityId);
        expect(res.modifierToAdd).toBe(trainingService.PRACTICE_VALUES.solo[expectedStatAffect]);
        expect(res.statToChange).toBe(expectedStatType);
      });

      test('calculates correct values for `maintain` stats', () => {
        const expectedStatType = PlayerStatType.proactive;
        const expectedEntityId = 'foo:bar';
        const expectedStatAffect = StatAffect.maintain;
        const expectedTrainingType = TrainingTypes.solo;
  
        const res = trainingService.mapPlayerStatChanges(expectedStatType, expectedStatAffect, expectedEntityId, expectedTrainingType);
  
        expect(res.entityId).toBe(expectedEntityId);
        expect(res.modifierToAdd).toBe(trainingService.PRACTICE_VALUES.solo[expectedStatAffect]);
        expect(res.statToChange).toBe(expectedStatType);
      });
    });
  });
  describe('HandleSoloTraining', () => {
    test('gives the expected output when 1 valid statTraining is given', () => {
      const spy = jest.spyOn(trainingService, 'mapPlayerStatChanges');
      const playerStatTraining = { entityId: 'foo', statAffect: StatAffect.improve, statsToTrain: [PlayerStatType.awareness] };
      const expectedOutput = {
        playerUpdates: [{
          entityId: playerStatTraining.entityId,
          modifierToAdd: trainingService.PRACTICE_VALUES.solo[playerStatTraining.statAffect],
          statToChange: PlayerStatType.awareness
        }]
      } as StatUpdateMapping;

      const actual = trainingService.handleSoloTraining([playerStatTraining]);
      expect(actual).toEqual(expectedOutput);
    });

    test('gives the expected output when given multiple valid trainings', () => {
      const spy = jest.spyOn(trainingService, 'mapPlayerStatChanges');
      const playerStatTraining = { entityId: 'foo', statAffect: StatAffect.improve, statsToTrain: [PlayerStatType.awareness] };
      const expectedOutput = {
        playerUpdates: [{
          entityId: playerStatTraining.entityId,
          modifierToAdd: trainingService.PRACTICE_VALUES.solo[playerStatTraining.statAffect],
          statToChange: PlayerStatType.awareness
        },
        {
          entityId: playerStatTraining.entityId,
          modifierToAdd: trainingService.PRACTICE_VALUES.solo[playerStatTraining.statAffect],
          statToChange: PlayerStatType.mechanics
        }]
      } as StatUpdateMapping;

      const actual = trainingService.handleSoloTraining([playerStatTraining, { entityId: 'foo', statAffect: StatAffect.improve, statsToTrain: [PlayerStatType.mechanics] }]);
      expect(actual).toEqual(expectedOutput);
    });

    test('gives the expected output when given multiple stats to train', () => {
      const spy = jest.spyOn(trainingService, 'mapPlayerStatChanges');
      const playerStatTraining = { entityId: 'foo', statAffect: StatAffect.improve, statsToTrain: [PlayerStatType.awareness, PlayerStatType.leadership] };
      const expectedOutput = {
        playerUpdates: [{
          entityId: playerStatTraining.entityId,
          modifierToAdd: trainingService.PRACTICE_VALUES.solo[playerStatTraining.statAffect],
          statToChange: PlayerStatType.awareness
        },
        {
          entityId: playerStatTraining.entityId,
          modifierToAdd: trainingService.PRACTICE_VALUES.solo[playerStatTraining.statAffect],
          statToChange: PlayerStatType.leadership
        }]
      } as StatUpdateMapping;

      const actual = trainingService.handleSoloTraining([playerStatTraining]);
      expect(actual).toEqual(expectedOutput);
    });

    test('gives the expected output when given multiple stats for multiple players', () => {
      const spy = jest.spyOn(trainingService, 'mapPlayerStatChanges');
      const playerStatTraining = { entityId: 'foo', statAffect: StatAffect.decay, statsToTrain: [PlayerStatType.proactive, PlayerStatType.safety] };
      const expectedOutput = {
        playerUpdates: [{
          entityId: playerStatTraining.entityId,
          modifierToAdd: trainingService.PRACTICE_VALUES.solo[playerStatTraining.statAffect],
          statToChange: PlayerStatType.proactive
        },
        {
          entityId: playerStatTraining.entityId,
          modifierToAdd: trainingService.PRACTICE_VALUES.solo[playerStatTraining.statAffect],
          statToChange: PlayerStatType.safety
        },
        {
          entityId: 'bar',
          modifierToAdd: trainingService.PRACTICE_VALUES.solo[StatAffect.maintain],
          statToChange: PlayerStatType.proactive
        },
        {
          entityId: 'bar',
          modifierToAdd: trainingService.PRACTICE_VALUES.solo[StatAffect.maintain],
          statToChange: PlayerStatType.safety
        }
      ]
      } as StatUpdateMapping;

      const actual = trainingService.handleSoloTraining([playerStatTraining, {...playerStatTraining, entityId: 'bar', statAffect: StatAffect.maintain}]);
      expect(actual).toEqual(expectedOutput);
    });
  });
  describe('BeginTraining', () => {
    test('it calls the DB to pull the training queue', () => {
      expect(mockDbService.pullTrainingQueue).not.toBeCalled();
      trainingService.beginTraining();
      expect(mockDbService.pullTrainingQueue).toBeCalled();
    });

    test('it calls the handle solo method with proper args when given the type', async () => {
      const spy = jest.spyOn(trainingService, 'handleSoloTraining');

      expect(spy).not.toBeCalled();
      await trainingService.beginTraining();
      expect(spy).toBeCalledWith(mockTrainings);
    });
  });
});