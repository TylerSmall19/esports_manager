import React, { useEffect, useState } from 'react';
import { GameApi } from '../../services/apiService/gameApi';
import { PlayerInfoDisplay } from './playerInfoDisplay.tsx';

export const PlayerInfoList = () => {
  const [players, setPlayers] = useState([]);
  const [initialized, setInitialized] = useState(false);

  const setPlayersList = async () => {
    GameApi.authToken = 'Foo';
    const list = await GameApi.getPlayerList();
    setPlayers(list);
    setInitialized(true);
  };

  useEffect(() => {
    if (!initialized)
      setPlayersList();
  });

  return (
    <ul>
      {players.map((player, i) => {
        return (<PlayerInfoDisplay key={`${player.Name}_${i}`} player={player} />)
      })}
    </ul>
  );
};