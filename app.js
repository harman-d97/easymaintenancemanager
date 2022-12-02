const express = require('express');
var indexRouter = require('./routes/index');
var cors = require('cors');

const app = express();
const PORT = process.env.PORT || 8080;
const path = require('path');
app.use(cors());
app.use(express.json());
app.use('/', indexRouter);

app.use(express.static(__dirname + '/frontend/dist/easy-maintenance-manager'));

app.get('/*', function(req, res) {
    res.sendFile(path.join(__dirname + '/frontend/dist/easy-maintenance-manager/index.html'));
});
 
app.listen(PORT, () => {
    console.log('Listening on port ${PORT}');
});