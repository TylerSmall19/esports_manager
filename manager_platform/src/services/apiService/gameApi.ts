import { PlayerInfo } from "../../types/playerInfo";
import axios from 'axios';
import { Team } from "../../types/team";
import { MAX_PLAYERS } from "../../constants";
import { NewTeamFormValues } from "../../components/teamCreation/types/newTeamFormValues";

const baseUrl = 'http://localhost:8080';

const apiRoutes = {
  getPlayers: () => `${baseUrl}/players/scoutingList`,
  getTeamById: (id: string) => `${baseUrl}/teams/${id}`,
  addPlayersToTeam: (teamId: string) => `${baseUrl}/teams/${teamId}/players`,
  addNewTeam: () => `${baseUrl}/teams`,
  getTeamPlayersById: (teamId: string) => `${baseUrl}/teams/${teamId}/players`
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
    }
  }

  static async addNewTeam(newTeamForm: NewTeamFormValues) : Promise<string | undefined> {
    try {
      const res = await axios.post<{ teamId: string; }>(apiRoutes.addNewTeam(), { ...newTeamForm });
      // Returns true if it's in success range (2XX)
      if  (res.status >= 200 && res.status < 300)
        return res.data.teamId

      return;
    }
    catch (ex) {
      console.error('An unexpected  error has occured: ', ex);
    }
  }

  static async addPlayersToTeam(teamId: string, players: string[]) : Promise<string[] | undefined> {
    try {
      const res = await axios.post<{playerIds: string[]}>(apiRoutes.addPlayersToTeam(teamId), { players });
      // Returns true if it's in success range (2XX)
      if (res.status >= 200 && res.status < 300)
        return res.data.playerIds
    }
    catch (ex) {
      console.error('An unexpected  error has occured: ', ex);
    }
  }

  static async getPlayersByTeamId(teamId: string) : Promise<PlayerInfo[] | undefined> {
    try {
      const res = await axios.get<PlayerInfo[]>(apiRoutes.getTeamPlayersById(teamId));
      return res.data;
    }
    catch (ex) {
      console.error('An unexpected  error has occured: ', ex);
    }
  }

  static teamIsAtMaxPlayers(team : Team) : boolean {
    if (team && team.playerIds)
      return team.playerIds.length >= MAX_PLAYERS;

    return false
  }
}