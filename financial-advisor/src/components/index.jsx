import React from "react";
import {
  BrowserRouter as Router,
  Redirect,
  Route,
  Switch
} from "react-router-dom";
import RiskSelector from "./RiskSelector/RiskSelector";

class Index extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    return (
      <Router>
        <Switch>
          <Route path="/" component={RiskSelector} exact={true} />
          <Route path="/calculator/" component={RiskSelector} exact={true} />
          <Redirect to="/" />
        </Switch>
      </Router>
    );
  }
}

export default Index;
