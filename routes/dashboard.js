// File URL
const Fileurl = require('./fileURL')
const express = require("express");

// DB connect
const maria = require('mysql2')
const { db_info } = require('../config.json')
const pool = maria.createPool(db_info)

// sql문 작성을 위해 mapper 생성
const mybatisMapper = require('mybatis-mapper')
mybatisMapper.createMapper([ Fileurl.url + '/mapper/dashboard.xml' ])

let router = express.Router()

const format = {language: "sql", indent: ''}

router.post('/api/select', function(req, res, next) {
    let param = {}
    const query = mybatisMapper.getStatement('dashboard', 'select', req.body, format)

    pool.getConnection(function(err, conn){
        const result = conn.query(query, (err, rows, fields) => {
            if(!err) {
                param.mode = true
                param.result = rows[0]

                res.send(param)
            } else {
                console.error(err)
            }
        });

        console.log("/dashboard/api/select")
        console.log(result.sql)

        pool.releaseConnection(conn)
    })
});

router.post('/api/add', function(req, res, next) {
    let param = {}

    const query_select = mybatisMapper.getStatement('dashboard', 'select', req.body, format)
    const query_insert = mybatisMapper.getStatement('dashboard', 'insert', req.body, format)
    const query_update = mybatisMapper.getStatement('dashboard', 'update', req.body, format)

    pool.getConnection(function(err, conn) {
        conn.query(query_select, (err, rows, fields) => {
            if(!err) {
                if(!rows[0]) {
                    const result = conn.query(query_insert, (err, rows, fields) => {
                        if(!err) {
                            param.mode = true
                            param.result = "할일 추가 완료"
                        } else {
                            param.mode = false
                            param.result = "할일 추가 실패"

                            console.error(err)
                        }
                        res.send(param)
                    })

                    console.log("할일 추가 >> /dashboard/api/add")
                    console.log(result.sql)
                } else {
                    const result = conn.query(query_update, (err, rows, fields) => {
                        if(!err) {
                            param.mode = true
                            param.result = "할일 수정 완료"
                        } else {
                            param.mode = false
                            param.result = "할일 수정 실패"

                            console.error(err)
                        }
                        res.send(param)
                    })

                    console.log("할일 수정 >> /dashboard/api/add")
                    console.log(result.sql)
                }
            } else {
                console.error(err)
            }
        });

        pool.releaseConnection(conn)
    })
});

module.exports = router;