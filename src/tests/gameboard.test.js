const Gameboard = require('../scripts/gameboard');


describe('Gameboard class', () => {
    let  gameboard = new Gameboard();

    test('places a ship of valid length and direction', () => {
        gameboard.placeShip(2, 1, 0, 'vertical');
        const placedShip = gameboard.board[0];
        expect(placedShip.coordinates).toEqual([
          { x: 1, y: 0 },
          { x: 1, y: 1 }
        ]);
      });
})