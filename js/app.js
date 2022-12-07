const myApp = angular.module("ticket", ['ui.router', 'ui.bootstrap']);
const baseUrl = 'http://localhost:3000/';

myApp.config(function($stateProvider, $httpProvider) {

    $stateProvider
        .state({
        name: "home",
        url: "",
        templateUrl:"views/home.html", 
        controller: "homeCtrl",
        })
        .state({
            name:"eventPage",
            url: "",
            templateUrl: "views/eventPage.html",
            controller: "eventCtrl"
        })
})