'use strict';

angular.module('mean.students').config(['$stateProvider',
  function($stateProvider) {

    // Check if the user is connected
    var checkLoggedin = function($q, $timeout, $http, $location) {
      // Initialize a new promise
      var deferred = $q.defer();

      // Make an AJAX call to check if the user is logged in
      $http.get('/loggedin').success(function(user) {
        // Authenticated
        if (user !== '0') $timeout(deferred.resolve);

        // Not Authenticated
        else {
          $timeout(deferred.reject);
          $location.url('/login');
        }
      });

      return deferred.promise;
    };

    $stateProvider
    	.state('all students', {
        	url: '/students',
        	templateUrl: 'students/views/list.html',
        	resolve: {
          		loggedin: checkLoggedin
        	}
      	})
    .state('students example page', {
      url: '/students/example',
      templateUrl: 'students/views/index.html'
    })
    .state('create student', {
      url: '/students/create',
      templateUrl: 'students/views/create.html',
      resolve: {
        loggedin: checkLoggedin
      }
    })

    .state('edit student', {
        url: '/students/:studentId/edit',
        templateUrl: 'students/views/edit.html',
        resolve: {
          loggedin: checkLoggedin
        }
      })

    .state('student by id', {
        url: '/students/:studentId',
        templateUrl: 'students/views/view.html',
        resolve: {
          loggedin: checkLoggedin
        }
      });

  }
]);
