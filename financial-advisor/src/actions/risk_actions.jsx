export const RECEIVE_RISK = "RECEIVE_RISK";
export const RECEIVE_RISK_DATA = "RECEIVE_RISK_DATA";
export const REQUEST_RISK_DATA = "REQUEST_RISK_DATA";
export const UPDATE_RISK_PORTFOLIO = "UPDATE_RISK_PORTFOLIO";
export const UPDATE_RISK = "UPDATE_RISK";

export const receiveRisk = risk => ({
  type: RECEIVE_RISK,
  risk
});

export const receiveRiskData = risksData => ({
  type: RECEIVE_RISK_DATA,
  risksData
});

export const requestRiskData = () => ({
  type: REQUEST_RISK_DATA
});

export const updateRiskPortfolio = riskPortfolio => ({
  type: UPDATE_RISK_PORTFOLIO,
  riskPortfolio
});

export const updateRisk = activeRisk => ({
  type: UPDATE_RISK,
  activeRisk
});
