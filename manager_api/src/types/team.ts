import { ObjectId } from "mongodb";

export class Team {
  _id: ObjectId;
  // _ownerId: string;

  name: string;
  tag: string;
  ownerName: string;

  playerIds?: string[] = [];
}