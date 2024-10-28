const DeliveryEstimator = (pincode, product, logisticsProviders, inStock, setTimer) => {
    const currentTime = new Date();

    if (!inStock) return "Product out of stock";

    const pincodeData = logisticsProviders[pincode];
    if (!pincodeData) return "Invalid pincode";

    const { provider, tat } = pincodeData;
    let deliveryMessage = '';
    let cutoffTime = null;

    // Determine delivery based on provider
    if (provider === 'Provider A') {
        cutoffTime = new Date();
        cutoffTime.setHours(17, 0, 0); // 5 PM cutoff

        if (currentTime < cutoffTime) {
            deliveryMessage = "Same-day delivery (if ordered before 5 PM)";
            const timeRemaining = cutoffTime - currentTime;
            setTimer(timeRemaining); // Set the timer for countdown
        } else {
            deliveryMessage = "Next-day delivery";
        }
    } else if (provider === 'Provider B') {
        cutoffTime = new Date();
        cutoffTime.setHours(9, 0, 0); // 9 AM cutoff

        if (currentTime < cutoffTime) {
            deliveryMessage = "Same-day delivery (if ordered before 9 AM)";
            const timeRemaining = cutoffTime - currentTime;
            setTimer(timeRemaining); // Set the timer for countdown
        } else {
            const deliveryDate = new Date(currentTime);
            deliveryDate.setDate(currentTime.getDate() + 1); // Next day
            deliveryMessage = `Delivery by ${deliveryDate.toDateString()}`;
        }
    } else {
        // General Providers - use TAT from pincodes
        const deliveryDate = new Date(currentTime);
        deliveryDate.setDate(currentTime.getDate() + tat);
        deliveryMessage = `Delivery in ${tat} days (approx. ${deliveryDate.toDateString()})`;
    }

    return { deliveryMessage, cutoffTime }; // Return both deliveryMessage and cutoffTime
};

export default DeliveryEstimator;
