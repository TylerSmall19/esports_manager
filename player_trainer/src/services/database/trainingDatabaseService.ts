import { MongoClient, ObjectId } from "mongodb";
import { TRAINING_VALUE_LIMITS } from "../../constants/trainingConfigs";
import { PlayerUpdateMapping } from "../../types/statUpdateMapping";
import { TrainingRequest } from "../../types/trainingRequest";

export class TrainingDatabaseService {
  _trainingDbName : string;
  _trainingCollectionName: string;
  _logger = console;
  _playerDbName : string;
  _playerCollectionName : string;
  _connectedClient : MongoClient;
  _isConnected : boolean = false;

  constructor () {
    this._trainingDbName = 'Training';
    this._trainingCollectionName = 'requestQueue';

    this._playerDbName = 'NPCPlayers';
    this._playerCollectionName = 'players';

    this._connectedClient = new MongoClient(process.env.MONGO_CONNECTION || '');
  }

  async _connect() {
    if (!this._isConnected) {
      this._connectedClient = await this._connectedClient.connect();
      this._isConnected = true;
    }
  }

  async pullTrainingQueue () : Promise<TrainingRequest[] | null> {
    try {
      await this._connect();

      const trainingReqCollection = this._connectedClient.db(this._trainingDbName).collection<TrainingRequest>(this._trainingCollectionName);

      // await trainingReqCollection.insertOne(mockRequest);
      const practiceQueue = await trainingReqCollection.find({}).limit(250).toArray();

      this._logger.info(practiceQueue);
      return practiceQueue;
    }
    catch (err) {
      this._logger.error(`Error getting trainingQueue: `, err);
      return null;
    }
  }

  async trainPlayerStat(update : PlayerUpdateMapping) : Promise<boolean> {
    try {
      await this._connect();
      const trainingReqCollection = this._connectedClient.db(this._playerDbName).collection<TrainingRequest>(this._playerCollectionName);
      const statField = `stats.${update.statToChange}.value`;
      // This will keep the trainer from picking up invalid
      const statTrainingLimit = {
        $and : [{ [statField]: { $lt: TRAINING_VALUE_LIMITS.max } },  { [statField]: { $gt: TRAINING_VALUE_LIMITS.min }}],
      }

      await trainingReqCollection.updateOne(
        { _id: new ObjectId(update.entityId), ...statTrainingLimit },
        { $inc: { [statField]: update.modifierToAdd } }
      );
    }
    catch (err) {
      this._logger.error(`Error training stats: `, err);
      return false;
    }
    return true;
  }

  async removeTrainingRequestById(id: string) {
    try {
      await this._connect();
      const trainingReqCollection = this._connectedClient.db(this._trainingDbName).collection<TrainingRequest>(this._trainingCollectionName);

      await trainingReqCollection.deleteOne({ _id: new ObjectId(id) });
    }
    catch (err) {
      this._logger.error(`Error removing: ${id} `, err);
      return false;
    }
  }
}