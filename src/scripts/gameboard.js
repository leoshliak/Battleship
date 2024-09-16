const Ship = require('./ship');

class Gameboard {
    constructor(size = 10, maxShips = 5) {
       this.size = size;
       this.maxShips = maxShips;
       this.board = [];      
       this.missedShots = [];
       this.shotOrder = [];
    }

    placeShip(shipLength, startX, startY, direction) {
      if (this.board.length >= this.maxShips) {
        throw new Error('Maximum number of ships reached.');
      }
  
      if (shipLength < 1 || shipLength > 5) {
        throw new Error('Invalid ship length. Ship length must be between 1 and 5.');
      }
  
      const coordinates = [];
  
      for (let i = 0; i < shipLength; i++) {
        let x = startX;
        let y = startY;
  
        if (direction === 'horizontal') {
          x += i;
        } else if (direction === 'vertical') {
          y += i;
        } else {
          throw new Error("Invalid direction: must be 'horizontal' or 'vertical'");
        }
  
        if (x >= this.size || y >= this.size || x < 0 || y < 0) {
          throw new Error('Ship placement is out of bounds');
        }
  
        coordinates.push({ x, y, hit: false });
      }
  
      for (let coord of coordinates) {
        if (this.isCoordinateOccupied(coord)) {
          throw new Error('Ship placement overlaps with another ship');
        }
      }
  
      const ship = new Ship(shipLength);
      this.board.push({ ship, coordinates });
    }
  
    
      isCoordinateOccupied(coordinate) {
        return this.board.some(({ coordinates }) =>
          coordinates.some(coord => coord.x === coordinate.x && coord.y === coordinate.y)
        );
      }

      receiveAttack(coordX, coordY) {
        for (let i = 0; i < this.board.length; i++) {
            for (let o = 0; o < this.board[i].coordinates.length; o++) {
                if (this.board[i].coordinates[o].x === coordX && this.board[i].coordinates[o].y === coordY) {
                    if (this.board[i].coordinates[o].hit) {
                        return false;
                    } else {
                      this.shotOrder.push({ x: coordX, y: coordY });
                        this.board[i].coordinates[o].hit = true;
                        this.board[i].ship.hit(); 
                        return true; 
                    }
                }
            }
        }
    
        // If the attack was a miss
        const alreadyMissed = this.missedShots.some(miss => miss.x === coordX && miss.y === coordY);
        if (!alreadyMissed) {
            this.shotOrder.push({ x: coordX, y: coordY });
            this.missedShots.push({ x: coordX, y: coordY });
        }
    
        return false; // Miss recorded
    }
    
      allShipsSunk() {
        return this.board.every(({ ship }) => ship.sunk);
      }
}

module.exports = Gameboard;