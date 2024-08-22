class Ship {
    constructor (shipLength){
       this.shipLength = shipLength;
       this.damage = 0;
       this.sunk = false;
    }

    hit() {
        if (this.damage < this.shipLength) { 
            this.damage++;
        }
        this.isSunk();
        return this.damage;
    }

    isSunk() {
        if (this.damage >= this.shipLength) {
            this.sunk = true;
        }
    }
}

module.exports = Ship;