export function maintenancePrediction(vehicle) {

    const issues = [];

    if ((vehicle.engineTemperature ?? 0) > 105) {

        issues.push({
            severity: "critical",
            message: "High Engine Temperature"
        });

    }

    if ((vehicle.oilPressure ?? 5) < 2) {

        issues.push({
            severity: "warning",
            message: "Low Oil Pressure"
        });

    }

    if ((vehicle.fuelLevel ?? 100) < 15) {

        issues.push({
            severity: "warning",
            message: "Low Fuel Level"
        });

    }

    if ((vehicle.rpm ?? 0) > 4500) {

        issues.push({
            severity: "warning",
            message: "High RPM"
        });

    }

    if ((vehicle.engineLoad ?? 0) > 90) {

        issues.push({
            severity: "warning",
            message: "Heavy Engine Load"
        });

    }

    if (issues.length === 0) {

        issues.push({
            severity: "good",
            message: "Vehicle Healthy"
        });

    }

    return issues;

}