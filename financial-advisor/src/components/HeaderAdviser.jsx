import React from "react";
import { Button, Header, Icon } from "semantic-ui-react";

const HeaderAdviser = ({ handleBack }) => (
  <div>
    <Button
      floated="left"
      basic
      icon="arrow left"
      onClick={handleBack}
      style={{ width: "7%" }}
    />
    <Header as="h2" icon textAlign="center">
      <Icon name="info" circular />
      <Header.Content >Financial Advisor</Header.Content>
    </Header>
  </div>
);

export default HeaderAdviser;
