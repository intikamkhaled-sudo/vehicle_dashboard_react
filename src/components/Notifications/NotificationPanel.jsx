import { useNotification } from "../../context/NotificationContext";

function NotificationPanel() {

    const {

        notifications,

        clearNotifications

    } = useNotification();

    return (

        <section className="panel">

            <div className="panel-header">

                🔔 Notifications

            </div>

            <div
                className="panel-body"
                style={{
                    maxHeight: 350,
                    overflowY: "auto"
                }}
            >

                {

                    notifications.length === 0 ?

                        <p>No Notifications</p>

                        :

                        notifications.map(n => (

                            <div
                                key={n.id}
                                style={{
                                    padding: 12,
                                    marginBottom: 10,
                                    borderRadius: 8,
                                    background:
                                        n.type === "critical"
                                            ? "#3b0d0d"
                                            : "#3b2d0d"
                                }}
                            >

                                <strong>

                                    {n.vehicleID}

                                </strong>

                                <br />

                                {n.title}

                                <br />

                                {n.message}

                                <br />

                                <small>

                                    {n.time}

                                </small>

                            </div>

                        ))

                }

                {

                    notifications.length > 0 &&

                    <button

                        className="btn btn-danger"

                        onClick={clearNotifications}

                    >

                        Clear All

                    </button>

                }

            </div>

        </section>

    );

}

export default NotificationPanel;