import React from 'react';

import UncoveredCell from './UncoveredCell';

import styles from './board.scss';


export default class UncoveredBoard extends React.Component {

  render() {
    const { board } = this.props;
    return (
      <table id={styles.uncoveredBoard}>
        <tbody>
          {board.map((row, rIdx) => (
            <tr key={rIdx}>
              {row.map(({value}, cIdx) => (
                <UncoveredCell
                  key={cIdx}
                  value={value}
                />
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    )
  }

}