module.exports = function(app, settings){
	var url = require('url'),
		express = require('express'),
		rootRouter = express.Router();

	// Logic that is common to all the routes
	rootRouter.use(function(req, res, next) {
	  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept, Engaged-Auth-Token");
	  console.log(req.method + ':' + req.originalUrl); // Basic logging for all the routes
	  next();

	});

	app.use('/',rootRouter);
};
