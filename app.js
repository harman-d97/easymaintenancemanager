const express = require('express');
var indexRouter = require('./routes/index');
var cors = require('cors');

const app = express();
const PORT = process.env.PORT || 8080;
const path = require('path');
app.use(cors());
app.use(express.json());
app.use('/', indexRouter);

app.use(express.static('./frontend/dist/easy-maintenance-manager'));

app.get('/*', (req, res) => {
    res.sendFile('index.html', { root: 'frontend/dist/easy-maintenance-manager' });
});
 
app.listen(PORT, () => {
    console.log('Listening on port ${PORT}');
});