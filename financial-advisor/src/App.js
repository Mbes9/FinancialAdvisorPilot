import React from "react";
import { Provider } from "react-redux";
import { applyMiddleware, createStore } from "redux";
import { logger } from "redux-logger";
import createSagaMiddleware from "redux-saga";
import { Card, Icon } from "semantic-ui-react";
import "./App.css";
import Index from "./components";
import HeaderAdviser from "./components/HeaderAdviser";
import reducer from "./reducers/root_reducer";
import rootSaga from "./sagas/saga";

const sagaMiddleware = createSagaMiddleware();

const store = createStore(reducer, applyMiddleware(sagaMiddleware, logger));
sagaMiddleware.run(rootSaga);

const App = () => {
  return (
    <Provider store={store}>
      <header className="App">
        <Card
          style={{ margin: "5%", marginTop: "2%", marginBottom: "2%" }}
          fluid
        >
          <HeaderAdviser />
          <Index />
          <Card.Content extra>
            <a href="https://github.com/Mbes9/FinancialAdvisorPilot">
              <Icon name="user" />
              {`Test by Matias Besozzi - ${"https://github.com/Mbes9/FinancialAdvisorPilot"}`}
            </a>
          </Card.Content>
        </Card>
      </header>
    </Provider>
  );
};

export default App;
