import React from 'react';

import styles from './gameHeader.scss';

export default class GameHeader extends React.PureComponent {

  render() {
    return (
      <React.Fragment>
        <div id={styles.gameHeaderDiv}>
          <h1>ReactSweeper</h1>
          <h4>Modern Minesweeper</h4>
          <div>
            <select value={this.props.difficulty} onChange={this.props.handleGameReset}>
              <option value='e'>Easy</option>
              <option value='m'>Medium</option>
              <option value='h'>Hard</option>
            </select>
            <button onClick={() => this.props.handleGameReset()}>Reset Game</button>
          </div>
        </div>
      </React.Fragment>
    )
  }

}