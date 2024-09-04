import Player from "./player.js";

const player1 = Player();
const player2 = Player("computer");

it("Player type is player with no arguments", () => {
  expect(player1.type).toBe("player");
});

it("Player type is computer when added as argument", () => {
  expect(player2.type).toBe("computer");
});
