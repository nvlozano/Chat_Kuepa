
var server = require('./index');
const {db} = require('./src/db');

const force = true;
db.sync({ force })
    .then(function () {
        console.log("Database successfully connected...");
        server.listen(3001, {origins: '*'}, function () {
            console.log('Server is up and listening on port 3001!');
        });
    });
