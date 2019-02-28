import React from 'react';

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
                className={cell.covered ? styles.coveredCell : styles.removedCellCover}
                onClick={() => props.handleCellClick([rIdx, cIdx])}
              />
            </td>
          ))}
        </tr>
      ))}
    </BaseBoard>
  );

  const UncoveredBoard = () => (
    <BaseBoard>
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
          <select value={props.difficulty} onChange={props.handleSelectDifficulty}>
            <option value='e'>Easy</option>
            <option value='m'>Medium</option>
            <option value='h'>Hard</option>
          </select>
          <button onClick={props.handleResetBoardClick}>Reset Game</button>
          <span>{props.time}</span>
        </div>
        <CoveredBoard/>
        <UncoveredBoard/>
        <div id={styles.resultDiv}>
          <span>{props.result}</span>
        </div>
      </div>
    </div>
  )

}

export default Minesweeper;