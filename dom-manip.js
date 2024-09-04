const main = document.querySelector("div#main");
const player1Board = document.createElement("div");
player1Board.setAttribute("class", "gameboard");
const player2Board = document.createElement("div");
player2Board.setAttribute("class", "gameboard");

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
        player1Board.appendChild(square);
      }
    }
    main.appendChild(player1Board);
    for (let row = 0; row < board2.size; row++) {
      for (let col = 0; col < board2.size; col++) {
        const square = document.createElement("div");
        const value = board2.layout[row][col];
        square.setAttribute("value", value);
        player2Board.appendChild(square);
      }
    }
    main.appendChild(player2Board);
  };

  return { renderInitial };
}
