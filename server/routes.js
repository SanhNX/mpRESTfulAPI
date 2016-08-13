var admin = require('./models/admin');
var jwt = require('jwt-simple');

// private method
function genToken() {
    var expires = expiresIn(1); // 1 days
    var token = jwt.encode({
        exp: expires
    }, require('./config/secret')());

    return {
        token: token,
        expires: expires
    };
}

function expiresIn(numDays) {
  var dateObj = new Date();
  return dateObj.setDate(dateObj.getDate() + numDays);
}

module.exports = {
  configure: function(app) {
    // ADMIN API

    app.get('/admin/', function(req, res) {
        admin.get(res);
    });

    app.post('/admin/', function(req, res) {
        admin.create(req.body, res);
    });

    app.put('/admin/', function(req, res) {
        admin.update(req.body, res);
    });

    app.delete('/admin/:id/', function(req, res) {
        admin.delete(req.params.id, res);
    });


    app.get('/authentication/', function(req, res) {
        admin.get(res.json(genToken()));
    });
  }
};