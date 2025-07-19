"use client";

import { useTranslations } from "next-intl";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  ResponsiveContainer,
  Tooltip,
  CartesianGrid,
} from "recharts";

const data = [
  { day: "Mon", accuracy: 75, fullDay: "Monday" },
  { day: "Tue", accuracy: 82, fullDay: "Tuesday" },
  { day: "Wed", accuracy: 78, fullDay: "Wednesday" },
  { day: "Thu", accuracy: 85, fullDay: "Thursday" },
  { day: "Fri", accuracy: 80, fullDay: "Friday" },
  { day: "Sat", accuracy: 88, fullDay: "Saturday" },
  { day: "Sun", accuracy: 82, fullDay: "Sunday" },
];

interface CustomTooltipProps {
  active: boolean;
  payload: { payload: { fullDay: string; accuracy: number } }[];
  label?: string;
}

const CustomTooltip = ({ active, payload, label }: CustomTooltipProps) => {
  if (active && payload && payload.length) {
    const data = payload[0].payload;
    return (
      <div className="bg-white p-3 border border-gray-200 rounded-lg shadow-lg">
        <p className="font-medium text-gray-900">{data.fullDay}</p>
        <p className="text-sm text-gray-600">
          Accuracy:{" "}
          <span className="font-semibold text-blue-600">{data.accuracy}%</span>
        </p>
      </div>
    );
  }
  return null;
};

export function AccuracyChart() {
  const t = useTranslations("dashboard");

  // Calculate average accuracy
  const averageAccuracy = Math.round(
    data.reduce((sum, item) => sum + item.accuracy, 0) / data.length
  );

  // Find best and worst days
  const bestDay = data.reduce((prev, current) =>
    prev.accuracy > current.accuracy ? prev : current
  );
  const worstDay = data.reduce((prev, current) =>
    prev.accuracy < current.accuracy ? prev : current
  );

  const payloadData = data.map((item) => ({
    payload: { fullDay: item.fullDay, accuracy: item.accuracy },
  }));

  return (
    <Card className="w-full">
      <CardHeader className="pb-4">
        <div className="flex items-center justify-between">
          <div>
            <CardTitle className="text-lg font-semibold">
              {t("accuracyTrend")}
            </CardTitle>
            <CardDescription className="text-sm text-gray-600 mt-1">
              {t("weeklyPerformance")}
            </CardDescription>
          </div>
          <div className="text-right">
            <div className="text-2xl font-bold text-gray-900">
              {averageAccuracy}%
            </div>
            <div className="text-xs text-gray-500 uppercase tracking-wide">
              Average
            </div>
          </div>
        </div>

        {/* Quick stats */}
        <div className="flex items-center justify-between pt-3 border-t border-gray-100">
          <div className="text-center">
            <div className="text-sm font-medium text-gray-900">
              {bestDay.accuracy}%
            </div>
            <div className="text-xs text-gray-500">Best ({bestDay.day})</div>
          </div>
          <div className="text-center">
            <div className="text-sm font-medium text-gray-900">
              {worstDay.accuracy}%
            </div>
            <div className="text-xs text-gray-500">Lowest ({worstDay.day})</div>
          </div>
          <div className="text-center">
            <div className="text-sm font-medium text-gray-900">
              {data.filter((d) => d.accuracy >= averageAccuracy).length}
            </div>
            <div className="text-xs text-gray-500">Above Avg</div>
          </div>
        </div>
      </CardHeader>

      <CardContent className="pt-0">
        <div className="h-64 w-full">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart
              data={data}
              margin={{ top: 20, right: 20, left: 0, bottom: 20 }}
            >
              <CartesianGrid
                strokeDasharray="3 3"
                stroke="#f1f5f9"
                horizontal={true}
                vertical={false}
              />
              <XAxis
                dataKey="day"
                axisLine={false}
                tickLine={false}
                className="text-sm"
                tick={{ fontSize: 12, fill: "#64748b" }}
                dy={10}
              />
              <YAxis
                domain={[0, 100]}
                axisLine={false}
                tickLine={false}
                className="text-sm"
                tick={{ fontSize: 12, fill: "#64748b" }}
                tickFormatter={(value) => `${value}%`}
                width={40}
              />
              <Tooltip
                content={<CustomTooltip active payload={payloadData} />}
                cursor={{ stroke: "#e2e8f0", strokeWidth: 1 }}
              />
              <Line
                type="monotone"
                dataKey="accuracy"
                stroke="#2563eb"
                strokeWidth={3}
                dot={{
                  fill: "#2563eb",
                  strokeWidth: 2,
                  r: 5,
                  stroke: "#ffffff",
                }}
                activeDot={{
                  r: 7,
                  stroke: "#2563eb",
                  strokeWidth: 2,
                  fill: "#ffffff",
                }}
                connectNulls={false}
              />
            </LineChart>
          </ResponsiveContainer>
        </div>

        {/* Footer info */}
        <div className="mt-4 pt-3 border-t border-gray-100">
          <p className="text-xs text-gray-500 text-center">
            Hover over data points for detailed information
          </p>
        </div>
      </CardContent>
    </Card>
  );
}
