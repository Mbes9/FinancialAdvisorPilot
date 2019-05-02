import React from "react";
import { Button } from "semantic-ui-react";

const HeaderAdviser = ({
  activeValue = 1,
  values = [],
  handleRiskSelected,
  handleContinue
}) => (
  <Button.Group>
    {values.map((v, index) => (
      <React.Fragment key={index}>
        <Button active={v === activeValue} onClick={handleRiskSelected(v)}>
          {v}
        </Button>
        <Button.Or />
      </React.Fragment>
    ))}
    <Button
      icon="play"
      color="green"
      content="Continue"
      onClick={handleContinue}
    />
  </Button.Group>
);

export default HeaderAdviser;
