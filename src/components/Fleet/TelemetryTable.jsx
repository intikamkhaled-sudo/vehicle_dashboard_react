import { useVehicle } from "../../context/VehicleContext";

function TelemetryTable() {

    const { selectedVehicle } = useVehicle();

    if (!selectedVehicle) return null;

    return (

        <section className="panel">

            <div className="panel-header">
                Live Telemetry
            </div>

            <div className="panel-body">

                <table className="table table-dark table-striped mb-0">

                    <thead>

                        <tr>

                            <th>Vehicle</th>
                            <th>Speed</th>
                            <th>RPM</th>
                            <th>Fuel</th>
                            <th>Engine Temp</th>
                            <th>Gear</th>
                            <th>Trip</th>
                            <th>GPS</th>

                        </tr>

                    </thead>

                    <tbody>

                        <tr>

                            <td>{selectedVehicle.vehicleID}</td>

                            <td>{selectedVehicle.speed ?? 0} km/h</td>

                            <td>{selectedVehicle.rpm ?? 0}</td>

                            <td>
                                {(selectedVehicle.fuelLevel ?? 0).toFixed(1)} %
                            </td>

                            <td>
                                {selectedVehicle.engineTemperature ?? 0} °C
                            </td>

                            <td>{selectedVehicle.gear ?? "-"}</td>

                            <td>
                                {selectedVehicle.tripDistance ?? 0} km
                            </td>

                            <td>{selectedVehicle.gpsStatus ?? "-"}</td>

                        </tr>

                    </tbody>

                </table>

            </div>

        </section>

    );

}

export default TelemetryTable;