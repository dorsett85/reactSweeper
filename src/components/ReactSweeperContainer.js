import React from 'react';

import ReactSweeper from './ReactSweeper';


export default class MinesweeperContainer extends React.Component {
  constructor(props) {
    super(props);

    this.state = this.initializeState('e');

    // Bind methods
    this.handleGameReset = this.handleGameReset.bind(this);
    this.handleCellClick = this.handleCellClick.bind(this);
    this.resetGameWin = this.resetGameWin.bind(this);

  }

  initializeState(difficulty, init = true) {
    this.surroundingCells = [[-1, -1], [-1, 0], [-1, 1], [0, -1], [0, 1], [1, -1], [1, 0], [1, 1]];
    const { board, nonMineCellCount } = this.makeBoard(difficulty);

    // Set synchronous variables
    this.uncoveredCellCount = 0;
    this.nonMineCellCount = nonMineCellCount;
    this.bonusCells = 0;
    this.cascadeOn = false;
    this.checkForWin = true;

    // Set asynchronous variables
    const state = {
      difficulty: difficulty,
      score: 0,
      pointBonus: 1,
      time: null,
      bonusCountdown: 0,
      board: board,
      win: false,
      lose: false
    };

    if (init) { return state; }
    this.setState(state)

  }

  handleGameReset(difficulty) {
    this.cascadeOn = false;
    clearInterval(this.bonusInterval);
    this.initializeState(difficulty || this.state.difficulty, false);
  }

  makeBoard(difficulty) {

    // Set the board size and number of mines
    let rows, cols, mines;
    if (difficulty === 'e') {
      rows = cols = 9;
      mines = 10;
    } else if (difficulty === 'm') {
      rows = cols = 16;
      mines = 40;
    } else if (difficulty === 'h') {
      rows = 16;
      cols = 30;
      mines = 99;
    }

    // Keep the count of non-mine cells
    const nonMineCellCount = rows * cols - mines;

    // Add rows and cells to the board
    let board = [...Array(rows)].map(() => [...Array(cols)]
      .map(() => ({ covered: true, value: 0 }))
    );

    // Add mines
    while (mines) {
      const r = Math.floor(Math.random() * rows);
      const c = Math.floor(Math.random() * cols);
      if (board[r][c].value !== 'X') {
        board[r][c].value = 'X';
        mines--;
      }
    }

    // Add number of nearby mines to each cell
    const countNearbyMines = (r, c) => {
      if (board[r][c].value === 'X') { return board[r][c].value; }

      // Add up all nearby mines
      const isMine = (r, c) => (board[r] && board[r][c] || 0) && (board[r][c].value === 'X');
      return this.surroundingCells.reduce((a, v) => a + isMine(r + v[0], c + v[1]), 0).toString();
    };
    board.forEach((r, rIdx) => {
      r.forEach((c, cIdx) => {
        c.value = countNearbyMines(rIdx, cIdx);
      })
    });

    return { board, nonMineCellCount }
  }

  setGameWin() {
    this.checkForWin = false;
    const gameSeconds = (Date.now() - (this.state.time || Date.now())) / 1000;
    const minutes = Math.floor(gameSeconds / 60);
    const seconds = parseInt(gameSeconds - minutes * 60);

    // Set a brief timeout to avoid clicking the game win modal
    setTimeout(() => {
      this.setState({
        win: true,
        time: `${minutes}m ${seconds}s`
      }, () => { clearInterval(this.bonusInterval); });
    }, 500);
  }

  resetGameWin() {
    this.setState({
      win: false
    });
  }

  uncoverCell({ cell, r, c }, stopScore) {
    if (cell.covered) { cell.covered = false; }
    let bonus = this.state.pointBonus;
    let score = this.state.score;

    // Only count towards bonus and bonusCells for an uncovered non-empty/non-mine cell
    if (!stopScore) {
      score = score + bonus;
      this.bonusCells++;
      if (bonus + 1 === this.bonusCells && bonus !== 8) {
        bonus = bonus + 1;
        this.bonusCells = 0;
      }
    }
    const updateBoard = state => {
      return {
        board: state.board,
        score: score,
        pointBonus: bonus
      }
    };

    // Update the board and synchronous variables
    this.setState(updateBoard, () => {
      this.uncoveredCellCount++;
      if (this.checkForWin && this.uncoveredCellCount >= this.nonMineCellCount) { 
        this.uncoverCellCascade(r, c, 'all');
        this.setGameWin();
      }
    })

  }

  uncoverCellCascade(r, c, cascade) {
    const board = this.state.board;

    // Create function to uncover nearby cells and recursively run the function if it's a blank cell
    let timeout = 50;
    const uncoverNearbyCells = (curRow, curCol, cascade) => {
      if (!this.cascadeOn) { return; }

      this.surroundingCells.forEach(([r, c]) => {
        [r, c] = [curRow + r, curCol + c];

        // Check if the cell is on the board
        if (board[r] && board[r][c]) {
          const cell = board[r][c];

          // Set timeout for nice delayed uncovering cascade effect
          setTimeout(() => {

            if (cascade === 'all' && !cell.checked) {

              cell.checked = true;
              this.uncoverCell({ cell, r, c }, true);
              return uncoverNearbyCells(r, c, 'all');

            } else if (cell.value !== 'X' && cell.covered && cascade === 'onBlank') {

              this.uncoverCell({ cell, r, c }, cell.value === '0');
              if (cell.value === '0') { return uncoverNearbyCells(r, c, 'onBlank'); }

            }
          }, timeout === 10 ? timeout : timeout--);

        }

      })
    };
    uncoverNearbyCells(r, c, cascade);
  }

  setBonusCountdown() {

    // Reset the bonus countdown
    this.setState({
      bonusCountdown: 3
    }, () => {

      // Creat a bonus countdown interval to run every second
      this.bonusInterval = setInterval(() => {
        const bonus = this.state.pointBonus;
        const bonusCountdown = this.state.bonusCountdown;

        this.setState({
          bonusCountdown: bonusCountdown - 1
        }, () => {

          // When the bonus countdown reaches zero either reset it to 5 or hold at 0, otherwise subtract by 1
          if (this.state.bonusCountdown === 0) {
            this.bonusCells = 0;
            this.setState({
              pointBonus: bonus === 1 ? 1 : bonus - 1,
              bonusCountdown: bonus === 1 ? 0 : 3
            }, () => {
              if (bonus === 1) { clearInterval(this.bonusInterval); }
            })
          }

        })

      }, 1000);

    })
  }

  handleCellClick([r, c]) {
    // Set the game clock and clear the bonus countdown (reset below if it's not a mine)
    const time = this.state.time || Date.now();
    this.setState({ time });
    clearInterval(this.bonusInterval);
    this.cascadeOn = true;

    const cell = this.state.board[r][c];
    this.uncoverCell({ cell, r, c }, cell.value === 'X');

    // Check if the cell is a mine, otherwise reset bonus countdown and uncover nearby cells if it's blank  
    if (cell.value === 'X') {
      this.checkForWin = false;
      cell.clickedMine = true;

      // Need to set lose to true so the PureComponent "UncoveredBoard" will rerender with the clicked mine location 
      this.setState({
        lose: true
      }, () => { this.uncoverCellCascade(r, c, 'all'); })

    } else {
      this.setBonusCountdown();
      if (cell.value === '0') { this.uncoverCellCascade(r, c, 'onBlank'); }
    }

  }

  render() {
    return (
      <ReactSweeper
        difficulty={this.state.difficulty}
        board={this.state.board}
        handleGameReset={this.handleGameReset}
        handleCellClick={this.handleCellClick}
        score={this.state.score}
        pointBonus={this.state.pointBonus}
        bonusCountdown={this.state.bonusCountdown}
        handleGameWinModalClick={this.resetGameWin}
        win={this.state.win}
        lose={this.state.lose}
        time={this.state.time}
      />
    )
  }

}