import React from 'react';

import GameHeader from './GameHeader/GameHeader';
import Board from './Board/Board';
import CoveredBoard from './Board/CoveredBoard';
import UncoveredBoard from './Board/UncoveredBoard';
import GameScore from './GameScore/GameScore';
import GameWin from './GameWin/GameWin';
import Credits from './Credits/Credits';

import styles from './reactSweeper.scss';


const Minesweeper = (props) => {
  const {
    difficulty, handleGameReset, handleCellClick, board, score, pointBonus, 
    time, bonusCountdown, win, lose, handleGameWinModalClick 
  } = props;

  return (
    <div className={styles.container}>
      <div>
        <GameHeader difficulty={difficulty} handleGameReset={handleGameReset} />
        <Board>
          <CoveredBoard board={board} handleCellClick={handleCellClick} />
          <UncoveredBoard board={board} lose={lose} />
        </Board>
        <GameScore
          score={score}
          pointBonus={pointBonus}
          bonusCountdown={bonusCountdown}
          time={time}
        />
        <hr />
        <Credits />
      </div>
      <GameWin
        score={score}
        time={time}
        win={win}
        handleGameWinModalClick={handleGameWinModalClick}
      />
    </div>
  );
};

export default Minesweeper;
