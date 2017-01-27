module.exports = function(app, settings){
  var url = require('url'),
    express = require('express'),
    contactRouter = express.Router();
    mysql = require('mysql');

    //Helpers:
    var commonHelper   = require('../helpers/common');
    var abstract_db = require("../models/abstract_db");
    var contact = require("../models/contact");

// ***** Methods
//NONE

contactRouter.get('/', function(req, res)
{
    var query = "Select * from contact";

  abstract_db.connection.query(query, function(err, result)
  {
    res.json(commonHelper.result_json(err, result,'list contacts'));
  });
});

contactRouter.post('/create', function(req, res)
{

  var personID = req.body.personID;
  var name = req.body.name;
  var phone = req.body.phone;
  var mail = req.body.mail;

  validationResponse = contact.validateAttributes(personID,name,phone,mail);

      if(! validationResponse.success){
        res.json(validationResponse);
        
      }
      else {

        var query = "Insert into contact "
        +"(personID,name,phone,mail) "
        +"values("
          +personID+","
          +abstract_db.AddQuote(name)+","
          +abstract_db.AddQuote(phone)+","
          +abstract_db.AddQuote(mail)+
          ")";
        console.log(query);
        abstract_db.connection.query(query, function(err, result)
        {
          res.json(commonHelper.result_json(err, result,'contact added'));
        });
      }

});


contactRouter.post('/update', function(req, res)
{
  var personID = req.body.personID;
  var name = req.body.name;
  var phone = req.body.phone;
  var mail = req.body.mail;
  var id = req.body.id;

   validationResponse = contact.validateAttributes(personID,name,phone,mail);

      if(! validationResponse.success){
        res.json(validationResponse);
        
      }
      else {

          var query = "Update contact set personID="+personID
                        +",name="+abstract_db.AddQuote(name)
                        +",phone="+phone
                        +",mail="+abstract_db.AddQuote(mail)
                        +" Where id="+id;
          console.log(query);
          abstract_db.connection.query(query, function(err, result)
          {
            res.json(commonHelper.result_json(err, result,'contact updated'));
          });
      }

});

contactRouter.delete('/delete', function(req, res)
{
  var query = "Delete from contact where id="+req.query.id;
  console.log(query);
  abstract_db.connection.query(query, function(err, result)
  {
    res.json(commonHelper.result_json(err, result,'contact deleted'));
  });
});

contactRouter.get('/read', function(req, res)
{
  var query = "Select * from contact where id="+req.query.id;
  console.log(query);
  abstract_db.connection.query(query, function(err, result)
  {
    res.json(commonHelper.result_json(err, result,'Read contact'));
  });
});







  app.use('/api/contact',contactRouter);
};
