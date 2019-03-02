import React from 'react';

import GameHeader from './GameHeader/GameHeader';
import Board from './Board/Board';
import CoveredBoard from './Board/CoveredBoard';
import UncoveredBoard from './Board/UncoveredBoard';
import Credits from './Credits/Credits';

import styles from './reactSweeper.scss';


const Minesweeper = props => {

  return (
    <div className={styles.container}>
      <div>
        <GameHeader
          difficulty={props.difficulty}
          handleGameReset={props.handleGameReset}
        />
        <Board>
          <CoveredBoard board={props.board} handleCellClick={props.handleCellClick} />
          <UncoveredBoard board={props.board} />
        </Board>
        {!props.result && (
          <div id={styles.scoreDiv}>
            <span>Score: {props.score}</span>
            <span>Multiplier: {props.scoreMultiplier}x</span>
          </div>
        )}
        {props.result && (
          <div id={styles.resultDiv}>
            <span>{props.result} Score: {props.score}</span>
          </div>
        )}
        <hr />
        <Credits />
      </div>
    </div>
  )

}

export default Minesweeper;