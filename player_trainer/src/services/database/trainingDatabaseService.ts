import { MongoClient } from "mongodb";
import { PlayerStatTraining, PlayerStatType, StatAffect, TrainingRequest, TrainingTypes } from "../../types/trainingRequest";

const mockRequest = {
  _id: '',
  teamId: '61121b33751af7cf09489182',
  trainingType: TrainingTypes.solo,
  cycleTimeInMS: 5000,
  numberOfCyclesToTrain: 1,
  statTrainings: [
    { entityId: '6110578209a1e6110b9b5c34', statAffect: StatAffect.improve, statsToTrain: [PlayerStatType.leadership] },
    { entityId: '6110578209a1e6110b9b5c34', statAffect: StatAffect.decay, statsToTrain: [PlayerStatType.proactive, PlayerStatType.awareness] },
    { entityId: '6110578209a1e6110b9b5c34', statAffect: StatAffect.maintain, statsToTrain: [PlayerStatType.mechanics, PlayerStatType.safety] },
  ] as PlayerStatTraining[],
} as TrainingRequest

export class TrainingDatabaseService {
  _trainingDbName : string;
  _trainingCollectionName: string;
  _logger = console;
  _databaseClient : MongoClient;
  _playerDbName : string;
  _playerConnectionName : string;

  constructor () {
    this._trainingDbName = 'Training';
    this._trainingCollectionName = 'requestQueue';

    this._playerDbName = 'NPCPlayers';
    this._playerConnectionName = 'players';

    this._databaseClient = new MongoClient(process.env.MONGO_CONNECTION || '');
  }

  async pullTrainingQueue () : Promise<TrainingRequest[] | null> {
    try {
      await this._databaseClient.connect();
      const trainingReqCollection = this._databaseClient.db(this._trainingDbName).collection<TrainingRequest>(this._trainingCollectionName);

      await trainingReqCollection.insertOne(mockRequest);
      const practiceQueue = await trainingReqCollection.find({}).limit(250).toArray();

      this._logger.info(practiceQueue);
      return practiceQueue;
    }
    catch (err) {
      this._logger.error(`Error getting trainingQueue: ${JSON.stringify(err)}`);
      return null;
    }
    finally {
      this._databaseClient.close();
    }
  }
}