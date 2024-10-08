import Ship from "./ship.js";
import Player from "./player.js";
import DOM from "./dom-manip.js";
import { showNameDialog, player1Name } from "./dialog.js";

const player1 = new Player();
const player2 = new Player("computer");
const players = [player1, player2];
const player1BoardDisplay = document.querySelector(".gameboard.player1");
const player2BoardDisplay = document.querySelector(".gameboard.player2");
const dom = DOM();

let nextComputerMoves = [];

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
      document.querySelector("div.display.player2").classList.remove("hide");
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

const playerOneTurn = function allowClicksOnPlayerTwoBoard(event) {
  const target = event.target;
  const row = target.getAttribute("row");
  const col = target.getAttribute("col");
  const selectedSquareValue = player2.board.layout[row][col];
  if (selectedSquareValue !== 1 && selectedSquareValue !== -1) {
    player2.board.receiveAttack(row, col);
    dom.updateSquare(target, player2.board.layout[row][col]);
    player2BoardDisplay.removeEventListener("click", playerOneTurn);
    if (isGameOver()) {
      showWinner();
      return;
    }
    if (player2.type === "computer") {
      computerPlayerTurn();
    } else {
      player1BoardDisplay.addEventListener("click", playerTwoTurn);
    }
  }
};

const computerPlayerTurn = function allowClicksOnPlayerOneBoardFromComputer() {
  if (nextComputerMoves.length === 0) {
    let [row, col, selectedSquare, selectedSquareValue] = [...computerRandom()];
    while (selectedSquareValue === 1 || selectedSquareValue === -1) {
      [row, col, selectedSquare, selectedSquareValue] = [...computerRandom()];
    }
    computerMove(selectedSquare, row, col);
  } else {
    const [row, col] = [...nextComputerMoves.pop()];
    const selectedSquare = player1BoardDisplay.querySelector(
      `div[row = "${row}"][col = "${col}"]`
    );
    computerMove(selectedSquare, row, col);
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

const computerMove = function commenceComputerMoveWithInfoGatheredDuringTurn(
  square,
  row,
  col
) {
  setTimeout(() => {
    computerValidAttack(square, row, col);
    if (isGameOver()) {
      showWinner();
      return;
    }
    player2BoardDisplay.addEventListener("click", playerOneTurn);
  }, 500);
};

const computerValidAttack = function carryOutValidAttackMadeByComputerPlayer(
  square,
  row,
  col
) {
  player1.board.receiveAttack(row, col);
  if (player1.board.layout[row][col] === 1) {
    nextComputerMoves = nextComputerMoves.concat(getNextMoves(row, col));
  }
  dom.updateSquare(square, player1.board.layout[row][col]);
};

const getNextMoves = function getComputerPlayerNextMovesAfterSuccessfulHit(
  row,
  col
) {
  // Currently only check horizontally because ships must be vertical
  const adjacentCoords = [
    [row, col - 1],
    [row, col + 1],
  ];
  const validAdjacentCoords = adjacentCoords.filter((coordinate) => {
    return (
      coordinate[0] < 10 &&
      coordinate[0] >= 0 &&
      coordinate[1] < 10 &&
      coordinate[1] >= 0
    );
  });
  const adjacentCoordsNotHit = validAdjacentCoords.filter((coordinate) => {
    return (
      player1.board.layout[coordinate[0]][coordinate[1]] !== 1 &&
      player1.board.layout[coordinate[0]][coordinate[1]] !== -1
    );
  });
  return adjacentCoordsNotHit;
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
    showWinner();
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

const showWinner = function displayWhoWonTheGame() {
  const winnerDialog = document.querySelector("dialog#winner");
  const winnerMessage = document.querySelector("p#winner-message");
  if (player1.board.allShipsSunk()) {
    winnerMessage.innerHTML = "The computer won! Better luck next time.";
  } else {
    winnerMessage.innerHTML = `You win, ${player1Name}! Well done.`;
  }
  winnerDialog.showModal();
};

initializeBoards();
dom.renderInitial(player1.board, player2.board);
dom.initalizeShips();

makeDragTargets();
makeDropTargets();

showNameDialog();
