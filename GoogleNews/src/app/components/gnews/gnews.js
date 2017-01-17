'use strict';

require('angular');
require('angular-animate');
require('angular-bootstrap');
require('angular-resource');
require('angular-ui-router');
require('angular-cache');
require('angular-filter');
require('angularjs-toaster');
require('angular-sanitize');



/**
 * @ngdoc overview
 * @name gnews
 *
 * @description
 * The main module of gnews app
 */
var gnews = angular.module('gnews', [
	'ngResource',
	'ui.router',
	'ui.bootstrap',
	'ngAnimate',
	'angular-cache',//?
	'toaster',
    'ngSanitize'
]);

gnews.config(function ($stateProvider, $urlRouterProvider, $httpProvider, $compileProvider, $rootScopeProvider) {
    'ngInject';

    var DIR = './components/gnews/features';

    $stateProvider
           .state('news', {
               url: '/article',
               abstract: true,
               resolve: {
                   topics: function (gnewsArticlesData) {
                       return gnewsArticlesData.getTopics();
                   }
               },
               templateUrl: DIR + '/topics/topics.tmpl.html',
               controller: 'topicsCtrl',
               controllerAs: 'vm',

           })
           .state('news.article', {
               url: '/:id',
               controller: 'articleCtrl',
               controllerAs: 'vm',
               templateUrl: DIR + '/article/article.tmpl.html',
               resolve: {
                   isValid: function ($state, $q, $stateParams, topics) {
                       if (!$stateParams.id && topics.length) {
                           $stateParams.id = topics[0].Id;
                           return $q.resolve();
                       }
                       else
                           return $q.resolve();
                   }
               }

           });

    $urlRouterProvider.otherwise('/article/');

    // use the HTML5 History API
    // $locationProvider.html5Mode(true);

    $compileProvider.debugInfoEnabled(true);
    //TODO: set from webpack the async value
    $httpProvider.useApplyAsync(true);
    $httpProvider.interceptors.push(require('./config/errorInterceptor'));
    //$httpProvider.interceptors.push(require('./config/spinnerInterceptor'));
});

//gnews.run(function (CacheFactory, $rootScope, $state, HTTP_ERRORS, toaster) {
//    'ngInject';

//    CacheFactory.createCache('gnewsHttp', {
//        maxAge: 10 * 60 * 1000,
//        deleteOnExpire: 'aggressive',
//        storageMode: 'localStorage',
//        disabled: true
//    });


//    $rootScope.$on('$stateChangeError', function (e, toState, toParams, fromState, fromParams, resolve) {
//        if (angular.isObject(resolve) && resolve.type === 'redirect') {
//            $state.go(resolve.state.state, resolve.state.stateParams);
//            return false;
//        }
//    });

//    $rootScope.$on(HTTP_ERRORS.INTERNAL, function (e, error) {
//        toaster.error('Server error!', 'please contact help desk.')
//    });

//});

/**directives**/
//gnews.directive('spinner', require('./directives/spinner/spinner'));
/**end directives**/

/**controllers**/

/**components controllers**/
gnews.controller('topicsCtrl', require('./features/topics/topics.ctrl'));
gnews.controller('articleCtrl', require('./features/article/article.ctrl'));
/**end components controllers**/

/**end controllers**/

/**services**/
gnews.factory('gnewsArticlesData', require('./common/services/gnews.articles.srv'));
/**end services**/

/**constants**/
gnews.constant('HTTP_ERRORS', require('./common/constants/HTTP_ERRORS'));
/**end constants**/

/**filters**/
/**end filters**/

module.exports = gnews;