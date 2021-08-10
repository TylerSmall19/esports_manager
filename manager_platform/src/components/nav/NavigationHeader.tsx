import React from 'react';
import { Link } from 'react-router-dom';
import { appRoutes } from '../../constants';
import styles from './navigationHeader.module.css';

const NavigationHeader = (props : any) => {

  return (
    <div>
      <h2>eSports Manager Simulator 2023</h2>

      <Link to={appRoutes.teams.signUp} className={`${styles.navLink} `}>Sign Up</Link>&nbsp;
      <Link to={appRoutes.players.scouting} className={`${styles.navLink} `}>Scouting</Link>&nbsp;
      <Link to={appRoutes.teams.viewActiveTeam} className={`${styles.navLink} `}>View Active Team</Link>&nbsp;
    </div>
  );
};

export { NavigationHeader };