//ATTENTION! This file contains mocks for DEV mod (grunt serve)
require('angular-mocks');
var _ = require('lodash');

module.exports = function(component) {
	component.requires.push('ngMockE2E');

	component.config(function($provide) {
		$provide.decorator('$httpBackend', function($delegate) {
			var proxy = function(method, url, data, callback, headers) {
				var interceptor = function() {
					if (/^\/rest\//i.test(url)) {
						var parsedData = data;

						try {
							parsedData = JSON.parse(parsedData);
						}catch (e) {

						}
						var color = 'color:#0479B2;';

						switch (method.toUpperCase()) {
							case 'POST': {
								color = 'color:#CC0A00;';

								break;
							}
							case 'PUT': {
								color = 'color:#FF6540;';

								break;
							}
						}

						console.log('%c' + method + ': ' + '%c' + url, color, 'margin:0 15px 0 10px;' + color, parsedData || '-no-data-', headers);
					}

					var _this = this;
					var	_arguments = arguments;

					setTimeout(function() {
						callback.apply(_this, _arguments);
					}, _.random(100, 300));
				};

				return $delegate.call(this, method, url, data, interceptor, headers);
			};

			_.extend(proxy, $delegate);

			return proxy;
		});
	});

	component.run(function($httpBackend) {


    //$httpBackend.whenGET('/rest/Metadata/Get').respond(require('./api/get.json'));
    //$httpBackend.whenGET('/rest/DataGrid/Get/O2AC_REF_MNPHED').respond(require('./api/O2AC_REF_MNPHED.json'));
    //$httpBackend.whenGET('/rest/DataGrid/Get/O2AC_REF_MNPRUL').respond(require('./api/O2AC_REF_MNPHED.json'));
    //$httpBackend.whenGET('/rest/DataGrid/Get/O2AC_REF_ENVMAP').respond(require('./api/O2AC_REF_MNPHED.json'));
    
    //$httpBackend.whenGET('/rest/Data/Get/O2AC_REF_LEVHED%3FQ=GETDDLACTIVEDESC').respond(require('./api/level.json'));
    //$httpBackend.whenGET('/rest/Data/Get/O2AC_REF_ENVHED%3FQ=GETDDLACTIVEDESC').respond(require('./api/data.json'));
    //$httpBackend.whenGET('/rest/Metadata/GetLastTableChange/O2AC_REF_MNPHED').respond(require('./api/lastChange.json'));
    //$httpBackend.whenGET('/rest/Metadata/GetLastTableChange').respond(require('./api/lastChange.json'));

	var subscribed = [];
		
	$httpBackend.whenGET(/.*/).passThrough();
	$httpBackend.whenPOST(/.*/).passThrough();
	$httpBackend.whenPUT(/.*/).passThrough();
	$httpBackend.whenDELETE(/.*/).passThrough();
});
};
