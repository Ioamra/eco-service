const express = require('express');
const port = 5000;

const app = express();

app.use('/api/users', require('./routes/users.routes'));

app.listen(5000, () => { console.log(`Backend started on port ${port}`) });