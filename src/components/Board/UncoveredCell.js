import React from 'react';

import styles from './cells.scss';


export default class CoveredCell extends React.PureComponent {

  getCellBackground(value, clickedMine) {
    return (val => {
      switch (val) {
        case '0': return styles.uncoveredCell;
        case 'X': return clickedMine ? styles.spinningMineCell : styles.mineCell;
        default: return styles[`nearbyMineCell${val}`];
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