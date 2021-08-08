import React, { useEffect, useState } from 'react';
import { GameApi } from '../../services/apiService/gameApi';
import { PlayerInfo } from '../../types/playerInfo';
import { PlayerInfoDisplay } from './playerInfoDisplay';
import styles from './playerInfoList.module.css';

export const PlayerInfoList = () => {
  const initialPlayers :PlayerInfo[] | undefined = [];
  const [players, setPlayers] = useState(initialPlayers);

  const setPlayersList = async () => {
    const list = await GameApi.getPlayerList();
    if (list)
      setPlayers(list);
  };

  useEffect(() => {
    setPlayersList();
  }, []);

  return (
    <div className={styles.container}>
      <h1>Players <button onClick={setPlayersList}>Refresh List</button></h1>
      {players.map((player, i) => {
        return (<PlayerInfoDisplay key={`${player.id}_${i}`} player={player} />);
      })}
    </div>
  );
};