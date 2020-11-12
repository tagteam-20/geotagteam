"use strict";

module.exports = {
  getUser: function getUser(req, res) {
    var id, db, userData;
    return regeneratorRuntime.async(function getUser$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            id = req.params.id;
            db = req.app.get('db');
            _context.next = 4;
            return regeneratorRuntime.awrap(db.get_user_data({
              id: id
            }));

          case 4:
            userData = _context.sent;
            return _context.abrupt("return", res.status(200).send(userData[0]));

          case 6:
          case "end":
            return _context.stop();
        }
      }
    });
  }
};