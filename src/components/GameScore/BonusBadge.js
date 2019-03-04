import React from 'react';

import styles from './gameScore.scss';


export default class BonusBadge extends React.PureComponent {

  render() {
    const { pointBonus, time } = this.props;
    const pointBadge = time ? `bonus${pointBonus}Badge` : `bonusBadge`;
    return (
      <div className={styles[pointBadge]}>{pointBonus}x</div>
    )
  }
}