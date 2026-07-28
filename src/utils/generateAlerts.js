export function generateAlerts(vehicle) {

    const alerts = [];

    if (!vehicle) {
        return alerts;
    }

    // Engine Temperature
    if (vehicle.engineTemperature >= 110) {
        alerts.push({
            type: "critical",
            title: "High Engine Temperature",
            value: `${vehicle.engineTemperature.toFixed(1)} °C`
        });
    }

    // Fuel
    if (vehicle.fuelLevel <= 15) {
        alerts.push({
            type: "warning",
            title: "Low Fuel",
            value: `${vehicle.fuelLevel.toFixed(1)} %`
        });
    }

    // Speed
    if (vehicle.speed >= 120) {
        alerts.push({
            type: "critical",
            title: "Overspeed",
            value: `${vehicle.speed} km/h`
        });
    }

    // RPM
    if (vehicle.rpm >= 6500) {
        alerts.push({
            type: "warning",
            title: "High RPM",
            value: vehicle.rpm
        });
    }

    // Oil Pressure
    if (vehicle.oilPressure <= 1.5) {
        alerts.push({
            type: "critical",
            title: "Low Oil Pressure",
            value: `${vehicle.oilPressure} bar`
        });
    }

    return alerts;
}