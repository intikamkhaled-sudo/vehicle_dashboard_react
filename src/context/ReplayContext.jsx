import { createContext, useContext, useState } from "react";

const ReplayContext = createContext();

export function ReplayProvider({ children }) {

    const [replayData, setReplayData] = useState([]);

    const [isPlaying, setIsPlaying] = useState(false);

    const [currentIndex, setCurrentIndex] = useState(0);

    return (

        <ReplayContext.Provider
            value={{
                replayData,
                setReplayData,

                isPlaying,
                setIsPlaying,

                currentIndex,
                setCurrentIndex
            }}
        >

            {children}

        </ReplayContext.Provider>

    );

}

export function useReplay() {

    return useContext(ReplayContext);

}