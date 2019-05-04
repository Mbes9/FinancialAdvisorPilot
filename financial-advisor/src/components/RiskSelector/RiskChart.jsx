import React from "react";
import { Cell, Pie, PieChart, Tooltip } from "recharts";

const COLORS = ["#0088FE", "#00C49F", "#FFBB28", "#FF8042", "#C10000"];
const RADIAN = Math.PI / 180;
const renderCustomizedLabel = ({
  cx,
  cy,
  midAngle,
  innerRadius,
  outerRadius,
  keyName
}) => {
  const radius = innerRadius + (outerRadius - innerRadius) * 0.5;
  const x = cx + radius * Math.cos(-midAngle * RADIAN);
  const y = cy + radius * Math.sin(-midAngle * RADIAN);
  return (
    <text x={x} y={y} fill="white" textAnchor={x > cx ? "start" : "end"}>
      {`${keyName}`}
    </text>
  );
};

const RiskChart = ({ item = {} }) => {
  const keys = Object.keys(item);
  const values = keys.slice(1).map(key => {
    return { value: item[key], keyName: key, name: key };
  });
  console.log("values: ", values);
  return (
    <PieChart
      width={window.innerWidth - window.innerWidth * 0.6}
      height={window.innerHeight - window.innerHeight * 0.5}
      style={{ display: "inline-block" }}
    >
      <Pie
        dataKey="value"
        data={values.filter(v => v.value !== 0)}
        cx={window.innerWidth - window.innerWidth * 0.8}
        cy={window.innerWidth - window.innerWidth * 0.88}
        outerRadius={window.innerWidth - window.innerWidth * 0.92}
        labelLine={false}
        label={renderCustomizedLabel}
      >
        {keys.map((entry, index) => {
          return <Cell key={index} fill={COLORS[index % COLORS.length]} />;
        })}
      </Pie>
      <Tooltip formatter={(value, name, props) => `${value}%`} />
    </PieChart>
  );
};

export default RiskChart;
