import React from "react";
import {
  Card,
  Grid,
  Icon,
  Message,
  Progress,
  Segment
} from "semantic-ui-react";
import RiskTable from "../RiskSelector/RiskTable";
import RiskForm from "./RiskForm";
import RiskResults from "./RiskResults";

class RiskCalculator extends React.Component {
  render() {
    const { risksData, activeRisk, someError } = this.props;

    const item = risksData[activeRisk - 1];
    const keys = Object.keys(item).slice(1);

    return (
      <React.Fragment>
        <Card.Content style={{ flexGrow: 0 }}>
          <Card.Header textAlign="center">Personalized Portfolio</Card.Header>
          <Card.Description>
            <Progress
              value={item.risk}
              total="10"
              progress="ratio"
              error
              size="small"
              style={{ backgroundColor: "rgba(0,128,0, 0.5)" }}
            />
            <RiskTable items={[item]} />
          </Card.Description>
        </Card.Content>
        <Card.Content style={{ display: "block", overflowY: "auto" }}>
          <Grid columns="equal" divided stackable>
            <Grid.Column mobile={16} tablet={16} computer={8}>
              <RiskForm
                inputs={[
                  { name: "bonds", text: "Bonds" },
                  { name: "largeCap", text: "Large Cap" },
                  { name: "midCap", text: "Mid Cap" },
                  { name: "foreign", text: "Foreign" },
                  { name: "smallCap", text: "Small Cap" }
                ]}
                {...this.props}
              />
            </Grid.Column>
            <Grid.Column mobile={16} tablet={16} computer={8}>
              <Segment attached placeholder style={{ height: "70%" }}>
                <RiskResults {...this.props} keys={keys} />
              </Segment>

              {someError && (
                <Segment attached="bottom">
                  <Message attached="bottom" negative>
                    <Icon name="warning" />
                    Please use only positive digits or zero when entering
                    current amounts. Please enter all inputs correctly.
                  </Message>
                </Segment>
              )}
            </Grid.Column>
          </Grid>
        </Card.Content>
      </React.Fragment>
    );
  }
}

export default RiskCalculator;
