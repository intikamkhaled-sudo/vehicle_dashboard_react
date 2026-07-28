import {
    MapContainer,
    TileLayer,
    Marker,
    Popup,
    Polyline,
    useMap
} from "react-leaflet";

import { useEffect } from "react";
import L from "leaflet";
import "leaflet/dist/leaflet.css";

import { useVehicle } from "../../context/VehicleContext";
import { getVehicleStatus } from "../../utils/vehicleStatus";

// =============================
// Icons
// =============================

const icons = {

    ONLINE: new L.Icon({
        iconUrl:
            "https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-green.png",
        shadowUrl:
            "https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png",
        iconSize: [25, 41],
        iconAnchor: [12, 41]
    }),

    WARNING: new L.Icon({
        iconUrl:
            "https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-gold.png",
        shadowUrl:
            "https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png",
        iconSize: [25, 41],
        iconAnchor: [12, 41]
    }),

    CRITICAL: new L.Icon({
        iconUrl:
            "https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-red.png",
        shadowUrl:
            "https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png",
        iconSize: [25, 41],
        iconAnchor: [12, 41]
    }),

    OFFLINE: new L.Icon({
        iconUrl:
            "https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-grey.png",
        shadowUrl:
            "https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png",
        iconSize: [25, 41],
        iconAnchor: [12, 41]
    })

};

// =============================

function FlyToVehicle({ vehicle }) {

    const map = useMap();

    useEffect(() => {

        if (!vehicle) return;

        if (
            vehicle.latitude == null ||
            vehicle.longitude == null
        ) return;

        map.flyTo(
            [
                vehicle.latitude,
                vehicle.longitude
            ],
            13,
            {
                duration: 1.5
            }
        );

    }, [vehicle, map]);

    return null;
}

// =============================

function MapPanel() {

    const {
        vehicles,
        selectedVehicle,
        tracks
    } = useVehicle();

    return (

        <section className="panel">

            <div className="panel-header">

                Fleet Map

            </div>

            <div
                className="panel-body"
                style={{ height: 500 }}
            >

                <MapContainer

                    center={[30.0444, 31.2357]}

                    zoom={7}

                    style={{
                        height: "100%",
                        width: "100%"
                    }}

                >

                    <TileLayer
                        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                    />

                    <FlyToVehicle vehicle={selectedVehicle} />

                    {

                        vehicles.map(vehicle => {

                            const { status } =
                                getVehicleStatus(vehicle);

                            const track =
                                tracks?.[vehicle.vehicleID] || [];
if (track.length > 0) {
    console.table(track);
}
const selectedTrack =
    selectedVehicle
        ? tracks[selectedVehicle.vehicleID]
        : [];

console.log("TRACKS =", tracks);
console.log("SELECTED TRACK =", selectedTrack);
                            return (

                                <div key={vehicle.vehicleID}>

                                    {

                                        track.length > 1 && (

                                            <Polyline
                                            
                                                positions={track}
                                            
                                                pathOptions={{

                                                    color:
                                                        selectedVehicle?.vehicleID === vehicle.vehicleID
                                                            ? "#00bfff"
                                                            : "#00ff88",

                                                    weight: 4

                                                }}

                                            />

                                        )

                                    }

                                    <Marker

                                        position={[
                                            vehicle.latitude,
                                            vehicle.longitude
                                        ]}

                                        icon={icons[status]}

                                    >

                                        <Popup>

                                            <h6>

                                                {vehicle.vehicleID}

                                            </h6>

                                            <hr />

                                            <b>Status:</b> {status}

                                            <br />

                                            <b>Speed:</b> {vehicle.speed} km/h

                                            <br />

                                            <b>RPM:</b> {vehicle.rpm}

                                            <br />

                                            <b>Fuel:</b> {vehicle.fuelLevel?.toFixed(1)} %

                                            <br />

                                            <b>Engine Temp:</b> {vehicle.engineTemperature} °C

                                            <br />

                                            <b>Gear:</b> {vehicle.gear}

                                            <br />

                                            <b>GPS:</b> {vehicle.gpsStatus}

                                        </Popup>

                                    </Marker>

                                </div>

                            );

                        })

                    }

                </MapContainer>

            </div>

        </section>

    );

}

export default MapPanel;