import { InsertManyResult, InsertOneResult } from "mongodb";
import { PlayerInfo } from "../../types/playerInfo";
import { BaseDbService } from "./baseDbService";

class ScoutablePlayersDatabaseService extends BaseDbService{

  constructor () {
    super()

    this.collectionName = 'NPCPlayers';
    this.dbName = 'players';
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

  public async getScoutablePlayers() : Promise<PlayerInfo[]> {
    try {
      await this.databaseClient.connect();

      const collection = this.databaseClient.db(this.dbName).collection(this.collectionName);
      var res = await collection.find<PlayerInfo>({ scoutable: true }).toArray();

      if (res.length > 0)
        return res;
    }
    catch (err) {
      this.logger.logError(`Error saving: ${JSON.stringify(err)}`);
      return null;
    }
  }
}

export { ScoutablePlayersDatabaseService };