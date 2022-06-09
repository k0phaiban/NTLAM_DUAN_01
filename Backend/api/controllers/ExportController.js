'use strict'

const util = require('util')
const mysql = require('mysql')
const db = require('./../db')
const exportUsersToExcel = require('./../export');

const users = [
    {
        id: 0,
        name: 'Peter',
        age: 31
    },
    {
        id: 1,
        name: 'John',
        age: 21
    },
    {
        id: 2,
        name: 'John 2',
        age: 21
    }
]

const workSheetColumnCode = [
    "ProductID",
    "ProductName"
]

const workSheetColumnName = [
    "ID",
    "Tên"
]

const workSheetName = "Users";
const filePath = './api/controllers/download/excel-from-js.xlsx';

const table = 'export'

module.exports = {
    get: (req, res) => {
        let sql = 'SELECT * FROM product'
        db.query(sql, (err, response) => {
            if (err) throw err
            exportUsersToExcel(response,workSheetColumnCode,workSheetColumnName,workSheetName,filePath);
            res.json(response)
        })
        //exportUsersToExcel(users,workSheetColumnName,workSheetName,filePath);
        //res.json(2)
    },
}