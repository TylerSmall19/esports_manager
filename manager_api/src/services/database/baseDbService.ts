import { InsertManyResult, MongoClient } from "mongodb";
import { ProjectLogger } from "../loggingService";

export class BaseDbService {
  databaseClient: MongoClient;
  logger: ProjectLogger;
  collectionName: string;
  dbName: string;

  constructor () {
    this.databaseClient = new MongoClient(process.env.MONGO_CONNECTION);
    this.logger = new ProjectLogger();
  }

  protected _addCreatedDates(item : any) {
    return {...item, createdAtDate: new Date()};
  }

  protected _wasSuccess(res : InsertManyResult) : boolean {
    if (res.insertedCount > 0) {
      this.logger.logInfo(`Successfully inserted ${res.insertedCount} row(s)!`);
      return true;
    }
  }
}