import DashboardStatCard from "@/components/DashboardStatCard";

const dashboardStats = [
    {
        title: "TOTAL REGISTERED WIZARDS",
        value: 1248,
        description: "↗ +4% from last moon",
        type: "total-wizards" as const,
    },
    {
        title: "ACTIVE ELIXIRS",
        value: 856,
        description: "⚗ 24 new formulas registered",
        type: "active-elixirs" as const,
    },
    {
        title: "PENDING VERIFICATIONS",
        value: 12,
        description: "! Requires High-Council approval",
        type: "pending-verifications" as const,
    },
];

export default function DashboardStats() {
    return (
        <div className="flex flex-row gap-5 ">
            {dashboardStats.map((stat) => (
                <DashboardStatCard
                    key={stat.type}
                    title={stat.title}
                    value={stat.value}
                    description={stat.description}
                    type={stat.type}
                />
            ))}
        </div>
    );
}