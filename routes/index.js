let express = require('express')

// File URL
const Fileurl = require('./fileURL')

// DB connect
const maria = require('mysql')
const { db_info } = require('../config.json')
const connection = maria.createConnection(db_info)

// sql문 작성을 위해 mapper 생성
const mybatisMapper = require('mybatis-mapper')

let router = express.Router()
const format = {language: "sql", indent: ''}

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Date Calendar' })
});

// category api
router.post('/api/category', function(req, res, next) {
  mybatisMapper.createMapper([ Fileurl.url + '/mapper/category.xml' ])
  const query = mybatisMapper.getStatement('category', 'select', null, format)
  let param = {};

  const result = connection.query(query, (err, rows, fields) => {
    if(!err) {
      param.mode = true
      param.data = rows;

      res.send(param)
    } else
      console.log(err)
  })

  console.log("/api/category")
  console.log(result.sql)
});

// calendar select api
router.post('/api/calendar', function(req, res, next) {
  mybatisMapper.createMapper([ Fileurl.url + '/mapper/calendar.xml' ]);
  const query = mybatisMapper.getStatement('calendar', 'select', null, format);
  let param = {};

  const result = connection.query(query, (err, rows, fields) => {

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
    } else
      console.log(err)
  })

  console.log("/api/calendar")
  console.log(result.sql)
});

// calendar insert api
router.post('/api/calendar/insert', function(req, res, next) {
  let param = {};

  mybatisMapper.createMapper([ Fileurl.url + '/mapper/calendar.xml' ]);
  const query = mybatisMapper.getStatement('calendar', 'insert', req.body, format);

  const result = connection.query(query, (err, rows, fields) => {
    if(!err) {
      param.mode = true
      param.text = "스케줄 등록 완료"

      res.send(param)
    } else
      console.error(err)
  })

  console.log("/api/calendar/insert")
  console.log(result.sql)
});

// calendar update api
router.post('/api/calendar/update', function(req, res, next) {
  let param = {};
  console.log(req.body)

  mybatisMapper.createMapper([ Fileurl.url + '/mapper/calendar.xml' ]);
  const query = mybatisMapper.getStatement('calendar', 'update', req.body, format);

  const result = connection.query(query, (err, rows, fields) => {
    if(!err) {
      param.mode = true
      param.text = "스케줄 수정 완료"

      res.send(param)
    } else
      console.error(err)
  })

  console.log("/api/calendar/update")
  console.log(result.sql)
});

// calendar delete api
router.post('/api/calendar/delete', function(req, res, next) {
  let param = {};

  mybatisMapper.createMapper([ Fileurl.url + '/mapper/calendar.xml' ]);
  const query = mybatisMapper.getStatement('calendar', 'delete', req.body, format);

  const result = connection.query(query, (err, rows, fields) => {
    if(!err) {
      param.mode = true
      param.text = "스케줄 삭제 완료"

      res.send(param)
    } else
      console.error(err)
  })

  console.log("/api/calendar/delete")
  console.log(result.sql)
});

// db test
router.get('/db/test', function(req, res, next) {
  mybatisMapper.createMapper([ Fileurl.url + '/mapper/calendar.xml' ]);
  const query = mybatisMapper.getStatement('date', 'insert', null, format);

  connection.query(query, (err, rows, fields) => {
    if(!err) {
      res.send(rows)
    } else
      res.send(err)
    })
});

module.exports = router;
