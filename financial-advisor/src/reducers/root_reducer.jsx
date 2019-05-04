import { combineReducers } from "redux";

import riskReducer from "./risk_reducer.jsx";
import portfolioReducer from "./portfolio_reducer.jsx";

const RootReducer = combineReducers({
  risk: riskReducer,
  portfolio: portfolioReducer
});

export default RootReducer;
