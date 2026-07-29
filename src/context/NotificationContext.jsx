import {
    createContext,
    useContext,
    useState
} from "react";

const NotificationContext = createContext();

export function NotificationProvider({ children }) {

    const [notifications, setNotifications] = useState([]);

    function addNotification(notification) {

        setNotifications(prev => [

            {
                id: crypto.randomUUID(),
                time: new Date().toLocaleTimeString(),
                ...notification
            },

            ...prev

        ].slice(0,50));

    }

    function clearNotifications(){

        setNotifications([]);

    }

    return (

        <NotificationContext.Provider

            value={{

                notifications,

                addNotification,

                clearNotifications

            }}

        >

            {children}

        </NotificationContext.Provider>

    );

}

export function useNotification(){

    return useContext(NotificationContext);

}