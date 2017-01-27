var commonHelper   = require('../helpers/common');
var abstract_db = require("../models/abstract_db");
var validator = require('validator');
  var mysql = require('mysql');

var role = function()
{
    this.table = "role";

    this.validateAttributes = function(rolecode,rolename){
      console.log(rolecode);

      console.log(rolename);
    	var validationResponse = commonHelper.getValidationResponse();
  		var HelperValidator = commonHelper.validator;

  		   if (! ( HelperValidator.isAlphanumeric( rolecode ) && rolecode != "" ) ){
          validationResponse.addError("Invalid rolecode: " + rolecode);
        }
        if (! ( HelperValidator.isAscii( rolename ) && rolename != "" )){
          validationResponse.addError("Invalid rolename: " + rolename);
        }

        return validationResponse;
    }

 }

module.exports = new role();
