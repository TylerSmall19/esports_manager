import React, { MouseEventHandler } from 'react';
import { currencyFormatter, styleStatNumber } from '../../helpers/formatting/statFormattingHelper';
import { GameApi } from '../../services/apiService/gameApi';
import { PlayerInfo, PlayerStat } from '../../types/playerInfo';
import { Team } from '../../types/team';
import styles from './playerInfoDisplay.module.css';

type PlayerProps = {
  player: PlayerInfo;
  activeTeam: Team | null;
  recruitButtonClicked: (player: PlayerInfo) => MouseEventHandler<HTMLElement>;
}

export const PlayerInfoDisplay = ({player, activeTeam, recruitButtonClicked}: PlayerProps) => {
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

      <span className={styles.playerSalary}>{currencyFormatter.format(player.salary)}</span>

      <br />
      <br />

      {/* Add some checks to make sure the players can't recruit past 5 members client side */}
      {
        activeTeam
          && <button disabled={ GameApi.teamIsAtMaxPlayers(activeTeam) } onClick={recruitButtonClicked(player)}>Recruit Player to {activeTeam?.name}</button>
      }
    </div>
  );
};

