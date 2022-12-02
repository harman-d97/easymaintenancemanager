const express = require('express');
const router = express.Router();
const mysql = require('mysql');

const connection = mysql.createConnection({
    host: 'us-cdbr-east-06.cleardb.net/',
    user: 'b6b826afdc15cd',
    password: '7848ad71',
    database: 'heroku_bde77d66de50ef9',
});

function currentDateTime() {
    let date = new Date();
    let year = date.getFullYear();
    let month = date.getMonth() + 1;
    let day = date.getDate();
    let hour = date.getHours();
    let minute = date.getMinutes();
    let second = date.getSeconds();
    if (month.toString().length == 1) {
        month = '0' + month;
    }
    if (day.toString().length == 1) {
        day = '0' + day;
    }
    if (hour.toString().length == 1) {
        hour = '0' + hour;
    }
    if (minute.toString().length == 1) {
        minute = '0' + minute;
    }
    if (second.toString().length == 1) {
        second = '0' + second;
    }
    let dateTime = year + '-' + month + '-' + day + ' ' + hour + ':' + minute + ':' + second;
    return dateTime.toString();
}

router.get('/get-todays-tasks', async function (req, res) {
    console.log('getting todays tasks');
    try {
        const sql = `SELECT * FROM task WHERE DATE(dateDue) = CURDATE() AND currentStatus = 0`;
        connection.query(sql, (err, result, fields) => {
            if (err) {
                console.log('Error occured while getting todays tasks');
                res.send({status: 0, data: err});
            } else {
                res.send({status: 1, data: result});
            }
        });
    } catch (error) {
        console.log('Error occured during get todays task query');
        res.send({status: 0, data: error});
    }
});

router.get('/get-all-tasks', async function (req, res) {
    console.log('getting all tasks');
    try {
        const sql = `SELECT * FROM task WHERE currentStatus = 0`;
        connection.query(sql, (err, result, fields) => {
            if (err) {
                console.log('Error occured while getting all tasks');
                res.send({status: 0, data: err});
            } else {
                res.send({status: 1, data: result});
            }
        });
    } catch (error) {
        console.log('Error occured during get all task query');
        res.send({status: 0, data: error});
    }
});

router.post('/get-task-by-id', async function (req, res) {
    console.log('getting task by id');
    try {
        let id = req.body.taskId;
        const sql = 'SELECT * FROM task WHERE taskId = ?';
        connection.query(sql, [id], (err, result, fields) => {
            if (err) {
                console.log('Error occured while getting task by id');
                res.send({status: 0, data: err});
            } else {
                res.send({status: 1, data: result});
            }
        });
    } catch (error) {
        console.log('Error occured during get task by id query');
        res.send({status: 0, data: error});
    }
});

router.post('/get-employee-name', async function (req, res) {
    console.log('getting employee name');
    try {
        let employeeId = req.body.employeeId;
        const sql = `SELECT firstName, lastName FROM users WHERE employeeId = ?`;
        connection.query(sql, [employeeId], (err, result, fields) => {
            if (err) {
                console.log('Error occured while getting employee name');
                res.send({status: 0, data: err});
            } else {
                res.send({status: 1, data: result});
            }
        });
    } catch (error) {
        console.log('Error occured during get employee name query');
        res.send({status: 0, data: error});
    }
});

router.post('/create', async function(req, res) { 
    console.log('creating task');
    try {
        console.log(req.body);
        let description = req.body.data.description;
        let assignedTo = req.body.data.assignedTo;
        let repeatAfter = req.body.data.repeatAfter;
        let equipmentName = req.body.data.equipmentName;
        let equipmentNumber = req.body.data.equipmentNumber;
        let scheduleFor = req.body.data.scheduleFor;
        let estCompletionTime = req.body.data.estCompletionTime;
        let currentemployeeId = req.body.currentEmployee;

        if (repeatAfter == '') {
            repeatAfter = null;
        }
        if (estCompletionTime == '') {
            estCompletionTime = null;
        }
        if (typeof assignedTo == 'string') {
            assignedTo = parseInt(assignedTo);
        }

        console.log(description, assignedTo, repeatAfter, equipmentNumber, equipmentName, scheduleFor, estCompletionTime);

        const sql = `INSERT INTO task (employeeId, equipmentNumber, equipmentName, description, dateDue, repeatAfter, estCompletionTime, currentStatus) VALUES (?, ?, ?, ?, ?, ?, ?, ?)`;

        connection.query(sql, [assignedTo, equipmentNumber, equipmentName, description, scheduleFor, repeatAfter, estCompletionTime, 0], (err, result, fields) => {
            if (err) {
                console.log('Error occured while creating task');
                res.send({status: 0, data: err});
            } else {
                res.send({status: 1, data: result});
                let changeMade = 'Created new Task for ' + equipmentName + ' (' + equipmentNumber + ') with description: ' + description + ' assigned to ' + assignedTo;
                let date = currentDateTime();

                const addChange = `INSERT INTO reports (employeeId, date, changeDescription) VALUES (?, ?, ?)`;
                connection.query(addChange, [currentemployeeId, date, changeMade], (err, result, fields) => {
                    if (err) {
                        console.log('Error occured while adding change to reports');
                    } else {
                        console.log('Change added to reports');
                    }
                });
            }
        });
    } catch (error) {
        console.log('Error occured during create task query');
        res.send({status: 0, data: error});
    }
});

router.post('/update', async function (req, res) {
    console.log('updating task');
    try {
        let taskId = req.body.id;
        let currentemployeeId = req.body.employee;
        let description = req.body.data.description;
        let assignedTo = req.body.data.assignedTo;
        let repeatAfter = req.body.data.repeatAfter;
        let scheduleFor = req.body.data.scheduleFor;
        let estCompletionTime = req.body.data.estCompletionTime;

        const sql = `UPDATE task SET description = ?, employeeId = ?, repeatAfter = ?, dateDue = ?, estCompletionTime = ? WHERE taskId = ?`;
        connection.query(sql, [description, assignedTo, repeatAfter, scheduleFor, estCompletionTime, taskId], (err, result, fields) => {
            if (err) {
                console.log('Error occured while updating task');
                res.send({status: 0, data: err});
            } else {
                console.log('Task updated');
                res.send({status: 1, data: result});

                let date = currentDateTime();

                const checkDate = `SELECT date FROM reports WHERE date = ?`;
                connection.query(checkDate, [date], (err, result, fields) => {
                    if (result.length > 0) {
                        console.log('Date already exists in reports');
                    } else {
                        let changeMade = 'Updated Task ' + taskId + '  for ' +  equipmentName + ' (' + equipmentNumber + ')';

                        const addChange = `INSERT INTO reports (employeeId, date, changeDescription) VALUES (?, ?, ?)`;
                        connection.query(addChange, [currentemployeeId, date, changeMade], (err, result, fields) => {
                            if (err) {
                                console.log('Error occured while adding change to reports');
                            } else {
                                console.log('Change added to reports');
                            }
                        });
                    }
                });
            }
        });

    } catch (error) {
        console.log('Error occured during update task query');
        res.send({status: 0, data: error});
    }
});

router.post('/update-task-status', async function (req, res) {
    console.log('updating task status');
    try {
        let taskId = req.body.taskId;
        let currentemployeeId = req.body.employee;

        const sql = `UPDATE task SET currentStatus = 1 WHERE taskId = ?`;
        connection.query(sql, [taskId], (err, result, fields) => {
            if (err) {
                console.log('Error occured while updating task status');
                res.send({status: 0, data: err});
            } else {
                console.log('Task status updated');
                res.send({status: 1, data: result});

                let date = currentDateTime();

                const checkDate = `SELECT date FROM reports WHERE date = ?`;
                connection.query(checkDate, [date], (err, result, fields) => {
                    if (result.length > 0) {
                        console.log('Date already exists in reports');
                    } else {
                        let changeMade = 'Marked Task: ' + taskId + ' as completed';

                        const addChange = `INSERT INTO reports (employeeId, date, changeDescription) SELECT (?, ?, ?) WHERE NOT EXISTS (SELECT * FROM reports WHERE date = ?)`;
                        connection.query(addChange, [currentemployeeId, date, changeMade, date], (err, result, fields) => {
                            if (err) {
                                console.log('Error occured while adding change to reports');
                            } else {
                                console.log('Change added to reports');
                            }
                        });
                    }
                });
            }
        });
        
    } catch (error) {
        console.log('Error occured during update task status query');
        res.send({status: 0, data: error});
    }
});

router.post('/delete', async function (req, res) {
    console.log('deleting task');
    try {
        let taskId = req.body.taskId;
        let currentemployeeId = req.body.employee;

        const sql = `DELETE FROM task WHERE taskId = ?`;
        connection.query(sql, [taskId], (err, result, fields) => {
            if (err) {
                console.log('Error occured while deleting task');
                res.send({status: 0, data: err});
            } else {
                res.send({status: 1, data: result});

                let date = currentDateTime();

                const checkDate = `SELECT date FROM reports WHERE date = ?`;
                connection.query(checkDate, [date], (err, result, fields) => {
                    if (result.length > 0) {
                        console.log('Date already exists in reports');
                    } else {
                        let changeMade = 'Deleted Task: ' + taskId + ' from the system';

                        const addChange = `INSERT INTO reports (employeeId, date, changeDescription) VALUES (?, ?, ?)`;
                        connection.query(addChange, [currentemployeeId, date, changeMade, date], (err, result, fields) => {
                            if (err) {
                                console.log('Error occured while adding change to reports');
                            } else {
                                console.log('Change added to reports');
                            }
                        });
                    }
                });
            }
        });
    } catch (error) {
        console.log('Error occured during delete task query');
        res.send({status: 0, data: error});
    }
});

router.post('/get-employee-schedule', async function (req, res) {
    console.log('getting employee schedule');
    try {
        let employeeId = req.body.employeeId;
        let date = req.body.date;

        const sql = `SELECT * FROM task WHERE employeeId = ? AND dateDue = ? and currentStatus = 0`;
        connection.query(sql, [employeeId, date], (err, result, fields) => {
            if (err) {
                console.log('Error occured while getting employee schedule');
                res.send({status: 0, data: err});
            } else {
                res.send({status: 1, data: result});
            }
        });
    } catch (error) {
        console.log('Error occured during get employee schedule query');
        res.send({status: 0, data: error});
    }
});

router.post('/get-employees-schedules-by-date', async function (req, res) {
    console.log('getting employees schedules by date');
    try {
        let date = req.body.date;

        const sql = `SELECT * FROM task WHERE dateDue = ? and currentStatus = 0`;
        connection.query(sql, [date], (err, result, fields) => {
            if (err) {
                console.log('Error occured while getting employees schedule by date');
                res.send({status: 0, data: err});
            } else {
                res.send({status: 1, data: result});
            }
        });
    } catch (error) {
        console.log('Error occured during get employees schedule by date query');
        res.send({status: 0, data: error});
    }
});

router.post('/get-employees-schedules-by-employee', async function (req, res) {
    console.log('getting employees schedules by employee');
    try {
        console.log("hi");
        //console.log(req.body);
        let employeeId = req.body.employee;
        console.log(employeeId);

        const sql = `SELECT * FROM task WHERE employeeId = ? and currentStatus = 0`;
        connection.query(sql, [employeeId], (err, result, fields) => {
            if (err) {
                console.log('Error occured while getting employees schedule by employee');
                res.send({status: 0, data: err});
            } else {
                res.send({status: 1, data: result});
            }
        });
    } catch (error) {
        console.log('Error occured during get employees schedule by employee query');
        res.send({status: 0, data: error});
    }
});

module.exports = router;