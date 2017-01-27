var commonHelper   = require('../helpers/common');
var abstract_db = require("../models/abstract_db");
var validator = require('validator');
  var mysql = require('mysql');

var contact = function()
{
    this.table = "Contact";

    this.validateAttributes = function(personID,name,phone,mail){
    	var validationResponse = commonHelper.getValidationResponse();
  		var HelperValidator = commonHelper.validator;

  		if (! ( HelperValidator.isNumeric( personID ) && personID != "" )){
          validationResponse.addError("Invalid personID: " + personID);
        }
  		if (! ( HelperValidator.isAscii( name ) && name != "" ) ){
          validationResponse.addError("Invalid name: " + name);
        }
        if (! ( HelperValidator.isMobilePhone( phone,'fr-FR' ) && phone != "" )){
          validationResponse.addError("Invalid phone: " + phone);
        }
        if (! ( HelperValidator.isEmail( mail ) && mail != "" )){
          validationResponse.addError("Invalid mail: " + mail);
        }

        return validationResponse;
    }

 }

module.exports = new contact();
