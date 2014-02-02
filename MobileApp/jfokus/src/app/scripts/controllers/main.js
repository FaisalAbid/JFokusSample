'use strict';

angular.module('jfokusApp')
    .controller('MainCtrl', function ($scope, apiService) {

        $scope.getBooks = function () {
            apiService.getBooks(function (err, result) {
                if (err) {
                    $scope.data = [];
                    console.log(err);
                    return $scope.data[0] = "Error";
                }

                $scope.data = result;
            });
        };

    });
