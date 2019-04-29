import React from "react";
import { Card, Header, Progress, Button, Icon } from "semantic-ui-react";
import RiskButtonGroup from "./RiskButtonGroup";
import RiskTable from "./RiskTable";

const items = [
  {
    risk: 1,
    bonds: 80,
    largeCap: 20,
    midCap: 0,
    foreign: 0,
    smallCap: 0
  },
  {
    risk: 2,
    bonds: 70,
    largeCap: 15,
    midCap: 15,
    foreign: 0,
    smallCap: 0
  },
  {
    risk: 3,
    bonds: 60,
    largeCap: 15,
    midCap: 15,
    foreign: 10,
    smallCap: 0
  },
  {
    risk: 4,
    bonds: 50,
    largeCap: 20,
    midCap: 20,
    foreign: 10,
    smallCap: 0
  },
  {
    risk: 5,
    bonds: 40,
    largeCap: 20,
    midCap: 20,
    foreign: 20,
    smallCap: 0
  },
  {
    risk: 6,
    bonds: 35,
    largeCap: 25,
    midCap: 5,
    foreign: 30,
    smallCap: 5
  },
  {
    risk: 7,
    bonds: 20,
    largeCap: 25,
    midCap: 25,
    foreign: 25,
    smallCap: 5
  },
  {
    risk: 8,
    bonds: 10,
    largeCap: 20,
    midCap: 40,
    foreign: 20,
    smallCap: 10
  },
  {
    risk: 9,
    bonds: 5,
    largeCap: 15,
    midCap: 40,
    foreign: 25,
    smallCap: 15
  },
  {
    risk: 10,
    bonds: 0,
    largeCap: 5,
    midCap: 25,
    foreign: 30,
    smallCap: 40
  }
];

class RiskSelector extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    const { riskValue = 1 } = this.props;
    return (
      <React.Fragment>
        <Card.Content>
          <Card.Header>
            Please Select A Risk Level For Your Investment Portfolio
          </Card.Header>
          <Card.Description>
            <Progress
              value={riskValue}
              total="10"
              progress="ratio"
              error
              size="small"
              style={{ backgroundColor: "rgba(0,128,0, 0.5)" }}
            >
              <Header as="h3" floated="left">
                Low
              </Header>
              <Header as="h3" floated="right">
                High
              </Header>
            </Progress>
            <RiskButtonGroup
              values={[1, 2, 3, 4, 5, 6, 7, 8, 9, 10]}
              activeValue={riskValue}
              {...this.props}
            />
            <Button.Group floated="right">
              <Button icon="table" color="grey" content="Table" />
              <Button.Or />
              <Button icon="pie graph" color="blue" content="Graphic" />
            </Button.Group>
          </Card.Description>
        </Card.Content>
        <Card.Content style={{ display: "block", overflowY: "auto" }}>
          <RiskTable items={items} activeValue={riskValue} />
        </Card.Content>
      </React.Fragment>
    );
  }
}

export default RiskSelector;
