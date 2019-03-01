import React from 'react';

import githubImg from '../assets/img/GitHub-Mark-32px.png';
import styles from './minesweeper.scss';


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
            <td key={cIdx}>
              <div 
                className={cell.covered ? styles.coveredCell : styles.coveredCellRemoved}
                onClick={() => props.handleCellClick([rIdx, cIdx])}
              />
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
                {cell.value === '0' ? ' ' : cell.value}
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
        <div id={styles.gameHeaderDiv}>
          <h1>ReactSweeper</h1>
          <div>
            <select value={props.difficulty} onChange={props.handleSelectDifficulty}>
              <option value='e'>Easy</option>
              <option value='m'>Medium</option>
              <option value='h'>Hard</option>
            </select>
            <button onClick={props.handleResetBoardClick}>Reset Game</button>
            <span>{props.time}</span>
          </div>
        </div>
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
            <span>{props.result}</span>
          </div>
        )}
        <hr/>
        <div id={styles.creditsDiv}>
          <a href='https://github.com/dorsett85/reactSweeper' target='_blank' rel='noopener noreferrer'>
            <img src={githubImg} alt='Github Image' />
          </a>
          <span>By Clayton Phillips-Dorsett</span>
        </div>
      </div>
    </div>
  )

}

export default Minesweeper;