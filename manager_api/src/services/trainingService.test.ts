import { PlayerStatType, TrainingTypes } from "../types/trainingTypes/TrainingRequest";
import * as trainingService from "./trainingService";

describe('trainingService', () => {
  describe('validatePlayerAssignments', () => {
    test('it rejects duplicated skills', () => {
      let mockTA = {
        statsToDecay: [PlayerStatType.leadership, PlayerStatType.mechanics],
        statsToImprove: [PlayerStatType.mechanics],
        statsToMaintain: [PlayerStatType.proactive, PlayerStatType.safety]
      } as trainingService.TrainingAssignment;
      expect(() => { trainingService.validatePlayerAssignments(mockTA)}).toThrow();
    });

    test('it rejects untrainable skills', () => {
      let mockTA = {
        statsToDecay: [PlayerStatType.ego, PlayerStatType.mechanics],
        statsToImprove: [PlayerStatType.leadership],
        statsToMaintain: [PlayerStatType.proactive, PlayerStatType.safety]
      } as trainingService.TrainingAssignment;
      expect(() => { trainingService.validatePlayerAssignments(mockTA)}).toThrow();
    });

    test('it rejects when the number of skills is less than the number required', () => {
      let mockTA = {
        statsToDecay: [PlayerStatType.leadership],
        statsToImprove: [],
        statsToMaintain: []
      } as trainingService.TrainingAssignment;
      expect(() => { trainingService.validatePlayerAssignments(mockTA)}).toThrow();
    });

    test('it rejects when the number of skills in improve is larger than max', () => {
      let mockTA = {
        statsToDecay: [PlayerStatType.leadership],
        statsToImprove: [PlayerStatType.awareness, PlayerStatType.mechanics, PlayerStatType.proactive],
        statsToMaintain: [PlayerStatType.safety] 
      } as trainingService.TrainingAssignment;
      expect(() => { trainingService.validatePlayerAssignments(mockTA)}).toThrow();
    });

    test('it rejects when the number of skills in decay is larger than max', () => {
      let mockTA = {
        statsToDecay: [PlayerStatType.leadership, PlayerStatType.mechanics, PlayerStatType.proactive],
        statsToImprove: [PlayerStatType.awareness],
        statsToMaintain: [PlayerStatType.safety]
      } as trainingService.TrainingAssignment;
      expect(() => { trainingService.validatePlayerAssignments(mockTA)}).toThrow();
    });

    test('it rejects when the number of skills in maintain is larger than max', () => {
      let mockTA = {
        statsToDecay: [PlayerStatType.leadership, PlayerStatType.mechanics],
        statsToImprove: [],
        statsToMaintain: [PlayerStatType.safety, PlayerStatType.proactive, PlayerStatType.awareness]
      } as trainingService.TrainingAssignment;
      expect(() => { trainingService.validatePlayerAssignments(mockTA)}).toThrow();
    });

    test('it passes when given the correct values', () => {
      let mockTA = {
        statsToDecay: [PlayerStatType.awareness, PlayerStatType.mechanics],
        statsToImprove: [PlayerStatType.leadership],
        statsToMaintain: [PlayerStatType.proactive, PlayerStatType.safety]
      } as trainingService.TrainingAssignment;
      expect(trainingService.validatePlayerAssignments(mockTA)).toBe(true);
    });
  });
  describe('trainPlayers', () => {
    test('validates player assignments for each one given', () => {
      const playerAssignments = [{ playerId: 'foo' } as trainingService.TrainingAssignment, { playerId: 'bar' } as trainingService.TrainingAssignment];
      const spy = jest.spyOn(trainingService, 'validatePlayerAssignments');
      spy.mockImplementation(() => true);

      expect(spy).not.toBeCalled(); 
      trainingService.trainPlayers('', TrainingTypes.solo, playerAssignments);
      expect(spy).toHaveBeenNthCalledWith(1, playerAssignments[0]);
      expect(spy).toHaveBeenNthCalledWith(2, playerAssignments[1]);
    });
  });
});