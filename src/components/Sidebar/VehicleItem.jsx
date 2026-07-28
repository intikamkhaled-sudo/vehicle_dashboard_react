import React from "react";

function VehicleItem({
    vehicle,
    selected,
    onSelect
}) {

    return (

        <button
            className={
                selected
                    ? "vehicle-item active"
                    : "vehicle-item"
            }
            onClick={() => onSelect(vehicle)}
        >

            <div
                style={{
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center"
                }}
            >

                <strong>
                    {vehicle.vehicleID}
                </strong>

                <span
                    style={{
                        width: 10,
                        height: 10,
                        borderRadius: "50%",
                        background:
                            Date.now() - vehicle.lastSeen < 10000
                                ? "#00ff88"
                                : "#666"
                    }}
                />

            </div>

            <div
                style={{
                    fontSize: 12,
                    opacity: .7,
                    marginTop: 5
                }}
            >
                {vehicle.speed} km/h
            </div>

        </button>

    );

}

export default React.memo(VehicleItem);