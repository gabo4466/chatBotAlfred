const onClose = (connection) => {
    console.log('Connection Closed');
    console.log(`close description: ${connection.closeDescription}`);
    console.log(`close reason code: ${connection.closeReasonCode}`);
}

const onError = (error) => {
    console.log("Connection Error: " + error.toString());
}

module.exports = {
    onClose,
    onError
}