import React from 'react';

import styles from './gameheader.scss';

export default class GameHeader extends React.PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      showDifficultyMenu: false
    };

    // Bind methods
    this.toggleDifficultyMenu = this.toggleDifficultyMenu.bind(this);

  }

  toggleDifficultyMenu(e) {
    let show = !this.state.showDifficultyMenu;

    // An "onBlur" event will reset the game if one of the difficulty menu items was clicked
    if (e.type === 'blur') {
      const difficulty = e.relatedTarget && e.relatedTarget.value;
      if (['e', 'm', 'h'].includes(difficulty)) (this.props.handleGameReset(difficulty));
      show = false;
    }
    this.setState({
      showDifficultyMenu: show
    });

  }

  render() {
    const { difficulty, handleGameReset } = this.props;
    const difficultyTxt = difficulty === 'e' ? 'Easy' : difficulty === 'm' ? 'Medium' : 'Hard';
    return (
      <div id={styles.gameHeaderDiv}>
        <h1>ReactSweeper</h1>
        <h4>Modern Minesweeper</h4>
        <div id={styles.gameControlDiv}>
          <div>
            <button
              id={styles.difficultyBtn}
              onClick={this.toggleDifficultyMenu}
              onBlur={this.toggleDifficultyMenu}
            >
              {difficultyTxt} &nbsp;&nbsp; &#9660;
            </button>
            {this.state.showDifficultyMenu && (
              <div id={styles.difficultyMenuDiv}>
                <button value='e'>Easy</button>
                <button value='m'>Medium</button>
                <button value='h'>Hard</button>
              </div>
            )}
          </div>
          <button id={styles.newGameBtn} onClick={() => handleGameReset()}>Reset Game</button>
        </div>
      </div>
    )
  }

}