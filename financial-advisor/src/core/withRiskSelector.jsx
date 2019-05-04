import React from "react";
import { connect } from "react-redux";
import { compose } from "redux";
import { requestRiskData, updateRisk } from "../actions/risk_actions";

const withRiskSelector = Component =>
  class extends React.Component {
    handleRiskSelected = risk => () => {
      const { updateRisk } = this.props;
      updateRisk(risk);
    };

    handleContinue = () => {
      this.props.history.push("/calculator");
    };

    componentDidMount() {
      this.props.requestRiskData();
    }

    render() {
      return (
        <Component
          handleRiskSelected={this.handleRiskSelected}
          handleContinue={this.handleContinue}
          {...this.props}
        />
      );
    }
  };

const mapStateToProps = ({ risk }) => ({
  risksData: risk.risksData,
  activeRisk: risk.activeRisk
});
const mapDispatchToProps = {
  requestRiskData: requestRiskData,
  updateRisk: updateRisk
};

export default compose(
  connect(
    mapStateToProps,
    mapDispatchToProps
  ),
  withRiskSelector
);
