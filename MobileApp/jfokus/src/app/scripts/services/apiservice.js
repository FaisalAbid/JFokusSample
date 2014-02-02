'use strict';

angular.module('jfokusApp')
    .factory('apiService', function ($http) {
        // Service logic
        // $http.get('/someUrl').success(successCallback);
        //    $http.post('/someUrl', data).success(successCallback);

        // Public API here
        return {
            getBooks: function (cb) {
                $http.get("http://localhost:3000/books")
                    .success(function (result) {
                        return cb(null, result);
                    }).error(function (err) {
                        return cb(err);
                    });
            },

            addBook: function (bookName, cb) {
                var bookObj = {};
                bookObj.name = bookName;

                $http.post("http://localhost:3000/books", bookObj).success(function (res) {
                    return cb(null, res);
                }).error(function (err) {
                        return cb(err);
                    })
            }
        };
    });
