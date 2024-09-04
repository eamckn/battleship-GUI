import Ship from "./ship.js";
import Gameboard from "./gameboard.js";

const cruiser = new Ship(3);
const gameboard = new Gameboard();

it("Gameboard is initialized empty", () => {
  for (let row = 0; row < gameboard.size; row++) {
    for (let col = 0; col < gameboard.size; col++) {
      expect(gameboard.layout[row][col]).toBe(0);
    }
  }
});

it("Gameboard takes horizontal ship placement starting from left", () => {
  gameboard.placeShip(cruiser, 1, 1);
  expect(gameboard.layout[1][1]).toBe(cruiser);
  expect(gameboard.layout[1][2]).toBe(cruiser);
  expect(gameboard.layout[1][3]).toBe(cruiser);
});

it("ReceiveAttack() adds hit to ship on hit", () => {
  gameboard.receiveAttack(1, 1);
  expect(cruiser.hitCount).toBe(1);
});

it("ReceiveAttack() logs missed hit on gameboard", () => {
  gameboard.receiveAttack(2, 2);
  expect(gameboard.layout[2][2]).toBe(-1);
});

it("Gameboard reports when all ships are not sunk", () => {
  expect(gameboard.allShipsSunk()).toBe(false);
});

it("Gameboard reports when all ships are sunk", () => {
  gameboard.receiveAttack(1, 2);
  gameboard.receiveAttack(1, 3);
  expect(gameboard.allShipsSunk()).toBe(true);
});
