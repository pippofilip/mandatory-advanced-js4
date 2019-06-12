import React, { Component } from 'react';
import './App.css';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      board: [],
      p1: 1,
      p2: 2,
      gameIsOver: false,
      message: '',
      currentPlayer: null,
    };
    this.play = this.play.bind(this);
    this.startNewGame = this.startNewGame.bind(this);
    this.Player = this.Player.bind(this);
    this.Draw = this.Draw.bind(this);
    this.L = this.L.bind(this);
    this.V = this.V.bind(this);
    this.R = this.R.bind(this);
    this.H = this.H.bind(this);
  }
  startNewGame() {
    let board = [];
    for (let first = 0; first < 6; first++) {
      let row = [];
      for (let sec = 0; sec < 7; sec++) { 
        row.push(null) 
      }
      board.push(row);
    }
    this.setState({board, gameIsOver: false, currentPlayer: this.state.p1, message: ''});
  }
  Player() {
    return (this.state.currentPlayer === this.state.p1) ? this.state.p2 : this.state.p1;
  }
  play(sec) {
    if (!this.state.gameIsOver) {
      let board = this.state.board;
      for (let first = 5; first >= 0; first--) {
        if (!board[first][sec]) {
          board[first][sec] = this.state.currentPlayer;
          break;
        }
      }
      let result = this.Call(board);
      if (result === this.state.p1) {
        this.setState({board, gameIsOver: true, message: 'White Won!'});
      } else if (result === this.state.p2) {
        this.setState({board, gameIsOver: true, message: 'Black Won!'});
      } else if (result === 'draw') {
        this.setState({board, gameIsOver: true, message: 'Draw'});
      } else {
        this.setState({board, currentPlayer: this.Player()});
      }
    } else {
      this.setState({message: 'Start a new game, it is over!'});
    }
  }
  Draw(board) {
    for (let first = 0; first < 6; first++) {
      for (let sec = 0; sec < 7; sec++) {
        if (board[first][sec] === null) {
          return null;
        }
      }
    }
    return 'draw';
  }
  Call(board) {
    return this.L(board) || 
    this.H(board) || 
    this.Draw(board) || 
    this.V(board) || 
    this.R(board);
  }
  componentWillMount() {
    this.startNewGame();
  }
  L(board) {
    for (let first = 3; first < 6; first++) {
      for (let second = 3; second < 7; second++) {
        if (board[first][second]) {
          if (board[first][second] === board[first - 1][second - 1] &&
            board[first][second] === board[first - 2][second - 2] &&
            board[first][second] === board[first - 3][second - 3]) {
              return board[first][second];
          }
        }
      }
    }
  }
  V(board) {
    for (let first = 3; first < 6; first++) {
      for (let second = 0; second < 7; second++) {
        if (board[first][second]) {
          if (board[first][second] === board[first - 1][second] &&
            board[first][second] === board[first - 2][second] &&
            board[first][second] === board[first - 3][second]) {
              return board[first][second];
          }
        }
      }
    }
  }
  R(board) {
    for (let first = 3; first < 6; first++) {
      for (let second = 0; second < 4; second++) {
        if (board[first][second]) {
          if (board[first][second] === board[first - 1][second + 1] &&
              board[first][second] === board[first - 2][second + 2] &&
              board[first][second] === board[first - 3][second + 3]) {
                return board[first][second];
          }
        }
      }
    }
  }
  H(board) {
    for (let first = 0; first < 6; first++) {
      for (let second = 0; second < 4; second++) {
        if (board[first][second]) {
          if (board[first][second] === board[first][second + 1] &&
              board[first][second] === board[first][second + 2] &&
              board[first][second] === board[first][second + 3]) {
                return board[first][second];
          }
        }
      }
    }
  }
  render() {
    return (
      <>
        <button className="button" onClick={() => {this.startNewGame()}}>Play Again</button>
        <table>
          <thead>
          </thead>
          <tbody>
            {this.state.board.map((row) => {
              return (
                <tr>
                  {row.map((cell, idx) => {
                    let circles = 'empty';
                    if (cell === 1) {
                      circles = 'p1';
                    } else if (cell === 2) {
                      circles = 'p2';
                    } 
                    return (
                      <td>
                        <div className="square" onClick={() => {this.play(idx)}}>
                          <div className={circles}></div>
                        </div>
                      </td>
                    )
                  })}
                </tr>
                )
              })};
          </tbody>
        </table>
        <p className="message">{this.state.message}</p>
      </>
    );
  }
}  

export default App;