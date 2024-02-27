const express = require('express');
const port = 5000;
const cors = require('cors');
const app = express();
const createWebSocketServer = require('./config/websocket.config')
const path = require('path');

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

app.use("/images/categorie", express.static(path.join(__dirname, "upload/categorie")));
app.use("/images/produit", express.static(path.join(__dirname, "upload/produit")));
app.use("/images/tuto", express.static(path.join(__dirname, "upload/tuto")));

app.use('/api/utilisateur', require('./routes/utilisateur.routes'));
app.use('/api/produit', require('./routes/produit.routes'));
app.use('/api/categorie', require('./routes/categorie.routes'));
app.use('/api/tuto', require('./routes/tuto.routes'));

app.listen(port, () => { console.log(`Backend started on port ${port}`) });