import Ship from "./ship.js";
import Gameboard from "./gameboard.js";
import Player from "./player.js";
import DOM from "./dom-manip.js";

const player1 = new Player();
const player2 = new Player("computer");
const players = [player1, player2];

const dom = DOM();

function initializeBoards() {
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
}

initializeBoards();

const player1BoardDisplay = document.querySelector(".gameboard.player1");
const player2BoardDisplay = document.querySelector(".gameboard.player2");

const playerOneTurn = function allowClicksOnPlayerTwoBoard(event) {
  const target = event.target;
  const row = target.getAttribute("row");
  const col = target.getAttribute("col");
  const selectedSquareValue = player2.board.layout[row][col];
  if (selectedSquareValue !== 1 && selectedSquareValue !== -1) {
    player2.board.receiveAttack(row, col);
    dom.updateSquare(target, player2.board.layout[row][col]);
    if (player2.type === "computer") {
      player2BoardDisplay.removeEventListener("click", playerOneTurn);
      computerPlayerTurn();
    } else {
      player1BoardDisplay.addEventListener("click", playerTwoTurn);
      player2BoardDisplay.removeEventListener("click", playerOneTurn);
    }
  }
  if (isGameOver()) {
    player1BoardDisplay.removeEventListener("click", playerTwoTurn);
  }
};

const computerPlayerTurn = function allowClicksOnPlayerOneBoardFromComputer() {
  let selectedSquareValue;
  let row;
  let col;
  let target;
  do {
    row = Math.floor(Math.random() * 10);
    col = Math.floor(Math.random() * 10);
    console.log(row);
    console.log(col);
    target = player1BoardDisplay.querySelector(
      `div[row = "${row}"][col = "${col}"]`
    );
    console.log(target);
    selectedSquareValue = player1.board.layout[row][col];
    console.log(selectedSquareValue);
  } while (selectedSquareValue === 1 || selectedSquareValue === -1);
  if (selectedSquareValue !== 1 && selectedSquareValue !== -1) {
    player1.board.receiveAttack(row, col);
    dom.updateSquare(target, player1.board.layout[row][col]);
    player2BoardDisplay.addEventListener("click", playerOneTurn);
  }
};

const playerTwoTurn = function allowClicksOnPlayerOneBoard(event) {
  const target = event.target;
  const row = target.getAttribute("row");
  const col = target.getAttribute("col");
  const selectedSquareValue = player1.board.layout[row][col];
  if (selectedSquareValue !== 1 && selectedSquareValue !== -1) {
    player1.board.receiveAttack(row, col);
    dom.updateSquare(target, player1.board.layout[row][col]);
    player2BoardDisplay.addEventListener("click", playerOneTurn);
    player1BoardDisplay.removeEventListener("click", playerTwoTurn);
  }
  if (isGameOver()) {
    player2BoardDisplay.removeEventListener("click", playerOneTurn);
  }
};

const isGameOver = function checkIfGameIsOverBasedOnShipsSunk() {
  for (const player of players) {
    if (player.board.allShipsSunk()) return true;
  }
};

player2BoardDisplay.addEventListener("click", playerOneTurn);
