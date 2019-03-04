import React from 'react';

import UncoveredCell from './UncoveredCell';

import styles from './board.scss';


export default class UncoveredBoard extends React.PureComponent {

  render() {
    const { board } = this.props;
    return (
      <div id={styles.uncoveredBoard}>
        {board.map((row, rIdx) => (
          <div key={rIdx} className={styles.boardRow}>
            {row.map(({ value, clicked }, cIdx) => (
              <UncoveredCell
                key={cIdx}
                value={value}
                clicked={clicked}
              />
            ))}
          </div>
        ))}
      </div>
    )
  }

}