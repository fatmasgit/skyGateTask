interface DashboardStatCardProps {
    title: string;
    value: string | number;
    description: string;
    type: "active-elixirs" | "total-wizards" | "pending-verifications";
}

const statColors = {
    "active-elixirs": "text-active-elixirs",
    "total-wizards": "text-total-wizards",
    "pending-verifications": "text-pending-verifications",
} as const;

export default function DashboardStatCard({
    title,
    value,
    description,
    type,
}: DashboardStatCardProps) {
    return (
        <div className="w-[300px] rounded-xl border border-table-border bg-dashboard-background px-5 py-4">
            {/* Title */}
            <p className="text-sm font-manrope-medium tracking-wide text-secondary-text">
                {title}
            </p>

            {/* Value */}
            <p className={`mt-1 text-2xl font-manrope-semibold ${statColors[type]}`}>
                {value}
            </p>

            {/* Description */}
            <p className={`mt-4 text-xs ${statColors[type]}`}>
                {description}
            </p>
        </div>
    );
}