var db = require("../database/db");
var r = require("rethinkdb");
module.exports.setup = function (app) {

    app.get("/books", function (req, res) {

        db.get(function (err, conn) {
            db.release();
            if (err) {
                return res.send(400, "err");
            }

            r.table("books").run(conn, function (err, cursor) {
                if (err) {
                    return res.send(err);
                }

                cursor.toArray(function (err, results) {
                    return res.send(results);
                });
            });

        });

    });


    app.post("/book", function (req, res) {
        db.get(function (err, conn) {
            if (err) {
                return res.send(err);
            }

            // do some sanity checks here

            r.table("books").insert(req.body).run(conn, function (err, result) {
                if (err) {
                    return res.send(err);
                }
                return res.send(result);
            })
        });
    });

}