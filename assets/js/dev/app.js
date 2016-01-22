"use strict";
var app = angular.module( 'myapp', [ 'ngRoute', 'ngCookies'] ).controller('initCtr', function($scope, $http){
	$scope.title = "angular+node+mongo Template"
});
