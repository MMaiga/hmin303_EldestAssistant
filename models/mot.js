var commonHelper   = require('../helpers/common');
var abstract_db = require("../models/abstract_db");
var validator = require('validator');
  var mysql = require('mysql');

var mot = function()
{
    this.table = "Mots";

    this.connection = mysql.createConnection({
      host : 'localhost',
      user : 'root',
      password : 'password',
      database :  'db_dico_jdm_dev'
    })

 }

module.exports = new mot();
