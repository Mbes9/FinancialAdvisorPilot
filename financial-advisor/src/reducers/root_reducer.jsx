import { combineReducers } from 'redux';

import riskReducer from './risk_reducer.jsx';

const RootReducer = combineReducers({
  risk: riskReducer
});

export default RootReducer;

