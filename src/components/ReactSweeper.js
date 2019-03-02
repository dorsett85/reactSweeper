import React from 'react';

import GameHeader from './GameHeader/GameHeader';

import mineImg from '../assets/img/mine.png';
import githubImg from '../assets/img/GitHub-Mark-32px.png';
import styles from './reactSweeper.scss';

// Static variables
const mine = <img src={mineImg} id={styles.mineImg} alt='mineImg'/>;


const Minesweeper = props => {
  const { board } = props;

  // Create base board
  const BaseBoard = props => (
    <table id={props.id}>
      <tbody>
        {props.children}
      </tbody>
    </table>
  );

  // Create covered and uncovered boards
  const CoveredBoard = () => (
    <BaseBoard id={styles.coveredBoard}>
      {board.map((row, rIdx) => (
        <tr key={rIdx}>
          {row.map((cell, cIdx) => (
            <td key={cIdx} onClick={() => props.handleCellClick([rIdx, cIdx])}>
              <div className={cell.covered ? styles.coveredCell : styles.coveredCellRemoved}/>
            </td>
          ))}
        </tr>
      ))}
    </BaseBoard>
  );

  const UncoveredBoard = () => (
    <BaseBoard id={styles.uncoveredBoard}>
      {board.map((row, rIdx) => (
        <tr key={rIdx}>
          {row.map((cell, cIdx) => (
            <td key={cIdx}>
              <div className={styles.uncoveredCell}>
                {cell.value === '0' ? ' ' : cell.value === 'X' ? mine : cell.value}
              </div>
            </td>
          ))}
        </tr>
      ))}
    </BaseBoard>
  );

  return (
    <div className={styles.container}>
      <div>
        <GameHeader
          difficulty={props.difficulty}
          handleGameReset={props.handleGameReset}
        />
        <div id={styles.boardDiv}>
          <CoveredBoard />
          <UncoveredBoard />
        </div>
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
        <hr/>
        <div id={styles.creditsDiv}>
          <span id={styles.cpdCredit}>
            &#x1F5A4;&nbsp; 
            <a href='https://cphillipsdorsett.com' target='_blank' rel='noopener noreferrer'>
               Clayton Phillips-Dorsett
            </a>
          </span>
          <a href='https://github.com/dorsett85/reactSweeper' target='_blank' rel='noopener noreferrer'>
            <img src={githubImg} alt='Github Image' />
          </a>
        </div>
      </div>
    </div>
  )

}

export default Minesweeper;