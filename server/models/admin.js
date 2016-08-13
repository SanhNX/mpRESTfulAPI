var connection = require('../connection');

function Admin() {
    this.get = function(res) {
        connection.acquire(function(err, con) {
            con.query('select * from tbl_admin', function(err, result) {
                con.release();
                res.send(result);
            });
        });
    };

    this.create = function(admin, res) {
        connection.acquire(function(err, con) {
            con.query('insert into tbl_admin set ?', admin, function(err, result) {
                con.release();
                if (err || result.affectedRows == 0) {
                    res.send({status: false, message: 'Creation failed'});
                } else {
                    res.send({status: true, message: 'Created successfully'});
                }
            });
        });
    };

    this.update = function(admin, res) {
        connection.acquire(function(err, con) {
            con.query('update tbl_admin set ? where id = ?', [admin, admin.id], function(err, result) {
                con.release();
                if (err || result.affectedRows == 0) {
                    res.send({status: false, message: 'Update failed'});
                } else {
                    res.send({status: true, message: 'Updated successfully'});
                }
            });
        });
    };

    this.delete = function(id, res) {
        connection.acquire(function(err, con) {
            con.query('delete from tbl_admin where id = ?', [id], function(err, result) {
                con.release();
                if (err || result.affectedRows == 0) {
                    res.send({status: false, message: 'Failed to delete'});
                } else {
                    res.send({status: true, message: 'Deleted successfully'});
                }
            });
        });
    };
}

module.exports = new Admin();