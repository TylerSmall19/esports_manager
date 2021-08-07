import React from 'react';
import { PlayerInfo } from '../../types/playerInfo';
import styles from './playerInfoDisplay.module.css';

type PlayerProps = {
  player: PlayerInfo;
}

export const PlayerInfoDisplay = ({player}: PlayerProps) => {
  return (
    <div className={styles.playerContainer}>
      <h3 className={styles.playerHeader}>{player.name} aka {player.ign}</h3>
    </div>
  );
};
