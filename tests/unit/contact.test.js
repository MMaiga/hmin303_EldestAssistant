var request = require('supertest');
var	expect = require("chai").expect;
var	assert = require("chai").assert;
var	should = require("chai").should;
var async = require('async');

mysql = require('mysql');

var commonHelper   = require('../../helpers/common');

var abstract_db = require("../../models/abstract_db");


var express = require('express'),
ROOT_DIR = __dirname + '/../..',
config = require(ROOT_DIR + '/config'),
bodyParser = require('body-parser'),
methodOverride = require('method-override'),
cookieParser = require('cookie-parser'),
session = require('express-session'),
app = express();

var settings = {
	config: config
};

// all environments
app.use(bodyParser.urlencoded({
	extended: true
}));
app.use(bodyParser.json());
app.use(methodOverride());
app.use(cookieParser());
app.use(session({
	secret: config.SESSION_SECRET ,
	saveUninitialized: true,
	resave: true
}));

//This allows you to require files relative to the root in any file
requireFromRoot = (function(root) {
	return function(resource) {
		return require(root+"/"+resource);
	}
})(ROOT_DIR);


describe('#/api/prescription', function(){

	var log = console.log;
	var nb_prescription;

	before(function(done){
		require(ROOT_DIR + '/routes/prescription')(app, settings);
	 async.series([
		 function (cb) {
			 abstract_db.connection.query('SELECT count(*) as nb_prescription FROM prescription',function(err,results){
					 expect(results).to.not.be.empty;
					 nb_prescription = results[0].nb_prescription;
				 });
		 }
	 ]
)
	 done();
	});

	beforeEach(function(){

		// Done to prevent any server side console logs from the routes
		// to appear on the console when running tests
		console.log=function(){};

	});

	it.skip('- should get a not empty list', function(done){
		request(app)
		.get('/api/prescription')
		.expect(200)
		.expect('Content-Type', /json/)
		.end(function(err, res){
			// Enable the console log to print the assertion output
			console.log = log;
			var data = JSON.parse(res.text);
			expect(err).to.be.null;
			expect(data).to.not.be.empty;
			done();
		});
	});

	it.skip('- should get a list of prescription', function(done){
		request(app)
		.get('/api/prescription')
		.expect(200)
		.expect('Content-Type', /json/)

		.end(function(err, res){
			// Enable the console log to print the assertion output
			console.log = log;
			var data = JSON.parse(res.text);
			expect(err).to.be.null;
			expect(data).to.have.property('data')
			.that.is.an('array')
			.with.deep.property('[0]').that.deep.to.have.property('id');
			expect(data).to.have.property('data')
			.that.is.an('array')
			.with.deep.property('[0]').that.deep.to.have.property('personID');
			expect(data).to.have.property('data')
			.that.is.an('array')
			.with.deep.property('[0]').that.deep.to.have.property('responsibleID');
			expect(data).to.have.property('data')
			.that.is.an('array')
			.with.deep.property('[0]').that.deep.to.have.property('authorID');
			expect(data).to.have.property('data')
			.that.is.an('array')
			.with.deep.property('[0]').that.deep.to.have.property('creation_date');
			expect(data).to.have.property('data')
			.that.is.an('array')
			.with.deep.property('[0]').that.deep.to.have.property('completion_date');
			expect(data).to.have.property('data')
			.that.is.an('array')
			.with.deep.property('[0]').that.deep.to.have.property('description');
			done();
		});
	});
	it.skip('- should get a all prescription from database', function(done){
		request(app)
		.get('/api/prescription')
		.expect(200)
		.expect('Content-Type', /json/)
		.end(function(err, res){
			// Enable the console log to print the assertion output
			console.log = log;
			var data = JSON.parse(res.text);
			expect(err).to.be.null;
			expect(data).to.have.property('data')
			.that.is.an('array')
			.to.have.length.above(nb_prescription-1);
			expect(data).to.have.property('data')
			.that.is.an('array')
			.to.have.length.below(nb_prescription+1);
			done();
		});
	});

});
describe('#/api/prescription/create', function(){

	var log = console.log;

	var nb_prescription_before;
	var nb_prescription_after;

	before(function(done){
		require(ROOT_DIR + '/routes/prescription')(app, settings);
	 async.series([
		 function () {
			 abstract_db.connection.query('SELECT count(*) as nb_prescription FROM prescription',function(err,results){
					 expect(results).to.not.be.empty;
					 nb_prescription_before = results[0].nb_prescription;
				 });
		 }
	 ]
)
	 done();
	});

	beforeEach(function(){

		// Done to prevent any server side console logs from the routes
		// to appear on the console when running tests
		console.log=function(){};

	});
	it.skip('- should create a prescription', function(done){
		request(app)
		.post('/api/prescription/create')
		.send(
		{
      "personID": 37,
      "responsibleID": 234,
      "authorID": 190,
      "creation_date": "2016-08-10T22:00:00.000Z",
      "completion_date": "2016-08-29T22:00:00.000Z",
      "description": "Reprehenderit sit est non esse in. Id commodo sunt reprehenderit mollit sit consectetur amet. Culpa sint reprehenderit ea quis laborum aliqua amet sint incididunt nisi eiusmod velit laborum. Cupidatat mollit nostrud reprehenderit adipisicing. Commodo enim quis ea nisi veniam non."
    }
	)
    .expect(200)
    .expect('Content-Type', /json/)
		.end(function(err, res){
			// Enable the console log to print the assertion output
			console.log = log;
			var data = JSON.parse(res.text);
			expect(err).to.be.null;
			expect(data).to.have.deep.property('data')
		 	.that.is.an('object')
			.that.have.deep.property('insertId');
			done();
		});
	});
	it.skip('- should FAILED to create a prescription', function(done){
		request(app)
		.post('/api/prescription/create')
		.send(
		{
      "personID": "FAILED",
      "responsibleID": 234,
      "authorID": 190,
      "creation_date": "2016-08-10T22:00:00.000Z",
      "completion_date": "2016-08-29T22:00:00.000Z",
      "description": "Reprehenderit sit est non esse in. Id commodo sunt reprehenderit mollit sit consectetur amet. Culpa sint reprehenderit ea quis laborum aliqua amet sint incididunt nisi eiusmod velit laborum. Cupidatat mollit nostrud reprehenderit adipisicing. Commodo enim quis ea nisi veniam non."
    }
	)
    .expect(200)
    .expect('Content-Type', /json/)
		.end(function(err, res){
			// Enable the console log to print the assertion output
			console.log = log;
			var data = JSON.parse(res.text);
			expect(err).to.be.null;
			expect(data).to.have.deep.property('success');
			expect(data).to.have.deep.property('data')
			.that.have.deep.property('errno');
		 	/*.that.is.an('object')

			*/
			done();
		});
	});

});

describe('#/api/prescription/read', function(){

	var log = console.log;
	var idPresciption_ExistFalse = -1;
	var idPresciption = 1;
	var personID  ;
	var responsibleID ;
	var authorID ;
	var creation_date ;
	var completion_date ;
	var description ;

	before(function(done){
		require(ROOT_DIR + '/routes/prescription')(app, settings);
		async.series([
			function (cb) {
				abstract_db.connection.query('SELECT personID , responsibleID , authorID , creation_date , completion_date , description FROM prescription Where id='+idPresciption,function(err,results){
						expect(results).to.not.be.empty;
						personID = results[0].personID ;
						responsibleID = results[0].responsibleID ;
						authorID = results[0].authorID ;
						creation_date = results[0].creation_date ;
						completion_date = results[0].completion_date ;
						description = results[0].description ;
					});
			}
		]
 )
		done();
	});

	beforeEach(function(){

		// Done to prevent any server side console logs from the routes
		// to appear on the console when running tests
		console.log=function(){};

	});
	it.skip('- should read prescription (prescription exist)', function(done){
		request(app)
		.get('/api/prescription/read?id='+idPresciption)
		.expect(200)
		.expect('Content-Type', /json/)

		.end(function(err, res){
			// Enable the console log to print the assertion output
			console.log = log;
			var data = JSON.parse(res.text);
			expect(err).to.be.null;
			expect(data).to.have.property('data')
			.that.is.an('array')
			.with.deep.property('[0]').that.deep.to.have.property('id');
			expect(data).to.have.property('data')
			.that.is.an('array')
			.with.deep.property('[0]').that.deep.to.have.property('personID',personID);
			expect(data).to.have.property('data')
			.that.is.an('array')
			.with.deep.property('[0]').that.deep.to.have.property('responsibleID',responsibleID);
			expect(data).to.have.property('data')
			.that.is.an('array')
			.with.deep.property('[0]').that.deep.to.have.property('authorID');
			expect(data).to.have.property('data')
			.that.is.an('array')
			.with.deep.property('[0]').that.deep.to.have.property('creation_date');
			expect(data).to.have.property('data')
			.that.is.an('array')
			.with.deep.property('[0]').that.deep.to.have.property('completion_date');
			expect(data).to.have.property('data')
			.that.is.an('array')
			.with.deep.property('[0]').that.deep.to.have.property('description');
			done();
		});
	});
	it.skip('- should return an error (prescription not exist)', function(done){
		request(app)
		.get('/api/prescription/read?id='+idPresciption_ExistFalse)
		.expect(200)
		.expect('Content-Type', /json/)

		.end(function(err, res){
			// Enable the console log to print the assertion output
			console.log = log;
			var data = JSON.parse(res.text);
			expect(err).to.be.null;
			expect(data).to.have.property('data');
			//.to.have.length.equal(0);
			done();
		});
	});
});

describe('#/api/prescription/update', function(){


		var log = console.log;

		before(function(done){
			require(ROOT_DIR + '/routes/prescription')(app, settings);
			done();
		});

		beforeEach(function(){

			// Done to prevent any server side console logs from the routes
			// to appear on the console when running tests
			console.log=function(){};

		});
		it.skip('- should update a prescription', function(done){
			request(app)
			.post('/api/prescription/update')
			.send(
			{
				"id": 1,
	      "personID": 37,
	      "responsibleID": 234,
	      "authorID": 190,
	      "creation_date": "2016-08-10T22:00:00.000Z",
	      "completion_date": "2016-08-29T22:00:00.000Z",
	      "description": "Reprehenderit sit est non esse in. Id commodo sunt reprehenderit mollit sit consectetur amet. Culpa sint reprehenderit ea quis laborum aliqua amet sint incididunt nisi eiusmod velit laborum. Cupidatat mollit nostrud reprehenderit adipisicing. Commodo enim quis ea nisi veniam non."
	    }
		)
	    .expect(200)
	    .expect('Content-Type', /json/)
			.end(function(err, res){
				// Enable the console log to print the assertion output
				console.log = log;
				var data = JSON.parse(res.text);
				expect(err).to.be.null;
				expect(data).to.have.deep.property('data')
			 	.that.is.an('object')
				.that.have.deep.property('insertId');
				done();
			});
		});
		it.skip('- should FAILED to update a prescription', function(done){
			request(app)
			.post('/api/prescription/update')
			.send(
			{
	      "personID": "FAILED",
	      "responsibleID": 234,
	      "authorID": 190,
	      "creation_date": "2016-08-10T22:00:00.000Z",
	      "completion_date": "2016-08-29T22:00:00.000Z",
	      "description": "Reprehenderit sit est non esse in. Id commodo sunt reprehenderit mollit sit consectetur amet. Culpa sint reprehenderit ea quis laborum aliqua amet sint incididunt nisi eiusmod velit laborum. Cupidatat mollit nostrud reprehenderit adipisicing. Commodo enim quis ea nisi veniam non."
	    }
		)
	    .expect(200)
	    .expect('Content-Type', /json/)
			.end(function(err, res){
				// Enable the console log to print the assertion output
				console.log = log;
				var data = JSON.parse(res.text);
				expect(err).to.be.null;
				expect(data).to.have.deep.property('success');
				expect(data).to.have.deep.property('data')
				.that.have.deep.property('errno');
			 	/*.that.is.an('object')

				*/
				done();
			});
		});

});

describe('#/api/prescription/delete', function(){

	var log = console.log;
	var idPresciption = -42;
	var nb_prescription_before ;
	var nb_prescription_after ;

	before(function(done){
		require(ROOT_DIR + '/routes/prescription')(app, settings);
		async.series([
			function (cb) {
				abstract_db.connection.query("insert into prescription (id,personID,responsibleID,authorID,creation_date,completion_date,description) values("+idPresciption+",200,9,10,'2016-12-19','2017-01-01','doliprane 1000 3 fois chaque jour')",function(err,results){
						//expect(results).to.not.be.empty;
					});
			}
		]
 )
 async.series([
	 function () {
		 abstract_db.connection.query('SELECT count(*) as nb_prescription FROM prescription',function(err,results){
				 expect(results).to.not.be.empty;
				 nb_prescription_before = results[0].nb_prescription;
			 });
	 }
 ]
)

		done();
	});

	after(function(done){
		require(ROOT_DIR + '/routes/prescription')(app, settings);
		async.series([
			function (cb) {
				abstract_db.connection.query("insert into prescription (id,personID,responsibleID,authorID,creation_date,completion_date,description) values("+idPresciption+",200,9,10,'2016-12-19','2017-01-01','doliprane 1000 3 fois chaque jour')",function(err,results){
						//expect(results).to.not.be.empty;
					});
			}
		]
 )
 async.series([
	function () {
		abstract_db.connection.query('SELECT count(*) as nb_prescription FROM prescription',function(err,results){
				expect(results).to.not.be.empty;
				nb_prescription_after = results[0].nb_prescription;
			});
	}
 ]
)

		done();
	});

	beforeEach(function(){

		// Done to prevent any server side console logs from the routes
		// to appear on the console when running tests
		console.log=function(){};

	});
	it.skip('- should delete prescription', function(done){
		request(app)
		.delete('/api/prescription/delete?id='+idPresciption)
    .expect(200)
    .expect('Content-Type', /json/)
		.end(function(err, res){
			// Enable the console log to print the assertion output
			console.log = log;
			var data = JSON.parse(res.text);
			expect(err).to.be.null;
			expect(data).to.have.deep.property('data')
		 	.that.is.an('object')
			.that.have.deep.property('affectedRows',1);
			done();
		});
	});

});
