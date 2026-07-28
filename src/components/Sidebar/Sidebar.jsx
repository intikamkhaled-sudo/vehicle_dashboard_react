import { useState } from "react";
import { useVehicle } from "../../context/VehicleContext";
import { getVehicleStatus } from "../../utils/vehicleStatus";

import "./Sidebar.css";

function Sidebar() {

    const {
        vehicles,
        selectedVehicle,
        setSelectedVehicle
    } = useVehicle();

    const [search, setSearch] = useState("");

    const filteredVehicles = vehicles.filter(vehicle =>
        vehicle.vehicleID
            ?.toLowerCase()
            .includes(search.toLowerCase())
    );

    return (

        <aside className="sidebar">

            <div className="sidebar-header">

                <span className="channel-label">

                    Fleet Vehicles

                </span>

                <input
                    className="form-control"
                    placeholder="Search..."
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                />

            </div>

            <div className="vehicle-list">

                {

                    filteredVehicles.map(vehicle => {

                        const { status } =
                            getVehicleStatus(vehicle);

                        return (

                            <button

                                key={vehicle.vehicleID}

                                className={
                                    `vehicle-item
                                    ${selectedVehicle?.vehicleID === vehicle.vehicleID ? "active" : ""}
                                    border-${status.toLowerCase()}`
                                }

                                onClick={() =>
                                    setSelectedVehicle(vehicle)
                                }

                            >

                                <div className="vehicle-header">

                                    <div>

                                        <div className="vehicle-name">

                                            {vehicle.vehicleID}

                                        </div>

                                        <div className="small">

                                            {status}

                                        </div>

                                    </div>

                                    <span
                                        className={`status-dot status-${status.toLowerCase()}`}
                                    />

                                </div>

                                <div className="vehicle-meta">

                                    <span>

                                        🚗 {vehicle.speed ?? 0} km/h

                                    </span>

                                    <span>

                                        ⛽ {(vehicle.fuelLevel ?? 0).toFixed(0)}%

                                    </span>

                                </div>

                                <div className="vehicle-progress">

                                    <div

                                        className="vehicle-progress-fill"

                                        style={{
                                            width: `${vehicle.fuelLevel ?? 0}%`
                                        }}

                                    />

                                </div>

                            </button>

                        );

                    })

                }

            </div>

        </aside>

    );

}

export default Sidebar;