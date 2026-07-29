import { useState } from "react";

import { useVehicle } from "../../context/VehicleContext";
import { getVehicleStatus } from "../../utils/vehicleStatus";

import { exportVehiclePDF } from "../../reports/exportPDF";

import VehicleDetailsModal from "./VehicleDetailsModal";

function SelectedVehicle() {

    const { selectedVehicle } = useVehicle();

    const [open,setOpen]=useState(false);

    if(!selectedVehicle){

        return null;

    }

    const {status}=getVehicleStatus(selectedVehicle);

    return(

        <>

        <section className="panel">

            <div className="panel-header">

                Selected Vehicle

            </div>

            <div
                className="panel-body"
                style={{
                    textAlign:"center",
                    padding:"45px"
                }}
            >

                <h1>

                    {selectedVehicle.vehicleID}

                </h1>

                <span
                    className={`badge bg-${status.toLowerCase()}`}
                >

                    {status}

                </span>

                <br/><br/>

                <button
                    className="btn btn-primary"
                    onClick={()=>setOpen(true)}
                >

                    View Details

                </button>

                {"  "}

                <button
                    className="btn btn-success"
                    onClick={()=>
                        exportVehiclePDF(selectedVehicle)
                    }
                >

                    Export PDF

                </button>

            </div>

        </section>

        <VehicleDetailsModal

            vehicle={selectedVehicle}

            open={open}

            onClose={()=>setOpen(false)}

        />

        </>

    );

}

export default SelectedVehicle;