import Gameboard from "./gameboard.js";

export default Player = (type = "player") => {
  type;
  const board = Gameboard();

  return { type, board };
};
