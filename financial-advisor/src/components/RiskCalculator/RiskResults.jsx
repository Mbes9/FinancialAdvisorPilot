import React from "react";
import { List } from "semantic-ui-react";

const RiskResults = ({ results = [] }) => (
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
);

export default RiskResults;
