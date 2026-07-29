import { useReplay } from "../../context/ReplayContext";
import { useVehicle } from "../../context/VehicleContext";
import { getReplay } from "../../api/replayApi";

function ReplayPanel() {

    const { selectedVehicle } = useVehicle();

    const {

        replayData,
        setReplayData,

        isPlaying,
        setIsPlaying,

        currentIndex,
        setCurrentIndex

    } = useReplay();

    async function loadReplay() {

        if (!selectedVehicle) return;

        const data = await getReplay(

            selectedVehicle.vehicleID

        );

        setReplayData(data);

        setCurrentIndex(0);

    }

    return (

        <section className="panel">

            <div className="panel-header">

                Replay

            </div>

            <div className="panel-body">

                <button
                    className="btn-primary"
                    onClick={loadReplay}
                >

                    Load Route

                </button>

                <button
                    className="btn-primary"
                    onClick={() =>
                        setIsPlaying(true)
                    }
                >

                    ▶ Play

                </button>

                <button
                    className="btn-secondary"
                    onClick={() =>
                        setIsPlaying(false)
                    }
                >

                    ⏸ Pause

                </button>

                <button
                    className="btn-danger"
                    onClick={() => {

                        setCurrentIndex(0);

                        setIsPlaying(false);

                    }}
                >

                    ■ Stop

                </button>

                <br />

                <br />

                Points :

                {" "}

                {replayData.length}

            </div>

        </section>

    );

}

export default ReplayPanel;