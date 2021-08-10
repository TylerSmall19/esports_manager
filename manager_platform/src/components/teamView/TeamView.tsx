import React, { useEffect, useState } from 'react';
import { GameApi } from '../../services/apiService/gameApi';
import { SessionService } from '../../services/session/sessionService';
import { PlayerInfo } from '../../types/playerInfo';
import { PlayerInfoDisplay } from '../playerScouting/playerInfoDisplay';
import styles from './teamView.module.css';

export const TeamView = () => {
  const [players, setPlayers] = useState([] as PlayerInfo[]);

  const getPlayers = async () => {
    const teamId = SessionService.getTeamId();
    if (teamId) {
      const teamPlayers = await GameApi.getPlayersByTeamId(teamId);
      if (teamPlayers)
        setPlayers(teamPlayers);
    }
  }

  useEffect(() => {
    getPlayers();
  }, []);

  return (
    <div className={`${styles.container}`}>
      <div className={styles.playersContainer}>
        {players.map(pl => 
          <PlayerInfoDisplay player={pl} key={pl._id}>
            <button></button>
          </PlayerInfoDisplay>)}
      </div>
    </div>
  );
}