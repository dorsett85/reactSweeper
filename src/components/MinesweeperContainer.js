import React from 'react';

import Minesweeper from './Minesweeper';


export default class MinesweeperContainer extends React.Component {
  constructor(props) {
    super(props);

    const {board, nonMineCellCount} = this.makeBoard('e');

    this.state = {
      difficulty: 'e',
      nonMineCellCount: nonMineCellCount,
      uncoveredCellCount: 0,
      started: false,
      time: 0,
      board: board,
      result: null
    }

    // Bind functions
    this.handleSelectDifficulty = this.handleSelectDifficulty.bind(this);
    this.handleResetBoardClick = this.handleResetBoardClick.bind(this);
    this.handleCellClick = this.handleCellClick.bind(this);

  }

  resetBoard(difficulty) {
    const {board, nonMineCellCount} = this.makeBoard(difficulty);
    clearInterval(this.gameTimer)
    this.setState({
      difficulty: difficulty,
      nonMineCellCount: nonMineCellCount,
      uncoveredCellCount: 0,
      started: false,
      time: 0,
      board: board,
      result: null
    })
  }

  handleSelectDifficulty(e) {
    this.resetBoard(e.target.value)
  }

  handleResetBoardClick() {
    this.resetBoard(this.state.difficulty)
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
      .map(() => ({covered: true, value: 0}))
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
      const near = [[-1, -1], [-1, 0], [-1, 1], [0, -1], [0, 1], [1, -1], [1, 0], [1, 1]];
      const isMine = (r, c) => (board[r] && board[r][c] || 0) && (board[r][c].value === 'X');
      return near.reduce((a, v) => a + isMine(r + v[0], c + v[1]), 0).toString();
    };
    board.forEach((r, rIdx) => {
      r.forEach((c, cIdx) => {
        c.value = countNearbyMines(rIdx, cIdx);
      })
    });

    return {board, nonMineCellCount}
  }

  startGameTimer() {
    this.gameTimer = setInterval(() => {
      this.setState({
        time: this.state.time + 1
      })
    }, 1000)
  }

  setEndGame(result) {
    if (!this.state.result) {
      this.setState({
        result: result === 'win' ? 'You win!' : 'You lose!'
      })
    }
  }

  checkEndGame() {
    if (this.state.uncoveredCellCount >= this.state.nonMineCellCount) {
      this.uncoverAllCells('win');
      clearInterval(this.gameTimer);
    }
  }

  uncoverCell(cell) {
    cell.covered = false;
    const updateCell = state => {
      return {
        board: state.board,
        uncoveredCellCount: state.uncoveredCellCount + 1
      }
    }
    this.setState(updateCell, () => this.checkEndGame())
  }

  uncoverNearbyCells(r, c) {
    const board = this.state.board;

    // Create an array of surrounding cell positions
    const near = [[-1, -1], [-1, 0], [-1, 1], [0, -1], [0, 1], [1, -1], [1, 0], [1, 1]]

    // Create function to uncover nearby cells and recursively run the function if it's a blank cell
    const checkNearbyCells = (curRow, curCol) => {
      near.map(([r, c]) => [curRow + r, curCol + c]).forEach(([r, c]) => {
        if (board[r] && board[r][c] && board[r][c].value !== 'X' && board[r][c].covered) {
          const cell = board[r][c];
          this.uncoverCell(cell);
          if (cell.value === '0') { return checkNearbyCells(r, c); }
        }
      })
    }
    checkNearbyCells(r, c)
  }

  uncoverAllCells(result) { 
    this.state.board.forEach(row => {
      row.forEach(cell => {
        if (cell.covered) { this.uncoverCell(cell); }
      })
    })
    clearInterval(this.gameTimer);
    this.setEndGame(result);
  }

  handleCellClick([r, c]) {
    // Start the game click on first click
    if (!this.state.started) {
      this.startGameTimer();
      this.setState({
        started: true
      })
    }

    const cell = this.state.board[r][c];
    this.uncoverCell(cell)

    // Check if the cell is a mine, otherwise uncover nearby cells  
    if (cell.value === 'X') {
      this.uncoverAllCells('lose');
    } else if (cell.value === '0') {
      this.uncoverNearbyCells(r, c)
    }

  }

  render() {
    return (
      <Minesweeper
        difficulty={this.state.difficulty}
        time={this.state.time}
        board={this.state.board}
        handleSelectDifficulty={this.handleSelectDifficulty}
        handleResetBoardClick={this.handleResetBoardClick}
        handleCellClick={this.handleCellClick}
        result={this.state.result}
      />
    )
  }

}