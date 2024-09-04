const Gameboard = require('./gameboard');

class Player {
    constructor(type = 'Player', boardSize = 10, maxShips = 5) {
      this.type = type;
      this.gameBoard = new Gameboard(boardSize, maxShips); 
    }
  
    placeShipsRandomly() {
      let shipLengths = [5, 4, 3, 3, 2]; 
      for (let length of shipLengths) {
          let placed = false;
          while (!placed) {
              const x = Math.floor(Math.random() * this.gameBoard.size);
              const y = Math.floor(Math.random() * this.gameBoard.size);
              let direction;
              if (Math.random() < 0.5) {
                  direction = 'horizontal';
              } else {
                  direction = 'vertical';
              }
              try {
                  this.gameBoard.placeShip(length, x, y, direction);
                  placed = true;
              } catch (e) {
                  continue;
              }
          }
      }
  }

    randomAttack(opponent) {
      if (this.type === 'Player') {
        throw new Error('randomAttack is only available for computer players.');
      }
  
      let x, y;
      let attackSuccess;
  
      while(this.hasAlreadyAttacked(x, y, opponent)) {
        x = Math.floor(Math.random() * opponent.gameBoard.size);
        y = Math.floor(Math.random() * opponent.gameBoard.size);
      } 
  
      attackSuccess = opponent.gameBoard.receiveAttack(x, y);
      return attackSuccess;
    }
  
    hasAlreadyAttacked(x, y, opponent) {
      const allAttacks = [...opponent.gameBoard.missedShots];
  
      for (let i = 0; i < opponent.gameBoard.board.length; i++) {
        const shipCoordinates = opponent.gameBoard.board[i].coordinates;
        allAttacks.push(...shipCoordinates.filter(coord => coord.hit)); 
      }
  
      return allAttacks.some(coord => coord.x === x && coord.y === y);
    }
  }

module.exports = Player;