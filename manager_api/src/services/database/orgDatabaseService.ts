import { BaseDbService } from "./baseDbService";

export class OrgDatabaseService extends BaseDbService{

  constructor () {
    super()

    this.collectionName = 'UserControlled';
    this.dbName = 'orgs';
  }

}