import { PlayerStatType } from "../types/trainingTypes/TrainingRequest";
import { TrainingAssignment, validatePlayerAssignments } from "./trainingService";

describe('trainingService', () => {
  describe('validate', () => {
    test('it rejects duplicated skills', () => {
      let mockTA = {
        statsToDecay: [PlayerStatType.leadership, PlayerStatType.mechanics],
        statsToImprove: [PlayerStatType.mechanics],
        statsToMaintain: [PlayerStatType.proactive, PlayerStatType.safety]
      } as TrainingAssignment;
      expect(validatePlayerAssignments(mockTA)).toBe(false); 
    });

    test('it rejects untrainable skills', () => {
      let mockTA = {
        statsToDecay: [PlayerStatType.ego, PlayerStatType.mechanics],
        statsToImprove: [PlayerStatType.leadership],
        statsToMaintain: [PlayerStatType.proactive, PlayerStatType.safety]
      } as TrainingAssignment;
      expect(validatePlayerAssignments(mockTA)).toBe(false);
    });

    test('it rejects when the number of skills is less than the number required', () => {
      let mockTA = {
        statsToDecay: [PlayerStatType.leadership],
        statsToImprove: [],
        statsToMaintain: []
      } as TrainingAssignment;
      expect(validatePlayerAssignments(mockTA)).toBe(false);
    });

    test('it rejects when the number of skills in improve is larger than max', () => {
      let mockTA = {
        statsToDecay: [PlayerStatType.leadership],
        statsToImprove: [PlayerStatType.awareness, PlayerStatType.mechanics, PlayerStatType.proactive],
        statsToMaintain: [PlayerStatType.safety] 
      } as TrainingAssignment;
      expect(validatePlayerAssignments(mockTA)).toBe(false);
    });

    test('it rejects when the number of skills in improve is larger than max', () => {
      let mockTA = {
        statsToDecay: [PlayerStatType.leadership, PlayerStatType.mechanics, PlayerStatType.proactive],
        statsToImprove: [PlayerStatType.awareness],
        statsToMaintain: [PlayerStatType.safety]
      } as TrainingAssignment;
      expect(validatePlayerAssignments(mockTA)).toBe(false);
    });

    test('it rejects when the number of skills in improve is larger than max', () => {
      let mockTA = {
        statsToDecay: [PlayerStatType.leadership, PlayerStatType.mechanics],
        statsToImprove: [],
        statsToMaintain: [PlayerStatType.safety, PlayerStatType.proactive, PlayerStatType.awareness]
      } as TrainingAssignment;
      expect(validatePlayerAssignments(mockTA)).toBe(false);
    });


    test('it passes when given the correct values', () => {
      let mockTA = {
        statsToDecay: [PlayerStatType.awareness, PlayerStatType.mechanics],
        statsToImprove: [PlayerStatType.leadership],
        statsToMaintain: [PlayerStatType.proactive, PlayerStatType.safety]
      } as TrainingAssignment;
      expect(validatePlayerAssignments(mockTA)).toBe(true);
    });
  });
});