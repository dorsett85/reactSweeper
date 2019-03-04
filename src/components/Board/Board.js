import React from 'react';

import styles from './board.scss';


export default class Board extends React.PureComponent {

  render() {
    return (
      <div id={styles.boardDiv}>
        {this.props.children}
      </div>
    )
  }

}