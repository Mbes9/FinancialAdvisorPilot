import React from "react";
import { Button, Header, Icon, Input, Table } from "semantic-ui-react";

const RiskForm = ({
  handleChange,
  currentPortfolio,
  differences = [],
  newAmount = [],
  inputs,
  handleCalculate,
  formErrors
}) => (
  <Table basic="very" celled >
    <Table.Header>
      <Table.Row>
        <Table.HeaderCell />
        <Table.HeaderCell>Current Amount</Table.HeaderCell>
        <Table.HeaderCell>Difference</Table.HeaderCell>
        <Table.HeaderCell>New Amount</Table.HeaderCell>
      </Table.Row>
    </Table.Header>
    <Table.Body>
      {inputs.map((i, index) => (
        <Table.Row key={index}>
          <Table.Cell>
            <Header as="h4">
              <Header.Content>{i.text}</Header.Content>
            </Header>
          </Table.Cell>
          <Table.Cell>
            <Input
              placeholder="$$$$"
              onChange={handleChange}
              name={i.name}
              value={currentPortfolio[i.name]}
              error={formErrors[i.name]}
            />
          </Table.Cell>
          <Table.Cell>
            <Input
              value={!isNaN(differences[index]) ? differences[index] : ""}
              disabled
              style={{ opacity: 1 }}
              input={{
                style: {
                  color:
                    !isNaN(differences[index]) && differences[index] < 0
                      ? "red"
                      : "green"
                }
              }}
            />
          </Table.Cell>
          <Table.Cell>
            <Input
              value={!isNaN(newAmount[index]) ? newAmount[index] : ""}
              disabled
              style={{ opacity: 1 }}
            />
          </Table.Cell>
        </Table.Row>
      ))}
      <Table.Row>
        <Table.Cell colSpan="4">
          <Button
            icon
            labelPosition="right"
            fluid
            color="blue"
            onClick={handleCalculate}
          >
            {"Rebalance"}
            <Icon name="right arrow" />
          </Button>
        </Table.Cell>
      </Table.Row>
    </Table.Body>
  </Table>
);

export default RiskForm;
