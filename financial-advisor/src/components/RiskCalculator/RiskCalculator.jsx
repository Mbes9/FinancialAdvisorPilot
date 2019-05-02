import React from "react";
import {
  Button,
  Card,
  Header,
  Progress,
  Divider,
  Segment,
  Grid
} from "semantic-ui-react";
import RiskTable from "../RiskSelector/RiskTable";
import RiskForm from "./RiskForm";
import RiskResults from "./RiskResults";

class RiskCalculator extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      currentData: {
        bonds: "",
        largeCap: "",
        midCap: "",
        foreign: "",
        smallCap: ""
      }
    };
  }

  handleChange = (e, { name, value }) => {
    this.setState(prevState => ({
      currentData: {
        ...prevState.currentData,
        [name]: value
      }
    }));
  };

  render() {
    const { risksData, activeRisk } = this.props;
    const { currentData, results } = this.state;

    const item = risksData[activeRisk - 1];
    return (
      <React.Fragment>
        <Card.Content style={{ flexGrow: 0 }}>
          <Card.Header>Personalized Portfolio</Card.Header>
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
          <Grid columns="2" divided>
            <Grid.Row>
              <Grid.Column>
                <RiskForm
                  currentData={currentData}
                  handleChange={this.handleChange}
                  inputs={[
                    { name: "bonds", text: "Bonds" },
                    { name: "largeCap", text: "Large Cap" },
                    { name: "midCap", text: "Mid Cap" },
                    { name: "foreign", text: "Foreign" },
                    { name: "smallCap", text: "Small Cap" }
                  ]}
                />
              </Grid.Column>
              <Grid.Column>
                <RiskResults results={results} />
              </Grid.Column>
            </Grid.Row>
          </Grid>
        </Card.Content>
      </React.Fragment>
    );
  }
}

export default RiskCalculator;
