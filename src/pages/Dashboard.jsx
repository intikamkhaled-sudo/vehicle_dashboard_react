import DashboardLayout from "../layouts/DashboardLayout";

import KpiRow from "../components/KPI/KpiRow";
import SelectedVehicle from "../components/Vehicle/SelectedVehicle";

import GaugePanel from "../components/Gauges/GaugePanel";
import AlertsPanel from "../components/Alerts/AlertsPanel";

import ChartsPanel from "../components/Charts/ChartsPanel";
import MapPanel from "../components/Map/MapPanel";
import TelemetryTable from "../components/Table/TelemetryTable";
import FleetAnalytics
from "../components/Analytics/FleetAnalytics";
import VehicleHealth from "../components/Analytics/VehicleHealth";

function Dashboard() {
    return (
        <DashboardLayout>

            <KpiRow />

            <SelectedVehicle />

            <div className="grid-2col">
                <GaugePanel />
                <AlertsPanel />
            </div>

            <ChartsPanel />
            

<FleetAnalytics />
        <VehicleHealth />
            <MapPanel />

            <TelemetryTable />

        </DashboardLayout>
    );
}

export default Dashboard;