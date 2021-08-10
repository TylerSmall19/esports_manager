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

  public async getManyPlayersByIds(playerIds: string[]) : Promise<PlayerInfo[]> {
    try {
      await this._databaseClient.connect();

      const collection = this._databaseClient.db(this._dbName).collection(this._collectionName);
      var res = await collection
        .find<PlayerInfo>(
          {
            // The TS implementation of mongoDb does not like this method, even though it's the correct way to search with arrays of objects.
            // Seems related to https://github.com/DefinitelyTyped/DefinitelyTyped/issues/39358#issuecomment-546559564
            // @ts-ignore
            _id: { $in: ScoutablePlayersDatabaseService._mapStringsToObjectIds(playerIds) }
          })
        .toArray();

      // Because the above line fails validation, the generic type gets messed up as well, so another ignore (*sigh*)
      // @ts-ignore
      return res;
    }
    catch (err) {
      this._logger.logError(`Error fetching: ${JSON.stringify(err)}`);
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