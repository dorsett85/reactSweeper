import React from 'react';

import styles from './cells.scss';


export default class CoveredCell extends React.PureComponent {

  getRemoveCoverClass(dir) {
    // 
    return this.props.covered ? styles.coveredCell : styles.coveredCellRemoved;
  }

  render() {
    const { covered, dir, rIdx, cIdx, handleCellClick } = this.props;
    return (
      <div
        className={this.getRemoveCoverClass(dir)}
        onClick={() => handleCellClick([rIdx, cIdx])}
      >
        <div>
          <div />
        </div>
      </div>
    )
  }

}