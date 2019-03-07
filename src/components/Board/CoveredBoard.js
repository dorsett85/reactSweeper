import React from 'react';

import CoveredCell from './CoveredCell';

import styles from './board.scss';


export default class CoveredBoard extends React.Component {

  render() {
    const { board, handleCellClick } = this.props;
    return (
      <div id={styles.coveredBoard}>
        {board.map((row, rIdx) => (
          <div key={rIdx} className={styles.boardRow}>
            {row.map(({ covered }, cIdx) => (
              <CoveredCell
                key={cIdx}
                covered={covered}
                rIdx={rIdx}
                cIdx={cIdx}
                handleCellClick={handleCellClick}
              />
            ))}
          </div>
        ))}
      </div>
    )
  }

}