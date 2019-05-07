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
        const { updatePortfolio } = this.props;
        updatePortfolio(currentPortfolio);
        const newAmount = this.handleNewAmount();
        const differences = this.handleDifference(newAmount);
        const transfers = this.handleTransference(differences);
        this.setState({ differences, newAmount, transfers, someError: false });
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
      let differencesUpdated = [...differences];
      let transfers = [];
      let done = false;

      while (!done) {
        let {
          transfers: smallerTransfers,
          differences: newDifferences,
          transferred
        } = this._transferSmallerFirst(differencesUpdated, transfers);
        if (transferred) {
          differencesUpdated = newDifferences;
          transfers = smallerTransfers;
        } else {
          let {
            transfers: biggerTransfers,
            differences: newDifferences
          } = this._transferBiggerFirst(differencesUpdated, transfers);
          differencesUpdated = newDifferences;
          transfers = biggerTransfers;
        }

        differencesUpdated = differencesUpdated.map(dif => {
          return Math.round(100 * dif) / 100;
        });
        done = differencesUpdated.filter(dif => dif === 0).length > 3;
      }
      return transfers;
    };

    _transferSmallerFirst = (differences, transfers) => {
      let differencesUpdated = [...differences];
      let transfersUpdated = [...transfers];
      let transferred = false;

      let sortedDifferences = differences.sort((a, b) => a - b);

      sortedDifferences.forEach(excess => {
        if (excess > 0)
          sortedDifferences
            .slice(0)
            .reverse()
            .forEach(deficit => {
              if (!transferred && deficit < 0) {
                let excessIndex = differencesUpdated.indexOf(excess);
                let deficitIndex = differencesUpdated.indexOf(deficit);
                differencesUpdated[excessIndex] = excess + deficit;
                differencesUpdated[deficitIndex] = 0;
                transfersUpdated.push({
                  from: deficitIndex,
                  to: excessIndex,
                  amount: Math.round(100 * (excess - (excess + deficit))) / 100
                });
                transferred = true;
              }
            });
      });
      return {
        transfers: transfersUpdated,
        differences: differencesUpdated,
        transferred
      };
    };

    _transferBiggerFirst = (differences, transfers) => {
      let differencesUpdated = [...differences];
      let transfersUpdated = [...transfers];
      let transferred = false;
      let minDeficit = undefined;

      let sortedDifferences = differences.sort((a, b) => a - b);

      sortedDifferences
        .slice(0)
        .reverse()
        .forEach(excess => {
          if (!transferred && excess > 0) {
            sortedDifferences.forEach(deficit => {
              if (excess + deficit <= 0) minDeficit = deficit;
            });
            if (minDeficit) {
              let excessIndex = differencesUpdated.indexOf(excess);
              let deficitIndex = differencesUpdated.indexOf(minDeficit);

              differencesUpdated[excessIndex] = 0;

              differencesUpdated[deficitIndex] = excess + minDeficit;
              transfersUpdated.push({
                from: deficitIndex,
                to: excessIndex,
                amount: Math.round(100 * excess) / 100
              });
              transferred = true;
            }
          }
        });
      return {
        transfers: transfersUpdated,
        differences: differencesUpdated,
        transferred
      };
    };

    render() {
      const {
        currentPortfolio,
        differences,
        newAmount,
        transfers,
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
          transfers={transfers}
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
