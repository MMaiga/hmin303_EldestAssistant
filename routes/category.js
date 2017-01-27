module.exports = function(app, settings){
  var url = require('url'),
    express = require('express'),
    categoryRouter = express.Router();
    mysql = require('mysql');

    //Helpers:
    var commonHelper   = require('../helpers/common');
    var abstract_db = require("../models/abstract_db");
    var category = require("../models/category");

// ***** Methods
//NONE

categoryRouter.get('/', function(req, res)
{

    var query = "Select * from category";

  abstract_db.connection.query(query, function(err, result)
  {
    res.json(commonHelper.result_json(err, result,'list Categories'));
  });
});

categoryRouter.get('/CategSite', function(req, res)
{

    var query = "Select * from category where categoryTable ='site'";

  abstract_db.connection.query(query, function(err, result)
  {
    res.json(commonHelper.result_json(err, result,'site list Categories'));
  });
});

categoryRouter.get('/CategPrescription', function(req, res)
{

    var query = "Select * from category where categoryTable ='prescription'";

  abstract_db.connection.query(query, function(err, result)
  {
    res.json(commonHelper.result_json(err, result,'prescription list Categories'));
  });
});

categoryRouter.post('/create', function(req, res)
{

  var categoryTable = req.body.categoryTable;
  var categoryName = req.body.categoryName;
  var categoryCode = req.body.categoryCode;

  validationResponse = category.validateAttributes(categoryTable,categoryName,categoryCode);

      if(! validationResponse.success){
        res.json(validationResponse);
      }
      else {

        var query = "Insert into category"
        +"(categoryTable,categoryName,categoryCode)"
        +" values("
          +abstract_db.AddQuote(categoryTable)+","
          +abstract_db.AddQuote(categoryName)+","
          +categoryCode+
          ")";
        console.log(query);
        abstract_db.connection.query(query, function(err, result)
        {
          res.json(commonHelper.result_json(err, result,'category added'));
        });
      }

});


categoryRouter.post('/update', function(req, res)
{
  var categoryTable = req.body.categoryTable;
  var categoryName = req.body.categoryName;
  var categoryCode = req.body.categoryCode;
  var id = req.body.id;

  validationResponse = category.validateAttributes(categoryTable,categoryName,categoryCode);

      if(! validationResponse.success){
        res.json(validationResponse);

      }
      else {

        var query = "Update category set categoryTable="+abstract_db.AddQuote(categoryTable)
                      +",categoryName="+abstract_db.AddQuote(categoryName)
                      +",categoryCode="+categoryCode
                      +" Where id="+id;
        console.log(query);
        abstract_db.connection.query(query, function(err, result)
        {
          res.json(commonHelper.result_json(err, result,'category updated'));
        });
      }

});

categoryRouter.delete('/delete', function(req, res)
{
  var query = "Delete from category where id="+req.query.id;
  console.log(query);
  abstract_db.connection.query(query, function(err, result)
  {
    res.json(commonHelper.result_json(err, result,'category deleted'));
  });
});

categoryRouter.get('/read', function(req, res)
{
  var query = "Select * from category where id="+req.query.id;
  console.log(query);
  abstract_db.connection.query(query, function(err, result)
  {
    res.json(commonHelper.result_json(err, result,'Read category'));
  });
});
  app.use('/api/category',categoryRouter);
};
