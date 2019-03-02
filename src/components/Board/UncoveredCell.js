import React from 'react';

import mineImg from '../../assets/img/mine.png';
import styles from './cells.scss';

// Static variables
const mine = <img src={mineImg} id={styles.mineImg} alt='mineImg' />;


export default class CoveredCell extends React.PureComponent {

  render() {
    const { value } = this.props;
    return (
      <td>
        <div className={styles.uncoveredCell}>
          {value === '0' ? ' ' : value === 'X' ? mine : value}
        </div>
      </td>
    )
  }

}