import { Marker } from "react-leaflet";
import { useEffect, useRef, useState } from "react";

function SmoothMarker({ position, icon, children }) {

    const [currentPos, setCurrentPos] = useState(position);

    const animationRef = useRef();

    useEffect(() => {

        if (!position) return;

        cancelAnimationFrame(animationRef.current);

        const start = currentPos;

        const end = position;

        const duration = 1000;

        const startTime = performance.now();

        function animate(time) {

            const progress = Math.min(
                (time - startTime) / duration,
                1
            );

            const lat =
                start[0] +
                (end[0] - start[0]) * progress;

            const lng =
                start[1] +
                (end[1] - start[1]) * progress;

            setCurrentPos([lat, lng]);

            if (progress < 1) {

                animationRef.current =
                    requestAnimationFrame(animate);

            }

        }

        animationRef.current =
            requestAnimationFrame(animate);

        return () =>
            cancelAnimationFrame(animationRef.current);

    }, [position]);

    return (

        <Marker
            position={currentPos}
            icon={icon}
        >
            {children}
        </Marker>

    );

}

export default SmoothMarker;