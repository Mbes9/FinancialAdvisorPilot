import React from "react";
import { Provider } from "react-redux";
import { applyMiddleware, createStore } from "redux";
import createSagaMiddleware from "redux-saga";
import { Card, Container, Icon } from "semantic-ui-react";
import "./App.css";
import Index from "./components";
import HeaderAdviser from "./components/HeaderAdviser";
import reducer from "./reducers/root_reducer";
import rootSaga from "./sagas/saga";

const sagaMiddleware = createSagaMiddleware();

const store = createStore(reducer, applyMiddleware(sagaMiddleware));
sagaMiddleware.run(rootSaga);

export default class App extends React.Component {
  setNavigation = navigation => {
    this.navigation = navigation;
  };

  render() {
    return (
      <Provider store={store}>
        <Container fluid style={{ padding: "2%" }}>
          <Card fluid>
            <HeaderAdviser
              handleBack={() => this.navigation.history.goBack()}
            />
            <Index setNavigation={this.setNavigation} />
            <Card.Content extra textAlign="center">
              <a href="https://github.com/Mbes9/FinancialAdvisorPilot">
                <Icon name="user" />
                {`Test by Matias Besozzi - ${"https://github.com/Mbes9/FinancialAdvisorPilot"}`}
              </a>
            </Card.Content>
          </Card>
        </Container>
      </Provider>
    );
  }
}
