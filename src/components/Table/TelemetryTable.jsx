import { useVehicle } from "../../context/VehicleContext";

function TelemetryTable() {

    const {
        history,
        selectedVehicle
    } = useVehicle();

    const rows = history
        .filter(
            h => h.vehicleID === selectedVehicle?.vehicleID
        )
        .slice(-20)
        .reverse();

    return (

        <section className="panel">

            <div className="panel-header">
                Telemetry History
            </div>

            <div className="panel-body">

                <table className="table table-dark table-striped table-hover mb-0">

                    <thead>

                        <tr>
                            <th>Time</th>
                            <th>Speed</th>
                            <th>RPM</th>
                            <th>Fuel</th>
                            <th>Engine Temp</th>
                            <th>Gear</th>
                        </tr>

                    </thead>

                    <tbody>

                        {rows.length === 0 ? (

                            <tr>
                                <td colSpan="6" className="text-center">
                                    No telemetry received yet
                                </td>
                            </tr>

                        ) : (

                            rows.map((row, index) => (

                                <tr key={index}>

                                    <td>{row.time}</td>

                                    <td>{row.speed} km/h</td>

                                    <td>{row.rpm}</td>

                                   <td>{Number(row.fuel).toFixed(1)}%</td>

                                    <td>{row.engineTemperature ?? "--"} °C</td>

                                    <td>{row.gear ?? "--"}</td>

                                </tr>

                            ))

                        )}

                    </tbody>

                </table>

            </div>

        </section>

    );

}

export default TelemetryTable;