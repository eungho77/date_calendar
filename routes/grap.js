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

router.post('/api/select/zone/top15', function(req, res, next) {
    let param = [];
    let param1 = {};
    let param2 = {};

    let data = [];
    let count = 0;

    mybatisMapper.createMapper([ Fileurl.url + '/mapper/grap.xml' ]);
    const query = mybatisMapper.getStatement('grap', 'select', req.body, format);

    pool.getConnection(function (err, conn) {
        const result = conn.query(query, (err, rows, fields) => {
            if(!err) {
                for(let row of rows){
                    const location = row.location.split(", ")
                    for(let data of location){
                        param[count] = data;

                        count++;
                    }
                }

                const location = param.reduce((acc, cur) => {
                    acc.set(cur, (acc.get(cur) || 0) + 1);
                    return acc;
                }, new Map());

                for(let [key, value] of location.entries()){
                    param1 = {
                        location : key,
                        total : value
                    }

                    data.push(param1)
                }

                data.sort(function(a, b) {
                    return b.total - a.total
                })

                if(data.length >= 1) {
                    let top6 = [];

                    for(let i=0; i<data.length; i++) {
                        if(i < 5) {
                            top6.push(data[i])
                        }
                    }

                    param2.mode = true
                    param2.result = top6
                } else {
                    param2.mode = false
                    param2.result = "데이터 조회 실패"
                }

                res.send(param2)
            } else {
                console.error(err)
            }
        })

        console.log("/api/grap")
        console.log(result.sql)

        pool.releaseConnection(conn)
    })



});

router.post('/api/select/region', function(req, res, next) {
    let param = [];
    let param1 = {};
    let param2 = {};

    let data = [];
    let count = 0;

    mybatisMapper.createMapper([ Fileurl.url + '/mapper/grap.xml' ]);
    const query = mybatisMapper.getStatement('grap', 'select', req.body, format);

    pool.getConnection(function (err, conn) {
        const result = conn.query(query, (err, rows, fields) => {
            if(!err) {
                for(let row of rows){
                    const location = row.location.split(", ")
                    for(let data of location){
                        param[count] = data.split(" ")[0];

                        count++;
                    }
                }

                const location = param.reduce((acc, cur) => {
                    acc.set(cur, (acc.get(cur) || 0) + 1);
                    return acc;
                }, new Map());

                for(let [key, value] of location.entries()){
                    param1 = {
                        location : key,
                        total : value
                    }

                    data.push(param1)
                }

                data.sort(function(a, b) {
                    return b.total - a.total
                })

                if(data.length >= 1) {
                    let top6 = [];

                    for(let i=0; i<data.length; i++) {
                        top6.push(data[i])
                    }

                    param2.mode = true
                    param2.result = top6
                } else {
                    param2.mode = false
                    param2.result = "데이터 조회 실패"
                }

                res.send(param2)
            } else {
                console.error(err)
            }
        })

        console.log("/api/grap")
        console.log(result.sql)

        pool.releaseConnection(conn)
    })
});

module.exports = router;