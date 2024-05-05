const getters = {
  totalLeftWeight({ leftItems }) {
    return leftItems.reduce((sum, current) => sum + current.weight, 0);
  },

  totalRightWeight({ rightItems }) {
    return rightItems.reduce((sum, current) => sum + current.weight, 0);
  },

  leftItemSum({ leftItems }) {
    return Math.floor(
      leftItems.reduce((sum, current) => {
        return sum + current.weight * (50 - current.leftPosition);
      }, 0)
    );
  },

  rightItemSum({ rightItems }) {
    return Math.floor(
      rightItems.reduce((sum, current) => {
        return sum + current.leftPosition * current.weight;
      }, 0)
    );
  },

  teeterAngle(state, { leftItemSum, rightItemSum }) {
    return (rightItemSum - leftItemSum) / 30;
  },
};

export default getters;
