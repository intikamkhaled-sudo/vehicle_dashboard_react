import StatCard from "../Common/StatCard";
import { useVehicle } from "../../context/VehicleContext";
import { getVehicleStatus } from "../../utils/vehicleStatus";
import { exportVehiclePDF } from "../../reports/exportPDF";

function SelectedVehicle() {

    const { selectedVehicle } = useVehicle();

    if (!selectedVehicle) {
        return (
            <section className="panel">
                <div className="panel-header">
                    Selected Vehicle
                </div>

                <div className="panel-body">
                    No Vehicle Selected
                </div>
            </section>
        );
    }

    const vehicleStatus = getVehicleStatus(selectedVehicle);

    return (

        <section className="panel">

            <div className="panel-header">
                Selected Vehicle
            </div>

            <div className="panel-body">

                <div className="vehicle-id-block">

                    <h2>{selectedVehicle.vehicleID}</h2>

                    <span
                        className={`badge bg-${vehicleStatus.status.toLowerCase()}`}
                    >
                        {vehicleStatus.status}
                    </span>

                </div>

                {/* زر التصدير */}
                <div
                    style={{
                        display: "flex",
                        justifyContent: "flex-end",
                        marginBottom: "20px"
                    }}
                >
                    <button
                        className="btn btn-primary"
                        onClick={() => exportVehiclePDF(selectedVehicle)}
                    >
                        📄 Export PDF
                    </button>
                </div>

                <div className="vehicle-stats-grid">

                    <StatCard
                        title="Speed"
                        value={`${selectedVehicle.speed ?? 0} km/h`}
                    />

                    <StatCard
                        title="RPM"
                        value={selectedVehicle.rpm ?? 0}
                    />

                    <StatCard
                        title="Fuel Level"
                        value={`${(selectedVehicle.fuelLevel ?? 0).toFixed(1)} %`}
                    />

                    <StatCard
                        title="Fuel Consumption"
                        value={`${selectedVehicle.fuelConsumption ?? 0} L/100km`}
                    />

                    <StatCard
                        title="Engine Temp"
                        value={`${selectedVehicle.engineTemperature ?? 0} °C`}
                    />

                    <StatCard
                        title="Coolant Temp"
                        value={`${selectedVehicle.coolantTemperature ?? 0} °C`}
                    />

                    <StatCard
                        title="Oil Pressure"
                        value={`${selectedVehicle.oilPressure ?? 0} bar`}
                    />

                    <StatCard
                        title="Engine Load"
                        value={`${selectedVehicle.engineLoad ?? 0} %`}
                    />

                    <StatCard
                        title="Throttle"
                        value={`${selectedVehicle.throttlePosition ?? 0} %`}
                    />

                    <StatCard
                        title="Gear"
                        value={selectedVehicle.gear ?? "-"}
                    />

                    <StatCard
                        title="Trip"
                        value={`${selectedVehicle.tripDistance ?? 0} km`}
                    />

                    <StatCard
                        title="Odometer"
                        value={`${selectedVehicle.odometer ?? 0} km`}
                    />

                    <StatCard
                        title="Latitude"
                        value={selectedVehicle.latitude ?? "--"}
                    />

                    <StatCard
                        title="Longitude"
                        value={selectedVehicle.longitude ?? "--"}
                    />

                    <StatCard
                        title="GPS"
                        value={selectedVehicle.gpsStatus ?? "--"}
                    />

                </div>

            </div>

        </section>

    );
}

export default SelectedVehicle;