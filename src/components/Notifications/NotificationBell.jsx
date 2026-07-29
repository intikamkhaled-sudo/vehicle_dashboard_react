import { useState } from "react";
import { useNotification } from "../../context/NotificationContext";
import "./NotificationBell.css";
function NotificationBell() {

    const [open, setOpen] = useState(false);

    const {
        notifications,
        clearNotifications
    } = useNotification();

    return (

        <div style={{ position: "relative" }}>

            <button
                onClick={() => setOpen(!open)}
                style={{
                    background: "transparent",
                    border: "none",
                    fontSize: 24,
                    cursor: "pointer",
                    color: "white"
                }}
            >
                🔔

                {notifications.length > 0 && (
                    <span
                        style={{
                            position: "absolute",
                            top: -5,
                            right: -5,
                            background: "red",
                            color: "white",
                            borderRadius: "50%",
                            width: 20,
                            height: 20,
                            fontSize: 12,
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "center"
                        }}
                    >
                        {notifications.length}
                    </span>
                )}

            </button>

            {open && (

                <div
                    style={{
                        position: "absolute",
                        right: 0,
                        top: 40,
                        width: 350,
                        maxHeight: 400,
                        overflowY: "auto",
                        background: "#1f2937",
                        borderRadius: 10,
                        padding: 15,
                        zIndex: 9999,
                        boxShadow: "0 0 20px rgba(0,0,0,.5)"
                    }}
                >

                    <h4>Notifications</h4>

                    <hr />

                    {notifications.length === 0 ? (

                        <p>No Notifications</p>

                    ) : (

                        notifications.map(n => (

                            <div
                                key={n.id}
                                style={{
                                    marginBottom: 10,
                                    padding: 10,
                                    borderRadius: 8,
                                    background:
                                        n.type === "critical"
                                            ? "#4b1111"
                                            : "#4b3a11"
                                }}
                            >
                                <strong>
                                    {n.vehicleID}
                                </strong>

                                <br />

                                {n.title}

                                <br />

                                <small>
                                    {n.time}
                                </small>

                            </div>

                        ))

                    )}

                 <button
    onClick={() => setOpen(!open)}
    className={
        notifications.length > 0
            ? "bell-btn bell-ring"
            : "bell-btn"
    }
>
    🔔

    {notifications.length > 0 && (

        <span className="bell-count">

            {notifications.length}

        </span>

    )}

</button>

                </div>

            )}

        </div>

    );

}

export default NotificationBell;