import { BaseDbService } from "./baseDbService";
import { Org } from "../../types/org";

export class OrgDatabaseService extends BaseDbService{

  constructor () {
    super()

    this.dbName = 'UserControlled';
    this.collectionName = 'orgs';
  }

  async saveNewOrg (org: Org) : Promise<boolean> {
    try {
      await this.databaseClient.connect();
      const collection = this.databaseClient.db(this.dbName).collection(this.collectionName);

      org = this._addCreatedDates(org);
      const result = await collection.insertMany([org]);

      return(this._wasSuccess(result));
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