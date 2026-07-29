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

// =====================================
// Icons
// =====================================

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

                            const isSelected =
                                selectedVehicle?.vehicleID === vehicle.vehicleID;

                            const track =
                                tracks?.[vehicle.vehicleID] || [];

                            const markerIcon = L.icon({

                                iconUrl:
                                    icons[status].options.iconUrl,

                                shadowUrl:
                                    "https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png",

                                iconSize:
                                    isSelected
                                        ? [35, 55]
                                        : [25, 41],

                                iconAnchor:
                                    isSelected
                                        ? [17, 55]
                                        : [12, 41],

                                popupAnchor:
                                    [0, -40]

                            });

                            return (

                                <div key={vehicle.vehicleID}>

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

                                    <Marker

                                        position={[

                                            Number(vehicle.latitude),

                                            Number(vehicle.longitude)

                                        ]}

                                        icon={markerIcon}

                                    >

                                        <Popup minWidth={220}>

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

                                                    <b>Status :</b> {status}

                                                </p>

                                                <p>

                                                    <b>Speed :</b> {vehicle.speed} km/h

                                                </p>

                                                <p>

                                                    <b>RPM :</b> {vehicle.rpm}

                                                </p>

                                                <p>

                                                    <b>Fuel :</b> {vehicle.fuelLevel?.toFixed(1)} %

                                                </p>

                                                <p>

                                                    <b>Engine Temp :</b> {vehicle.engineTemperature} °C

                                                </p>

                                                <p>

                                                    <b>Gear :</b> {vehicle.gear}

                                                </p>

                                                <p>

                                                    <b>GPS :</b> {vehicle.gpsStatus}

                                                </p>

                                                <hr />

                                                <button

                                                    className="btn btn-primary"

                                                    style={{

                                                        width: "100%"

                                                    }}

                                                >

                                                    Focus Vehicle

                                                </button>

                                            </div>

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