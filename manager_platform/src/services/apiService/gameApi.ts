import { PlayerInfo } from "../../types/playerInfo";
import axios from 'axios';
import { Team } from "../../types/team";

const baseUrl = 'http://localhost:8080';

const apiRoutes = {
  getPlayers: () => `${baseUrl}/players/scoutingList`,
  getTeamById: (id: string) => `${baseUrl}/teams/${id}`
}

export class GameApi {
  static authToken: string = '';

  // Returns the player by ID (if found) or Null if not found
  static async getPlayerStats(playerId: string) : Promise<PlayerInfo | undefined> {
    // return mockPlayers.find(p => p.id === playerId);
    return;
  }

  static async getPlayerList() : Promise<PlayerInfo[] | undefined> {
    try {
      const res = await axios.get<PlayerInfo[]>(apiRoutes.getPlayers());
      return res.data;
    }
    catch (ex) {
      console.error('An unexpected  error has occured: ', ex);
    }
  }

  static async getTeamById(teamId: string) : Promise<Team | undefined> {
    try {
      const res = await axios.get<Team>(apiRoutes.getTeamById(teamId));
      return res.data;
    }
    catch (ex) {
      console.error('An unexpected  error has occured: ', ex);
      return;
    }
  }
}