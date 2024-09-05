const main = document.querySelector("div#main");
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

  const initalizeShips = function initalizeShipsToBePlacedOnPlayerOneBoard() {
    const patrol = document.createElement("div");
    patrol.className = "ship player1 patrol";
    const sub = document.createElement("div");
    sub.className = "ship player1 sub";
    const destroyer = document.createElement("div");
    destroyer.className = "ship player1 destroyer";
    const battleship = document.createElement("div");
    battleship.className = "ship player1 patbattleshiprol";
    const carrier = document.createElement("div");
    carrier.className = "ship player1 carrier";

    player1ShipsDisplay.appendChild(patrol);
    player1ShipsDisplay.appendChild(sub);
    player1ShipsDisplay.appendChild(destroyer);
    player1ShipsDisplay.appendChild(battleship);
    player1ShipsDisplay.appendChild(carrier);
  };

  const updateSquare = function updateSquareValueAfterAttack(square, value) {
    square.setAttribute("value", value);
  };

  return { renderInitial, updateSquare, initalizeShips };
}
