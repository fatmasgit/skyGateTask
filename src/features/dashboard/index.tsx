import WizardsTable from "./wizardsTable";
import ActivityChart from "./activityChart";
import WizardsBySpecialty from "./wizardsBySpecialt";
import DashboardStats from "./dashboardStats";

export default function DashboardFeature() {
    return (
        <main className="space-y-6 p-8 bg-dashboard-background ">
            <div>
                <h1 className="text-[40px]  font-bold text-primary-text">
                    Wizards Dashboard
                </h1>
                <p className="text-lg text-secondary-text">
                    Overseeing the mystical equilibrium across all magical realms.
                </p>
            </div>

            <DashboardStats />

            <div className="flex flex-row gap-6 ">
                <ActivityChart />
                <WizardsBySpecialty />
            </div>
            <WizardsTable />
        </main>
    );
}