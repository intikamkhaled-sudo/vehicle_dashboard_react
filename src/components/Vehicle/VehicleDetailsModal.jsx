import "../Common/Modal.css";

function VehicleDetailsModal({ vehicle, open, onClose }) {

    if (!open || !vehicle) return null;

    return (

        <div className="modal-overlay">

            <div className="modal-box">

                <div className="modal-header">

                    <h2>{vehicle.vehicleID}</h2>

                    <button
                        className="close-btn"
                        onClick={onClose}
                    >
                        ✕
                    </button>

                </div>

                <div className="vehicle-stats-grid">

                    <div><b>Speed</b><br />{vehicle.speed} km/h</div>

                    <div><b>RPM</b><br />{vehicle.rpm}</div>

                    <div><b>Fuel</b><br />{vehicle.fuelLevel?.toFixed(1)} %</div>

                    <div><b>Fuel Consumption</b><br />{vehicle.fuelConsumption} L/100km</div>

                    <div><b>Engine Temp</b><br />{vehicle.engineTemperature} °C</div>

                    <div><b>Coolant Temp</b><br />{vehicle.coolantTemperature} °C</div>

                    <div><b>Oil Pressure</b><br />{vehicle.oilPressure} bar</div>

                    <div><b>Engine Load</b><br />{vehicle.engineLoad} %</div>

                    <div><b>Throttle</b><br />{vehicle.throttlePosition} %</div>

                    <div><b>Gear</b><br />{vehicle.gear}</div>

                    <div><b>Trip</b><br />{vehicle.tripDistance} km</div>

                    <div><b>Odometer</b><br />{vehicle.odometer} km</div>

                    <div><b>Latitude</b><br />{vehicle.latitude}</div>

                    <div><b>Longitude</b><br />{vehicle.longitude}</div>

                    <div><b>GPS</b><br />{vehicle.gpsStatus}</div>

                </div>

            </div>

        </div>

    );

}

export default VehicleDetailsModal;