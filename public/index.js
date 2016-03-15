var image;
var canvas;

function drawImage(doScale) {
	var maxWidth = $('#canvasContainer').width();
	if (!doScale) {
		maxWidth = 1920;
	}
	
	var scale = image.width <= maxWidth ? 1 : maxWidth / image.width;
	
	var width = image.width * scale;
	var height = image.height * scale;
	
	canvas.width = width;
	canvas.height = height;
	
	var ctx = canvas.getContext("2d");
	ctx.drawImage(
		image,
		0,
		0,
		image.width / 2,
		image.height,
		0,
		0,
		width / 2,
		height
	);
	ctx.save();
	ctx.scale(-1, 1);
	ctx.drawImage(
		image,
		0,
		0,
		image.width / 2,
		image.height,
		-width,
		0,
		width / 2,
		height
	);
	ctx.restore();
}

function showError(err) {
	$('#error').show();
}

function hideError() {
	$('#error').hide();
}

function newUrl(new_url) {
	image = new Image();

	var $image = $(image);
	image.setAttribute('crossOrigin', 'anonymous');
	image.src = './img/' + encodeURIComponent(new_url);
	$image.error(function(err) {
		showError(err);
	});
	$image.load(function () {
		hideError();
		drawImage(true);
	});
}

$(document).ready(function () {
	canvas = document.getElementById("canvas");

	var halo_url = "http://vignette2.wikia.nocookie.net/halo/images/f/f4/Halo_Wars_-_Cover_Art_-_Final.jpg/revision/latest?cb=20080825184906";
	$('#url').val(halo_url);

	newUrl(halo_url);

	$('#new').click(function () {
		newUrl($('#url').val());
	});

	$('#export').click(function () {
		drawImage(false);
		var dt = canvas.toDataURL('image/png');
		document.location.href = dt;
	});

});