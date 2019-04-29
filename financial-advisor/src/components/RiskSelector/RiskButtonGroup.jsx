import React from "react";
import { Button } from "semantic-ui-react";

const HeaderAdviser = ({ activeValue = 1, values = [] }) => (
  <Button.Group>
    {values.map((v, index) => (
      <React.Fragment key={index}>
        <Button active={v === activeValue}>{v}</Button>
        {index !== values.length - 1 && <Button.Or />}
      </React.Fragment>
    ))}
  </Button.Group>
);

export default HeaderAdviser;
