var request = require("request");

module.exports = {
	getImage: function (newURL, res) {
		request.get(newURL).pipe(res);
	}
};