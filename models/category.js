var commonHelper   = require('../helpers/common');
var abstract_db = require("../models/abstract_db");
var validator = require('validator');
  var mysql = require('mysql');

var category = function()
{
    this.table = "category";


  this.validateAttributes = function(categoryTable,categoryName,categoryCode){
    	var validationResponse = commonHelper.getValidationResponse();
  		var HelperValidator = commonHelper.validator;
  		if (! ( HelperValidator.isAscii( categoryTable ) && categoryTable != "" ) ){
          validationResponse.addError("Invalid categoryTable: " + categoryTable);
        }
        if (! ( HelperValidator.isAscii( categoryName ) && categoryName != "" )){
          validationResponse.addError("Invalid categoryName: " + categoryName);
        }
        if (! ( HelperValidator.isNumeric( categoryCode ) && categoryCode != "" )){
          validationResponse.addError("Invalid categoryCode: " + categoryCode);
        }

        return validationResponse;
    }

 }

module.exports = new category();
