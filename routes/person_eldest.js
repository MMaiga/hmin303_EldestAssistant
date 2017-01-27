module.exports = function(app, settings){
  var url = require('url'),
    express = require('express'),
    personRouter = express.Router();
    mysql = require('mysql')
    payloadChecker = require('payload-validator');

    var jwt = require('jwt-simple');
    //Helpers:
    var commonHelper   = require('../helpers/common');
    var abstract_db = require("../models/abstract_db");
    var person = require("../models/person");
    var config = require("../config/index");
    //var bcrypt = require('bcrypt');

    var expectedPayload = {
        "phone" : "",
        "password" : ""
    };
// ***** Methods
//NONE

personRouter.get('/', function(req, res)
{
    var query = "Select * from person where role = 1";

  console.log(query);
  abstract_db.connection.query(query, function(err, result)
  {
    res.json(commonHelper.result_json(err, result,'list persons'));
  });
});



personRouter.get('/readResponsible', function(req, res)
{
  var query = "Select * from person where role=0  and phone="+req.query.phone;
  console.log(query);
  abstract_db.connection.query(query, function(err, result)
  {
    res.json(commonHelper.result_json(err, result,'Read Responsible'));
  });
});

personRouter.get('/readEldest', function(req, res)
{
  var query = "Select * from person where role=1  and phone="+req.query.phone;
  console.log(query);
  abstract_db.connection.query(query, function(err, result)
  {
    res.json(commonHelper.result_json(err, result,'Read Eldest'));
  });
});


personRouter.get('/eldestGetResponsible', function(req, res) {
  res.setHeader("Access-Control-Allow-Origin", "*");
    res.setHeader("Access-Control-Allow-Credentials", "true");
    res.setHeader("Access-Control-Allow-Methods", "GET,HEAD,OPTIONS,POST,PUT");
    res.setHeader("Access-Control-Allow-Headers", "Access-Control-Allow-Headers, Origin,Accept, Authorization, X-Requested-With, Content-Type, Access-Control-Request-Method, Access-Control-Request-Headers");


          var query = `select p.id  , p.firstname   , p.lastname , p.birthdate , p.address , p.mail , p.phone      , p.role , p.photo , r.idEldest , r.date , r.state , r.senderRole
          from eldest_responsible r , person  p
          where r.state > -1 and p.id = r.idResponsible and r.idEldest =`+req.query.id+" order by r.state asc , r.senderRole asc ";
          console.log(query);
          abstract_db.connection.query(query, function(err, result)
          {
            res.json(commonHelper.result_json(err, result,'responsibleGetEldest'));
          });
});

personRouter.get('/eldestSearchResponsible', function(req, res) {
  res.setHeader("Access-Control-Allow-Origin", "*");
    res.setHeader("Access-Control-Allow-Credentials", "true");
    res.setHeader("Access-Control-Allow-Methods", "GET,HEAD,OPTIONS,POST,PUT");
    res.setHeader("Access-Control-Allow-Headers", "Access-Control-Allow-Headers, Origin,Accept, Authorization, X-Requested-With, Content-Type, Access-Control-Request-Method, Access-Control-Request-Headers");


          var query = `select p.id  , p.firstname   , p.lastname , p.birthdate , p.address , p.mail , p.phone      , p.role , p.photo , r.idResponsible , r.date , r.state , r.senderRole

          from person  p , eldest_responsible r
          where  r.idResponsible = p.id  and p.phone=`+req.query.phone;
          console.log(query);
          abstract_db.connection.query(query, function(err, result)
          {
            res.json(commonHelper.result_json(err, result,'eldestSearchResponsible'));
          });
});




personRouter.get('/eldestAcceptResponsible', function(req, res) {
  res.setHeader("Access-Control-Allow-Origin", "*");
    res.setHeader("Access-Control-Allow-Credentials", "true");
    res.setHeader("Access-Control-Allow-Methods", "GET,HEAD,OPTIONS,POST,PUT");
    res.setHeader("Access-Control-Allow-Headers", "Access-Control-Allow-Headers, Origin,Accept, Authorization, X-Requested-With, Content-Type, Access-Control-Request-Method, Access-Control-Request-Headers");


          var query = `UPDATE eldest_responsible
SET state=`+req.query.state+
` WHERE idEldest=`+req.query.idEldest+" and idResponsible="+req.query.idResponsible;
          console.log(query);
          abstract_db.connection.query(query, function(err, result)
          {
            res.json(commonHelper.result_json(err, result,'eldestAcceptResponsible'));
          });
});

personRouter.delete('/eldestRemoveResponsible', function(req, res)
{

  var query = `delete from eldest_responsible`
+` WHERE idEldest=`+req.query.idEldest+" and idResponsible="+req.query.idResponsible;
  console.log(query);
  abstract_db.connection.query(query, function(err, result)
  {
    res.json(commonHelper.result_json(err, result,'eldestAcceptResponsible'));
  });

});


  app.use('/api/person_eldest',personRouter);
};
