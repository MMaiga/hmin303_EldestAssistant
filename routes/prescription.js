module.exports = function(app, settings){
  var url = require('url'),
    express = require('express'),
    prescriptionRouter = express.Router();
    mysql = require('mysql');

    //Helpers:
    var commonHelper   = require('../helpers/common');
    var abstract_db = require("../models/abstract_db");
    var prescription = require("../models/prescription");
    var person = require("../models/person");

// ***** Methods
//NONE

prescriptionRouter.get('/', function(req, res)
{

    var query = "Select * from prescription";

  abstract_db.connection.query(query, function(err, result)
  {
    res.json(commonHelper.result_json(err, result,'list prescriptions'));
  });
});

prescriptionRouter.get('/now', function(req, res)
{




    var query = `Select pr.id as prId ,pr.personID , pr.responsibleID  ,pr.creation_date   ,pr.completion_date ,pr.description , pr.validation,  p.id as respId ,p.firstname, p.lastname, p.phone ,p.role from prescription pr,person p where p.id = pr.responsibleID and pr.personID=`+req.query.id+" and DATE(completion_date)=DATE(NOW())";

    console.log(query);
  abstract_db.connection.query(query, function(err, result)
  {
    res.json(commonHelper.result_json(err, result,'list prescriptions'));
  });
});

prescriptionRouter.get('/byDate', function(req, res)
{

    var query = "Select * from prescription r,person p where p.id = r.responsibleID and r.personID = "+req.query.id+" order by r.creation_date";
    console.log(query);
  abstract_db.connection.query(query, function(err, result)
  {
    res.json(commonHelper.result_json(err, result,'list prescriptions'));
  });
});

prescriptionRouter.get('/responsibleList', function(req, res)
{

    var query = "Select * from prescription r,person p where p.id = r.personID and responsibleID = "+req.query.id+" order by creation_date";
    console.log(query);
  abstract_db.connection.query(query, function(err, result)
  {
    res.json(commonHelper.result_json(err, result,'list prescriptions'));
  });
});

prescriptionRouter.get('/validPrescription', function(req, res)
{
  var query = "Update prescription set validation=1"
                +" Where id="+req.query.id;
  console.log(query);
  abstract_db.connection.query(query, function(err, result)
  {
    res.json(commonHelper.result_json(err, result,'validPrescription'));
  });
});

prescriptionRouter.post('/create', function(req, res)
{

  var personID = req.body.personID;
  var responsibleID = req.body.responsibleID;
  var completion_date = req.body.completion_date;
  var description = req.body.description;


  var query = "insert into prescription "+
  "(personID,responsibleID,completion_date,description,creation_date)"
   +"values("
   +personID+","
    +responsibleID+","
    +abstract_db.AddQuote(completion_date)+","
    +abstract_db.AddQuote(description)+
    ",CURRENT_DATE)";
  console.log(query);
  abstract_db.connection.query(query, function(err, result)
  {
    res.json(commonHelper.result_json(err, result,'prescription added'));
  });

});


prescriptionRouter.post('/update', function(req, res)
{
  var personID = req.body.personID;
  var responsibleID = req.body.responsibleID;
  var completion_date = req.body.completion_date;
  var description = req.body.description;
  var id = req.body.id;
  validationResponse = prescription.validateAttributes(personID,responsibleID,completion_date);

     if(! validationResponse.success){
       //res.json();
       res.send({success: false, message: validationResponse.errors});

     }
     else {


  var query = "Update prescription set personID="+personID
                +",responsibleID="+responsibleID
                +",authorID="+authorID
                +",completion_date="+abstract_db.AddQuote(completion_date)
                +",description="+abstract_db.AddQuote(description)
                +" Where id="+id;
  console.log(query);
  abstract_db.connection.query(query, function(err, result)
  {
    res.json(commonHelper.result_json(err, result,'prescription updated'));
  });
}
});

prescriptionRouter.delete('/delete', function(req, res)
{
  var query = "Delete from prescription where id="+req.query.id;
  console.log(query);
  abstract_db.connection.query(query, function(err, result)
  {
    res.json(commonHelper.result_json(err, result,'prescription deleted'));
  });
});

prescriptionRouter.get('/read', function(req, res)
{
  var id = req.query.id;
  var query = "Select * from prescription Pr where Pr.id="+id;
  console.log(query);
  abstract_db.connection.query(query, function(err, result)
  {
    console.log(err);
    if (result.length < 1)
    {
      res.json(commonHelper.result_json(err, result,'Prescription '+id+ " not found"));
    }
    else {
      res.json(commonHelper.result_json(err, result,'Prescription '+id+ " founded"));
    }
  });
});







  app.use('/api/prescription',prescriptionRouter);
};
