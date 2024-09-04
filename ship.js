export default class Ship {
  constructor(length) {
    this.length = length;
    this.hitCount = 0;
    this.sunk = false;
  }

  hit = function increaseHitCountOnShip() {
    this.hitCount++;
  };

  isSunk = function checkIfShipHasBeenSunk() {
    this.sunk = this.hitCount === this.length ? true : false;
    return this.sunk;
  };
}
