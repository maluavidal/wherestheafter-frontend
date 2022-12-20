const myApp = angular.module("ticket", ['ui.router', 'ui.bootstrap']);
const baseUrl = 'http://localhost:3000/';

myApp.config(function ($stateProvider, $httpProvider) {
    $httpProvider.interceptors.push('BearerAuthInterceptor');

    $stateProvider
        .state({
            name: "home",
            url: "",
            templateUrl: "views/home.html",
            controller: "homeCtrl",
        })
        .state({
            name: "eventPage",
            url: "/events/:id",
            templateUrl: "views/eventPage.html",
            controller: "eventCtrl"
        })
        .state({
            name: "registerPage",
            url: "/users",
            templateUrl: "views/registerPage.html",
            controller: "userCtrl",
        })
        .state({
            name: "loginPage",
            url: "/session",
            templateUrl: "views/loginPage.html",
            controller: "sessionCtrl",
        })
        .state({
            name: "producerPage",
            url: "/producer",
            templateUrl: "views/producerPage.html",
            controller: "producerCtrl"
        })
        .state({
            name: "checkout",
            url: "/eventsclient/{eventId}",
            templateUrl: "views/checkout.html",
            controller: "checkoutCtrl"
        })
        .state({
            name: "createEvent",
            url: "/events",
            templateUrl: "views/createEvent.html",
            controller: 'createEventCtrl'
        })
        .state({
            name: "recoverPassword",
            url: "recover-password",
            templateUrl: "views/recoverPassword.html",
            controller: "recoverPasswordCtrl"
        })
})