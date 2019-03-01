import React from 'react';

import Minesweeper from './Minesweeper';


export default class MinesweeperContainer extends React.Component {
  constructor(props) {
    super(props);

    this.state = this.initializeState('e');

    // Bind methods
    this.handleGameReset = this.handleGameReset.bind(this);
    this.handleCellClick = this.handleCellClick.bind(this);

  }

  initializeState(difficulty, init = true) {
    const { board, nonMineCellCount } = this.makeBoard(difficulty);
    const state = {
      difficulty: difficulty,
      score: 0,
      scoreMultiplier: 1,
      board: board,
      result: null
    }

    // Set synchronous variables
    this.uncoveredCellCount = 0;
    this.nonMineCellCount = nonMineCellCount;
    this.bonusCells = 0;
    this.activateMultiplier = false;

    if (init) { return state; }
    this.setState(state)

  }

  handleGameReset(e) {
    this.initializeState(e ? e.target.value : this.state.difficulty, false)
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

  setEndGame(result) {
    if (!this.state.result) {
      this.setState({
        result: result === 'win' ? 'You win!' : 'You lose!'
      })
    }
  }

  checkEndGame() {
    if (this.uncoveredCellCount >= this.nonMineCellCount) {
      this.uncoverAllCells('win');
    }
  }

  uncoverCell(cell, stopScore) {
    cell.covered = false;
    const bonus = this.activateMultiplier ? this.bonusCells + 1 : this.bonusCells;
    const multiplier = bonus === 1 ? 1 : bonus / 2;
    const updateCell = state => {
      return {
        board: state.board,
        score: stopScore ? state.score : Math.floor(state.score + (1 * state.scoreMultiplier)),
        scoreMultiplier: multiplier
      }
    };

    // Update the cell and update the synchronous variables
    this.setState(updateCell, () => {
      this.uncoveredCellCount++;
      this.bonusCells = bonus;
      this.checkEndGame();
    })

  }

  uncoverNearbyCells(r, c) {
    const board = this.state.board;

    // Create an array of surrounding cell positions
    const near = [[-1, -1], [-1, 0], [-1, 1], [0, -1], [0, 1], [1, -1], [1, 0], [1, 1]];

    // Create function to uncover nearby cells and recursively run the function if it's a blank cell
    let timeout = 50;
    const checkNearbyCells = (curRow, curCol) => {
      near.forEach(([r, c]) => {
        [r, c] = [curRow + r, curCol + c];

        // Set timeout for nice delayed uncovering cascade effect
        setTimeout(() => {
          if (board[r] && board[r][c] && board[r][c].value !== 'X' && board[r][c].covered) {
            const cell = board[r][c];
            this.uncoverCell(cell);
            if (cell.value === '0') { return checkNearbyCells(r, c); }
          }
        }, timeout === 10 ? timeout : timeout--)
      })
    };
    checkNearbyCells(r, c);
  }

  uncoverAllCells(result) { 
    this.state.board.forEach(row => {
      row.forEach(cell => {
        if (cell.covered) { this.uncoverCell(cell, true); }
      })
    })
    this.setEndGame(result);
  }

  setMultiplier() {
    this.activateMultiplier = true;
    clearTimeout(this.multiplierTimeout);
    this.multiplierTimeout = setTimeout(() => {
      this.setState({
        scoreMultiplier: 1
      }, () => {
        this.activateMultiplier = false;
        this.bonusCells = 0;
      })
    }, 5000)
  }

  handleCellClick([r, c]) {
    this.setMultiplier();

    const cell = this.state.board[r][c];
    this.uncoverCell(cell)

    // Check if the cell is a mine, otherwise uncover nearby cells  
    if (cell.value === 'X') {
      this.uncoverAllCells('lose', true);
    } else if (cell.value === '0') {
      this.uncoverNearbyCells(r, c)
    }

  }

  render() {
    return (
      <Minesweeper
        difficulty={this.state.difficulty}
        board={this.state.board}
        handleGameReset={this.handleGameReset}
        handleCellClick={this.handleCellClick}
        score={this.state.score}
        scoreMultiplier={this.state.scoreMultiplier}
        result={this.state.result}
      />
    )
  }

}