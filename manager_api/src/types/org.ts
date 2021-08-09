import { ObjectId } from "mongodb";
import { PlayerInfo } from "./playerInfo";

export class Org {
  _id: ObjectId;
  _ownerId: string;

  name: string;
  tag: string;
  ownerName: string;

  players?: PlayerInfo[] = [];
}