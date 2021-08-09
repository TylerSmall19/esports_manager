import { BaseDbService } from "./baseDbService";
import { Org } from "../../types/org";
import { ObjectId } from "mongodb";
import { ScoutablePlayersDatabaseService } from "./scoutablePlayerDatabaseService";

export class OrgDatabaseService extends BaseDbService{

  constructor () {
    super()

    this._dbName = 'UserControlled';
    this._collectionName = 'orgs';
  }

  async saveNewOrg (org : Org) : Promise<boolean> {
    try {
      await this._databaseClient.connect();
      const collection = this._databaseClient.db(this._dbName).collection(this._collectionName);

      org = this._addCreatedDates(org);
      const result = await collection.insertMany([org]);

      return(this._wasSuccess(result));
    }
    catch (err) {
      this._logger.logError(`Error saving: ${JSON.stringify(err)}`);
      return null;
    }
    finally {
      this._databaseClient.close();
    }
  }

  // TODO: Ensure players cannot be scouted to other rosters
  async addPlayersToRoster (orgId : string, playersToAdd : string[]) : Promise<boolean> {
    try {
      const playerService = new ScoutablePlayersDatabaseService();

      await this._databaseClient.connect();
      const collection = this._databaseClient.db(this._dbName).collection(this._collectionName);

      await playerService.setManyPlayerScoutableStatus(playersToAdd, false);

      const result = await collection.updateOne({ _id: new ObjectId(orgId) }, {$set: { playerIds: playersToAdd, updatedAt: new Date() } });

      return (result.modifiedCount > 0);
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