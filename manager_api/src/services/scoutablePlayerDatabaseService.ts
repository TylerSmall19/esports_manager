import { InsertManyResult } from "mongodb";
import { PlayerInfo } from "../types/playerInfo";
import { ProjectLogger } from "./loggingService";
import { MongoClient } from 'mongodb';

class ScoutablePlayersDatabaseService {
  databaseClient: MongoClient;
  logger: ProjectLogger;
  collectionName: string = 'players';
  dbName: string = 'NPCPlayers'

  constructor () {
    this.databaseClient = new MongoClient(process.env.MONGO_CONNECTION);
    this.logger = new ProjectLogger();
  }

  public async saveNewPlayers(players: PlayerInfo[]) : Promise<boolean> {
      try {
        await this.databaseClient.connect();

        const collection = this.databaseClient.db(this.dbName).collection(this.collectionName);

        // Add dates
        players = players.map(pl => this._addCreatedDates(pl));

        // @ts-ignore
        let res = await collection.insertMany(players);

        return (this._wasSuccess(res));
        // throw new Error(`Could not insert user: ${JSON.stringify(players)}`);
      }
      catch (err) {
        this.logger.logError(`Error saving: ${JSON.stringify(err)}`);
        return null;
      }
  }

  public async getScoutablePlayers() : Promise<PlayerInfo[] | undefined> {
    try {
      await this.databaseClient.connect();

      const collection = this.databaseClient.db(this.dbName).collection(this.collectionName);
      var res = await collection.find<PlayerInfo>({ scoutable: true }).toArray();

      if (res.length > 0)
        return res;
    }
    catch (err) {
      this.logger.logError(`Error saving: ${JSON.stringify(err)}`);
      return;
    }
  }

  private _wasSuccess(res : InsertManyResult) : boolean {
    if (res.insertedCount > 0) {
      this.logger.logInfo(`Successfully inserted ${res.insertedCount} row(s)!`);
      return true;
    }
  }

  private _addCreatedDates(item : PlayerInfo) {
    return {...item, createdAtDate: new Date()};
  }
}

export { ScoutablePlayersDatabaseService };