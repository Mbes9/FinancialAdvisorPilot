import React from "react";
import { Header, Table } from "semantic-ui-react";

const RiskTable = ({ items = [], activeValue = 1 }) => (
  <Table celled unstackable>
    <Table.Header>
      <Table.Row textAlign="center">
        <Table.HeaderCell singleLine>Risk</Table.HeaderCell>
        <Table.HeaderCell>Bonds %</Table.HeaderCell>
        <Table.HeaderCell>Large Cap %</Table.HeaderCell>
        <Table.HeaderCell>Mid Cap %</Table.HeaderCell>
        <Table.HeaderCell>Foreign %</Table.HeaderCell>
        <Table.HeaderCell>Small Cap %</Table.HeaderCell>
      </Table.Row>
    </Table.Header>
    <Table.Body>
      {items.map((item, index) => (
        <Table.Row
          key={index}
          textAlign="center"
          positive={item.risk === activeValue}
        >
          <Table.Cell>
            <Header as="h3" textAlign="center">
              {item.risk}
            </Header>
          </Table.Cell>
          <Table.Cell>{item.bonds}</Table.Cell>
          <Table.Cell>{item.largeCap}</Table.Cell>
          <Table.Cell>{item.midCap}</Table.Cell>
          <Table.Cell>{item.foreign}</Table.Cell>
          <Table.Cell>{item.smallCap}</Table.Cell>
        </Table.Row>
      ))}
    </Table.Body>
  </Table>
);

export default RiskTable;
