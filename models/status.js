var commonHelper   = require('../helpers/common');
var abstract_db = require("../models/abstract_db");
var validator = require('validator');
  var mysql = require('mysql');

var status = function()
{
    this.table = "status";

    this.validateAttributes = function(personID,responsibleID,status_date,description){
    	var validationResponse = commonHelper.getValidationResponse();
  		var HelperValidator = commonHelper.validator;
        if (! ( HelperValidator.isNumeric( personID ) && personID != "" ) ){
          validationResponse.addError("Invalid personID: " + personID);
        }
        if (! ( HelperValidator.isNumeric( responsibleID ) && responsibleID != "" )){
          validationResponse.addError("Invalid responsibleID: " + responsibleID);
        }
        if (! ( HelperValidator.isDate( status_date ) && status_date != "" )){
          validationResponse.addError("Invalid status_date: " + status_date);
        }
        /*
        if (! ( HelperValidator.isAlphanumeric( description ) && description != "" )){
          validationResponse.addError("Invalid description: " + description);
        }
        */

        return validationResponse;
    }

 }

module.exports = new status();
