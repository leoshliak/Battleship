const Ship = require('./ship');

class Gameboard {
    constructor(size = 10) {
       this.size = size;
       this.board = [];
    }

    placeShip(shipLength, startX, startY, direction) {
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
    
          coordinates.push({ x, y });
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
}

module.exports = Gameboard;