import React from 'react';

import CoveredCell from './CoveredCell';

import styles from './board.scss';


export default class CoveredBoard extends React.Component {

  render() {
    const { board, handleCellClick } = this.props;
    return (
      <table id={styles.coveredBoard}>
        <tbody>
          {board.map((row, rIdx) => (
            <tr key={rIdx}>
              {row.map(({covered}, cIdx) => (
                <CoveredCell
                  key={cIdx}
                  covered={covered}
                  rIdx={rIdx}
                  cIdx={cIdx}
                  handleCellClick={handleCellClick}
                />
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    )
  }

}