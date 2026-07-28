import { useMemo } from "react";
import { useVehicle } from "../../context/VehicleContext";

function FleetAnalytics() {

    const { vehicles } = useVehicle();

    const analytics = useMemo(() => {

        if (vehicles.length === 0)
            return null;

        const avgSpeed =
            vehicles.reduce((s, v) => s + (v.speed || 0), 0)
            / vehicles.length;

        const avgFuel =
            vehicles.reduce((s, v) => s + (v.fuelConsumption || 0), 0)
            / vehicles.length;

        const avgTemp =
            vehicles.reduce((s, v) => s + (v.engineTemperature || 0), 0)
            / vehicles.length;

        const highestSpeed =
            [...vehicles].sort(
                (a,b)=>b.speed-a.speed
            )[0];

        const lowestFuel =
            [...vehicles].sort(
                (a,b)=>a.fuelLevel-b.fuelLevel
            )[0];

        const highestTemp =
            [...vehicles].sort(
                (a,b)=>b.engineTemperature-a.engineTemperature
            )[0];

        const totalDistance =
            vehicles.reduce(
                (s,v)=>s+(v.tripDistance||0),
                0
            );

        return {

            avgSpeed,

            avgFuel,

            avgTemp,

            highestSpeed,

            lowestFuel,

            highestTemp,

            totalDistance

        };

    }, [vehicles]);

    if(!analytics)
        return null;

    return (

<section className="panel">

<div className="panel-header">

Fleet Analytics

</div>

<div className="panel-body">

<div className="analytics-grid">

<div className="analytics-card">

<h5>Average Speed</h5>

<h2>{analytics.avgSpeed.toFixed(1)} km/h</h2>

</div>

<div className="analytics-card">

<h5>Fuel Consumption</h5>

<h2>{analytics.avgFuel.toFixed(1)} L/100km</h2>

</div>

<div className="analytics-card">

<h5>Engine Temp</h5>

<h2>{analytics.avgTemp.toFixed(1)} °C</h2>

</div>

<div className="analytics-card">

<h5>Highest Speed</h5>

<p>

<b>{analytics.highestSpeed.vehicleID}</b>

<br/>

{analytics.highestSpeed.speed} km/h

</p>

</div>

<div className="analytics-card">

<h5>Lowest Fuel</h5>

<p>

<b>{analytics.lowestFuel.vehicleID}</b>

<br/>

{analytics.lowestFuel.fuelLevel}%


</p>

</div>

<div className="analytics-card">

<h5>Highest Temp</h5>

<p>

<b>{analytics.highestTemp.vehicleID}</b>

<br/>

{analytics.highestTemp.engineTemperature} °C

</p>

</div>

<div className="analytics-card">

<h5>Total Distance</h5>

<h2>

{analytics.totalDistance.toFixed(1)} km

</h2>

</div>

</div>

</div>

</section>

    );

}

export default FleetAnalytics;