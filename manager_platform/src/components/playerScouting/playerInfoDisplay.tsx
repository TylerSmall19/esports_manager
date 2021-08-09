import React from 'react';
import { currencyFormatter, styleStatNumber } from '../../helpers/formatting/statFormattingHelper';
import { PlayerInfo, PlayerStat } from '../../types/playerInfo';
import styles from './playerInfoDisplay.module.css';

type PlayerProps = {
  player: PlayerInfo;
}

export const PlayerInfoDisplay = ({player}: PlayerProps) => {
  return (
    <div className={styles.playerContainer}>
      <h3 className={styles.playerHeader}>{player.firstName} "{player.ign}" {player.lastName} [{player.region}] [OVR: {styleStatNumber(player.overall)}]</h3>
      
      <hr />

      {Object.keys(player.stats).map(key => {
        // @ts-ignore
        const stat : PlayerStat = player.stats[key];
        return (<span key={key} className={styles.playerStat}>
          {stat.displayName}: {styleStatNumber(stat.value, stat.isPositive)}
        </span>)
      })}

      <br />

      {/* TODO: Work on player traits */}
      {/* <span>
        {
          player.traits && player.traits.length > 0 && 
          player.traits.map(t => )
        }
      </span> */}

      <span className={styles.playerSalary}>{currencyFormatter.format(player.salary)}</span>
    </div>
  );
};

