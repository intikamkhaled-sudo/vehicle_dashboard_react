import { useMemo } from "react";
import { useVehicle } from "../../context/VehicleContext";
import { generateAlerts } from "../../utils/generateAlerts";

function AlertsPanel() {

    const { selectedVehicle } = useVehicle();

    const alerts = useMemo(() => {

        if (!selectedVehicle) return [];

        return generateAlerts(selectedVehicle);

    }, [selectedVehicle]);

    if (!selectedVehicle) {
        return (
            <section className="panel">
                <div className="panel-header">
                    Alerts
                </div>

                <div className="panel-body">
                    No Vehicle Selected
                </div>
            </section>
        );
    }

    return (

        <section className="panel">

            <div className="panel-header">
                Active Alerts
            </div>

            <div className="panel-body">

                {alerts.length === 0 ? (

                    <div
                        className="alert alert-success"
                        style={{
                            marginBottom: 0,
                            fontWeight: 600
                        }}
                    >
                        ✅ No Active Alerts
                    </div>

                ) : (

                    alerts.map((alert, index) => (

                        <div
                            key={index}
                            className={
                                alert.type === "critical"
                                    ? "alert alert-danger"
                                    : "alert alert-warning"
                            }
                            style={{ marginBottom: 10 }}
                        >
                            <strong>{alert.title}</strong>

                            <br />

                            {alert.value}

                        </div>

                    ))

                )}

            </div>

        </section>

    );

}

export default AlertsPanel;