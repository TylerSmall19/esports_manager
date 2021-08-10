import React, { MouseEventHandler, PropsWithChildren } from 'react';
import { currencyFormatter, styleStatNumber } from '../../helpers/formatting/statFormattingHelper';
import { PlayerInfo, PlayerStat } from '../../types/playerInfo';
import { Team } from '../../types/team';
import styles from './playerInfoDisplay.module.css';

type PlayerProps = {
  player: PlayerInfo;
  activeTeam?: Team | null;
  recruitButtonClicked?: (player: PlayerInfo) => MouseEventHandler<HTMLElement>;
}

// We need children in here
type PlayersPropsWithChildren = PlayerProps & PropsWithChildren<PlayerProps>

export const PlayerInfoDisplay = ({player, activeTeam, recruitButtonClicked, children}: PlayersPropsWithChildren) => {
  return (
    <div className={styles.playerContainer}>
      <h3 className={styles.playerHeader}>{player.firstName} "{player.ign}" {player.lastName} [{player.region}] [OVR: {styleStatNumber(player.overall)}]</h3>

      <hr />

      {Object.keys(player.stats).map(key => {
        // @ts-ignore this throws a TS error because keys aren't valid accessors, but I know this works, so ... we ignore it.
        const stat : PlayerStat = player.stats[key];
        return (<span key={key} className={styles.playerStat}>
          {stat.displayName}: {styleStatNumber(stat.value, stat.isPositive)}
        </span>)
      })}

      <br />

      <span className={styles.playerSalary}>{currencyFormatter.format(player.salary)}</span>

      <br />
      <br />

      {children}
    </div>
  );
};

