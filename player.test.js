import Player from "./player.js";

const player1 = Player();
const player2 = Player("computer");

it("Player type is player with no arguments", () => {
  expect(player1.type).toBe("player");
});

it("Player type is computer when added as argument", () => {
  expect(player2.type).toBe("computer");
});

it("Players have their own board", () => {
  for (let row = 0; row < player1.board.size; row++) {
    for (let col = 0; col < player1.board.size; col++) {
      expect(player1.board.getLayout()[row][col]).toBe(0);
      expect(player2.board.getLayout()[row][col]).toBe(0);
    }
  }
});
