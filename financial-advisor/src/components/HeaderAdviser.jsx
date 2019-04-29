import React from "react";
import { Header, Icon } from "semantic-ui-react";

const HeaderAdviser = () => (
  <div>
    <Header as="h2" icon textAlign="center">
      <Icon name="info" circular style={{ marginTop: "1%" }} />
      <Header.Content>Financial Advisor</Header.Content>
    </Header>
  </div>
);

export default HeaderAdviser;
