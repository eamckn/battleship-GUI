import Gameboard from "./gameboard.js";

export default class Player {
  constructor(type = "player") {
    this.type = type;
    this.board = new Gameboard();
  }
}
