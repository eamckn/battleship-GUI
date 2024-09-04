export default class Gameboard {
  constructor() {
    this.shipsOnBoard = [];
    this.size = 10;
    this.layout = [];
    for (let row = 0; row < this.size; row++) {
      this.layout[row] = [];
      for (let col = 0; col < this.size; col++) {
        this.layout[row].push(0);
      }
    }
  }

  placeShip = function placeShipOnGameBoard(Ship, row, col) {
    let i = 0;
    while (i < Ship.length) {
      this.layout[row][col + i] = Ship;
      i++;
    }
    this.shipsOnBoard.push(Ship);
  };

  receiveAttack = function receiveAttackFromOtherPlayer(row, col) {
    if (typeof this.layout[row][col] === "object") {
      this.layout[row][col].hit();
    } else {
      this.logMiss(row, col);
    }
  };

  logMiss = function logMissedAttackFromPlayer(row, col) {
    this.layout[row][col] = -1;
  };

  allShipsSunk = function determineIfAllShipsOnBoardAreSunk() {
    for (const ship of this.shipsOnBoard) {
      if (!ship.isSunk()) return false;
    }
    return true;
  };
}
