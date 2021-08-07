import React from 'react';
import { PlayerInfoDisplay } from './playerInfoDisplay.tsx';

export const PlayerInfoList = ({players = []}) => {
  return (
    <ul>
      {players.map((player, i) => {
        return (<PlayerInfoDisplay key={`${player.Name}_${i}`} player={player} />)
      })}
    </ul>
  );
};