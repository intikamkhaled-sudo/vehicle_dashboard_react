import "./VehicleModal.css";

function VehicleModal({ open, onClose, vehicle }) {

    if (!open || !vehicle) return null;

    return (

        <div className="modal-overlay">

            <div className="vehicle-modal">

                <div className="modal-header">

                    <h2>{vehicle.vehicleID}</h2>

                    <button
                        className="close-btn"
                        onClick={onClose}
                    >
                        ✕
                    </button>

                </div>

                <div className="modal-body">

                    <div className="info-grid">

                        <div>
                            <strong>Status</strong>
                            <p>{vehicle.gpsStatus}</p>
                        </div>

                        <div>
                            <strong>Speed</strong>
                            <p>{vehicle.speed} km/h</p>
                        </div>

                        <div>
                            <strong>RPM</strong>
                            <p>{vehicle.rpm}</p>
                        </div>

                        <div>
                            <strong>Fuel</strong>
                            <p>{vehicle.fuelLevel}%</p>
                        </div>

                        <div>
                            <strong>Engine Temp</strong>
                            <p>{vehicle.engineTemperature} °C</p>
                        </div>

                        <div>
                            <strong>Gear</strong>
                            <p>{vehicle.gear}</p>
                        </div>

                        <div>
                            <strong>Latitude</strong>
                            <p>{vehicle.latitude}</p>
                        </div>

                        <div>
                            <strong>Longitude</strong>
                            <p>{vehicle.longitude}</p>
                        </div>

                    </div>

                </div>

            </div>

        </div>

    );

}

export default VehicleModal;