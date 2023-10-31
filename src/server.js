
const express = require('express');

// make a sertver instance
const app = express();

app.get('/', (request, response) => {
    response.json({
        messafe: "Hello world"
    });
});

module.exports = {
	app
}
