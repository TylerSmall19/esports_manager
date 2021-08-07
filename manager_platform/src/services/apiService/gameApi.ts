import { PlayerInfo, Region } from "../../types/playerInfo";

const mockPlayers : PlayerInfo[] = [
  {
    id: '1',
    firstName: 'Ronald',
    lastName: 'Weasel',
    agression: 35,
    awareness: 45,
    ego: 20,
    ign: 'Ron Styles On U',
    leadership: 15,
    mechanics: 60,
    nerves: 65,
    overall: 54,
    region: Region.EU,
    safety: 80
  },
  {
    id: '2',
    firstName: 'Hary',
    lastName: 'Potterswheel',
    agression: 65,
    awareness: 60,
    ego: 55,
    ign: 'Har Har Har',
    leadership: 85,
    mechanics: 80,
    nerves: 22,
    overall: 85,
    region: Region.EU,
    safety: 65
  },
];

export class GameApi {
  static authToken: string = '';

  // Returns the player by ID (if found) or Null if not found
  static async getPlayerStats(playerId: string) : Promise<PlayerInfo | undefined> {
    return mockPlayers.find(p => p.id === playerId);
  }

  static async getPlayerList() : Promise<PlayerInfo[]> {
    console.log(this.authToken);
    return mockPlayers;
  }
}