import { GAME_STATUS_PLAY } from "@/constants/constants";

const mutations = {
  moveFigure(state, amount) {
    state.fallingFigures[0].leftPosition += amount;
  },

  addFigure(state, { item, position }) {
    if (position === 'falling') state.fallingFigures.push(item);
    else if (position === 'left') state.leftItems.push(item);
    else state.rightItems.push(item);
  },

  removeFallingFigure(state) {
    state.fallingFigures.shift();
  },

  setGameStatus(state, gameStatus) {
    state.gameStatus = gameStatus;
  },

  setFallingSpeed(state, speed) {
    state.fallingSpeed = speed;
  },

  tryAgain(state) {
    state.fallingFigures = [];
    state.leftItems = [];
    state.rightItems = [];
    state.gameStatus = GAME_STATUS_PLAY;
    state.fallingSpeed = 1;
  },
};

export default mutations;
