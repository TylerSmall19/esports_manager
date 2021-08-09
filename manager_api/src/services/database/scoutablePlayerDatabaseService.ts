import { ObjectId } from "mongodb";
import { PlayerInfo } from "../../types/playerInfo";
import { BaseDbService } from "./baseDbService";

class ScoutablePlayersDatabaseService extends BaseDbService{
  
  constructor () {
    super()

    this._dbName = 'NPCPlayers';
    this._collectionName = 'players';
  }

  public async saveNewPlayers(players: PlayerInfo[]) : Promise<boolean> {
      try {
        await this._databaseClient.connect();

        const collection = this._databaseClient.db(this._dbName).collection(this._collectionName);

        // Add dates
        players = players.map(pl => this._addCreatedDates(pl));

        // @ts-ignore
        let res = await collection.insertMany(players);

        return (this._wasSuccess(res));
      }
      catch (err) {
        this._logger.logError(`Error saving: ${JSON.stringify(err)}`);
        return null;
      }
      finally {
        this._databaseClient.close();
      }
  }

  public async getScoutablePlayers() : Promise<PlayerInfo[]> {
    try {
      await this._databaseClient.connect();

      const collection = this._databaseClient.db(this._dbName).collection(this._collectionName);
      var res = await collection.find<PlayerInfo>({ scoutable: true }).toArray();

      return res;
    }
    catch (err) {
      this._logger.logError(`Error saving: ${JSON.stringify(err)}`);
      return null;
    }
    finally {
      this._databaseClient.close();
    }
  }

  public async setManyPlayerScoutableStatus(playerIds: string[], scoutable: boolean) : Promise<boolean> {
    try {
      await this._databaseClient.connect();
      const collection = this._databaseClient.db(this._dbName).collection(this._collectionName);

      const objectIds = ScoutablePlayersDatabaseService._mapStringsToObjectIds(playerIds);
      var res = await collection.updateMany({ _id: { $in: objectIds} }, { $set: { scoutable } });

      return res.modifiedCount > 0;
    }
    catch (err) {
      this._logger.logError(`Error saving: ${JSON.stringify(err)}`);
      return null;
    }
    finally {
      this._databaseClient.close();
    }
  }
}

export { ScoutablePlayersDatabaseService };