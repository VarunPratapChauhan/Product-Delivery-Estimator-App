import React, { useEffect, useState } from 'react';

const CountdownTimer = ({ targetTime }) => {
    const [timeRemaining, setTimeRemaining] = useState(targetTime - new Date());

    useEffect(() => {
        const intervalId = setInterval(() => {
            const newTimeRemaining = targetTime - new Date();
            setTimeRemaining(newTimeRemaining);
            if (newTimeRemaining <= 0) {
                clearInterval(intervalId);
            }
        }, 1000);

        return () => clearInterval(intervalId);
    }, [targetTime]);

    const formatTime = (time) => {
        const totalSeconds = Math.floor(time / 1000);
        const hours = Math.floor(totalSeconds / 3600);
        const minutes = Math.floor((totalSeconds % 3600) / 60);
        const seconds = totalSeconds % 60;
        return `${hours}h ${minutes}m ${seconds}s`;
    };

    return (
        <div>
            {timeRemaining > 0 ? (
                <p>Time remaining for same-day delivery: {formatTime(timeRemaining)}</p>
            ) : (
                <p>Order now for next-day delivery!</p>
            )}
        </div>
    );
};

export default CountdownTimer;
