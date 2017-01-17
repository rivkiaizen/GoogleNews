require('./components/gnews/gnews');
console.log(angular.module('gnews'))

var app = angular.module('app', ['gnews']);
//require('mocks')(app);