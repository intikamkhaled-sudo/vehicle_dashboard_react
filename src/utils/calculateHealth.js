export function calculateHealth(vehicle) {

    let score = 100;

    if ((vehicle.fuelLevel ?? 100) < 20)
        score -= 20;

    if ((vehicle.engineTemperature ?? 0) > 105)
        score -= 20;

    if ((vehicle.rpm ?? 0) > 4500)
        score -= 15;

    if ((vehicle.speed ?? 0) > 120)
        score -= 10;

    if ((vehicle.oilPressure ?? 5) < 2)
        score -= 15;

    if (score < 0)
        score = 0;

    let status = "Excellent";

    if (score < 80)
        status = "Good";

    if (score < 60)
        status = "Warning";

    if (score < 40)
        status = "Critical";

    return {
        score,
        status
    };
}