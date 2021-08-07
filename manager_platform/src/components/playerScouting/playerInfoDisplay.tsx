import React from 'react';
import { currencyFormatter, styleStatNumber } from '../../helpers/formatting/statFormattingHelper';
import { PlayerInfo } from '../../types/playerInfo';
import styles from './playerInfoDisplay.module.css';

type PlayerProps = {
  player: PlayerInfo;
}

export const PlayerInfoDisplay = ({player}: PlayerProps) => {
  return (
    <div className={styles.playerContainer}>
      <h3 className={styles.playerHeader}>{player.firstName} "{player.ign}" {player.lastName} [{player.region}] [OVR: {styleStatNumber(player.overall)}]</h3>
      
      <hr />

      <span className={styles.playerStat}>
        Nerves: {styleStatNumber(player.nerves, false)}
      </span>
      |
      <span className={styles.playerStat}>
        Ego: {styleStatNumber(player.ego, false)}
      </span>
      
      <br />

      <span className={styles.playerStat}>
        Proactivity: {styleStatNumber(player.proactive)}
      </span>

      <span className={styles.playerStat}>
        Mechanics: {styleStatNumber(player.mechanics)}
      </span>

      <span className={styles.playerStat}>
        Safety: {styleStatNumber(player.safety)}
      </span>

      <span className={styles.playerStat}>
        Awareness: {styleStatNumber(player.awareness)}
      </span>

      <span className={styles.playerStat}>
        Leadership: {styleStatNumber(player.leadership)}
      </span>

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

