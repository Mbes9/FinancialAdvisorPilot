import React from "react";
import { Form, Input, Table, Header, Button, Icon } from "semantic-ui-react";

const RiskForm = ({ handleChange, currentData, inputs }) => (
  <Table basic="very" celled collapsing>
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
              value={currentData[i.name]}
            />
          </Table.Cell>
          <Table.Cell>
            <Input />
          </Table.Cell>
          <Table.Cell>
            <Input />
          </Table.Cell>
        </Table.Row>
      ))}
      <Table.Row>
        <Table.Cell colSpan="4">
          <Button icon labelPosition="right" fluid color='blue'>
            Rebalance
            <Icon name="right arrow" />
          </Button>
        </Table.Cell>
      </Table.Row>
    </Table.Body>
  </Table>
);

export default RiskForm;
