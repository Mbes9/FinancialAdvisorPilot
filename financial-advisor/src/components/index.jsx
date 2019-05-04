import React from "react";
import {
  BrowserRouter as Router,
  Redirect,
  Route,
  Switch
} from "react-router-dom";
import withRiskSelector from "../core/withRiskSelector";
import RiskCalculator from "./RiskCalculator/RiskCalculator";
import RiskSelector from "./RiskSelector/RiskSelector";
import withPortfolio from "../core/withPortfolio";
import { connect } from "react-redux";

const PrivateRoute = ({ component: Component, risksData, ...rest }) => (
  <Route
    {...rest}
    render={props => {
      return risksData ? (
        <Component {...props} />
      ) : (
        <Redirect
          to={{
            pathname: "/",
            state: { from: props.location }
          }}
        />
      );
    }}
  />
);

class Index extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    const { setNavigation } = this.props;
    return (
      <Router ref={e => setNavigation(e)}>
        <Switch>
          <Route
            path="/"
            component={withRiskSelector(RiskSelector)}
            exact={true}
          />
          <PrivateRoute
            path="/calculator/"
            component={withPortfolio(RiskCalculator)}
            exact={true}
            {...this.props}
          />
          <Redirect to="/" />
        </Switch>
      </Router>
    );
  }
}

const mapStateToProps = ({ risk }) => ({
  risksData: risk.risksData
});

export default connect(mapStateToProps)(Index);
