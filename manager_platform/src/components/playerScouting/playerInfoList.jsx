import React, { useEffect, useState } from 'react';
import { GameApi } from '../../services/apiService/gameApi';
import { PlayerInfoDisplay } from './playerInfoDisplay.tsx';
import styles from './playerInfoList.module.css';

export const PlayerInfoList = () => {
  const [players, setPlayers] = useState([]);
  const [initialized, setInitialized] = useState(false);

  const setPlayersList = async () => {
    const list = await GameApi.getPlayerList();
    setPlayers(list);
    setInitialized(true);
  };

  useEffect(() => {
    if (!initialized)
      setPlayersList();
  });

  return (
    <div className={styles.container}>
      <h1>Players <button onClick={setPlayersList}>Refresh List</button></h1>
      {players.map((player, i) => {
        return (<PlayerInfoDisplay key={`${player.Name}_${i}`} player={player} />);
      })}
    </div>
  );
};