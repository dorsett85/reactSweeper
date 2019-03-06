import React from 'react';

import styles from './cells.scss';


export default class CoveredCell extends React.PureComponent {

  getCellBackground(value, clickedMine) {
    return (val => {
      switch (val) {
        case '0': return styles.uncoveredCell;
        case '1': return styles.oneNearbyMineCell;
        case '2': return styles.twoNearbyMineCell;
        case '3': return styles.threeNearbyMineCell;
        case '4': return styles.fourNearbyMineCell;
        case '5': return styles.fiveNearbyMineCell;
        case '6': return styles.sixNearbyMineCell;
        case '7': return styles.sevenNearbyMineCell;
        case '8': return styles.eightNearbyMineCell;
        case 'X': return clickedMine ? styles.spinningMineCell : styles.mineCell;
      }
    })(value)
  }

  render() {
    const { value, clickedMine } = this.props;
    return (
      <div className={this.getCellBackground(value, clickedMine)}>
        <div>
          {['0', 'X'].includes(value) ? ' ' : value}
        </div>
      </div>
    )
  }

}