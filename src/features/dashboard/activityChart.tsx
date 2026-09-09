import {
    Bar,
    BarChart,
    CartesianGrid,
    ResponsiveContainer,
    Tooltip,
    XAxis,
    YAxis,
} from "recharts";

interface ActivityData {
    id: number;
    value: number;
}

const activityData: ActivityData[] = [
    { id: 1, value: 8 },
    { id: 2, value: 12 },
    { id: 3, value: 7 },
    { id: 4, value: 11 },
    { id: 5, value: 17 },
    { id: 6, value: 9 },
    { id: 7, value: 15 },
    { id: 8, value: 19 },
    { id: 9, value: 14 },
    { id: 10, value: 8 },
    { id: 11, value: 6 },
    { id: 12, value: 15 },
];

interface CustomXAxisTickProps {
    x?: number;
    y?: number;
    payload?: {
        value: number;
    };
}

const CustomXAxisTick = ({
    x = 0,
    y = 0,
    payload,
}: CustomXAxisTickProps) => {
    if (!payload) {
        return null;
    }

    const labels: Record<number, string> = {
        1: "Moon Start",
        7: "Full Moon",
        12: "Moon End",
    };

    const label = labels[payload.value];

    if (!label) {
        return null;
    }

    return (
        <text
            x={x}
            y={y + 18}
            textAnchor={
                payload.value === 1
                    ? "start"
                    : payload.value === 12
                        ? "end"
                        : "middle"
            }
            style={{
                fill: "var(--color-chart-label)",
            }}
            fontSize={10}
        >
            {label}
        </text>
    );
};

interface CustomTooltipProps {
    active?: boolean;
    payload?: {
        value: number;
    }[];
}

const CustomTooltip = ({
    active,
    payload,
}: CustomTooltipProps) => {
    if (!active || !payload?.length) {
        return null;
    }

    return (
        <div className="rounded-md border border-table-border bg-dashboard-background px-3 py-2">
            <p className="text-xs text-chart-label">
                Registry Activity
            </p>
            <p className="text-sm font-manrope-semibold text-primary-text">
                {payload[0].value}
            </p>
        </div>
    );
};

export default function ActivityChart() {
    return (
        <div className="w-155 rounded-xl border border-table-border bg-dashboard-background p-4">
            <div className="mb-5 flex items-center justify-between">
                <h2 className="text-[24px] font-manrope-semibold text-primary-text">
                    Registry Activity
                </h2>

                <button
                    type="button"
                    className="rounded-md bg-chart-caption px-3 py-1.5 text-[11px] font-manrope-medium text-primary-text"
                >
                    Last 30 Days
                </button>
            </div>

            <div className="mb-4 h-px w-full bg-table-border" />

            <div className="h-[270px] w-full">
                <ResponsiveContainer width="100%" height="100%">
                    <BarChart
                        data={activityData}
                        margin={{
                            top: 10,
                            right: 6,
                            left: 6,
                            bottom: 20,
                        }}
                        barCategoryGap="18%"
                    >
                        <CartesianGrid
                            vertical={false}
                            stroke="var(--color-table-border)"
                            strokeDasharray="0"
                        />

                        <XAxis
                            dataKey="id"
                            axisLine={false}
                            tickLine={false}
                            tick={<CustomXAxisTick />}
                            interval={0}
                        />

                        <YAxis
                            hide
                            domain={[0, 20]}
                        />

                        <Tooltip
                            cursor={{
                                fill: "hsla(211, 76%, 8%, 0.8)",
                            }}
                            content={<CustomTooltip />}
                        />

                        <Bar
                            dataKey="value"
                            fill="var(--color-chart-bar)"
                            barSize={38}
                        />
                    </BarChart>
                </ResponsiveContainer>
            </div>
        </div>
    );
}