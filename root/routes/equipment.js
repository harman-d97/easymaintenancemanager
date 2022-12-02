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

router.post('/create', async function(req, res) {
    console.log('creating new equipment');
    try {
        let equipmentNumber = req.body.data.equipmentNumber;
        let equipmentName = req.body.data.equipmentName;
        let equipmentDescription = req.body.data.equipmentDescription;
        let manufacturer = req.body.data.manufacturer;
        let modelNumber = req.body.data.modelNumber;
        let currentEmployeeId = req.body.employee;

        if (equipmentDescription == '') {
            equipmentDescription = null;
        }
        if (manufacturer == '') {
            manufacturer = null;
        }
        if (modelNumber == '') {
            modelNumber = null;
        }

        const addEquipment = `INSERT INTO equipment (equipmentNumber, equipmentName, equipmentDescription, manufacturer, modelNumber) VALUES (?, ?, ?, ?, ?)`;
        connection.query(addEquipment, [equipmentNumber, equipmentName, equipmentDescription, manufacturer, modelNumber], (err, result, fields) => {
            if (err) {
                console.log('Error occured while creating new equipment');
                res.send({ status: 0, data: err });
            } else {
                res.send({ status: 1, data: result });

                let changeMade = 'Added new equipment with name: ' + equipmentName + ', equipment numner: ' + equipmentNumber;
                let date = currentDateTime();

                const addChange = `INSERT INTO reports (employeeId, date, changeDescription) VALUES (?, ?, ?)`;
                connection.query(addChange, [currentEmployeeId, date, changeMade], (err, result, fields) => {
                    if (err) {
                        console.log('Error occured while adding change to reports');
                    } else {
                        console.log('Change added to reports');
                    }
                });
            }
        });
    } catch (error) {
        console.log('Error occured during create equipment query');
        res.send({ status: 0, data: error });
    }
});

router.get('/get-all-equipment', async function (req, res) {
    console.log('getting equipment name');
    try {
        const sql = `SELECT equipmentNumber, equipmentName FROM equipment`;
        connection.query(sql, (err, result, fields) => {
            if (err) {
                console.log('Error occured while getting equipment name');
                res.send({status: 0, data: err});
            } else {
                res.send({status: 1, data: result});
            }
        });
    } catch (error) {
        console.log('Error occured during get equipment name query');
        res.send({status: 0, data: error});
    }
});

module.exports = router;