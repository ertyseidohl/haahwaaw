var image;
var canvas;

function drawImage() {
	var maxWidth = $('#canvasContainer').width();
	canvas.width = image.width;
	canvas.height = image.height;
	var ctx = canvas.getContext("2d");
	ctx.drawImage(
		image,
		0,
		0,
		image.width / 2,
		image.height,
		0,
		0,
		image.width / 2,
		image.height
	);
	ctx.save();
	ctx.scale(-1, 1);
	ctx.drawImage(
		image,
		0,
		0,
		image.width / 2,
		image.height, -image.width,
		0,
		image.width / 2,
		image.height
	);
	ctx.restore();
}

function newUrl(new_url) {
	image = new Image();

	var $image = $(image);
	image.setAttribute('crossOrigin', 'anonymous');
	image.src = './img/' + encodeURIComponent(new_url);
	$image.load(function () {
		drawImage(image, canvas);
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
		var dt = canvas.toDataURL('image/png');
		document.location.href = dt;
	});

});