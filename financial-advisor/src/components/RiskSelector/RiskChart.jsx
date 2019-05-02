import React from "react";
import { Cell, Pie, PieChart } from "recharts";

const COLORS = ["#0088FE", "#00C49F", "#FFBB28", "#FF8042", "#C10000"];

const RiskChart = ({ item = {} }) => {
  const keys = Object.keys(item);
  const values = keys
    .filter(key => key !== "risk")
    .map(key => {
      return { value: item[key], keyName: key };
    });
  return (
    <PieChart
      width={window.innerWidth - window.innerWidth * 0.6}
      height={window.innerHeight - window.innerHeight * 0.5}
      style={{ display: "inline" }}
    >
      <Pie
        dataKey="value"
        data={values.filter(v => v.value !== 0)}
        cx={window.innerWidth - window.innerWidth * 0.8}
        cy={window.innerWidth - window.innerWidth * 0.88}
        innerRadius={window.innerWidth - window.innerWidth * 0.93}
        outerRadius={window.innerWidth - window.innerWidth * 0.92}
        paddingAngle={5}
        label={({ keyName }) => keyName}
      >
        {keys.map((entry, index) => {
          return <Cell key={index} fill={COLORS[index % COLORS.length]} />;
        })}
      </Pie>
    </PieChart>
  );
};

export default RiskChart;
