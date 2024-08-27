const Player = require('../scripts/player');
const Gameboard = require('../scripts/gameboard');

describe('Player Class', () => {
  test('should create a Player with the correct type and gameboard', () => {
      const player = new Player('Player', 10, 5);
      expect(player.type).toBe('Player');
      expect(player.gameBoard).toBeInstanceOf(Gameboard);
  });

  test('should create a Computer with the correct type and gameboard', () => {
      const computer = new Player('Computer', 10, 5);
      expect(computer.type).toBe('Computer');
      expect(computer.gameBoard).toBeInstanceOf(Gameboard);
  });

  test('Computer should perform a valid random attack', () => {
    const computer = new Player('Computer', 10, 5);
    const player = new Player('Player', 10, 5);

    player.gameBoard.placeShip(3, 0, 0, 'horizontal');

    const attackSuccess = computer.randomAttack(player);

    expect(attackSuccess).toBeDefined();
    expect(typeof attackSuccess).toBe('boolean');
});

  test('Player should not be able to use randomAttack', () => {
      const player = new Player('Player', 10, 5);
      const opponent = new Player('Player', 10, 5);

      expect(() => {
          player.randomAttack(opponent);
      }).toThrow('randomAttack is only available for computer players.');
  });

  test('hasAlreadyAttacked should return true for previously attacked coordinates', () => {
      const player = new Player('Player', 10, 5);
      const opponent = new Player('Player', 10, 5);

      opponent.gameBoard.placeShip(3, 0, 0, 'horizontal');
      opponent.gameBoard.receiveAttack(0, 0);

      const alreadyAttacked = player.hasAlreadyAttacked(0, 0, opponent);
      expect(alreadyAttacked).toBe(true);
  });

  test('hasAlreadyAttacked should return false for new coordinates', () => {
      const player = new Player('Player', 10, 5);
      const opponent = new Player('Player', 10, 5);

      opponent.gameBoard.placeShip(3, 0, 0, 'horizontal');

      const alreadyAttacked = player.hasAlreadyAttacked(1, 1, opponent);
      expect(alreadyAttacked).toBe(false);
  });
});