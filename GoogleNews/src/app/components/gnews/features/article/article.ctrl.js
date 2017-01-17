'use strict';
var articleCtrl = function (gnewsArticlesData, $stateParams) {
    'ngInject';
    /****************************************************
                VARIABLES
    **************************************************** */
    var vm = this;

    /*****************************************************
     *                  METHODS                          *
    *****************************************************/

    /*****************************************************
    *               METHODS - PRIVATE                   *
    *****************************************************/
    function init() {
        gnewsArticlesData.getById($stateParams.id).then(function (article) {
            vm.article = article;
        });
    }
    /*****************************************************
    *                  EXECUTIONS                       *
    *****************************************************/
    init();

}

module.exports = articleCtrl;
