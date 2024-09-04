import Ship from "./ship.js";
import Gameboard from "./gameboard.js";
import Player from "./player.js";
import DOM from "./dom-manip.js";

const player1 = new Player();
const player2 = new Player("computer");
const players = [player1, player2];

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

const dom = DOM();

dom.renderInitial(player1.board, player2.board);
