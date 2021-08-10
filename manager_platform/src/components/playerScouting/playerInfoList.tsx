import React, { MouseEvent, MouseEventHandler, useEffect, useState } from 'react';
import { GameApi } from '../../services/apiService/gameApi';
import { SessionService } from '../../services/session/sessionService';
import { PlayerInfo } from '../../types/playerInfo';
import { Team } from '../../types/team';
import { PlayerInfoDisplay } from './playerInfoDisplay';
import styles from './playerInfoList.module.css';

type ActiveTeam = Team | null;

const initialPlayers :PlayerInfo[] | undefined = [];

export const PlayerInfoList = () => {
  const [players, setPlayers] = useState(initialPlayers);
  const [activeTeam, setActiveTeam] = useState(null as ActiveTeam | null);

  const setPlayersList = async () => {
    const list = await GameApi.getPlayerList();
    if (list)
      setPlayers(list);
  };

  const setUsersTeam = async () => {
    const teamId = SessionService.getTeamId();
    if (teamId) {
      const team = await GameApi.getTeamById(teamId);
      if (team)
        setActiveTeam(team);
    }
  };

  const handleRecruitButtonClick = (player: PlayerInfo) : MouseEventHandler<HTMLElement> => async (e : MouseEvent<HTMLElement>) => {
    if (activeTeam) {
      // This will return either a string array or undefined
      const newPlayerIds = await GameApi.addPlayersToTeam(activeTeam._id, [...(activeTeam.playerIds || []), player._id]);
      if (newPlayerIds && newPlayerIds.length > 0) {
        // Remove the player that was just scouted
        setPlayers(players.filter(pl => pl._id !== player._id));
        setActiveTeam({...activeTeam, playerIds: newPlayerIds});
      }
    }
  }

  useEffect(() => {
    setPlayersList();
    setUsersTeam();
  }, []);

  return (
    <div className={styles.container}>
      <h1>Players <button onClick={setPlayersList}>Refresh List</button></h1>
      {players && players.map((player, i) => {
        return (
          <PlayerInfoDisplay 
            key={`${player._id}_${i}`}
            player={player}
            activeTeam={activeTeam}
            recruitButtonClicked={handleRecruitButtonClick}
          />
        );
      })}
    </div>
  );
};