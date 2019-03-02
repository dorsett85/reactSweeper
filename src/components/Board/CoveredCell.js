import React from 'react';

import styles from './cells.scss';


export default class CoveredCell extends React.PureComponent {

  render() {
    const { covered, rIdx, cIdx, handleCellClick } = this.props;
    return (
      <td onClick={() => handleCellClick([rIdx, cIdx])}>
        <div className={covered ? styles.coveredCell : styles.coveredCellRemoved} />
      </td>
    )
  }

}