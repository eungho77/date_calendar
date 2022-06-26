// File URL
const Fileurl = require('./fileURL')
const express = require("express");

// DB connect
const maria = require('mysql')
const { db_info } = require('../config.json')
const connection = maria.createConnection(db_info)

// sql문 작성을 위해 mapper 생성
const mybatisMapper = require('mybatis-mapper')
mybatisMapper.createMapper([ Fileurl.url + '/mapper/dashboard.xml' ])

let router = express.Router()

const format = {language: "sql", indent: ''}

router.post('/api/select', function(req, res, next) {
    let param = {}

    const query = mybatisMapper.getStatement('dashboard', 'select', req.body, format)
    const result = connection.query(query, (err, rows, fields) => {
        if(!err) {
            param.mode = true
            param.result = rows[0]

            console.log(rows)

            res.send(param)
        } else {
            console.error(err)
        }
    });

    console.log("/dashboard/api/select")
    console.log(result.sql)
});

router.post('/api/insert', function(req, res, next) {
    let param = {};

    const query = mybatisMapper.getStatement('dashboard', 'insert', {id: req.body.id}, format);
    const result = connection.query(query, (err, rows, fields) => {
        if(!err) {
            param.mode = true
            param.text = "dashboard 등록 완료"

            console.log(param)
        } else {
            console.error(err)
        }
    })

    console.log("/dashboard/api/insert")
    console.log(result.sql)
});

router.post('/api/update', function(req, res, next) {
    let param = {};
    console.log(req.body)

    const query = mybatisMapper.getStatement('dashboard', 'update', req.body, format);
    const result = connection.query(query, (err, rows, fields) => {
        if(!err) {
            param.mode = true
            param.text = "dashboard 수정 완료"

            console.log(param)
        } else {
            console.error(err)
        }
    })

    console.log("/dashboard/api/update")
    console.log(result.sql)
});

module.exports = router;