import {
    createContext,
    useContext,
    useState,
    useCallback
} from "react";
import { useNotification } from "./NotificationContext";
const VehicleContext = createContext();

export function VehicleProvider({ children }) {

    const [vehicles, setVehicles] = useState([]);
    const [selectedVehicle, setSelectedVehicle] = useState(null);
    const [history, setHistory] = useState([]);
    const [tracks, setTracks] = useState({});
    const [socketConnected, setSocketConnected] = useState(false);
    const notification = useNotification();

console.log(notification);

const { addNotification } = notification || {};
    const updateVehicle = useCallback((packet) => {

        // ===============================
        // Update Fleet
        // ===============================

        setVehicles(prev => {

            const index = prev.findIndex(
                v => v.vehicleID === packet.vehicleID
            );

            if (index === -1) {

                return [
                    ...prev,
                    {
                        ...packet,
                        lastSeen: Date.now()
                    }
                ];

            }

            const copy = [...prev];

            copy[index] = {

                ...copy[index],

                ...packet,

                lastSeen: Date.now()

            };

            return copy;

        });

        // ===============================
        // Update Selected Vehicle
        // ===============================

        setSelectedVehicle(prev => {

            if (!prev) return prev;

            if (prev.vehicleID !== packet.vehicleID)
                return prev;

            return {

                ...prev,

                ...packet,

                lastSeen: Date.now()

            };

        });

        // ===============================
        // History
        // ===============================

        setHistory(prev => {

            const next = [

                ...prev,

                {

                    vehicleID: packet.vehicleID,

                    time: new Date().toLocaleTimeString(),

                    speed: packet.speed ?? 0,

                    rpm: packet.rpm ?? 0,

                    fuel: packet.fuelLevel ?? 0,

                    temperature:
                        packet.engineTemperature ?? 0,

                    gear:
                        packet.gear ?? "-",

                    trip:
                        packet.tripDistance ?? 0

                }

            ];

            return next.slice(-500);

        });
        // ===============================
// Notifications
// ===============================

// Low Fuel
if ((packet.fuelLevel ?? 100) < 20) {

    addNotification({

        type: "warning",

        vehicleID: packet.vehicleID,

        title: "Low Fuel",

        message: `Fuel Level: ${packet.fuelLevel.toFixed(1)}%`

    });

}

// High Engine Temperature
if ((packet.engineTemperature ?? 0) > 105) {

    addNotification({

        type: "critical",

        vehicleID: packet.vehicleID,

        title: "High Engine Temperature",

        message: `${packet.engineTemperature} °C`

    });

}

// High RPM
if ((packet.rpm ?? 0) > 4000) {

    addNotification({

        type: "warning",

        vehicleID: packet.vehicleID,

        title: "High RPM",

        message: `${packet.rpm} RPM`

    });

}

// Overspeed
if ((packet.speed ?? 0) > 120) {

    addNotification({

        type: "warning",

        vehicleID: packet.vehicleID,

        title: "Overspeed",

        message: `${packet.speed} km/h`

    });

}
        // ===============================
        // Vehicle Tracks
        // ===============================

        if (
            packet.latitude != null &&
            packet.longitude != null
        ) {
setTracks(prev => {

    const oldTrack = prev[packet.vehicleID] || [];

    const newPoint = [
        Number(packet.latitude),
        Number(packet.longitude)
    ];
    console.log(
    "TRACK:",
    packet.vehicleID,
    Number(packet.latitude),
    Number(packet.longitude)
);
console.log(packet.vehicleID, packet.latitude, packet.longitude);
    if (oldTrack.length > 0) {

        const last = oldTrack[oldTrack.length - 1];

        if (
            Math.abs(last[0] - newPoint[0]) < 0.00001 &&
            Math.abs(last[1] - newPoint[1]) < 0.00001
        ) {
            return prev;
        }
    }

    return {
        ...prev,
        [packet.vehicleID]: [...oldTrack, newPoint].slice(-50)
    };

});
        }

    }, []);

    return (

        <VehicleContext.Provider

            value={{

                vehicles,
                setVehicles,

                selectedVehicle,
                setSelectedVehicle,

                history,

                tracks,
                setTracks,

                updateVehicle,

                socketConnected,
                setSocketConnected

            }}

        >

            {children}

        </VehicleContext.Provider>

    );

}

export function useVehicle() {

    return useContext(VehicleContext);

}