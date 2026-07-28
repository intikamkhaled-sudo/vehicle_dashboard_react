import { useEffect } from "react";

import {
    MapContainer,
    TileLayer,
    Marker,
    Popup,
    Polyline,
    useMap
} from "react-leaflet";

import L from "leaflet";
import "leaflet/dist/leaflet.css";

import { useVehicle } from "../../context/VehicleContext";
import { getVehicleStatus } from "../../utils/vehicleStatus";

// =============================
// Icons
// =============================

const icons = {

    ONLINE: new L.Icon({
        iconUrl: "https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-green.png",
        shadowUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png",
        iconSize: [25, 41],
        iconAnchor: [12, 41]
    }),

    WARNING: new L.Icon({
        iconUrl: "https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-gold.png",
        shadowUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png",
        iconSize: [25, 41],
        iconAnchor: [12, 41]
    }),

    CRITICAL: new L.Icon({
        iconUrl: "https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-red.png",
        shadowUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png",
        iconSize: [25, 41],
        iconAnchor: [12, 41]
    }),

    OFFLINE: new L.Icon({
        iconUrl: "https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-grey.png",
        shadowUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png",
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
                Number(vehicle.latitude),
                Number(vehicle.longitude)
            ],
            map.getZoom(),
            {
                duration: 1
            }
        );

    }, [
        vehicle?.latitude,
        vehicle?.longitude,
        map
    ]);

    return null;
}

// =============================

function MapPanel() {

    const {
        vehicles,
        selectedVehicle,
        tracks
    } = useVehicle();

    const selectedTrack =
        selectedVehicle
            ? tracks[selectedVehicle.vehicleID] || []
            : [];

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
                        width: "100%",
                        height: "100%"
                    }}
                >

                    <TileLayer
                        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                    />

                    <FlyToVehicle vehicle={selectedVehicle} />

                    {/* Vehicle Track */}
                     {selectedVehicle &&
    tracks[selectedVehicle.vehicleID] &&
    tracks[selectedVehicle.vehicleID].length > 1 && (

        <Polyline
            key={
                selectedVehicle.vehicleID +
                "-" +
                tracks[selectedVehicle.vehicleID].length
            }
            positions={[...tracks[selectedVehicle.vehicleID]]}
            pathOptions={{
                color: "#00bfff",
                weight: 5,
                opacity: 1
            }}
        />

)}
                    {selectedTrack.length > 1 && (

                        <Polyline
                            positions={selectedTrack}
                            pathOptions={{
                                color: "#00bfff",
                                weight: 5,
                                opacity: 1
                            }}
                        />
                       
                    )}

                    {/* Vehicle Markers */}

                    {vehicles.map(vehicle => {

                        const { status } =
                            getVehicleStatus(vehicle);

                        return (

                            <Marker
                                key={vehicle.vehicleID}
                                position={[
                                    Number(vehicle.latitude),
                                    Number(vehicle.longitude)
                                ]}
                                icon={icons[status]}
                            >

                                <Popup>

                                    <strong>
                                        {vehicle.vehicleID}
                                    </strong>

                                    <br />

                                    Status: {status}

                                    <br />

                                    Speed: {vehicle.speed} km/h

                                    <br />

                                    RPM: {vehicle.rpm}

                                    <br />

                                    Fuel: {vehicle.fuelLevel?.toFixed(1)} %

                                    <br />

                                    Engine Temp: {vehicle.engineTemperature} °C

                                    <br />

                                    Gear: {vehicle.gear}

                                    <br />

                                    GPS: {vehicle.gpsStatus}

                                </Popup>

                            </Marker>

                        );

                    })}

                </MapContainer>

            </div>

        </section>

    );

}

export default MapPanel;