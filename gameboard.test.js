import Ship from "./ship.js";
import Gameboard from "./gameboard.js";

const cruiser = Ship(3);
const gameboard = Gameboard();

it("Gameboard is initialized empty", () => {
  for (let row = 0; row < gameboard.size; row++) {
    for (let col = 0; col < gameboard.size; col++) {
      expect(gameboard.getLayout()[row][col]).toBe(0);
    }
  }
});

it("Gameboard takes horizontal ship placement starting from left", () => {
  gameboard.placeShip(cruiser, 1, 1);
  expect(gameboard.getLayout()[1][1]).toBe(cruiser);
  expect(gameboard.getLayout()[1][2]).toBe(cruiser);
  expect(gameboard.getLayout()[1][3]).toBe(cruiser);
});

it("ReceiveAttack() adds hit to ship on hit", () => {
  gameboard.receiveAttack(1, 1);
  expect(cruiser.getHitCount()).toBe(1);
});

it("ReceiveAttack() logs missed hit on gameboard", () => {
  gameboard.receiveAttack(2, 2);
  expect(gameboard.getLayout()[2][2]).toBe(-1);
});
