import { useEffect, useState } from "react";
import { useVehicle } from "../../context/VehicleContext";

function Topbar() {

    const {
        vehicles,
        socketConnected
    } = useVehicle();

    const [time, setTime] = useState(
        new Date()
    );

    useEffect(() => {

        const timer = setInterval(() => {

            setTime(new Date());

        }, 1000);

        return () => clearInterval(timer);

    }, []);

    return (

        <header className="topbar">

            <div className="topbar-brand">

                <i className="bi bi-car-front-fill"></i>

                <div>

                    <h1>
                        Fleet Management Dashboard
                    </h1>

                    <div className="topbar-sub">
                        Live Vehicle Monitoring
                    </div>

                </div>

            </div>

            <div
                style={{
                    display: "flex",
                    gap: "18px",
                    alignItems: "center"
                }}
            >

                <span
                    className={
                        socketConnected
                            ? "badge bg-online"
                            : "badge bg-offline"
                    }
                >
                    {socketConnected
                        ? "CONNECTED"
                        : "DISCONNECTED"}
                </span>

                <span className="badge bg-online">

                    Vehicles : {vehicles.length}

                </span>

                <span className="badge bg-warning-status">

                    {time.toLocaleTimeString()}

                </span>

            </div>

        </header>

    );

}

export default Topbar;