var http = require('http'),
	url = require('url');

module.exports = {
	getImage: function (newURL, res) {
		var newUrlParsed = url.parse(newURL);
		var callback = function (response) {
			if (response.statusCode === 200) {
				res.writeHead(200, {
					'Content-Type': response.headers['content-type']
				});
				response.pipe(res);
			} else {
				res.writeHead(response.statusCode);
				res.end();
			}
		};

		http.request(newURL, callback).end();
	}
};