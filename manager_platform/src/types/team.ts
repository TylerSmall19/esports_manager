export class Team {
  _id: string;

  name: string;
  tag: string;
  ownerName: string;

  playerIds?: string[];

  constructor() {
    this.name = '';
    this._id = '';
    this.tag = '';
    this.ownerName = '';
    this.playerIds = [];
  }
}