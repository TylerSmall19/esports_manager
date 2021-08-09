import { PlayerInfo } from "../../types/playerInfo";
import { BaseDbService } from "./baseDbService";

class ScoutablePlayersDatabaseService extends BaseDbService{
  
  constructor () {
    super()

    this.dbName = 'NPCPlayers';
    this.collectionName = 'players';
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
      }
      catch (err) {
        this.logger.logError(`Error saving: ${JSON.stringify(err)}`);
        return null;
      }
      finally {
        this.databaseClient.close();
      }
  }

  public async getScoutablePlayers() : Promise<PlayerInfo[]> {
    try {
      await this.databaseClient.connect();

      const collection = this.databaseClient.db(this.dbName).collection(this.collectionName);
      var res = await collection.find<PlayerInfo>({ scoutable: true }).toArray();

      return res;
    }
    catch (err) {
      this.logger.logError(`Error saving: ${JSON.stringify(err)}`);
      return null;
    }
    finally {
      this.databaseClient.close();
    }
  }
}

export { ScoutablePlayersDatabaseService };