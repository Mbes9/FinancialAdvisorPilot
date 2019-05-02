import merge from "lodash/merge";
import {
  RECEIVE_RISK,
  RECEIVE_RISK_DATA,
  REQUEST_RISK_DATA,
  UPDATE_RISK_PORTFOLIO,
  UPDATE_RISK
} from "../actions/risk_actions";

const riskReducer = (state = { activeRisk: 1 }, action) => {
  Object.freeze(state);
  let nextState;

  switch (action.type) {
    case RECEIVE_RISK:
      return { ...state, activeRisk: action.activeRisk };
    case REQUEST_RISK_DATA:
      return { ...state };
    case RECEIVE_RISK_DATA:
      return { ...state, risksData: action.risksData };
    case UPDATE_RISK_PORTFOLIO:
      nextState = merge({}, state);
      nextState.risk.portfolio = action.riskPortfolio;
      return nextState;
    case UPDATE_RISK:
      return { ...state, activeRisk: action.activeRisk };
    default:
      return state;
  }
};

export default riskReducer;
