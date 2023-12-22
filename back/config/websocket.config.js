const WebSocketServer = require('ws');

const createWebSocketServer = (server) => {
    const wss = new WebSocketServer({ server });

    wss.on('connection', (ws) => {
        console.log('Client connected');

        ws.on('close', () => {
            console.log('Client disconnected');
        });
    });

    return wss;
};

module.exports = createWebSocketServer;