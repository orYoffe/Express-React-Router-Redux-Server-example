var express = require('express');
var config = require('../config');
var router = express.Router();
var Users = require('../models/Users');
var jwt = require('jsonwebtoken');

/* GET home page. */
// router.get('/', function(req, res, next) {
//   res.render('index');
// });

// router.get('/get-data', function(req, res, next) {
//   Users.find()
//       .then(function(doc) {
//         res.render('index', {items: doc});
//       });
// });

// router.post('/insert', function(req, res, next) {
//   var item = {
//     name: req.body.name,
//     password: req.body.password,
//     admin: req.body.admin
//   };
//
//   var data = new Users(item);
//   data.save(function (err) {
//     if (err) console.error('error, no entry found');;
//     // saved!
//   });
//
//   // res.redirect('/');
// });

// router.post('/update', function(req, res, next) {
//   var id = req.body.id;
//
//   Users.findById(id, function(err, doc) {
//     if (err) {
//       console.error('error, no entry found');
//     }
//     doc.name = req.body.name;
//     doc.password = req.body.password;
//     doc.admin = req.body.admin;
//     doc.save(function (err) {
//       if (err) console.error('error, no entry found');;
//       // saved!
//     });;
//   })
//   // res.redirect('/');
// });

// router.post('/delete', function(req, res, next) {
//   var id = req.body.id;
//   Users.findByIdAndRemove(id).exec();
//   // res.redirect('/');
// });

//
// router.get('/setup', function(req, res) {
//
//   // create a sample user
//   var nick = new Users({
//     name: 'Nick Cerminara',
//     password: 'password',
//     admin: true
//   });
//
//   // save the sample user
//   nick.save(function(err) {
//     if (err) throw err;
//
//     console.log('User saved successfully');
//     res.json({ success: true });
//   });
// });

router.post('/authenticate', authenticateUser);

router.use(authenticateMiddleware);


router.get('/', function(req, res) {
  res.json({ message: 'Welcome to the coolest API on earth!' });
});

router.get('/users', function(req, res) {
  Users.find({}, function(err, users) {
    if(err) console.error('No users were found');
    res.json(users);
  });
});


function authenticateUser(req, res) {
  Users.findOne({
    name: req.body.name
  }, function(err, user) {
    if (err) throw err;
    if (!user) {
      res.json({ success: false, message: 'Authentication failed. User not found.' });
    } else if (user) {
      if (user.password != req.body.password) {
        res.json({ success: false, message: 'Authentication failed. Wrong password.' });
      } else {
        var token = createToken(user);
        res.json({
          success: true,
          message: 'Enjoy your token!',
          token: token
        });
      }
    }
  });
}

function createToken(user){
  return jwt.sign(user, config.getSecret(), {
    expiresIn: Date.now() + 1000 * 60 * 60 * 24
  });
}

function authenticateMiddleware(req, res, next) {

  // check header or url parameters or post parameters for token
  var token = req.body.token || req.query.token || req.headers['x-access-token'];

  // decode token
  if (token) {
    jwt.verify(token, config.getSecret(), function(err, decoded) {
      if (err) {
        return res.json({ success: false, message: 'Failed to authenticate token.' });
      } else {
        req.decoded = decoded;
        next();
      }
    });

  } else {
    return res.status(403).send({
        success: false,
        message: 'No token provided.'
    });

  }
}

module.exports = router;
