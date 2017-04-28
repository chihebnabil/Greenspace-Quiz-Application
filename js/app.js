(function () {
    'use strict';

    var app = angular.module('app', ["ngRoute"]);


    app.config(function ($routeProvider) {
        $routeProvider
            .when("/", {
                templateUrl: "templates/home.html",
                controller: "MainController"
            })
            .when("/question/:id", {
                templateUrl: "templates/home.html",
                controller: "SingleController"
            })
            .when("/summary", {
                templateUrl: "templates/summary.html",
                controller: "summary"
            })

    });

    app.run(function ($rootScope, $http) {
        $http.get('data.json').then(function (responce) {

            $rootScope.questions = responce.data
        });
    });


    app.controller('MainController', function ($rootScope) {
        console.log("MainController")

        console.log($rootScope.questions)


    });

    app.controller('SingleController', function ($rootScope, $scope, $http, $routeParams, $location) {
        console.log("SingleController")
        var id = parseInt($routeParams.id) - 1;
        $scope.q = $rootScope.questions[id]


        var nextId = parseInt($routeParams.id) + 1;


        $scope.next = function () {
            console.log("next")
            if (nextId <= $rootScope.questions.length) {
                $location.path("/question/" + nextId)
            } else {
                console.log("finished")
                $location.path("/summary")
            }

        }
    });

}());



