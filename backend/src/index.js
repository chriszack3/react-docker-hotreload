const express = require('express');
const app = express();
const db = require('./persistence/mysql');
const getItems = require('./routes/getItems');

app.use(express.json());
app.use(express.static(__dirname + '/static'));

app.get('/api/items', getItems);

db.init()
    .then(() => {
        app.listen(3000, () => console.log('Listening on port 3000'));
    })
    .catch((err) => {
        console.error(err);
        process.exit(1);
    });

const gracefulShutdown = () => {
    db.teardown()
        .catch(() => {})
        .then(() => process.exit());
};

process.on('SIGINT', gracefulShutdown);
process.on('SIGTERM', gracefulShutdown);
process.on('SIGUSR2', gracefulShutdown); // Sent by nodemon
