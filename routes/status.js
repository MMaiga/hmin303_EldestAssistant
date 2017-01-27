module.exports = function(app, settings){
  var url = require('url'),
    express = require('express'),
    statusRouter = express.Router();
    mysql = require('mysql');

    //Helpers:
    var commonHelper   = require('../helpers/common');
    var abstract_db = require("../models/abstract_db");
    var status = require("../models/status");

// ***** Methods
//NONE

statusRouter.get('/', function(req, res)
{
  var query = "Select * from status";

  console.log(query);
  abstract_db.connection.query(query, function(err, result)
  {
    res.json(commonHelper.result_json(err, result,'list status'));
  });
});

statusRouter.post('/create', function(req, res)
{

   var personID = req.body.personID;
   var responsibleID = req.body.responsibleID;
   var status_date = req.body.status_date;
   var description = req.body.description;

      validationResponse = status.validateAttributes(personID,responsibleID,status_date,description);

      if(! validationResponse.success){
        res.json(validationResponse);

      }
      else {

        var query = "Insert into status (personID,responsibleID,status_date,description) values("
          +abstract_db.AddQuote(personID)+","
          +abstract_db.AddQuote(responsibleID)+","
          +abstract_db.AddQuote(status_date)+","
          +abstract_db.AddQuote(description)+
          ")";
        console.log(query);
        abstract_db.connection.query(query, function(err, result)
        {
          res.json(commonHelper.result_json(err, result,'status added'));
        });
      }


});


statusRouter.post('/update', function(req, res)
{
  var personID = req.body.personID;
  var responsibleID = req.body.responsibleID;
  var status_date = req.body.status_date;
  var description = req.body.description;
  var id = req.body.id;

      validationResponse = status.validateAttributes(personID,responsibleID,status_date,description);

      if(! validationResponse.success){
        res.json(validationResponse);

      }
      else {

          var query = "Update status set personID="+abstract_db.AddQuote(personID)
                        +",responsibleID="+abstract_db.AddQuote(responsibleID)
                        +",status_date="+abstract_db.AddQuote(status_date)
                        +",description="+abstract_db.AddQuote(description)
                        +" Where id="+id;
          console.log(query);
          abstract_db.connection.query(query, function(err, result)
          {
            res.json(commonHelper.result_json(err, result,'status updated'));
          });

}
});

//http://localhost:3000/api/status/delete?id=1416
statusRouter.delete('/delete', function(req, res)
{
  var query = "delete from status where id="+req.query.id;
  console.log(query);
  abstract_db.connection.query(query, function(err, result)
  {
    res.json(commonHelper.result_json(err, result,'status deleted'));
  });
});

//http://localhost:3000/api/status/read?id=1416
statusRouter.get('/read', function(req, res)
{
  var query = "Select * from status where id="+req.query.id;
  console.log(query);
  abstract_db.connection.query(query, function(err, result)
  {
    res.json(commonHelper.result_json(err, result,'Read status'));
  });
});

  app.use('/api/status',statusRouter);
};
