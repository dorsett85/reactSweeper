import React from 'react';

import BonusBadge from './BonusBadge';
import styles from './gameScore.scss';


export default class GameScore extends React.PureComponent {

  render() {
    const { score, pointBonus, bonusCountdown, time } = this.props;

    return (
      <div id={styles.gameScoreDiv}>
        <div id={styles.scoreDisplay}>
          <span>Score:</span>
          <div id={styles.scoreBadge}>{score}</div>
        </div>
        <div id={styles.bonusDisplay}>
          <div id={styles.bonusDiv}>
            <span>Bonus:</span>
            <BonusBadge pointBonus={pointBonus} time={time} />
            <span>{bonusCountdown}s</span>
          </div>
        </div>
      </div>
    )

  }
}