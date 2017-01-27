var commonHelper   = require('../helpers/common');
var abstract_db = require("../models/abstract_db");
var validator = require('validator');
  var mysql = require('mysql');

var prescription = function()
{
    this.table = "Prescription";
    this.validateAttributes = function(personID,responsibleID,completion_date){
    	var validationResponse = commonHelper.getValidationResponse();
  		var HelperValidator = commonHelper.validator;

      if (! ( HelperValidator.isNumeric( personID ) && personID != "" )){
        validationResponse.addError("Invalid personID: " + personID);
      }
      if (! ( HelperValidator.isNumeric( responsibleID ) && responsibleID != "" )){
        validationResponse.addError("Invalid responsibleID: " + responsibleID);
      }
      if (! ( HelperValidator.isDate( completion_date ) && completion_date != "" ) ){
        validationResponse.addError("Invalid completion_date: " + completion_date);
      }

        return validationResponse;
    }

 }
module.exports = new prescription();
