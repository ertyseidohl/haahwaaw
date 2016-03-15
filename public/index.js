var image;
var canvas;

function drawImage(doScale) {
	var maxWidth;
	if (doScale) {
		maxWidth = Math.min(1920, $('#canvasContainer').width());
	} else {
		maxWidth = 1920;
	}
	
	var scale = image.width * 2 <= maxWidth ? 1 : maxWidth / (image.width * 2);
	var fullwidth = image.width * 2 * scale;
	var cropwidth = image.width * scale;
	var height = image.height * scale;
	
	var crop = $('#crop');
	crop.width(fullwidth - 25);
	var cropval = $('#crop').val() / 1000;
	
	console.log(cropval / 1000);
	
	if(doScale) {
		canvas.width = fullwidth;
	} else {
		canvas.width = fullwidth * cropval;
	}
	canvas.height = height;
	
	var ctx = canvas.getContext("2d");
	
	ctx.drawImage(
		image,
		0,
		0,
		image.width * cropval,
		image.height,
		0,
		0,
		cropwidth * cropval,
		height
	);
	ctx.save();
	ctx.scale(-1, 1);
	ctx.drawImage(
		image,
		0,
		0,
		image.width * cropval,
		image.height,
		-fullwidth * cropval,
		0,
		cropwidth * cropval,
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
	
	$('#crop').change(function(evt) {
		drawImage(true);
	});
	
	$(window).resize(function(evt){
		drawImage(true);
	})

});