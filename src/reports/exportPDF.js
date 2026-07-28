import jsPDF from "jspdf";
import autoTable from "jspdf-autotable";
import { getVehicleStatus } from "../utils/vehicleStatus";
import { generateAlerts } from "../utils/generateAlerts";

export function exportVehiclePDF(vehicle) {

    if (!vehicle) return;

    const doc = new jsPDF();

    const { status } = getVehicleStatus(vehicle);
    const alerts = generateAlerts(vehicle);

    // =====================================
    // Header
    // =====================================

    doc.setFillColor(25, 118, 210);
    doc.rect(0, 0, 210, 30, "F");

    doc.setTextColor(255, 255, 255);
    doc.setFontSize(22);
    doc.text("Fleet Management Dashboard", 14, 15);

    doc.setFontSize(11);
    doc.text("Vehicle Telemetry Report", 14, 23);

    // =====================================
    // Vehicle Information
    // =====================================

    doc.setTextColor(0, 0, 0);
    doc.setFontSize(12);

    doc.text(`Vehicle ID : ${vehicle.vehicleID}`, 14, 42);
    doc.text(`Status : ${status}`, 14, 50);
    doc.text(`Generated : ${new Date().toLocaleString()}`, 14, 58);

    // =====================================
    // Vehicle Data Table
    // =====================================

    autoTable(doc, {

        startY: 66,

        theme: "grid",

        headStyles: {
            fillColor: [25, 118, 210],
            textColor: 255,
            fontStyle: "bold"
        },

        head: [["Parameter", "Value"]],

        body: [

            ["Speed", `${vehicle.speed ?? 0} km/h`],

            ["RPM", vehicle.rpm ?? 0],

            ["Fuel Level", `${(vehicle.fuelLevel ?? 0).toFixed(1)} %`],

            ["Fuel Consumption", `${vehicle.fuelConsumption ?? 0} L/100km`],

            ["Engine Temperature", `${vehicle.engineTemperature ?? 0} °C`],

            ["Coolant Temperature", `${vehicle.coolantTemperature ?? 0} °C`],

            ["Oil Pressure", `${vehicle.oilPressure ?? 0} bar`],

            ["Engine Load", `${vehicle.engineLoad ?? 0} %`],

            ["Throttle Position", `${vehicle.throttlePosition ?? 0} %`],

            ["Gear", vehicle.gear ?? "-"],

            ["Trip Distance", `${vehicle.tripDistance ?? 0} km`],

            ["Odometer", `${vehicle.odometer ?? 0} km`],

            ["Latitude", vehicle.latitude],

            ["Longitude", vehicle.longitude],

            ["GPS Status", vehicle.gpsStatus]

        ]

    });

    let y = doc.lastAutoTable.finalY + 12;

    // =====================================
    // Summary
    // =====================================

    doc.setFontSize(15);
    doc.setTextColor(25, 118, 210);
    doc.text("Vehicle Summary", 14, y);

    y += 8;

    doc.setFontSize(11);
    doc.setTextColor(0, 0, 0);

    doc.text(
        `Current vehicle status is ${status}.`,
        18,
        y
    );

    y += 7;

    if ((vehicle.fuelLevel ?? 0) > 30) {

        doc.text("Fuel level is normal.", 18, y);

    } else {

        doc.setTextColor(220, 0, 0);
        doc.text("Low fuel level detected.", 18, y);
        doc.setTextColor(0, 0, 0);

    }

    y += 7;

    if ((vehicle.engineTemperature ?? 0) < 105) {

        doc.text("Engine temperature is normal.", 18, y);

    } else {

        doc.setTextColor(220, 0, 0);
        doc.text("High engine temperature.", 18, y);
        doc.setTextColor(0, 0, 0);

    }

    y += 15;

    // =====================================
    // Alerts
    // =====================================

    doc.setFontSize(15);
    doc.setTextColor(25, 118, 210);
    doc.text("Active Alerts", 14, y);

    y += 8;

    doc.setFontSize(11);

    if (alerts.length === 0) {

        doc.setTextColor(0, 150, 0);
        doc.text("No Active Alerts", 18, y);

    } else {

        alerts.forEach(alert => {

            doc.setTextColor(
                alert.type === "critical" ? 220 : 255,
                alert.type === "critical" ? 0 : 140,
                0
            );

            doc.text(
                `${alert.title} : ${alert.value}`,
                18,
                y
            );

            y += 7;

        });

    }

    // =====================================
    // Footer
    // =====================================

    doc.setDrawColor(180);
    doc.line(14, 282, 196, 282);

    doc.setTextColor(120);

    doc.setFontSize(10);

    doc.text(
        "Fleet Management Dashboard - Graduation Project 2026",
        14,
        288
    );

    // =====================================
    // PAGE 2
    // =====================================

    doc.addPage();

    doc.setFontSize(22);
    doc.setTextColor(25, 118, 210);
    doc.text("Vehicle Statistics", 14, 20);

    autoTable(doc, {

        startY: 30,

        headStyles: {
            fillColor: [25, 118, 210],
            textColor: 255
        },

        head: [[
            "Metric",
            "Current Value",
            "Status"
        ]],

        body: [

            [
                "Speed",
                `${vehicle.speed ?? 0} km/h`,
                (vehicle.speed ?? 0) > 120 ? "High" : "Normal"
            ],

            [
                "RPM",
                vehicle.rpm ?? 0,
                (vehicle.rpm ?? 0) > 4000 ? "High" : "Normal"
            ],

            [
                "Fuel",
                `${vehicle.fuelLevel ?? 0}%`,
                (vehicle.fuelLevel ?? 0) < 20 ? "Low" : "Good"
            ],

            [
                "Engine Temp",
                `${vehicle.engineTemperature ?? 0} °C`,
                (vehicle.engineTemperature ?? 0) > 105 ? "High" : "Normal"
            ],

            [
                "Oil Pressure",
                `${vehicle.oilPressure ?? 0} bar`,
                "OK"
            ],

            [
                "Engine Load",
                `${vehicle.engineLoad ?? 0}%`,
                (vehicle.engineLoad ?? 0) > 90 ? "Heavy" : "Normal"
            ]

        ]

    });

    const healthY = doc.lastAutoTable.finalY + 20;

    let score = 100;

    if ((vehicle.fuelLevel ?? 0) < 20)
        score -= 20;

    if ((vehicle.engineTemperature ?? 0) > 105)
        score -= 20;

    if ((vehicle.rpm ?? 0) > 4000)
        score -= 10;

    if ((vehicle.speed ?? 0) > 120)
        score -= 10;

    doc.setFontSize(18);
    doc.setTextColor(25,118,210);
    doc.text("Overall Vehicle Health",14,healthY);

    doc.setFontSize(14);
    doc.setTextColor(0,0,0);

    doc.text(
        `Health Score : ${score}%`,
        14,
        healthY + 15
    );

    doc.setFontSize(16);

    if (score >= 90) {

        doc.setTextColor(0,150,0);
        doc.text("Excellent Condition",14,healthY+28);

    } else if (score >= 70) {

        doc.setTextColor(255,140,0);
        doc.text("Good Condition",14,healthY+28);

    } else {

        doc.setTextColor(220,0,0);
        doc.text("Needs Maintenance",14,healthY+28);

    }

    doc.save(`${vehicle.vehicleID}_Report.pdf`);

}