import { InsertManyResult, MongoClient, ObjectId } from "mongodb";
import { ProjectLogger } from "../loggingService";

export class BaseDbService {
  _databaseClient: MongoClient;
  _logger: ProjectLogger;
  _collectionName: string;
  _dbName: string;

  constructor () {
    this._databaseClient = new MongoClient(process.env.MONGO_CONNECTION);
    this._logger = new ProjectLogger();
  }

  protected _addCreatedDates(item : any) {
    return {...item, createdAtDate: new Date()};
  }

  protected _wasSuccess(res : InsertManyResult) : boolean {
    if (res.insertedCount > 0) {
      this._logger.logInfo(`Successfully inserted ${res.insertedCount} row(s)!`);
      return true;
    }
  }

  static _mapStringsToObjectIds(ids : string[]) : ObjectId[] {
    return ids.map(id => new ObjectId(id));
  }
}