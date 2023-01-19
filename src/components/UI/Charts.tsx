import React from "react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
} from "recharts";
import { dataForChart } from "../../utils/dataForCharts";

interface props {
  typedTransaction: any;
}

const Chart: React.FC<props> = ({ typedTransaction }) => {
  const localData = dataForChart(typedTransaction);
  return (
    <div className='container mx-auto w-full hidden  md:flex md:justify-center'>
      <BarChart
        width={500}
        height={300}
        data={localData}
        margin={{
          top: 5,
          right: 30,
          left: 20,
          bottom: 5,
        }}
      >
        <CartesianGrid strokeDasharray='3 3' />
        <XAxis dataKey='name' />
        <YAxis />
        <Tooltip />
        <Legend />
        <Bar dataKey='credit' fill='#ef2d29' />
        <Bar dataKey='debit' fill='#4ef18c' />
      </BarChart>
    </div>
  );
};

export default Chart;
