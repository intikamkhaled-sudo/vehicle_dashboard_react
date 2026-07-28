import React from "react";
import ReactDOM from "react-dom/client";

import App from "./App";
import { VehicleProvider } from "./context/VehicleContext";

import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap-icons/font/bootstrap-icons.css";
import "leaflet/dist/leaflet.css";

import "./styles/dashboard.css";

ReactDOM.createRoot(document.getElementById("root")).render(
    <React.StrictMode>
        <VehicleProvider>
            <App />
        </VehicleProvider>
    </React.StrictMode>
);