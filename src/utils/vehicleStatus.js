import { generateAlerts } from "./generateAlerts";

export function getVehicleStatus(vehicle) {

    if (!vehicle) {
        return {
            status: "OFFLINE",
            color: "#6c757d",
            border: "#6c757d",
            online: false
        };
    }

    const offline =
        Date.now() - (vehicle.lastSeen || 0) > 10000;

    if (offline) {
        return {
            status: "OFFLINE",
            color: "#6c757d",
            border: "#6c757d",
            online: false
        };
    }

    const alerts = generateAlerts(vehicle);

    const hasCritical = alerts.some(
        alert => alert.type === "critical"
    );

    if (hasCritical) {
        return {
            status: "CRITICAL",
            color: "#dc3545",
            border: "#dc3545",
            online: true
        };
    }

    const hasWarning = alerts.some(
        alert => alert.type === "warning"
    );

    if (hasWarning) {
        return {
            status: "WARNING",
            color: "#ffc107",
            border: "#ffc107",
            online: true
        };
    }

    return {
        status: "ONLINE",
        color: "#00e676",
        border: "#00e676",
        online: true
    };
}