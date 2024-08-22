const Ship = require('../scripts/ship'); 

describe('Ship class', () => {

    test('should initialize with correct properties', () => {
        const ship = new Ship(3);
        expect(ship.shipLength).toBe(3);
        expect(ship.damage).toBe(0);  
        expect(ship.sunk).toBe(false);
    });

    test('hit() should increase the number of damage', () => {
        const ship = new Ship(3);
        ship.hit();
        expect(ship.damage).toBe(1);  
        expect(ship.sunk).toBe(false);

        ship.hit();
        expect(ship.damage).toBe(2);  
        expect(ship.sunk).toBe(false);
    });

    test('isSunk() should correctly identify a sunk ship', () => {
        const ship = new Ship(2);
        ship.hit();
        ship.hit();
        expect(ship.damage).toBe(2);  
        expect(ship.sunk).toBe(true); 

        ship.hit();
        expect(ship.damage).toBe(2); 
        expect(ship.sunk).toBe(true); 
    });

    test('ship should not be sunk if damage is less than ship length', () => {
        const ship = new Ship(4);
        ship.hit();
        ship.hit();
        ship.hit();
        expect(ship.damage).toBe(3);  
        expect(ship.sunk).toBe(false); 
    });

    test('ship should not allow more hits than its length', () => {
        const ship = new Ship(3);
        ship.hit();
        ship.hit();
        ship.hit();
        ship.hit(); 
        expect(ship.damage).toBe(3);  
        expect(ship.sunk).toBe(true);
    });
});
