'use strict';

var students = require('../controllers/students');

// Student authorization helpers
var hasAuthorization = function(req, res, next) {
  if (!req.user.isAdmin && req.article.user.id !== req.user.id) {
    return res.status(401).send('User is not authorized');
  }
  next();
};

module.exports = function(Students, app, auth, database) {

  app.get('/students/example/anyone', function(req, res, next) {
    res.send('Anyone can access this');
  });

  app.get('/students/example/auth', auth.requiresLogin, function(req, res, next) {
    res.send('Only authenticated users can access this');
  });

  app.get('/students/example/admin', auth.requiresAdmin, function(req, res, next) {
    res.send('Only users with Admin role can access this');
  });

  app.get('/students/example/render', function(req, res, next) {
    Students.render('index', {
      package: 'students'
    }, function(err, html) {
      //Rendering a view from the Package server/views
      res.send(html);
    });
  });

  app.route('/students')
    .get(students.all)
    .post(auth.requiresLogin, students.create);
  app.route('/students/:studentId')
    .get(auth.isMongoId, students.show)
    .put(auth.isMongoId, auth.requiresLogin, hasAuthorization, students.update)
    .delete(auth.isMongoId, auth.requiresLogin, hasAuthorization, students.destroy);

  // Finish with setting up the studentId param
  app.param('studentId', students.student);
};
