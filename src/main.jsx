import React from "react";
import ReactDOM from "react-dom/client";

import App from "./App";
import { VehicleProvider } from "./context/VehicleContext";

import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap-icons/font/bootstrap-icons.css";
import "leaflet/dist/leaflet.css";
import { NotificationProvider } from "./context/NotificationContext";
import "./styles/dashboard.css";
import { ReplayProvider } from "./context/ReplayContext";
ReactDOM.createRoot(document.getElementById("root")).render(

    <NotificationProvider>

    <VehicleProvider>

        <ReplayProvider>

            <App />

        </ReplayProvider>

    </VehicleProvider>

</NotificationProvider>
);