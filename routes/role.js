module.exports = function(app, settings){
  var url = require('url'),
    express = require('express'),
    roleRouter = express.Router();
    mysql = require('mysql');

    //Helpers:
    var commonHelper   = require('../helpers/common');
    var abstract_db = require("../models/abstract_db");
    var role = require("../models/role");

// ***** Methods
//NONE

roleRouter.get('/', function(req, res)
{
  var query = "Select * from role";

  console.log(query);
  abstract_db.connection.query(query, function(err, result)
  {
    res.json(commonHelper.result_json(err, result,'list roles'));
  });
});

roleRouter.post('/create', function(req, res)
{

   var rolecode = req.body.rolecode;
   var rolename = req.body.rolename;

      validationResponse = role.validateAttributes(rolecode,rolename);

      if(! validationResponse.success){
        res.json(validationResponse);

      }
      else {

        var query = "Insert into role (rolecode,rolename) values("
          +abstract_db.AddQuote(rolecode)+","
          +abstract_db.AddQuote(rolename)+
          ")";
        console.log(query);
        abstract_db.connection.query(query, function(err, result)
        {
          res.json(commonHelper.result_json(err, result,'role added'));
        });
      }


});


roleRouter.post('/update', function(req, res)
{
  var rolecode = req.body.rolecode;
  var rolename = req.body.rolename;
  var id = req.body.id;

      validationResponse = role.validateAttributes(rolecode,rolename);

      if(! validationResponse.success){
        res.json(validationResponse);

      }
      else {

          var query = "Update role set rolecode="+abstract_db.AddQuote(rolecode)
                        +",rolename="+abstract_db.AddQuote(rolename)
                        +" Where id="+id;
          console.log(query);
          abstract_db.connection.query(query, function(err, result)
          {
            res.json(commonHelper.result_json(err, result,'role updated'));
          });

}
});

//http://localhost:3000/api/role/delete?id=1416
roleRouter.delete('/delete', function(req, res)
{
  var query = "delete from role where id="+req.query.id;
  console.log(query);
  abstract_db.connection.query(query, function(err, result)
  {
    res.json(commonHelper.result_json(err, result,'role deleted'));
  });
});

//http://localhost:3000/api/role/read?id=1416
roleRouter.get('/read', function(req, res)
{
  var query = "Select * from role where id="+req.query.id;
  console.log(query);
  abstract_db.connection.query(query, function(err, result)
  {
    res.json(commonHelper.result_json(err, result,'Read role'));
  });
});

  app.use('/api/role',roleRouter);
};
