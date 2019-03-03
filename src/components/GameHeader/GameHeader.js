import React from 'react';

import styles from './gameheader.scss';

export default class GameHeader extends React.PureComponent {

  render() {
    const { difficulty, handleGameReset } = this.props;
    return (
      <React.Fragment>
        <div id={styles.gameHeaderDiv}>
          <h1>ReactSweeper</h1>
          <h4>Modern Minesweeper</h4>
          <div>
            <select value={difficulty} onChange={handleGameReset}>
              <option value='e'>Easy</option>
              <option value='m'>Medium</option>
              <option value='h'>Hard</option>
            </select>
            <button onClick={() => handleGameReset()}>Reset Game</button>
          </div>
        </div>
      </React.Fragment>
    )
  }

}