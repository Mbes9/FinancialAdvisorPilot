import React from "react";
import { connect } from "react-redux";
import { compose } from "redux";
import {
  receivePortfolio,
  updatePortfolio
} from "../actions/portfolio_actions";

const withPortfolio = Component =>
  class extends React.Component {
    constructor(props) {
      super(props);
      const { portfolio } = props;
      this.state = {
        currentPortfolio: portfolio,
        formErrors: {}
      };
    }

    handleChange = (e, { name, value }) => {
      this.setState(prevState => ({
        currentPortfolio: {
          ...prevState.currentPortfolio,
          [name]: value
        }
      }));
    };

    handleCalculate = () => {
      const { currentPortfolio } = this.state;
      const errors = this.validateForm();
      this.setState({ formErrors: errors });
      if (!Object.keys(errors).some(x => errors[x])) {
        this.setState({ someError: false });
        const { updatePortfolio } = this.props;
        updatePortfolio(currentPortfolio);
        const newAmount = this.handleNewAmount();
        console.log("newAmount: ", newAmount);
        const differences = this.handleDifference(newAmount);
        console.log("differences: ", differences);
        const transference = this.handleTransference(differences);
        console.log("transference: ", transference);
        this.setState({ differences, newAmount });
      } else this.setState({ someError: true });
    };

    validateForm = () => {
      const { currentPortfolio } = this.state;
      return {
        bonds: !this._isNormalInteger(currentPortfolio.bonds),
        largeCap: !this._isNormalInteger(currentPortfolio.largeCap),
        midCap: !this._isNormalInteger(currentPortfolio.midCap),
        foreign: !this._isNormalInteger(currentPortfolio.foreign),
        smallCap: !this._isNormalInteger(currentPortfolio.smallCap)
      };
    };

    _isNormalInteger = str => /^[0-9]{1,9}(?:\.[0-9]{1,2})?$/.test(str);

    handleNewAmount = () => {
      const { risksData, activeRisk } = this.props;
      const { currentPortfolio } = this.state;

      const money = Object.values(currentPortfolio).reduce(
        (a, b) => Number(a) + Number(b)
      );
      const values = Object.values(risksData[activeRisk - 1]).slice(1);

      const valuesPercents = values.map(v => (v ? v / 100 : v));
      return valuesPercents.map(p => Math.floor(100 * (p * money)) / 100);
    };

    handleDifference = newAmount => {
      const { currentPortfolio } = this.state;
      const portfolioValues = Object.values(currentPortfolio);
      return newAmount.map(
        (amount, index) =>
          Math.round(100 * (amount - portfolioValues[index])) / 100
      );
    };

    handleTransference = differences => {
      let transference = [];
      let newDifferences = differences.slice(0);
      function sortNumber(a, b) {
        return a - b;
      }
      let sortedDiff = differences.sort(sortNumber);

      let transferMade = false;
      let smallestFittingDeficit = null;

      sortedDiff
        .slice(0)
        .reverse()
        .forEach(function(surplus) {
          if (!transferMade && surplus > 0) {
            sortedDiff.forEach(function(deficit) {
              if (surplus + deficit <= 0) {
                smallestFittingDeficit = deficit;
              }
            });

            if (smallestFittingDeficit) {
              let surplusIdx = newDifferences.indexOf(surplus);
              let deficitIdx = newDifferences.indexOf(smallestFittingDeficit);
              newDifferences[surplusIdx] = 0;
              newDifferences[deficitIdx] = surplus + smallestFittingDeficit;
              let transferAmount = Math.round(100 * surplus) / 100;
              //  let transferString = `<div>• Transfer $${transferAmount} from ${labels[deficitIdx]} to ${labels[surplusIdx]}.</div>`
              //  $('.risk-calculator-transfers')[0].innerHTML += transferString;
              transference.push({
                from: deficitIdx,
                to: surplusIdx,
                amount: transferAmount
              });
              transferMade = true;
            }
          }
        });
        if(!transferMade){
          sortedDiff.forEach(function(smallestSurplus){
            if(smallestSurplus > 0){
              sortedDiff.slice(0).reverse().forEach(function(smallestDeficit){
                if(!transferMade && smallestDeficit < 0){
                  let surplusIdx = newDifferences.indexOf(smallestSurplus);
                  let deficitIdx = newDifferences.indexOf(smallestDeficit);
                  newDifferences[surplusIdx] = smallestSurplus + smallestDeficit;
                  newDifferences[deficitIdx] = 0;
                  let transferAmount = Math.round(100*(smallestSurplus - (smallestSurplus + smallestDeficit)))/100;
                  // let transferString = `<div>• Transfer $${transferAmount} from ${labels[deficitIdx]} to ${labels[surplusIdx]}.</div>`
                  // $('.risk-calculator-transfers')[0].innerHTML += transferString;
                  transference.push({"from": deficitIdx, "to":surplusIdx, "amount": transferAmount});
                  transferMade = true;
                }
              })
            }
          })
        }
       
      return transference;
    };

    render() {
      const {
        currentPortfolio,
        differences,
        newAmount,
        formErrors,
        someError
      } = this.state;
      return (
        <Component
          {...this.props}
          handleChange={this.handleChange}
          handleCalculate={this.handleCalculate}
          currentPortfolio={currentPortfolio}
          differences={differences}
          newAmount={newAmount}
          formErrors={formErrors}
          someError={someError}
        />
      );
    }
  };

const mapStateToProps = ({ risk, portfolio }) => ({
  risksData: risk.risksData,
  activeRisk: risk.activeRisk,
  portfolio: portfolio.portfolio
});
const mapDispatchToProps = {
  updatePortfolio: updatePortfolio,
  receivePortfolio: receivePortfolio
};

export default compose(
  connect(
    mapStateToProps,
    mapDispatchToProps
  ),
  withPortfolio
);
