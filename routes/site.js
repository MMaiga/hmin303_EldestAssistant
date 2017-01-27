module.exports = function(app, settings){
  var url = require('url'),
    express = require('express'),
    siteRouter = express.Router();
    mysql = require('mysql');

    //Helpers:
    var commonHelper   = require('../helpers/common');
    var abstract_db = require("../models/abstract_db");
    var site = require("../models/site");

// ***** Methods
//NONE

siteRouter.get('/', function(req, res)
{
  var query = "Select * from site";
 
  console.log(query);
  abstract_db.connection.query(query, function(err, result)
  {
    res.json(commonHelper.result_json(err, result,'list sites'));
  });
});

siteRouter.post('/create', function(req, res)
{
   var personID = req.body.personID;
   var category = req.body.category;
   var link = req.body.link;
 
      validationResponse = site.validateAttributes(category,link);
      if(! validationResponse.success){
        //res.json(validationResponse);
        res.send({success: false, message: validationResponse.errors});
        
      }
      else {
        
        var query = "Insert into site (personID,category,link) values("
          +abstract_db.AddQuote(personID)+","
          +abstract_db.AddQuote(category)+","
          +abstract_db.AddQuote(link)+
          ")";
        console.log(query);
        abstract_db.connection.query(query, function(err, result)
        {
          res.json(commonHelper.result_json(err, result,'site added'));
        });
      }
   

});


siteRouter.post('/update', function(req, res)
{
  var personID = req.body.personID;
  var category = req.body.category;
  var link = req.body.link;
  var id = req.body.id;
  
      validationResponse = site.validateAttributes(personID,category,link);

      if(! validationResponse.success){
        res.json(validationResponse);
        
      }
      else {

          var query = "Update site set personID="+abstract_db.AddQuote(personID)
                        +",category="+abstract_db.AddQuote(category)
                        +",link="+abstract_db.AddQuote(link)
                        +" Where id="+id;
          console.log(query);
          abstract_db.connection.query(query, function(err, result)
          {
            res.json(commonHelper.result_json(err, result,'site updated'));
          });

}
});

//http://localhost:3000/api/site/delete?id=1416
siteRouter.delete('/delete', function(req, res)
{
  var query = "delete from site where id="+req.query.id;
  console.log(query);
  abstract_db.connection.query(query, function(err, result)
  {
    res.json(commonHelper.result_json(err, result,'site deleted'));
  });
});

//http://localhost:3000/api/site/read?id=1416
siteRouter.get('/read', function(req, res)
{
  var query = "Select * from site where category="+req.query.cat
  + " and personID="+req.query.personID;
  console.log(query);
  abstract_db.connection.query(query, function(err, result)
  {
    res.json(commonHelper.result_json(err, result,'Read site'));
  });
});

  app.use('/api/site',siteRouter);
};
