import {
  RECEIVE_PORTFOLIO,
  UPDATE_PORTFOLIO
} from "../actions/portfolio_actions";

const portfolioReducer = (
  state = {
    portfolio: {
      bonds: "",
      largeCap: "",
      midCap: "",
      foreign: "",
      smallCap: ""
    }
  },
  action
) => {
  Object.freeze(state);

  switch (action.type) {
    case RECEIVE_PORTFOLIO:
      return { ...state };
    case UPDATE_PORTFOLIO:
      return { ...state, portfolio: action.portfolio };
    default:
      return state;
  }
};

export default portfolioReducer;
