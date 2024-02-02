const express = require('express');
const port = 3343;
const cors = require('cors');
const app = express();
const createWebSocketServer = require('./config/websocket.config')

const allowedOrigins = ['http://localhost:3000'];

const corsOptions = {
    origin: function (origin, callback) {
        if (allowedOrigins.indexOf(origin) !== -1 || !origin) {
            callback(null, true);
        } else {
            callback(new Error('Not allowed by CORS'));
        }
    },
};

const wss = createWebSocketServer(app);

app.use((req, res, next) => {
    req.wss = wss;
    next();
});

app.use(cors(corsOptions));

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use('/api/utilisateur', require('./routes/utilisateur.routes'));

app.listen(port, () => { console.log(`Backend started on port ${port}`) });