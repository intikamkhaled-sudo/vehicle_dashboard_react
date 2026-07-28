import { useMemo } from "react";

import StatCard from "../Common/StatCard";
import { useVehicle } from "../../context/VehicleContext";
import { generateAlerts } from "../../utils/generateAlerts";

function KpiRow() {

    const { vehicles } = useVehicle();

    const onlineVehicles = useMemo(() => {

        return vehicles.filter(vehicle =>
            Date.now() - (vehicle.lastSeen || 0) < 10000
        ).length;

    }, [vehicles]);

    const offlineVehicles = vehicles.length - onlineVehicles;

    const activeAlerts = useMemo(() => {

        return vehicles.reduce((total, vehicle) => {

            return total + generateAlerts(vehicle).length;

        }, 0);

    }, [vehicles]);

    return (

        <div className="kpi-row">

            <StatCard
                title="TOTAL VEHICLES"
                value={vehicles.length}
            />

            <StatCard
                title="ONLINE"
                value={onlineVehicles}
            />

            <StatCard
                title="OFFLINE"
                value={offlineVehicles}
            />

            <StatCard
                title="ACTIVE ALERTS"
                value={activeAlerts}
            />

        </div>

    );

}

export default KpiRow;