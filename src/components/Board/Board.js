import React from 'react';

import styles from './board.scss';


const Board = props => (
  <div id={styles.boardDiv}>
    {props.children}
  </div>
)

export default Board;