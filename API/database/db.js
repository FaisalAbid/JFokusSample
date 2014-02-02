var r = require('rethinkdb'),
    pool = require('generic-pool'),
    util = require('util'),
    logdebug = require('debug')('rdb:debug'),
    logerror = require('debug')('rdb:error');

var config = require("./dbconfig");


// RethinkDB database settings. Defaults can be overridden using environment variables.
var dbConfig = config.dbConfig;

var connectionPool = pool.Pool({
    name: 'rethinkdb-pool',
    max: 100,
    min: 10,
    log: false,
    idleTimeoutMillis: 1 * 60 * 1000,
    reapIntervalMillis: 30 * 1000,

    create: function (callback) {
        r.connect({host: dbConfig['host'] || 'localhost', port: dbConfig['port'] || 28015, authKey: dbConfig["authKey"]}, function (err, connection) {
            if (err) {
                console.log(err);
            }
            return callback(null, connection);
        })
    },
    destroy: function (connection) {
        connection.close();
    }
});


module.exports.setup = function () {
    getRethink(function (err, connection) {

        r.dbCreate(dbConfig['db']).run(connection, function (err, result) {
            try {
                connection.use(dbConfig['db']);
            } catch (e) {
                console.log("RethinkDB not started or is down");
            }
        });

        // Set up all config: will not override
        for (var i in config.tables) {
            r.tableCreate(config.tables[i].tableName, {primaryKey: config.tables[i].primaryKey}).run(connection, function (cb, success) {

            });
        }
        // release the connection back into the pool
        connectionPool.release(connection);

    });
};

// modified to remove promises
module.exports.get = function (callback) {
    getRethink(callback);
}

module.exports.release = function (conn) {
    return connectionPool.release(conn);
}

function getRethink(callback) {
    connectionPool.acquire(function (err, connection) {
        if (err) {
            return callback(err)
        }
        else {
            connection.use(dbConfig['db']);
            callback(null, connection);
        }
    });
}