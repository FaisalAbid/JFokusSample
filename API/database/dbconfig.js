module.exports.dbConfig = {
    'host': 'dynamatik.io',
    'port': 28015,
    'db': 'jfokusbooks'
};

var books = {
    "tableName": "books",
    "primaryKey": "id"
};


module.exports.tables = [books];