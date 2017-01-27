var commonHelper   = require('../helpers/common');
var abstract_db = require("../models/abstract_db");
var validator = require('validator');
  var mysql = require('mysql');

var person = function()
{
    this.table = "Person";

    this.validateCreationAttributes = function(firstname,lastname,phone,password,role){
    	var validationResponse = commonHelper.getValidationResponse();
  		var HelperValidator = commonHelper.validator;
      

  		if (! ( HelperValidator.isAlpha( firstname ) && firstname != "" ) ){
          validationResponse.addError("Invalid firstname: " + firstname);
        }
        if (! ( HelperValidator.isAlpha( lastname ) && lastname != "" )){
          validationResponse.addError("Invalid lastname: " + lastname);
        }
        if (! ( HelperValidator.isMobilePhone( phone,'fr-FR' ) && phone != "" )){
          validationResponse.addError("Invalid phone: " + phone);
        }
        if (! ( HelperValidator.isAscii( password ) && password != "" )){
          validationResponse.addError("Invalid password: " + password);
        }
        if (! (( role==0 || role==1 ) && role != "" )){
          validationResponse.addError("Invalid role: " + role);
        }
        return validationResponse;
    }

    this.validateUpdateAttributes = function(firstname,lastname,birthdate,address,password,mail){
    	var validationResponse = commonHelper.getValidationResponse();
  		var HelperValidator = commonHelper.validator;

  		if (! ( HelperValidator.isAlpha( firstname ) && firstname != "" ) ){
          validationResponse.addError("Invalid firstname: " + firstname);
        }
        if (! ( HelperValidator.isAlpha( lastname ) && lastname != "" )){
          validationResponse.addError("Invalid lastname: " + lastname);
        }
       /* if (! ( HelperValidator.isAscii( username ) && username != "" )){
          validationResponse.addError("Invalid username: " + username);
        }*/
        if (! ( HelperValidator.isDate( birthdate ) && birthdate != "" )){
          validationResponse.addError("Invalid birthdate: " + birthdate);
        }
        if (! ( HelperValidator.isAscii( address ) && address != "" )){
          validationResponse.addError("Invalid address: " + address);
        }
        if (! ( HelperValidator.isAscii( password ) && password != "" )){
          validationResponse.addError("Invalid password: " + password);
        }
        if (! ( HelperValidator.isEmail( mail ) && mail != "" )){
          validationResponse.addError("Invalid mail: " + mail);
        }
        /*if (! ( HelperValidator.isMobilePhone( phone,'fr-FR' ) && phone != "" )){
          validationResponse.addError("Invalid phone: " + phone);
        }*/
        /*if (! (( role==0 || role==1 ) && role != "" )){
          validationResponse.addError("Invalid role: " + role);
        }*/

        return validationResponse;
    }
 }

module.exports = new person();
