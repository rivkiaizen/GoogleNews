//ATTENTION! This file contains mocks for PRODUCTION mod (grunt build)
require('angular-mocks');
var _ = require('lodash');

module.exports = function(component) {
	component.requires.push('ngMockE2E');

	component.run(function($httpBackend) {
		
	    $httpBackend.whenGET('/rest/Metadata/Get').respond(require('./api/get.json'));
	    $httpBackend.whenGET('/rest/DataGrid/Get/O2AC_REF_MNPHED').respond(require('./api/O2AC_REF_MNPHED.json'));
	    $httpBackend.whenGET('/rest/DataGrid/Get/O2AC_REF_MNPRUL').respond(require('./api/O2AC_REF_MNPHED.json'));
	    $httpBackend.whenGET('/rest/DataGrid/Get/O2AC_REF_ENVMAP').respond(require('./api/O2AC_REF_MNPHED.json'));
	    
	    $httpBackend.whenGET('/rest/Data/Get/O2AC_REF_LEVHED%3FQ=GETDDLACTIVEDESC').respond(require('./api/level.json'));
	    $httpBackend.whenGET('/rest/Data/Get/O2AC_REF_ENVHED%3FQ=GETDDLACTIVEDESC').respond(require('./api/data.json'));
	    $httpBackend.whenGET('/rest/Metadata/GetLastTableChange/O2AC_REF_MNPHED').respond(require('./api/lastChange.json'));
	    $httpBackend.whenGET('/rest/Metadata/GetLastTableChange').respond(require('./api/lastChange.json'));
    
		$httpBackend.whenGET(/.*/).passThrough();
		$httpBackend.whenPOST(/.*/).passThrough();
		$httpBackend.whenPUT(/.*/).passThrough();
		$httpBackend.whenDELETE(/.*/).passThrough();
	});
};
