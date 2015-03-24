/*
'use strict';

angular.module('mean.students').factory('Students', [
  function() {
    return {
      name: 'students'
    };
  }
]);
*/
'use strict';

//Students service used for students REST endpoint
angular.module('mean.students').factory('Students', ['$resource',
  function($resource) {
    return $resource('students/:studentId', {
      studentId: '@_id'
    }, {
      update: {
        method: 'PUT'
      }
    });
  }
]);
