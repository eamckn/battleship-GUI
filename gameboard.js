import Ship from "./ship";

export default Gameboard = () => {
  const size = 10;
  let layout = [];

  for (let row = 0; row < size; row++) {
    layout[row] = [];
    for (let col = 0; col < size; col++) {
      layout[row].push(0);
    }
  }

  const placeShip = function placeShipOnGameBoard(Ship, row, col) {
    let i = 0;
    while (i < Ship.length) {
      layout[row][col + i] = Ship;
      i++;
    }
  };

  const getLayout = function getGameboardLayout() {
    return layout;
  };

  const receiveAttack = function receiveAttackFromOtherPlayer(row, col) {
    if (typeof layout[row][col] === "object") {
      layout[row][col].hit();
    } else {
      logMiss(row, col);
    }
  };

  const logMiss = function logMissedAttackFromPlayer(row, col) {
    layout[row][col] = -1;
  };

  return { size, placeShip, getLayout, receiveAttack };
};
