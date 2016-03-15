var express = require('express');
var app = express();
var imageproxy = require("./imageproxy.js");

app.use(express.static('public'));

app.get("/img/:url", function (req, res) {
	imageproxy.getImage(req.params.url, res);
});

// Handle 404
app.use(function (req, res) {
	res.send('404: Page not Found', 404);
});

// Handle 500
app.use(function (error, req, res, next) {
	res.send('500: Internal Server Error', 500);
});

app.listen(process.env.PORT || 3000, function () {
	console.log('NAPOOPAN', process.env.PORT || 3000);
});