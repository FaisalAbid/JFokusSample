'use strict';

angular.module('jfokusApp')
    .controller('AddCtrl', function ($scope, apiService) {
        $scope.addBook = function (bookName) {
            apiService.addBook(bookName, function (err, res) {
                if (err) {
                    return alert("error inserting");
                }

                apiService.getBooks(function (err, results) {
                    $scope.data = results;
                });

            });
        }
    });
