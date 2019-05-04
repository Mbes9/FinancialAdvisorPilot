import {
  RECEIVE_RISK,
  RECEIVE_RISK_DATA,
  REQUEST_RISK_DATA,
  UPDATE_RISK
} from "../actions/risk_actions";

const riskReducer = (state = { activeRisk: 1 }, action) => {
  Object.freeze(state);

  switch (action.type) {
    case REQUEST_RISK_DATA:
      return { ...state };
    case RECEIVE_RISK_DATA:
      return { ...state, risksData: action.risksData };
    case RECEIVE_RISK:
      return { ...state, activeRisk: action.activeRisk };
    case UPDATE_RISK:
      return { ...state, activeRisk: action.activeRisk };
    default:
      return state;
  }
};

export default riskReducer;
