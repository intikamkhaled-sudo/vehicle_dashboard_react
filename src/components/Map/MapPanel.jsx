import {
    MapContainer,
    TileLayer,
    Popup,
    Polyline,
    Circle,
    ScaleControl,
    LayersControl,
    useMap
} from "react-leaflet";


import greenCar from "../../assets/icons/green-car.png";
import yellowCar from "../../assets/icons/yellow-car.png";
import redCar from "../../assets/icons/red-car.png";
import grayCar from "../../assets/icons/gray-car.png";
import { useEffect } from "react";
import L from "leaflet";
import "leaflet/dist/leaflet.css";

import SmoothMarker from "./SmoothMarker";

import { useVehicle } from "../../context/VehicleContext";
import { getVehicleStatus } from "../../utils/vehicleStatus";
import { useRef } from "react";
// =====================================
// Icons
// =====================================

const carIcons = {

    ONLINE: greenCar,

    WARNING: yellowCar,

    CRITICAL: redCar,

    OFFLINE: grayCar

};

// =====================================

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
            13,
            {
                duration: 1.2
            }
        );

    }, [vehicle, map]);

    return null;

}

// =====================================

function MapPanel() {
    const mapWrapperRef = useRef(null);
    const { BaseLayer } = LayersControl;
const toggleFullscreen = () => {

    if (!document.fullscreenElement) {

        mapWrapperRef.current.requestFullscreen();

    } else {

        document.exitFullscreen();

    }

};
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
    ref={mapWrapperRef}
    className="panel-body"
    style={{
        height: 500,
        position: "relative"
    }}
>
<button
    onClick={toggleFullscreen}
    style={{
        position: "absolute",
        top: 12,
        right: 12,
        zIndex: 1000,
        border: "none",
        background: "#0d6efd",
        color: "white",
        padding: "8px 12px",
        borderRadius: "8px",
        cursor: "pointer",
        fontWeight: "bold"
    }}
>
    ⛶ Full Screen
</button>
                <MapContainer

                    center={[30.0444, 31.2357]}

                    zoom={7}

                    style={{
                        height: "100%",
                        width: "100%"
                    }}

                >

                    <LayersControl position="topright">

    <BaseLayer checked name="OpenStreetMap">

        <TileLayer
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            attribution="© OpenStreetMap"
        />

    </BaseLayer>

    <BaseLayer name="Satellite">

        <TileLayer
            url="https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}"
            attribution="Tiles © Esri"
        />

    </BaseLayer>

    <BaseLayer name="Terrain">

        <TileLayer
            url="https://{s}.tile.opentopomap.org/{z}/{x}/{y}.png"
            attribution="© OpenTopoMap"
        />

    </BaseLayer>

    <BaseLayer name="Dark">

        <TileLayer
            url="https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png"
            attribution="© CARTO"
        />

    </BaseLayer>

</LayersControl>

            

                    <ScaleControl
                        position="bottomleft"
                        imperial={false}
                    />

                    <FlyToVehicle
                        vehicle={selectedVehicle}
                    />

                    {

                        vehicles.map(vehicle => {

                            const { status } =
                                getVehicleStatus(vehicle);

                            const isSelected =
                                selectedVehicle?.vehicleID ===
                                vehicle.vehicleID;

                            const track =
                                tracks?.[vehicle.vehicleID] || [];

                            const markerIcon = L.icon({

    iconUrl: carIcons[status],

    iconSize:
        isSelected
            ? [48, 48]
            : [38, 38],

    iconAnchor:
        isSelected
            ? [24, 24]
            : [19, 19]

});
const gpsRadius =
    vehicle.gpsAccuracy ??
    (vehicle.gpsStatus === "FIX"
        ? 8
        : vehicle.gpsStatus === "SEARCHING"
        ? 25
        : 40);
                            return (

                                <div
                                    key={vehicle.vehicleID}
                                >

                                    {

                                        isSelected &&
                                        track.length > 1 && (

                                            <Polyline

                                                positions={track}

                                                pathOptions={{

                                                    color: "#00bfff",

                                                    weight: 5,

                                                    opacity: 0.9

                                                }}

                                            />

                                        )

                                    }

                                    <SmoothMarker

                                        position={[

                                            Number(vehicle.latitude),

                                            Number(vehicle.longitude)

                                        ]}

                                        icon={markerIcon}

                                    >

                                                                            <Popup
                                            minWidth={220}
                                        >

                                            <div
                                                style={{
                                                    minWidth: 210
                                                }}
                                            >

                                                <h5>
                                                    🚗 {vehicle.vehicleID}
                                                </h5>

                                                <hr />

                                                <p>
                                                    <b>Status:</b> {status}
                                                </p>

                                                <p>
                                                    <b>Speed:</b> {vehicle.speed} km/h
                                                </p>

                                                <p>
                                                    <b>RPM:</b> {vehicle.rpm}
                                                </p>

                                                <p>
                                                    <b>Fuel:</b> {(vehicle.fuelLevel ?? 0).toFixed(1)} %
                                                </p>

                                                <p>
                                                    <b>Engine Temp:</b> {vehicle.engineTemperature} °C
                                                </p>

                                                <p>
                                                    <b>Gear:</b> {vehicle.gear}
                                                </p>

                                                <p>
                                                    <b>Trip:</b> {vehicle.tripDistance} km
                                                </p>

                                                <p>
                                                    <b>GPS:</b> {vehicle.gpsStatus}
                                                </p>

                                                <p>
                                                    <b>Latitude:</b> {vehicle.latitude}
                                                </p>

                                                <p>
                                                    <b>Longitude:</b> {vehicle.longitude}
                                                </p>

                                            </div>

                                        </Popup>

                                    </SmoothMarker>
                                <Circle
    center={[
        Number(vehicle.latitude),
        Number(vehicle.longitude)
    ]}
    radius={gpsRadius}
    pathOptions={{
        color:
            status === "ONLINE"
                ? "#00ff88"
                : status === "WARNING"
                ? "#ffd43b"
                : status === "CRITICAL"
                ? "#ff4444"
                : "#888",

        fillColor:
            status === "ONLINE"
                ? "#00ff88"
                : status === "WARNING"
                ? "#ffd43b"
                : status === "CRITICAL"
                ? "#ff4444"
                : "#888",

        fillOpacity: 0.15,
        weight: 2
    }}
/>
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