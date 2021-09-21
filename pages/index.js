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
import { CardanoPrice } from "../components/CardanoPrice";

export default function Home() {
  return (
    <div>
    <CardanoPrice />
    </div>
  );
}
