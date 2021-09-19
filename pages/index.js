import {
  ResponsiveContainer,
  AreaChart,
  XAxis,
  YAxis,
  Area,
  Tooltip,
  CartesianGrid,
} from "recharts";
import { format, parseISO, subDays } from "date-fns";
import { CardanoStats } from "./api/CardanoStats";
import { CardanoStakingGraph } from "./api/CardanoStakingGraph";

const data = [];
const min = 1;
const max = 20;
for (let num = 0; num <= 30; num++) {
  data.push({
    epoch: 200 + num,
    value: Math.random() * (max - min) + min,
  });
}

export default function Home() {
  return (
    <div>
    <CardanoStats />
    <CardanoStakingGraph />
    <ResponsiveContainer width="100%" height={400}>
      <AreaChart data={data}>
        <defs>
          <linearGradient id="color" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#2451B7" stopOpacity={0.4} />
            <stop offset="75%" stopColor="#2451B7" stopOpacity={0.05} />
          </linearGradient>
        </defs>

        <Area dataKey="value" stroke="#2451B7" fill="url(#color)" />

        <XAxis
          dataKey="epoch"
          axisLine={false}
          tickLine={false}
          tickFormatter={(str) => {
            return str;
          }}
        />

        <YAxis
          datakey="value"
          axisLine={false}
          tickLine={false}
          tickCount={8}
          tickFormatter={(number) => `${number.toFixed(2)}`}
        />

        <Tooltip content={<CustomTooltip />} />

        <CartesianGrid opacity={0.1} vertical={false} />
      </AreaChart>
    </ResponsiveContainer>
    </div>
  );
}

function CustomTooltip({ active, payload, label }) {
  if (active) {
    return (
      <div className="tooltip">
        <h4>Epoch: {payload[0].epoch}</h4>
        <p>{payload[0].value} ADA</p>
      </div>
    );
  }
  return null;
}
