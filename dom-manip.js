const player1BoardDisplay = document.querySelector("div.gameboard.player1");
const player2BoardDisplay = document.querySelector("div.gameboard.player2");
const player1ShipsDisplay = document.querySelector("div.ships.player1");

export default function DOM_manip() {
  const renderInitial = function renderBothPlayerBoardsOnShipPlacements(
    board1,
    board2
  ) {
    for (let row = 0; row < board1.size; row++) {
      for (let col = 0; col < board1.size; col++) {
        const square = document.createElement("div");
        const value = board1.layout[row][col];
        square.setAttribute("value", value);
        square.setAttribute("row", row);
        square.setAttribute("col", col);

        player1BoardDisplay.appendChild(square);
      }
    }
    for (let row = 0; row < board2.size; row++) {
      for (let col = 0; col < board2.size; col++) {
        const square = document.createElement("div");
        const value = board2.layout[row][col];
        square.setAttribute("value", value);
        square.setAttribute("row", row);
        square.setAttribute("col", col);
        player2BoardDisplay.appendChild(square);
      }
    }
  };

  const addShip = function updateBoardDisplayAfterShipDrop(
    board,
    length,
    row,
    col
  ) {
    for (let i = 0; i < length; i++) {
      const square = document.querySelector(
        `.player1 div[row="${row}"][col="${col + i}"]`
      );
      const value = board.layout[row][col + i];
      square.setAttribute("value", value);
    }
  };

  const initalizeShips = function initalizeShipsToBePlacedOnPlayerOneBoard() {
    const patrol = document.createElement("div");
    patrol.className = "ship";
    patrol.setAttribute("draggable", true);
    patrol.setAttribute("length", 2);
    patrol.setAttribute("id", "player1-patrol");

    const sub = document.createElement("div");
    sub.className = "ship";
    sub.setAttribute("draggable", true);
    sub.setAttribute("length", 3);
    sub.setAttribute("id", "player1-sub");

    const destroyer = document.createElement("div");
    destroyer.className = "ship";
    destroyer.setAttribute("draggable", true);
    destroyer.setAttribute("length", 3);
    destroyer.setAttribute("id", "player1-destroyer");

    const battleship = document.createElement("div");
    battleship.className = "ship";
    battleship.setAttribute("draggable", true);
    battleship.setAttribute("length", 4);
    battleship.setAttribute("id", "player1-battleship");

    const carrier = document.createElement("div");
    carrier.className = "ship";
    carrier.setAttribute("draggable", true);
    carrier.setAttribute("length", 5);
    carrier.setAttribute("id", "player1-carrier");

    player1ShipsDisplay.appendChild(patrol);
    player1ShipsDisplay.appendChild(sub);
    player1ShipsDisplay.appendChild(destroyer);
    player1ShipsDisplay.appendChild(battleship);
    player1ShipsDisplay.appendChild(carrier);
  };

  const updateSquare = function updateSquareValueAfterAttack(square, value) {
    square.setAttribute("value", value);
  };

  const hideShips = function hidePlayerShipsDisplayAfterAllShipsArePlaced() {
    document.querySelector("div.ships.player1").classList.add("hide");
  };

  return {
    renderInitial,
    updateSquare,
    initalizeShips,
    addShip,
    hideShips,
  };
}
