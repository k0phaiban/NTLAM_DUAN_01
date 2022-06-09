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
    "ProductName",
    "ProductCode",
    "ProductType",
    "Quantity",
    "Supplier",
    "Price"
]

const workSheetColumnName = [
    "Tên thuốc",
    "Mã thuốc",
    "Loại thuốc",
    "Số lượng",
    "Nhà cung cấp",
    "Giá tiền"
]
const workSheetName = "Users";
const filePath = './api/controllers/download/excel-from-js.xlsx';
const fullPath = 'http://localhost:3000/outputFiles/excel-from-js.xlsx';

const table = 'products'

module.exports = {
    get: (req, res) => {
        let sql = 'SELECT * FROM product'
        db.query(sql, (err, response) => {
            if (err) throw err
            res.json(response)
        })
    },
    paging: (req, res) => {
        let sql = 'SELECT * FROM product p LIMIT 5 OFFSET 5'
        db.query(sql, (err, response) => {
            if (err) throw err
            res.json(response)
        })
    },
    export: (req, res) => {
        let sql = 'SELECT * FROM product p'
        db.query(sql, (err, response) => {
            if (err) throw err
            exportUsersToExcel(response,workSheetColumnCode,workSheetColumnName,workSheetName,filePath);
            const file = `${__dirname}/download/excel-from-js.xlsx`;
            //res.json(file);
            res.download(file); // Set disposition and send it.
        })
    },
    detail: (req, res) => {
        let sql = 'SELECT * FROM product WHERE ProductID = ?'
        db.query(sql, [req.params.productId], (err, response) => {
            if (err) throw err
            res.json(response[0])
        })
    },
    update: (req, res) => {
        let data = req.body;
        let productId = req.params.productId;
        let sql = 'UPDATE product SET ? WHERE ProductID = ?'
        db.query(sql, [data, productId], (err, response) => {
            if (err) throw err
            res.json({message: 'Update success!'})
        })
    },
    store: (req, res) => {
        let data = req.body;
        let sql = 'INSERT INTO product SET ?'
        db.query(sql, [data], (err, response) => {
            if (err) throw err
            res.json({message: 'Insert success!'})
        })
    },
    delete: (req, res) => {
        let sql = 'DELETE FROM product WHERE ProductID = ?'
        db.query(sql, [req.params.productId], (err, response) => {
            if (err) throw err
            res.json({message: 'Delete success!'})
        })
    }
}