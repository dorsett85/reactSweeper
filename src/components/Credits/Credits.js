import React from 'react';

import githubImg from '../../assets/img/GitHub-Mark-32px.png';
import styles from './credits.scss';

const Credits = () => (
  <div id={styles.creditsDiv}>
    <span id={styles.cpdCredit}>
      &#x1F5A4;&nbsp;
      <a href='https://cphillipsdorsett.com' target='_blank' rel='noopener noreferrer'>
        Clayton Phillips-Dorsett
      </a>
    </span>
    <a href='https://github.com/dorsett85/reactSweeper' target='_blank' rel='noopener noreferrer'>
      <img src={githubImg} alt='Github Image' />
    </a>
  </div>
);

export default Credits;