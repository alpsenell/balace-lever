import { colorGenerator, numberGenerator } from '@/helpers';
import { FIGURES } from '@/constants/constants';
import types from './mutation-types';

const actions = {
  createNewFigure({ commit }, position = 'right') {
    const shape = numberGenerator(0, FIGURES.length - 1);
    const size = FIGURES[shape] !== 'triangle' ? numberGenerator(30, 80) : 60
    const range = position === 'right' ? [10, 45] : [5, 40];
    const weight = numberGenerator(1, 10);
    const leftPosition = numberGenerator(range[0], range[1]);
    const color = colorGenerator();
    const id = numberGenerator(1, 1000) * numberGenerator(1, 1000)

    const item = {
      size,
      id,
      weight,
      shape: FIGURES[shape],
      leftPosition,
      color
    };

    commit(types.ADD_FIGURE, { item, position });
  },

  touchTeeterTotter({ state, commit, dispatch }, newLeft) {
    const item = state.fallingFigures[0];

    commit(types.ADD_FIGURE, {
      item: { ...item, left: newLeft },
      position: 'left',
    });
    commit(types.REMOVE_FALLING_FIGURE);

    dispatch('createNewFigure', 'right');
    dispatch('createNewFigure', 'falling');
  },

  setGameStatus ({ commit }, gameStatus) {
    commit(types.SET_GAME_STATUS, gameStatus);
  },

  moveFallingFigure({ commit }, payload) {
    commit(types.MOVE_FIGURE, payload);
  },

  setFallingSpeed({ commit }, payload) {
    commit(types.SET_FALLING_SPEED, payload)
  },

  startGame({ dispatch }) {
    dispatch('createNewFigure', 'falling');
    dispatch('createNewFigure', 'falling');
    dispatch('createNewFigure', 'right');
  },

  tryAgain({ dispatch, commit }) {
    commit(types.TRY_AGAIN);
    dispatch('startGame');
  },
};

export default actions;
