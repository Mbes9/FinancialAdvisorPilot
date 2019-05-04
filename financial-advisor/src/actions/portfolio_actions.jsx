export const RECEIVE_PORTFOLIO = "RECEIVE_PORTFOLIO";
export const UPDATE_PORTFOLIO = "UPDATE_PORTFOLIO";

export const receivePortfolio = () => ({
  type: RECEIVE_PORTFOLIO
});

export const updatePortfolio = portfolio => ({
  type: UPDATE_PORTFOLIO,
  portfolio
});
