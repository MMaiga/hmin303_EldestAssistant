// Divide all of your modules in different files and
// require them here
module.exports = function(app, settings){
//	require('./main')(app, settings);
	//require('./home')(app, settings);
	//require('./users')(app, settings);
	require('./person')(app, settings);
	require('./person_eldest')(app, settings);
	require('./person_responsible')(app, settings);
	require('./category')(app, settings);
	require('./prescription')(app, settings);
	require('./contact')(app, settings);
	require('./site')(app, settings);
	require('./role')(app, settings);
	require('./status')(app, settings);
};
