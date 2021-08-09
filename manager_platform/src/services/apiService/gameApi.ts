import { PlayerInfo } from "../../types/playerInfo";
import axios from 'axios';

const baseUrl = 'http://localhost:8080';

export class GameApi {
  static authToken: string = '';

  // Returns the player by ID (if found) or Null if not found
  static async getPlayerStats(playerId: string) : Promise<PlayerInfo | undefined> {
    // return mockPlayers.find(p => p.id === playerId);
    return;
  }

  static async getPlayerList() : Promise<PlayerInfo[] | undefined> {
    try {
      const res = await axios.get<PlayerInfo[]>(`${baseUrl}/players/scoutingList`);
      return res.data;
    }
    catch (ex) {
      console.error('An unexpected  error has occured: ', ex);
    }
  }
}