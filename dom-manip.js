const main = document.querySelector("div#main");
const player1BoardDisplay = document.createElement("div");
player1BoardDisplay.className = "gameboard player1";
const player2BoardDisplay = document.createElement("div");
player2BoardDisplay.className = "gameboard player2";

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
    main.appendChild(player1BoardDisplay);
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
    main.appendChild(player2BoardDisplay);
  };

  const updateSquare = function updateSquareValueAfterAttack(square, value) {
    square.setAttribute("value", value);
  };

  return { renderInitial, updateSquare };
}
