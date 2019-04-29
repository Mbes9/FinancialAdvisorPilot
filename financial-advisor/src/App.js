import React from "react";
import "./App.css";
import Index from "./components";
import HeaderAdviser from "./components/HeaderAdviser";
import { Card, Icon } from "semantic-ui-react";

function App() {
  return (
    <header className="App">
      <Card style={{ margin: "5%", marginTop: "2%", marginBottom: "2%" }} fluid>
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
  );
}

export default App;
