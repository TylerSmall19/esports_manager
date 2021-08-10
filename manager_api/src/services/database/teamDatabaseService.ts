import { BaseDbService } from "./baseDbService";
import { Team } from "../../types/team";
import { ObjectId } from "mongodb";
import { ScoutablePlayersDatabaseService } from "./scoutablePlayerDatabaseService";

export class TeamDatabaseService extends BaseDbService{

  constructor () {
    super()

    this._dbName = 'UserControlled';
    this._collectionName = 'teams';
  }

  async saveNewTeam (team : Team) : Promise<string> {
    try {
      await this._databaseClient.connect();
      const collection = this._databaseClient.db(this._dbName).collection(this._collectionName);

      team = this._addCreatedDates(team);
      const result = await collection.insertMany([team]);

      return this._wasSuccess(result) ? result.insertedIds[0].toString() : null;
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
  // Returns an array of the players added
  async addPlayersToRoster (teamId : string, playersToAdd : string[]) : Promise<string[]> {
    try {
      const playerService = new ScoutablePlayersDatabaseService();

      await this._databaseClient.connect();
      const collection = this._databaseClient.db(this._dbName).collection(this._collectionName);

      await playerService.setManyPlayerScoutableStatus(playersToAdd, false);

      const result = await collection.updateOne({ _id: new ObjectId(teamId) }, {$set: { playerIds: playersToAdd, updatedAt: new Date() } });

      if (result.modifiedCount > 0)
        return (playersToAdd);
    }
    catch (err) {
      this._logger.logError(`Error saving: ${JSON.stringify(err)}`);
      return null;
    }
    finally {
      this._databaseClient.close();
    }
  }

  async getTeamById (teamId : string) : Promise<Team> {
    try {
      await this._databaseClient.connect();
      const collection = this._databaseClient.db(this._dbName).collection(this._collectionName);

      const team = await collection.findOne<Team>({_id: new ObjectId(teamId) });

      return(team);
    }
    catch (err) {
      this._logger.logError(`Error getting team ${teamId}: ${JSON.stringify(err)}`);
      return null;
    }
    finally {
      this._databaseClient.close();
    }
  }
}