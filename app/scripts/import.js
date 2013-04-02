
define([
  './models/datasourcesCollection',
  'text!../export_datasource.txt'
], function (datasources, data) {
  'use strict';
	
	data = JSON.parse(data);

	data.forEach(function (value) {
		delete value.validationquery;
		delete value.id;
		var datasource = new datasources.model(value);
		console.log(datasource);
		datasources.add(datasource);
		datasource.save();
	});

});