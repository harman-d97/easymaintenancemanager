const express = require('express');
const router = express.Router();
const md5 = require('md5');
const jwt = require('jsonwebtoken');

const mysql = require('mysql');

const pool = mysql.createPool({
    host: 'us-cdbr-east-06.cleardb.net/',
    user: 'b6b826afdc15cd',
    password: '7848ad71',
    database: 'heroku_bde77d66de50ef9',
});


router.post('/register', async function (req, res, next) {
    console.log("registering user");
    try {
        let { username, password, firstName, lastName, employeeId, sixDigitCode } = req.body;

        const hashedPassword = md5(password.toString());

        const checkUsername = `SELECT username FROM users WHERE username = ?`;
        pool.getConnection(function(err, connection) {
            connection.query(checkUsername, [username],  (err, result, fields) => {
                if (typeof result == 'undefined' || result.length == 0) {
                    const sql = `INSERT INTO users (employeeId , adminAccess, username, password, firstName, lastName, businessCode) VALUES (?, ?, ?, ?, ?, ?, ?)`;
                    connection.query(sql, [employeeId, 0, username, hashedPassword, firstName, lastName, sixDigitCode], (err, result, fields) => {
                        if (err) {
                            console.log('error occured while inserting user');
                            res.send({status: 0, data: err});
                        } else {
                            let token = jwt.sign({data: result}, 'secret');
                            res.send({status: 1, data: result, token: token});
                        }
                    });
                }
            });
        });
    } catch (error) {
        console.log('error on first query');
        res.send({status: 0, data: error});
    }
});

router.post('/login', async function (req, res) {
    try {
        let date = new Date();
        let year = date.getFullYear();
        let month = date.getMonth() + 1;
        let day = date.getDate();
        let hour = date.getHours();
        let minute = date.getMinutes();
        let second = date.getSeconds();
        if (day.toString().length == 1) {
            day = '0' + day;
        }
        let dateTime = year + '-' + month + '-' + day + ' ' + hour + ':' + minute + ':' + second;
        console.log(dateTime);
        let { username, password } = req.body;

        const hashedPassword = md5(password.toString());

        const sql = `SELECT * FROM users WHERE username = ? AND password = ?`;
        pool.getConnection(function(err, connection) {
            if (err) {
                connection.release();
                throw err;
            }
            connection.query(sql, [username, hashedPassword], function(err, result, fields) {
                connection.release();
                if (err || result.length == 0) {
                    res.send({status: 0, data: err});
                } else {
                    let token = jwt.sign({ data: result }, 'secret');
                    res.send({ status: 1, data: result, token: token });
                }
            });
        });
    } catch (error) {
        res.send({status: 0, data: error});
    }
});

router.get('/get-all-employees', async function (req, res) {
    try {
        const sql = `SELECT employeeId, firstname, lastname FROM users WHERE adminAccess = 0`;
        pool.getConnection(function(err, connection) {
            connection.query(sql, (err, result, fields) => {
                if (err) {
                    console.log('Error occured while getting all employees');
                    res.send({status: 0, data: err});
                } else {
                    res.send({status: 1, data: result});
                }
            });
        });
    } catch (error) {
        console.log('Error occured during get all employees query');
        res.send({status: 0, data: error});
    }
});

router.get('/get-all-users', async function (req, res) {
    try {
        const sql = `SELECT employeeId, firstname, lastname FROM users`;
        pool.getConnection(function(err, connection) {
            connection.query(sql, (err, result, fields) => {
                if (err) {
                    console.log('Error occured while getting all users');
                    res.send({status: 0, data: err});
                } else {
                    res.send({status: 1, data: result});
                }
            });
        });
    } catch (error) {
        console.log('Error occured during get all users query');
        res.send({status: 0, data: error});
    }
});

router.post('/delete-user', async function (req, res) {
    try {
        let { employeeId } = req.body;
        const sql = `DELETE FROM users WHERE employeeId = ?`;
        pool.getConnection(function(err, connection) {
            connection.query(sql, [employeeId], (err, result, fields) => {
                if (err) {
                    console.log('Error occured while deleting user');
                    res.send({status: 0, data: err});
                } else {
                    res.send({status: 1, data: result});
                }
            });
        });
    } catch (error) {
        console.log('Error occured during delete user query');
        res.send({status: 0, data: error});
    }
});

router.post('/give-admin-access', async function (req, res) {
    try {
        let { employeeId } = req.body;
        const sql = `UPDATE users SET adminAccess = 1 WHERE employeeId = ?`;
        pool.getConnection(function(err, connection) {
            connection.query(sql, [employeeId], (err, result, fields) => {
                if (err) {
                    console.log('Error occured while promoting user to admin');
                    res.send({status: 0, data: err});
                } else {
                    res.send({status: 1, data: result});
                }
            });
        });
    } catch (error) {
        console.log('Error occured during admin access query');
        res.send({status: 0, data: error});
    }
});

module.exports = router;