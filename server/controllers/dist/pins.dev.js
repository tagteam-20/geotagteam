"use strict";

//AWS
var AWS = require('aws-sdk'),
    _process$env = process.env,
    AWS_ACCESS_KEY_ID = _process$env.AWS_ACCESS_KEY_ID,
    AWS_SECRET_ACCESS_KEY = _process$env.AWS_SECRET_ACCESS_KEY,
    imagemin = require('imagemin'),
    imageminMozjpeg = require('imagemin-mozjpeg');

AWS.config.update({
  accessKeyId: AWS_ACCESS_KEY_ID,
  secretAccessKey: AWS_SECRET_ACCESS_KEY,
  region: 'us-west-2'
});
var s3Bucket = new AWS.S3({
  params: {
    Bucket: 'hidden-gems-application'
  }
});

var getImgBuffer = function getImgBuffer(base64) {
  var base64str = base64.replace(/^data:image\/\w+;base64,/, '');
  return Buffer.from(base64str, 'base64');
};

var imageUpload = function imageUpload(path, buffer) {
  var data = {
    Key: path,
    Body: buffer,
    ContentEncoding: 'base64',
    ContentType: 'image/jpeg',
    ACL: 'public-read'
  };
  new Promise(function (resolve, reject) {
    s3Bucket.putObject(data, function (err) {
      if (err) {
        return reject(err);
      } else {
        return resolve('https:///hidden-gems-application.s3-us-west-2.amazonaws.com/' + path);
      }
    });
  });
};

var getImageUrl = function getImageUrl(type, base64Image) {
  var buffer;
  return regeneratorRuntime.async(function getImageUrl$(_context) {
    while (1) {
      switch (_context.prev = _context.next) {
        case 0:
          buffer = getImgBuffer(base64Image);
          return _context.abrupt("return", imageUpload("".concat(type), buffer));

        case 2:
        case "end":
          return _context.stop();
      }
    }
  });
};

module.exports = {
  newPin: function newPin(req, res) {
    var _req$body, y, x, description, title, author, currentTime, url, buff, data, db, pin;

    return regeneratorRuntime.async(function newPin$(_context2) {
      while (1) {
        switch (_context2.prev = _context2.next) {
          case 0:
            if (req.file) {
              _context2.next = 2;
              break;
            }

            return _context2.abrupt("return", res.status(406).send('You must upload an image'));

          case 2:
            _req$body = req.body, y = _req$body.y, x = _req$body.x, description = _req$body.description, title = _req$body.title;

            if (!(!y || !x || !description || !title)) {
              _context2.next = 5;
              break;
            }

            return _context2.abrupt("return", res.status(406).send('Missing a field'));

          case 5:
            author = req.session.user.id; //Image uploading

            currentTime = new Date().getTime();
            url = "uploads/".concat(currentTime, ".jpeg");
            _context2.next = 10;
            return regeneratorRuntime.awrap(imagemin.buffer(req.file.buffer, {
              plugins: [imageminMozjpeg({
                quality: 75
              })]
            }));

          case 10:
            buff = _context2.sent;
            _context2.next = 13;
            return regeneratorRuntime.awrap(getImageUrl(url, buff.toString('base64')));

          case 13:
            img = 'https:///hidden-gems-application.s3-us-west-2.amazonaws.com/' + url; //upload to database

            data = {
              lat: y,
              lng: x,
              img: img,
              description: description,
              title: title,
              author: author
            };
            db = req.app.get('db');
            _context2.next = 18;
            return regeneratorRuntime.awrap(db.new_pin(data));

          case 18:
            pin = _context2.sent;
            res.status(200).send(pin[0]);

          case 20:
          case "end":
            return _context2.stop();
        }
      }
    });
  },
  getAll: function getAll(req, res) {
    var db, all;
    return regeneratorRuntime.async(function getAll$(_context3) {
      while (1) {
        switch (_context3.prev = _context3.next) {
          case 0:
            db = req.app.get('db');
            _context3.next = 3;
            return regeneratorRuntime.awrap(db.get_all());

          case 3:
            all = _context3.sent;
            res.status(200).send(all);

          case 5:
          case "end":
            return _context3.stop();
        }
      }
    });
  },
  getSingle: function getSingle(req, res) {
    var id, db, pin;
    return regeneratorRuntime.async(function getSingle$(_context4) {
      while (1) {
        switch (_context4.prev = _context4.next) {
          case 0:
            id = req.params.id;
            db = req.app.get('db');
            _context4.next = 4;
            return regeneratorRuntime.awrap(db.get_single_pin({
              id: id
            }));

          case 4:
            pin = _context4.sent;
            res.status(200).send(pin[0]);

          case 6:
          case "end":
            return _context4.stop();
        }
      }
    });
  },
  getUserFavorite: function getUserFavorite(req, res) {
    var id, db, favorites;
    return regeneratorRuntime.async(function getUserFavorite$(_context5) {
      while (1) {
        switch (_context5.prev = _context5.next) {
          case 0:
            id = req.params.id;
            db = req.app.get('db');
            _context5.next = 4;
            return regeneratorRuntime.awrap(db.get_favorites({
              id: id
            }));

          case 4:
            favorites = _context5.sent;
            res.status(200).send(favorites);

          case 6:
          case "end":
            return _context5.stop();
        }
      }
    });
  },
  favorite: function favorite(req, res) {
    var pin_id, user_id, db;
    return regeneratorRuntime.async(function favorite$(_context6) {
      while (1) {
        switch (_context6.prev = _context6.next) {
          case 0:
            pin_id = req.body;
            user_id = req.session.user.id;
            db = req.app.get('db');
            _context6.next = 5;
            return regeneratorRuntime.awrap(db.favorite({
              pin_id: pin_id,
              user_id: user_id
            }));

          case 5:
            res.sendStatus(200);

          case 6:
          case "end":
            return _context6.stop();
        }
      }
    });
  },
  getComments: (req,res) => {
      const {id} = req.params;
      const db = req.app.get('db');

      db.get_all_comments({id})
      .then(comments => {
        res.status(200).send(comments)
      })
      .catch(err => console.log(err))
  }
};