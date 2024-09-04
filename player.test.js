import Player from "./player.js";

const player1 = Player();

it("Player type is computer", () => {
  expect(player1.type).toBe("player");
});
