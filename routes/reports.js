const express = require('express');
const router = express.Router();
const mysql = require('mysql');

const connection = mysql.createConnection({
    host: 'us-cdbr-east-06.cleardb.net',
    user: 'b6b826afdc15cd',
    password: '7848ad71',
    database: 'heroku_bde77d66de50ef9',
});

router.get('/get-all-reports', async function (req, res) {
    console.log('getting all reports');
    try {
        const sql = `SELECT * FROM reports`;
        connection.query(sql, (err, result, fields) => {
            if (err) {
                console.log('Error occured while getting all reports');
                res.send({ status: 0, data: err });
            } else {
                res.send({ status: 1, data: result });
            }
        });
    } catch (error) {
        console.log('Error occured during get all reports query');
        res.send({ status: 0, data: error });
    }
});

module.exports = router;