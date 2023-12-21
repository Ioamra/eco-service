const express = require('express');
const port = 5000;
const cors = require('cors');
const app = express();

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

app.use(cors(corsOptions));


app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use('/api/utilisateur', require('./routes/utilisateur.routes'));

app.listen(5000, () => { console.log(`Backend started on port ${port}`) });