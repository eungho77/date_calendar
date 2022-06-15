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

  const result = connection.query(query, (err, rows, fields) => {
    if(!err) {
      res.send(rows)
    } else
      res.send(err)
  })

  console.log("/api/category")
  console.log(result.sql)
});

// calendar select api
router.post('/api/calendar', function(req, res, next) {
  mybatisMapper.createMapper([ Fileurl.url + '/mapper/calendar.xml' ]);
  const query = mybatisMapper.getStatement('calendar', 'select', null, format);

  const result = connection.query(query, (err, rows, fields) => {
    if(!err) {
      res.send(rows)
    } else
      res.send(err)
  })

  console.log("/api/calendar")
  console.log(result.sql)
  // const query = mybatisMapper.getStatement('date', 'all_select', null, format);
});

// calendar insert api
router.post('/api/calendar/insert', function(req, res, next) {
  console.log(req.body)
  res.send( { result : true, text : "스케줄 등록 성공" } )
  // const query = mybatisMapper.getStatement('date', 'all_select', null, format);
});

// db test
router.get('/db/test', function(req, res, next) {
  mybatisMapper.createMapper([ Fileurl.url + '/mapper/calendar.xml' ]);
  const query = mybatisMapper.getStatement('date', 'all_select', null, format);

  connection.query(query, (err, rows, fields) => {
    if(!err) {
      res.send(rows)
    } else
      res.send(err)
    })
});

module.exports = router;
