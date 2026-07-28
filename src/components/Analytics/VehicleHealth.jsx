import { useMemo } from "react";

import { useVehicle } from "../../context/VehicleContext";
import { calculateHealth } from "../../utils/calculateHealth";

function VehicleHealth() {

    const { vehicles } = useVehicle();

    const healthData = useMemo(() => {

        return vehicles.map(vehicle => ({

            vehicle,

            ...calculateHealth(vehicle)

        }));

    }, [vehicles]);

    return (

        <section className="panel">

            <div className="panel-header">

                Vehicle Health

            </div>

            <div className="panel-body">

                {

                    healthData.map(item => (

                        <div
                            key={item.vehicle.vehicleID}
                            style={{
                                marginBottom: "18px"
                            }}
                        >

                            <div
                                style={{
                                    display: "flex",
                                    justifyContent: "space-between",
                                    marginBottom: "6px"
                                }}
                            >

                                <strong>

                                    {item.vehicle.vehicleID}

                                </strong>

                                <span>

                                    {item.score}%

                                </span>

                            </div>

                            <div
                                style={{
                                    width: "100%",
                                    height: "10px",
                                    background: "#263238",
                                    borderRadius: "20px",
                                    overflow: "hidden"
                                }}
                            >

                                <div
                                    style={{
                                        width: `${item.score}%`,
                                        height: "100%",
                                        background:
                                            item.score >= 80
                                                ? "#00e676"
                                                : item.score >= 60
                                                ? "#ffca28"
                                                : "#ff5252",
                                        transition: "0.4s"
                                    }}
                                />

                            </div>

                            <div
                                style={{
                                    marginTop: "5px",
                                    color:
                                        item.score >= 80
                                            ? "#00e676"
                                            : item.score >= 60
                                            ? "#ffca28"
                                            : "#ff5252",
                                    fontWeight: "bold"
                                }}
                            >

                                {item.status}

                            </div>

                        </div>

                    ))

                }

            </div>

        </section>

    );

}

export default VehicleHealth;