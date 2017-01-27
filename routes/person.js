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
  var role = req.query.role;
  if (role!== null && role!== undefined) {
    var query = "Select * from person where role = "+role;
  } else{
    var query = "Select * from person";
  }
  console.log(query);
  abstract_db.connection.query(query, function(err, result)
  {
    res.json(commonHelper.result_json(err, result,'list persons'));
  });
});

personRouter.post('/create', function(req, res)
{
  res.setHeader("Access-Control-Allow-Origin", "*");
    res.setHeader("Access-Control-Allow-Credentials", "true");
    res.setHeader("Access-Control-Allow-Methods", "GET,HEAD,OPTIONS,POST,PUT");
    res.setHeader("Access-Control-Allow-Headers", "Access-Control-Allow-Headers, Origin,Accept, X-Requested-With, Content-Type, Access-Control-Request-Method, Access-Control-Request-Headers");

   var firstname = req.body.firstname;
   var lastname = req.body.lastname;
   var phone = req.body.phone;
   var password = req.body.password;
   var role = req.body.role;

   console.log('firstname ='+firstname);
   console.log('lastname ='+lastname);
   console.log('phone ='+phone);
   console.log('password ='+password);
   console.log('role ='+role);

   validationResponse = person.validateCreationAttributes(firstname,lastname,phone,password,role);

      if(! validationResponse.success){
        //res.json();
        res.send({success: false, message: validationResponse.errors});

      }
      else {

        var query = "Insert into person (firstname,lastname,phone,password,role) values("
          +abstract_db.AddQuote(firstname)+","
          +abstract_db.AddQuote(lastname)+","
          +abstract_db.AddQuote(phone)+","
          +abstract_db.AddQuote(password)+","
          +role+
          ")";
        console.log(query);
        abstract_db.connection.query(query, function(err, result)
        {
          //res.json(commonHelper.result_json(err, result,'person added'));
          if(result){


          res.json({success: true, message: 'person added',result });
        }
        else
        {
          if(err.code == "ER_DUP_ENTRY")
          res.send({success: false, message: 'Cet utilisateur existe déjà'});
          res.send({success: false, message: err.code});
        }
        });
      }


});


personRouter.post('/update', function(req, res)
{
  res.setHeader("Access-Control-Allow-Origin", "*");
    res.setHeader("Access-Control-Allow-Credentials", "true");
    res.setHeader("Access-Control-Allow-Methods", "GET,HEAD,OPTIONS,POST,PUT");
    res.setHeader("Access-Control-Allow-Headers", "Access-Control-Allow-Headers, Origin,Accept, X-Requested-With, Content-Type, Access-Control-Request-Method, Access-Control-Request-Headers");


      var firstname = req.body.firstname;
      var lastname = req.body.lastname;
      //var username = req.body.username;
      var birthdate = req.body.birthdate;
      var address = req.body.address;
      var password = req.body.password;
      var mail = req.body.mail;
      var phone = req.body.phone;
     // var role = req.body.role;
      var photo = req.body.photo;
      //var id = req.body.id;

      validationResponse = person.validateUpdateAttributes(firstname,lastname,birthdate,address,password,mail);

          if(! validationResponse.success){
            res.json(validationResponse);

          }
          else {

              var query = "Update person set firstname="+abstract_db.AddQuote(firstname)
                            +",lastname="+abstract_db.AddQuote(lastname)
                            //+",username="+abstract_db.AddQuote(username)
                            +",birthdate="+abstract_db.AddQuote(birthdate)
                            +",address="+abstract_db.AddQuote(address)
                            +",password="+abstract_db.AddQuote(password)
                            +",mail="+abstract_db.AddQuote(mail)
                            //+",phone="+phone
                           // +",role="+role

                            +" Where phone="+phone;
              console.log(query);
              abstract_db.connection.query(query, function(err, result)
              {
                res.json(commonHelper.result_json(err, result,'person updated'));
              });

    }

});

personRouter.delete('/delete', function(req, res)
{
  var query = "delete from person where id="+req.query.id;
  console.log(query);
  abstract_db.connection.query(query, function(err, result)
  {
    res.json(commonHelper.result_json(err, result,'person deleted'));
  });
});

personRouter.get('/read', function(req, res)
{
  var query = "Select * from person where phone="+req.query.phone;
  console.log(query);
  abstract_db.connection.query(query, function(err, result)
  {
    res.json(commonHelper.result_json(err, result,'Read person'));
  });
});



personRouter.post('/login', function(req, res)
{
  res.setHeader("Access-Control-Allow-Origin", "*");
    res.setHeader("Access-Control-Allow-Credentials", "true");
    res.setHeader("Access-Control-Allow-Methods", "GET,HEAD,OPTIONS,POST,PUT");
    res.setHeader("Access-Control-Allow-Headers", "Access-Control-Allow-Headers, Origin,Accept, Authorization, X-Requested-With, Content-Type, Access-Control-Request-Method, Access-Control-Request-Headers");

  console.log('req.body.phone : '+req.body.phone);
  console.log('req.body.password : '+req.body.password);

  /*var resultat = payloadChecker.validator(req.body,expectedPayload,["phone","password"],false)
  if(resultat.success)
  {*/

      var query = "Select * from person where phone="+abstract_db.AddQuote(req.body.phone)
                      +" and password="+abstract_db.AddQuote(req.body.password);
      console.log(query);
      abstract_db.connection.query(query, function(err, result)
      {
        if(result.length > 0){

          console.log('result =' + result)
          var token = jwt.encode(result[0], config.secret);

          res.json({success: true, token: 'JWT ' + token,result });
        }
        else
        {
          res.send({success: false, message: 'Authentication failed. Wrong phone number or/and password.'});
        }
      });
 /* }
  else {
            res.json({"message" : "Authentication failed. Wrong phone number or/and password."});
        }*/
});

personRouter.get('/memberinfo', function(req, res) {
  res.setHeader("Access-Control-Allow-Origin", "*");
    res.setHeader("Access-Control-Allow-Credentials", "true");
    res.setHeader("Access-Control-Allow-Methods", "GET,HEAD,OPTIONS,POST,PUT");
    res.setHeader("Access-Control-Allow-Headers", "Access-Control-Allow-Headers, Origin,Accept, Authorization, X-Requested-With, Content-Type, Access-Control-Request-Method, Access-Control-Request-Headers");
  var token = getToken(req.headers);
  if (token) {
    var decoded = jwt.decode(token, config.secret);
    console.log('decoded ='+decoded.phone);
    //console.log('decoded[0] ='+decoded[0].phone);
    var query = "Select * from person where phone="+abstract_db.AddQuote(decoded.phone)
                  +" and password="+abstract_db.AddQuote(decoded.password);
    console.log(query);
    abstract_db.connection.query(query, function(err, user) {
        if (err) throw err;

        if (!user) {
          return res.status(403).send({success: false, message: 'Authentication failed. User not found.'});
        } else {
          res.json({success: true, message: 'Welcome in the member area ' + user[0].firstname + '!', user});
        }
    });
  } else {
    return res.status(403).send({success: false, message: 'No token provided.'});
  }
});


personRouter.get('/ResponsibleLinkEldest', function(req, res) {
  res.setHeader("Access-Control-Allow-Origin", "*");
    res.setHeader("Access-Control-Allow-Credentials", "true");
    res.setHeader("Access-Control-Allow-Methods", "GET,HEAD,OPTIONS,POST,PUT");
    res.setHeader("Access-Control-Allow-Headers", "Access-Control-Allow-Headers, Origin,Accept, Authorization, X-Requested-With, Content-Type, Access-Control-Request-Method, Access-Control-Request-Headers");


          var query = "INSERT INTO eldest_responsible (idEldest,idResponsible,senderRole) values ("
          +req.query.idEldest+","+req.query.idResponsible+","+req.query.senderRole+")"
          console.log(query);
          abstract_db.connection.query(query, function(err, result)
          {
            res.json(commonHelper.result_json(err, result,'responsiresponsibleAddEldestbleGetEldest'));
          });
});

personRouter.delete('/removeResponsibleLinkEldest', function(req, res)
{

  var query = `delete from eldest_responsible`
+` WHERE idEldest=`+req.query.idEldest+" and idResponsible="+req.query.idResponsible;
  console.log(query);
  abstract_db.connection.query(query, function(err, result)
  {
    res.json(commonHelper.result_json(err, result,'eldestAcceptResponsible'));
  });

});




getToken = function (headers) {
  if (headers && headers.authorization) {
    var parted = headers.authorization.split(' ');
    if (parted.length === 2) {
      return parted[1];
    } else {
      return null;
    }
  } else {
    return null;
  }
};

  app.use('/api/person',personRouter);
};
