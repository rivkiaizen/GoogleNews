'use strict';
var gnewsArticlesData=   function ($http, $q) {
    'ngInject';

    /****************************************************
                VARIABLES
    **************************************************** */
    var service = {
        getTopics: getTopics,
        getById: getById
    };

    /*****************************************************
    *                  METHODS                          *
    *****************************************************/

    function getTopics() {
        var defered = $q.defer();
        $http.get('/api/GoogleNews')
            .then(
                function (response) { defered.resolve(response.data); },
                function (error) { defered.resolve(false); }
            );
        return defered.promise;
    }

    function getById(id) {
        var defered = $q.defer();
        $http.get('/api/GoogleNews/', { params: { id: id } })
            .then(
                function (response) { defered.resolve(response.data); },
                function (error) { defered.resolve(false); }
            );
        return defered.promise;
    }
    /*****************************************************
    *               METHODS - PRIVATE                   *
    *****************************************************/

      

    function init() {
    }

    /*****************************************************
  *                  EXECUTIONS                       *
  *****************************************************/
    init();
    return service;
}

module.exports = gnewsArticlesData;