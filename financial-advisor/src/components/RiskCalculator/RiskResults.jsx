import React from "react";
import { List, Header, Icon, Container } from "semantic-ui-react";

const RiskResults = ({ transfers = [], keys }) => (
  <Container>
    {!transfers.length && (
      <Header icon textAlign="center">
        <Icon name="info" />
        No rebalancing has been done
      </Header>
    )}
    <List divided relaxed>
      {transfers.map((result, index) => (
        <List.Item key={index}>
          <List.Icon name="marker" verticalAlign="middle" />
          <List.Content>
            <List.Header>{`Transfer $${result.amount} from ${
              keys[result.from]
            } to ${keys[result.to]}`}</List.Header>
          </List.Content>
        </List.Item>
      ))}
    </List>
  </Container>
);

export default RiskResults;
