var express = require('express');
var app = express();
var imageproxy = require("./imageproxy.js");

app.use(express.static('public'));

app.get("/img/:url", function (req, res) {
	imageproxy.getImage(req.params.url, res);
});

// Handle 404
app.use(function (req, res) {
	res.status(404).send('404: Page not Found');
});

// Handle 500
app.use(function (error, req, res, next) {
	console.log("500", error.message);
	res.status(418).send('Server Error: ' + error.message);
});

app.listen(process.env.PORT || 3000, function () {
	console.log('NAPOOPAN', process.env.PORT || 3000);
});