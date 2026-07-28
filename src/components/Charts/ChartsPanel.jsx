import { useMemo } from "react";

import { useVehicle } from "../../context/VehicleContext";
import TelemetryChart from "./TelemetryChart";

function ChartsPanel() {

    const {
        history,
        selectedVehicle
    } = useVehicle();

    const chartData = useMemo(() => {

        if (!selectedVehicle) return [];

        return history
            .filter(
                h => h.vehicleID === selectedVehicle.vehicleID
            )
            .slice(-50);

    }, [history, selectedVehicle]);

    if (!selectedVehicle) {
        return null;
    }

    return (

        <div
            style={{
                display: "grid",
                gridTemplateColumns: "1fr 1fr",
                gap: "20px"
            }}
        >

            <TelemetryChart
                title="Speed"
                data={chartData}
                dataKey="speed"
                color="#00ff88"
                unit="km/h"
            />

            <TelemetryChart
                title="RPM"
                data={chartData}
                dataKey="rpm"
                color="#00bfff"
                unit="RPM"
            />

            <TelemetryChart
                title="Fuel Level"
                data={chartData}
                dataKey="fuel"
                color="#ffd43b"
                unit="%"
            />

            <TelemetryChart
                title="Engine Temperature"
                data={chartData}
                dataKey="temperature"
                color="#ff5555"
                unit="°C"
            />

        </div>

    );

}

export default ChartsPanel;