'use strict';
var errorInterceptor = function($q, $rootScope, HTTP_ERRORS) {
	'ngInject';

	return {
		responseError: function(error) {
			if (error.config && error.config.suppressErrors) {
				return $q.reject(error);
			}

			var ERRORS = {
				UNAUTHORIZED: 401,
				FORBIDDEN: 403,
				BAD_REQUEST: 400,
				INTERNAL: 404
			};

			switch (error.status) {
				case ERRORS.UNAUTHORIZED: {
					$rootScope.$broadcast(HTTP_ERRORS.UNAUTHORIZED, error);

					return $q.reject(error);
				}
				case ERRORS.FORBIDDEN: {
					$rootScope.$broadcast(HTTP_ERRORS.FORBIDDEN, error);

					return $q.reject(error);
				}
				case ERRORS.BAD_REQUEST: {
					$rootScope.$broadcast(HTTP_ERRORS.BAD_REQUEST, error);

					return $q.reject(error);
				}
				case ERRORS.INTERNAL: {
					$rootScope.$broadcast(HTTP_ERRORS.INTERNAL, error);

					return $q.reject(error);
				}
			}

			if (String(error.status)[0] === '5') {
				$rootScope.$broadcast(HTTP_ERRORS.INTERNAL, error);
			}

			return $q.reject(error);
		}
	};
};

module.exports = errorInterceptor;