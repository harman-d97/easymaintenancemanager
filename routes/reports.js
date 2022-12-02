const express = require('express');
const router = express.Router();
const mysql = require('mysql');

const connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'Hrprt97!',
    database: 'goldenboyfoods',
    port: 3306
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