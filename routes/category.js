// File URL
const Fileurl = require('./fileURL')
const express = require("express");

// DB connect
const maria = require('mysql2')
const { db_info } = require('../config.json')
const pool = maria.createPool(db_info)

// sql문 작성을 위해 mapper 생성
const mybatisMapper = require('mybatis-mapper')

let router = express.Router()

const format = {language: "sql", indent: ''}

router.post('/api/select', function(req, res, next) {
    mybatisMapper.createMapper([ Fileurl.url + '/mapper/category.xml' ])
    const query = mybatisMapper.getStatement('category', 'select', null, format)
    let param = {};

    pool.getConnection(function(err, conn){
        const result = conn.query(query, (err, rows, fields) => {
            if(!err) {
                param.mode = true
                param.data = rows

                res.send(param)
            } else {
                console.error(err)
            }
        })
        console.log("/api/category")
        console.log(result.sql)

        pool.releaseConnection(conn)
    })
});

module.exports = router;