import { useVehicle } from "../../context/VehicleContext";
import { maintenancePrediction } from "../../utils/maintenancePrediction";

function MaintenancePanel() {

    const { vehicles } = useVehicle();

    return (

        <section className="panel">

            <div className="panel-header">

                Maintenance Prediction

            </div>

            <div className="panel-body">

                {

                    vehicles.map(vehicle => {

                        const issues =
                            maintenancePrediction(vehicle);

                        return (

                            <div
                                key={vehicle.vehicleID}
                                className="maintenance-card"
                            >

                                <h5>

                                    {vehicle.vehicleID}

                                </h5>

                                {

                                    issues.map((issue,index)=>(

                                        <div
                                            key={index}
                                            style={{

                                                marginBottom:"8px",

                                                color:
                                                    issue.severity==="critical"
                                                        ? "#ff3b30"
                                                        : issue.severity==="warning"
                                                        ? "#ffb300"
                                                        : "#00e676"

                                            }}
                                        >

                                            {

                                                issue.severity==="critical"
                                                    ? "🔴"
                                                    : issue.severity==="warning"
                                                    ? "🟡"
                                                    : "🟢"

                                            }

                                            {" "}

                                            {issue.message}

                                        </div>

                                    ))

                                }

                            </div>

                        );

                    })

                }

            </div>

        </section>

    );

}

export default MaintenancePanel;