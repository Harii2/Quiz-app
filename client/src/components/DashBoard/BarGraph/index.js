import "./index.css";
import React from "react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,ResponsiveContainer
} from "recharts";


const data = [{content:'OOPS',count:5},
{content:'Collections',count:3},
{content:'JDBC',count:2},{content:'Exceptions',count:3},{content:'Threading',count:5},{content:'Arrays',count:10}]


export default function BarApp() {
    return (
      <div>
         <ResponsiveContainer width="100%" height={200}>
          <LineChart
            width={500}
            height={200}
            data={data}
            margin={{
              top: 10,
              right: 30,
              left: 0,
              bottom: 0,
            }}
          >
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="content" />
            <YAxis />
            <Tooltip />
            <Line connectNulls type="monotone" dataKey="count" stroke="#8884d8" fill="#8884d8" />
          </LineChart>
        </ResponsiveContainer>


        
      </div>
    );
  }