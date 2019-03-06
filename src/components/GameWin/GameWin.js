import React from 'react';

import styles from './gameWin.scss';


const EndGame = props => {
  const { score, time, win, handleGameWinModalClick } = props;
  
  return (
    <React.Fragment>
      {win && (
        <div id={styles.gameResultModal}>
          <div id={styles.resultDiv} onClick={handleGameWinModalClick}>
            <div className={styles.content}>
              <h1>You won!</h1>
              <hr/>
              <div id={styles.results}>
                <div className={styles.scoreDisplay}>
                  <h3>Score</h3>
                  <div className={styles.badge}>{score}</div>
                </div>
                <div className={styles.scoreDisplay}>
                  <h3>Time</h3>
                  <div className={styles.badge}>{time}</div>
                </div>
              </div>
              <h4>Click to Exit</h4>
            </div>
          </div>
        </div>
      )}
    </React.Fragment>
  )

};

export default EndGame;