import { ObjectId } from "mongodb";

export class Org {
  _id: ObjectId;
  // _ownerId: string;

  name: string;
  tag: string;
  ownerName: string;

  playerIds?: string[] = [];
}