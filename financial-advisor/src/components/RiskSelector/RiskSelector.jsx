import React from "react";
import { Button, Card, Header, Progress } from "semantic-ui-react";
import RiskButtonGroup from "./RiskButtonGroup";
import RiskChart from "./RiskChart";
import RiskTable from "./RiskTable";

class RiskSelector extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      showChart: false
    };
  }

  render() {
    const {
      activeRisk = 1,
      risksData,
      handleRiskSelected,
      handleContinue
    } = this.props;
    const { showChart } = this.state;
    return (
      <React.Fragment>
        <Card.Content style={{ flexGrow: 0 }}>
          <Card.Header>
            Please Select A Risk Level For Your Investment Portfolio
          </Card.Header>
          <Card.Description>
            <Progress
              value={activeRisk}
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
              activeValue={activeRisk}
              handleRiskSelected={handleRiskSelected}
              handleContinue={handleContinue}
              {...this.props}
            />

            <Button.Group floated="right">
              <Button
                icon="table"
                color="grey"
                content="Table"
                onClick={() =>
                  this.setState(() => ({
                    showChart: false
                  }))
                }
              />
              <Button.Or />
              <Button
                icon="pie graph"
                color="blue"
                content="Graphic"
                onClick={() =>
                  this.setState(() => ({
                    showChart: true
                  }))
                }
              />
            </Button.Group>
          </Card.Description>
        </Card.Content>
        <Card.Content style={{ display: "block", overflowY: "auto" }}>
          {!showChart && (
            <RiskTable
              items={risksData}
              activeValue={activeRisk}
              {...this.props}
            />
          )}
          {showChart && (
            <RiskChart item={risksData[activeRisk - 1]} {...this.props} />
          )}
        </Card.Content>
      </React.Fragment>
    );
  }
}

export default RiskSelector;
