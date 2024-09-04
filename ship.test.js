import Ship from "./ship.js";

const cruiser = new Ship(3);

it("Ship length is read properly", () => {
  expect(cruiser.length).toBe(3);
});

it("Hit count is incremented", () => {
  cruiser.hit();
  expect(cruiser.hitCount).toBe(1);
});

it("Sunk status is false on no hits", () => {
  expect(cruiser.isSunk()).toBe(false);
});

it("Sunk status is true on hits equal to length", () => {
  cruiser.hit();
  cruiser.hit();
  expect(cruiser.isSunk()).toBe(true);
});
