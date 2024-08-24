const Gameboard = require('../scripts/gameboard');


describe('Gameboard', () => {
    let gameboard;
  
    beforeEach(() => {
      gameboard = new Gameboard();
    });
  
    test('places a ship of valid length and direction', () => {
      gameboard.placeShip(2, 1, 0, 'vertical');
      const placedShip = gameboard.board[0];
      expect(placedShip.coordinates).toEqual([
        { x: 1, y: 0, hit: false },
        { x: 1, y: 1, hit: false }
      ]);
    });
  
    test('throws an error for invalid ship length', () => {
      expect(() => {
        gameboard.placeShip(6, 1, 0, 'horizontal');
      }).toThrow('Invalid ship length. Ship length must be between 1 and 5.');
    });
  
    test('throws an error for out of bounds ship placement', () => {
      expect(() => {
        gameboard.placeShip(3, 8, 8, 'horizontal');
      }).toThrow('Ship placement is out of bounds');
    });
  
    test('throws an error for overlapping ship placement', () => {
      gameboard.placeShip(2, 1, 0, 'vertical');
      expect(() => {
        gameboard.placeShip(3, 1, 0, 'horizontal');
      }).toThrow('Ship placement overlaps with another ship');
    });
  
    test('registers a hit on a ship', () => {
      gameboard.placeShip(2, 1, 0, 'vertical');
      const result = gameboard.receiveAttack(1, 0);
      expect(result).toBe(true);
      expect(gameboard.board[0].ship.damage).toBe(1);
    });
  
    test('does not register a hit on the same spot twice', () => {
      gameboard.placeShip(2, 1, 0, 'vertical');
      gameboard.receiveAttack(1, 0); 
      const result = gameboard.receiveAttack(1, 0); 
      expect(result).toBe(false);
      expect(gameboard.board[0].ship.damage).toBe(1); 
    });
  
    test('records a missed shot', () => {
      gameboard.placeShip(2, 1, 0, 'vertical');
      const result = gameboard.receiveAttack(2, 2);
      expect(result).toBe(false);
      expect(gameboard.missedShots).toContainEqual({ x: 2, y: 2 });
    });
  
    test('does not record a missed shot on the same spot twice', () => {
      gameboard.receiveAttack(2, 2);
      gameboard.receiveAttack(2, 2);
      expect(gameboard.missedShots.length).toBe(1);
    });
  
    test('reports all ships sunk correctly', () => {
      gameboard.placeShip(1, 0, 0, 'horizontal');
      gameboard.placeShip(2, 2, 2, 'horizontal');
  
      gameboard.receiveAttack(0, 0); 
      gameboard.receiveAttack(2, 2); 
      gameboard.receiveAttack(3, 2); 
  
      expect(gameboard.allShipsSunk()).toBe(true);
    });
  
    test('reports not all ships are sunk', () => {
      gameboard.placeShip(1, 0, 0, 'horizontal');
      gameboard.placeShip(2, 2, 2, 'horizontal');
  
      gameboard.receiveAttack(0, 0); 
      gameboard.receiveAttack(2, 2); 
  
      expect(gameboard.allShipsSunk()).toBe(false);
    });
  });