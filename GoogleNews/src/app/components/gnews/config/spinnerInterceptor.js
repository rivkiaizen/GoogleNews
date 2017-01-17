'use strict';
var spinnerInterceptor = function($q, $rootScope) {
	'ngInject';

	var numLoadings = 0;
	var EXCLUSIONS = [
	];

	/**
	 * Get if url matches with exclusions list
	 * 
	 * @param {string} url
	 */
	function isExclusion(url) {
		var result = false;
		angular.forEach(EXCLUSIONS, function(regexp) {
			if (regexp.test(url)) {
				result = true;
			}
		});
		return result;
	};

	return {
		request: function (config) {
			numLoadings++;
			if (!isExclusion(config.url)) {
				$rootScope.$broadcast("spinner.show");
			}
			return config || $q.when(config);
		},
		response: function (response) {
			numLoadings--;
			if (numLoadings === 0) {             
				$rootScope.$broadcast("spinner.hide");
			}
			return response || $q.when(response);
		},
		responseError: function (response) {
			numLoadings--;
			if (!numLoadings) {
				$rootScope.$broadcast("spinner.hide");
			}
			return $q.reject(response);
		}
	};
};

module.exports = spinnerInterceptor;