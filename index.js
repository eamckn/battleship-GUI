import Ship from "./ship.js";
import Gameboard from "./gameboard.js";
import Player from "./player.js";
import DOM from "./dom-manip.js";

const player1 = new Player();
const player2 = new Player("computer");
const players = [player1, player2];

const dom = DOM();

const player1BoardDisplay = document.querySelector(".gameboard.player1");
const player2BoardDisplay = document.querySelector(".gameboard.player2");

const initializeBoards =
  function initializeDefaultShipPositionsForPlayerBoards() {
    player2.board.placeShip(new Ship(2), 1, 6);
    player2.board.placeShip(new Ship(3), 3, 3);
    player2.board.placeShip(new Ship(3), 7, 0);
    player2.board.placeShip(new Ship(4), 6, 4);
    player2.board.placeShip(new Ship(5), 2, 3);
  };

const makeDragTargets = function makeShipsForPlayerOneDraggable() {
  const playerOneShips = document.querySelectorAll(".ships.player1 .ship");

  playerOneShips.forEach((ship) => {
    ship.addEventListener("dragstart", dragstart);
    ship.addEventListener("dragend", dragend);
  });
};

const dragstart = function (event) {
  event.dataTransfer.setData("text/plain", event.target.getAttribute("id"));
  //console.log("dragging");
  setTimeout(() => {
    event.target.classList.add("dragging");
  }, 0);
};

const dragend = function (event) {
  event.target.classList.remove("dragging");
};

const makeDropTargets =
  function makeAllSquaresOnPlayerOneBoardValidDropTargets() {
    const squares = document.querySelectorAll(".gameboard.player1 div");

    squares.forEach((square) => {
      square.addEventListener("dragenter", dragEnter);
      square.addEventListener("dragover", dragOver);
      square.addEventListener("dragleave", dragLeave);
      square.addEventListener("drop", drop);
    });
  };

const dragEnter = function (event) {
  event.preventDefault();
  event.target.classList.add("drag-over");
};

const dragOver = function (event) {
  event.preventDefault();
  event.target.classList.add("drag-over");
};

const dragLeave = function (event) {
  event.target.classList.remove("drag-over");
};

const drop = function (event) {
  event.target.classList.remove("drag-over");
  const shipID = event.dataTransfer.getData("text/plain");
  const { draggedShip, length, row, col } = {
    ...extractInfo(shipID, event.target),
  };
  if (length + col > 10) {
    throw new Error(
      "Ship coordinates will go off the board. Please drop the ship at a different coordinate."
    );
  } else if (shipOverlaps(player1.board, row, col, length)) {
    throw new Error(
      "You cannot have overlapping ships. Please drop the ship at a different coordinate."
    );
  } else {
    player1.board.placeShip(new Ship(length), row, col);
    dom.addShip(player1.board, length, row, col);
    draggedShip.removeEventListener("dragstart", dragstart);
    draggedShip.removeAttribute("draggable");
    draggedShip.classList.add("dropped");
    if (player1.board.shipsOnBoard.length === 5) {
      startGame();
    }
  }
};

const extractInfo =
  function extractAdditionalDOMInfoFromDroppedShipAndItsDropTarget(id, square) {
    const draggedShip = document.getElementById(id);
    const length = Number(draggedShip.getAttribute("length"));
    const row = Number(square.getAttribute("row"));
    const col = Number(square.getAttribute("col"));

    return { draggedShip, length, row, col };
  };

const shipOverlaps = function droppedShipOverlapsWithAnotherAlreadyPlacedShip(
  board,
  row,
  col,
  length
) {
  for (let i = 0; i < length; i++) {
    if (board.layout[row][col + i] !== 0) {
      return true;
    }
  }
  return false;
};

initializeBoards();
dom.renderInitial(player1.board, player2.board);
dom.initalizeShips();

makeDragTargets();
makeDropTargets();

const playerOneTurn = function allowClicksOnPlayerTwoBoard(event) {
  const target = event.target;
  const row = target.getAttribute("row");
  const col = target.getAttribute("col");
  const selectedSquareValue = player2.board.layout[row][col];
  if (selectedSquareValue !== 1 && selectedSquareValue !== -1) {
    player2.board.receiveAttack(row, col);
    dom.updateSquare(target, player2.board.layout[row][col]);
    player2BoardDisplay.removeEventListener("click", playerOneTurn);
    if (isGameOver()) return;
    if (player2.type === "computer") {
      computerPlayerTurn();
    } else {
      player1BoardDisplay.addEventListener("click", playerTwoTurn);
    }
  }
};

const computerPlayerTurn = function allowClicksOnPlayerOneBoardFromComputer() {
  let [row, col, selectedSquare, selectedSquareValue] = [...computerRandom()];
  while (selectedSquareValue === 1 || selectedSquareValue === -1) {
    [row, col, selectedSquare, selectedSquareValue] = [...computerRandom()];
  }
  if (selectedSquareValue !== 1 && selectedSquareValue !== -1) {
    setTimeout(() => {
      computerValidAttack(selectedSquare, row, col);
      if (isGameOver()) return;
      player2BoardDisplay.addEventListener("click", playerOneTurn);
    }, 500);
  }
};

const computerRandom =
  function getRandomcomputerSelectionForCoordinatesToCheck() {
    const row = Math.floor(Math.random() * 10);
    const col = Math.floor(Math.random() * 10);
    const selectedSquare = player1BoardDisplay.querySelector(
      `div[row = "${row}"][col = "${col}"]`
    );
    const selectedSquareValue = player1.board.layout[row][col];

    return [row, col, selectedSquare, selectedSquareValue];
  };

const computerValidAttack = function carryOutValidAttackMadeByComputerPlayer(
  square,
  row,
  col
) {
  player1.board.receiveAttack(row, col);
  dom.updateSquare(square, player1.board.layout[row][col]);
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

const startGame = function startGameOnceAllShipsArePlaced() {
  dom.hideShips();
  player2BoardDisplay.addEventListener("click", playerOneTurn);
};
