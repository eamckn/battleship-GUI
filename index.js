import Ship from "./ship.js";
import Gameboard from "./gameboard.js";
import Player from "./player.js";
import DOM from "./dom-manip.js";

const player1 = new Player();
const player2 = new Player("computer");
const players = [player1, player2];

const dom = DOM();

player1.board.placeShip(new Ship(2), 1, 6);
player1.board.placeShip(new Ship(3), 3, 3);
player1.board.placeShip(new Ship(3), 7, 0);
player1.board.placeShip(new Ship(4), 6, 4);
player1.board.placeShip(new Ship(5), 2, 3);

player2.board.placeShip(new Ship(2), 1, 6);
player2.board.placeShip(new Ship(3), 3, 3);
player2.board.placeShip(new Ship(3), 7, 0);
player2.board.placeShip(new Ship(4), 6, 4);
player2.board.placeShip(new Ship(5), 2, 3);

dom.renderInitial(player1.board, player2.board);

const player1Board = document.querySelector(".gameboard.player1");
const player2Board = document.querySelector(".gameboard.player2");

player1Board.addEventListener("click", (event) => {
  let target = event.target;
  let row = target.getAttribute("row");
  let col = target.getAttribute("col");
  player1.board.receiveAttack(row, col);
  dom.updateSquare(target, player1.board.layout[row][col]);
});
