"use client";

import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip } from "recharts";

const data = [
    {
        name: "Alchemists",
        value: 45,
        color: "var(--color-chart-specialty-alchemists)",
    },
    {
        name: "Transmuters",
        value: 30,
        color: "var(--color-chart-specialty-transmuters)",
    },
    {
        name: "Conjurers",
        value: 25,
        color: "var(--color-chart-specialty-conjurers)",
    },
];

export default function WizardsBySpecialty() {
    return (
        <div className="w-75 rounded-[10px] border border-table-border bg-dashboard-background p-5">
            <h2 className="text-[24px] font-manrope-semibold leading-6 text-primary-text">
                Wizards by Specialty
            </h2>

            <div className="relative mt-4 h-[180px]">
                <ResponsiveContainer width="100%" height="100%">
                    <PieChart>
                        {/* Background ring */}
                        <Pie
                            data={[{ value: 100 }]}
                            dataKey="value"
                            cx="50%"
                            cy="50%"
                            innerRadius={73}
                            outerRadius={83}
                            startAngle={90}
                            endAngle={-270}
                            stroke="none"
                            fill="var(--color-dark-blue)"
                            isAnimationActive={false}
                        />

                        {/* Specialty segments */}
                        <Pie
                            data={data}
                            dataKey="value"
                            cx="50%"
                            cy="50%"
                            innerRadius={73}
                            outerRadius={83}
                            startAngle={90}
                            endAngle={-270}
                            stroke="none"
                            paddingAngle={0}
                            isAnimationActive={false}
                        >
                            {data.map((entry) => (
                                <Cell
                                    key={entry.name}
                                    fill={entry.color}
                                />
                            ))}
                        </Pie>

                        <Tooltip />
                    </PieChart>
                </ResponsiveContainer>

                {/* Center */}
                <div className="pointer-events-none absolute inset-0 flex flex-col items-center justify-center">
                    <span className="text-[20px] font-medium leading-6 text-primary-text">
                        1.2k
                    </span>

                    <span className="text-[11px] leading-4 text-primary-text">
                        Total
                    </span>
                </div>
            </div>

            {/* Legend */}
            <div className="mt-2 space-y-2">
                {data.map((item) => (
                    <div
                        key={item.name}
                        className="flex items-center justify-between text-[13px] leading-4"
                    >
                        <div className="flex items-center gap-2">
                            <span
                                className="h-2.5 w-2.5 rounded-full"
                                style={{
                                    backgroundColor: item.color,
                                }}
                            />

                            <span className="text-primary-text">
                                {item.name}
                            </span>
                        </div>

                        <span className="text-primary-text">
                            {item.value}%
                        </span>
                    </div>
                ))}
            </div>
        </div>
    );
}