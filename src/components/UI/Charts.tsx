import React from "react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  AreaChart,
  Area,
} from "recharts";
import { dataForChartNew } from "../../utils/data";
// import { dataForChart } from "../../utils/dataForCharts";

interface props {
  typedTransaction: any;
  accBalance: number;
  type: string;
  usedBalance: number;
}

const Chart: React.FC<props> = ({
  typedTransaction,
  accBalance,
  type,
  usedBalance,
}) => {
  // const localData = dataForChart(typedTransaction);
  const localData1 = dataForChartNew(typedTransaction);
  return (
    <>
      <h2 className='container mx-auto rounded-xl rounded-b-none pt-3 text-xl md:text-2xl fond-bold font-extrabold pb-3 bg-gray-100 text-center font-alata hidden md:block'>
        {type === "savings_account"
          ? "Available Balance: "
          : "Credit Card Usage: "}
        <span
          className={`underline underline-offset-4 ${
            type === "savings_account" ? " text-green-700" : " text-red-700"
          }`}
        >
          Rs.
          {type === "savings_account" ? accBalance : usedBalance}
        </span>
      </h2>
      <div className='container mx-auto hidden w-full md:flex md:justify-center mb-12 rounded-xl rounded-t-none pb-5 bg-gray-100'>
        {/* <BarChart
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
        <Bar dataKey='credit' fill='#16a34a' />
        <Bar dataKey='debit' fill='#dc2626' />
      </BarChart> */}
        <AreaChart
          width={750}
          height={250}
          data={localData1}
          syncId='anyId'
          margin={{
            top: 10,
            right: 100,
            left: 0,
            bottom: 0,
          }}
        >
          <CartesianGrid strokeDasharray='3 3' />
          {/* <XAxis dataKey='name' /> */}
          <YAxis />
          <Tooltip />
          {type === "savings_account" ? (
            <Area
              type='monotone'
              dataKey='amt'
              stroke='#82ca9d'
              fill='#82ca9d'
            />
          ) : (
            <Area
              type='monotone'
              dataKey='amt'
              stroke='#f04d4d'
              fill='#f15959'
            />
          )}
        </AreaChart>
      </div>
    </>
  );
};

export default Chart;
