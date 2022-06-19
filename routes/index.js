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
    } else {
      console.error(err)
    }
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
    } else {
      console.error(err)
    }
  })

  console.log("/api/calendar")
  console.log(result.sql)
});

// calendar insert api
router.post('/api/calendar/insert', function(req, res, next) {
  let param = {};
  let param1 = {};

  mybatisMapper.createMapper([ Fileurl.url + '/mapper/calendar.xml' ]);
  const query = mybatisMapper.getStatement('calendar', 'insert', req.body, format);

  const result = connection.query(query, (err, rows, fields) => {
    if(!err) {
      param.mode = true
      param.text = "스케줄 등록 완료"

      res.send(param)
    } else {
      console.error(err)
    }
  })



  mybatisMapper.createMapper([ Fileurl.url + '/mapper/dashboard.xml' ]);
  let dashboard_param = {
    id: req.body.id,
    content: req.body.title
  }

  const query1 = mybatisMapper.getStatement('dashboard', 'insert', dashboard_param, format);
  const result1 = connection.query(query1, (err, rows, fields) => {
    if(!err) {
      param1.mode = true
      param1.text = "dashboard 등록 완료"

      console.log(param1)
    } else {
      console.error(err)
    }
  })

  console.log("/api/calendar/insert")
  console.log(result.sql)
  console.log(result1.sql)
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
    } else {
      console.error(err)
    }
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
    } else {
      console.error(err)
    }
  })

  console.log("/api/calendar/delete")
  console.log(result.sql)
});

// grap select api
router.post('/api/grap', function(req, res, next) {
  let param = [];
  let param1 = {};
  let param2 = {};

  let data = [];
  let count = 0;

  mybatisMapper.createMapper([ Fileurl.url + '/mapper/grap.xml' ]);
  const query = mybatisMapper.getStatement('grap', 'select', req.body, format);

  const result = connection.query(query, (err, rows, fields) => {
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

  console.log("/api/calendar/delete")
  console.log(result.sql)
});

module.exports = router;
