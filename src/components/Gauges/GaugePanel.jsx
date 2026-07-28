import GaugeComponent from "react-gauge-component";
import { useVehicle } from "../../context/VehicleContext";

function GaugePanel() {

    const { selectedVehicle } = useVehicle();

    if (!selectedVehicle) {
        return null;
    }

    return (

        <section className="panel">

<div
    className="gauges-grid"
    style={{
        display: "grid",
        gridTemplateColumns: "repeat(2,1fr)",
        gap: "20px"
    }}
>

    {/* Speed */}

    <GaugeComponent
        value={selectedVehicle.speed || 0}
        minValue={0}
        maxValue={240}
        arc={{
            subArcs: [
                { limit: 80, color: "#2ECC71" },
                { limit: 160, color: "#F1C40F" },
                { color: "#E74C3C" }
            ]
        }}
        labels={{
            valueLabel: {
                formatTextValue: v => `${Math.round(v)} km/h`
            }
        }}
    />

    {/* RPM */}

    <GaugeComponent
        value={selectedVehicle.rpm || 0}
        minValue={0}
        maxValue={8000}
        arc={{
            subArcs: [
                { limit: 3000, color: "#2ECC71" },
                { limit: 6000, color: "#F39C12" },
                { color: "#E74C3C" }
            ]
        }}
        labels={{
            valueLabel: {
                formatTextValue: v => `${Math.round(v)} RPM`
            }
        }}
    />

    {/* Fuel */}

    <GaugeComponent
        value={selectedVehicle.fuelLevel || 0}
        minValue={0}
        maxValue={100}
        arc={{
            subArcs: [
                { limit: 20, color: "#E74C3C" },
                { limit: 50, color: "#F1C40F" },
                { color: "#2ECC71" }
            ]
        }}
        labels={{
            valueLabel: {
                formatTextValue: v => `${Math.round(v)} %`
            }
        }}
    />

    {/* Engine Temperature */}

    <GaugeComponent
        value={selectedVehicle.engineTemperature || 0}
        minValue={0}
        maxValue={140}
        arc={{
            subArcs: [
                { limit: 80, color: "#2ECC71" },
                { limit: 100, color: "#F1C40F" },
                { color: "#E74C3C" }
            ]
        }}
        labels={{
            valueLabel: {
                formatTextValue: v => `${Math.round(v)} °C`
            }
        }}
    />

</div>

        </section>

    );

}

export default GaugePanel;