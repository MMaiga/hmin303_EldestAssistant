var commonHelper   = require('../helpers/common');
var abstract_db = require("../models/abstract_db");
var validator = require('validator');
  var mysql = require('mysql');

var areteType = function()
{
    this.table = "AretesTypes";

    this.connection = mysql.createConnection({
      host : 'localhost',
      user : 'root',
      password : 'password',
      database :  'db_dico_jdm_dev'
    })

}

module.exports = new areteType();
