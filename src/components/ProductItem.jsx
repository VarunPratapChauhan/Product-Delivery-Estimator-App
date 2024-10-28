import React, { useState, useEffect } from 'react';
import DeliveryEstimator from './DeliveryEstimator';
import CountdownTimer from './CountdownTimer';

const ProductItem = ({ product, inStock, logisticsProviders }) => {
    const [pincode, setPincode] = useState('');
    const [estimatedDeliveryDate, setEstimatedDeliveryDate] = useState('');
    const [timer, setTimer] = useState(0);
    const [isTimerActive, setIsTimerActive] = useState(false);
    const [targetTime, setTargetTime] = useState(null);

    // Pincode validation function
    const isPincodeValid = (pincode) => {
        const pincodeRegex = /^[0-9]{6}$/; // 6-digit numeric pincode
        return pincodeRegex.test(pincode);
    };

    const handleEstimateDelivery = () => {
        if (isPincodeValid(pincode)) {
            const { deliveryMessage, cutoffTime } = DeliveryEstimator(pincode, product, logisticsProviders, inStock, setTimer);
            setEstimatedDeliveryDate(deliveryMessage);

            if (cutoffTime) {
                setTimer(cutoffTime - new Date()); // Set the timer based on the cutoff time
                setIsTimerActive(true); // Activate the timer if there is a valid cutoff time
                setTargetTime(new Date(cutoffTime)); // Set target time for CountdownTimer
            } else {
                setIsTimerActive(false); // Deactivate timer if no valid cutoff
            }
        } else {
            setEstimatedDeliveryDate("Please enter a valid pincode.");
            setIsTimerActive(false);
        }
    };

    // Timer effect
    useEffect(() => {
        let intervalId;

        if (isTimerActive && timer > 0) {
            intervalId = setInterval(() => {
                setTimer(prev => {
                    if (prev <= 1000) {
                        setIsTimerActive(false);
                        return 0; // Stop timer at 0
                    }
                    return prev - 1000; // Decrease by 1 second
                });
            }, 1000);
        }

        return () => clearInterval(intervalId);
    }, [isTimerActive, timer]);
    
    return (
        <div className="product-item">
            <div className="product-details">
                <div className="left-side">
                    <h2>{product['Product Name']}</h2>
                    <p>Price: ${product['Price']}</p>
                    <p>Status: {inStock ? "In Stock" : "Out of Stock"}</p>
                </div>
                <div className="right-side">
                    <input
                        type="text"
                        value={pincode}
                        onChange={(e) => setPincode(e.target.value)}
                        placeholder="Enter Pincode"
                    />
                    <button onClick={handleEstimateDelivery} disabled={!inStock}>
                        Estimate Delivery
                    </button>
                </div>
            </div>
            {estimatedDeliveryDate && (
                <div className="estimated-delivery">
                    <p>Estimated Delivery: {estimatedDeliveryDate}</p>
                    {isTimerActive && timer > 0 && (
                        <CountdownTimer targetTime={targetTime} />
                    )}
                </div>
            )}
        </div>
    );
};

export default ProductItem;
