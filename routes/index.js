let express = require('express')

// File URL
const Fileurl = require('./fileURL')

// DB connect
const maria = require('mysql2')
const { db_info, date } = require('../config.json')
const pool = maria.createPool(db_info)

// sql문 작성을 위해 mapper 생성
const mybatisMapper = require('mybatis-mapper')

let router = express.Router()
const format = {language: "sql", indent: ''}

/* GET home page. */
router.get('/', function(req, res, next) {
  const setDate = new Date(date.start);
  const now = new Date();

  const time = setDate.getTime() - now.getTime()
  const dday = Math.abs(time / (1000 * 60 * 60 * 24)) // 밀리터리 * 초 * 분 * 시 = 일

  res.render('index', { title: 'Date Calendar', dday: "♥" + parseInt(dday + 1) + "♥" })
});

// calendar select api
router.post('/api/calendar', function(req, res, next) {
  mybatisMapper.createMapper([ Fileurl.url + '/mapper/calendar.xml' ]);
  const query = mybatisMapper.getStatement('calendar', 'select', null, format);
  let param = {};

  pool.getConnection(function (err, conn) {
    const result = conn.query(query, (err, rows, fields) => {
      if(!err) {
        for(let a of rows){
          if(a.isAllDay === "종일") {
            a.isAllDay = true
          } else {
            a.isAllDay = false
          }
        }

        param.mode = true
        param.data = rows

        res.send(param)
      } else {
        console.error(err)
      }
    })

    console.log("/api/calendar")
    console.log(result.sql)

    pool.releaseConnection(conn)
  })

});

// calendar insert api
router.post('/api/calendar/insert', function(req, res, next) {
  let param = {};
  let param1 = {};

  mybatisMapper.createMapper([ Fileurl.url + '/mapper/calendar.xml' ]);
  const query = mybatisMapper.getStatement('calendar', 'insert', req.body, format);

  pool.getConnection(function (err, conn) {
    const result = conn.query(query, (err, rows, fields) => {
      if(!err) {
        param.mode = true
        param.text = "스케줄 등록 완료"

        res.send(param)
      } else {
        console.error(err)
      }
    })

    console.log("/api/calendar/insert")
    console.log(result.sql)

    pool.releaseConnection(conn)
  })
});

// calendar update api
router.post('/api/calendar/update', function(req, res, next) {
  let param = {};
  console.log(req.body)

  mybatisMapper.createMapper([ Fileurl.url + '/mapper/calendar.xml' ]);
  const query = mybatisMapper.getStatement('calendar', 'update', req.body, format);

  pool.getConnection(function (err, conn) {
    const result = conn.query(query, (err, rows, fields) => {
      if(!err) {
        param.mode = true
        param.text = "스케줄 수정 완료"

        res.send(param)
      } else {
        console.error(err)
      }
    })

    console.log("/api/calendar/update")
    console.log(result.sql)

    pool.releaseConnection(conn)
  })
});

// calendar delete api
router.post('/api/calendar/delete', function(req, res, next) {
  let param = {};

  mybatisMapper.createMapper([ Fileurl.url + '/mapper/calendar.xml' ]);
  const query = mybatisMapper.getStatement('calendar', 'delete', req.body, format);

  pool.getConnection(function (err, conn) {
    const result = conn.query(query, (err, rows, fields) => {
      if(!err) {
        param.mode = true
        param.text = "스케줄 삭제 완료"

        res.send(param)
      } else {
        console.error(err)
      }
    })

    console.log("/api/calendar/delete")
    console.log(result.sql)

    pool.releaseConnection(conn)
  })
})

module.exports = router;
