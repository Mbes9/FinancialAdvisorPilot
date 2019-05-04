import React from "react";
import { List, Header, Icon } from "semantic-ui-react";

const RiskResults = ({ results = [] }) => (
  <React.Fragment>
    {!results.length && (
      <Header icon>
        <Icon name="info" />
        No rebalancing has been done
      </Header>
    )}
    <List divided relaxed>
      {results.map((result, index) => (
        <List.Item key={index}>
          <List.Icon name="marker" />
          <List.Content>
            <List.Header>{result}</List.Header>
          </List.Content>
        </List.Item>
      ))}
    </List>
  </React.Fragment>
);

export default RiskResults;
