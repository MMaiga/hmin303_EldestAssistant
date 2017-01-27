var commonHelper   = require('../helpers/common');
var abstract_db = require("../models/abstract_db");
var validator = require('validator');
  var mysql = require('mysql');

var site = function()
{
    this.table = "site";

    this.validateAttributes = function(category,link){
    	var validationResponse = commonHelper.getValidationResponse();
  		var HelperValidator = commonHelper.validator;

        if (! ( HelperValidator.isNumeric( category ) && category != "" )){
          validationResponse.addError("Invalid category: " + category);
        }
        if (! ( commonHelper.validateURL( link ) && link != "" )){
          validationResponse.addError("Invalid link: " + link);
        }

        return validationResponse;
    }


 }

module.exports = new site();