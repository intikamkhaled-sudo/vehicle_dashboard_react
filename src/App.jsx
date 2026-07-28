import { useEffect } from "react";

import Dashboard from "./pages/Dashboard";
import { useVehicle } from "./context/VehicleContext";
import { getTelemetry } from "./services/api";
import socket from "./services/socket";

function App() {

    const {
        setVehicles,
        setSelectedVehicle,
        updateVehicle,
        setSocketConnected
    } = useVehicle();

    useEffect(() => {

        async function loadData() {

            try {

                const data = await getTelemetry();

                const vehicles = data.map(vehicle => ({
                    ...vehicle,
                    lastSeen: Date.now()
                }));

                setVehicles(vehicles);

                if (vehicles.length > 0) {
                    setSelectedVehicle(vehicles[0]);
                }

            } catch (err) {
                console.error(err);
            }

        }

        loadData();

        socket.on("connect", () => {
            console.log("Socket Connected");
            setSocketConnected(true);
        });

        socket.on("disconnect", () => {
            console.log("Socket Disconnected");
            setSocketConnected(false);
        });
const telemetryHandler = (packet) => {
    console.log("PACKET:", packet.vehicleID, packet.latitude, packet.longitude);

    updateVehicle(packet);
};

        socket.on("telemetry", telemetryHandler);

        return () => {
            socket.off("connect");
            socket.off("disconnect");
            socket.off("telemetry", telemetryHandler);
        };

    }, [
        updateVehicle,
        setVehicles,
        setSelectedVehicle,
        setSocketConnected
    ]);

    return <Dashboard />;

}

export default App;