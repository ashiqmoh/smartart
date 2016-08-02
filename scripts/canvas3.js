var canvas;
var ctx;
var WIDTH;
var HEIGHT;
var Width = 870;
var Height = 580;
var fl;
var arr;
var wmax;
var hmax;
var w;
var h;
var x;
var y = new Array();
var m;
var acm1 = ["#E83B3B", "#216DD2", "#13CC0C", "#D6DE00", "#FF930E", "#AC00E6"];
var acm2 = ["#8D3434", "#425C7E", "#346E32", "#6F7227", "#714C1F", "#4A2157"];
var bc = ["#FF7070",  "#88B8F6", "#70E56B", "#F4FA57", "#FFCD70", "#DE77FF"];

function canvas3() {
	canvas = document.createElement("canvas");
	ctx = canvas.getContext("2d");
	canvas.width = WIDTH;
	canvas.height = HEIGHT;
	Width = WIDTH - 30;
	Height = HEIGHT - 40;
	fl = families.length;
	arr = 0;
	for (var i = 0; i<fl; i++) {
		var temp = families[i].member + 1;
		if (temp > arr) arr = temp;
	}
	var sp = (arr-1)*5
	wmax = (Width-30-sp)/arr;
	hmax = Height/fl;
	w = 100;
	h = 70;
	x = new Array();
	y = new Array();
	m = HEIGHT/(fl+1)-20;
	for (var i = 0; i<fl; i++) {
		y[i] = (i+1)*m + i*29 + 0.5;
	}
	if (fl > 6) {
		$("#dialog-sorry").dialog("open");
		$(':input:enabled:visible:first').focus();	
	}
	else {
		clearCanvas();
		getWidth();
		drawArrows();
		enterMain();
		enterSub();
		var oImg = canvas.toDataURL();
		document.getElementById("outputImg").src = oImg;
	}
}
function getWidth() {
	var tempW = w;
	ctx.font="16pt Verdana";
	for (var i = 0; i<fl; i++) {
		var metrics = ctx.measureText(families[i].mother);
		if ((metrics.width+30) > tempW) tempW = metrics.width + 30;
	}
	ctx.font="13pt Verdana";
	for (var i = 0; i<fl; i++){
		for (var j = 0; j<families[i].member; j++) {
			var metrics = ctx.measureText(families[i].children[j]);
			if ((metrics.width+30) > tempW) tempW = metrics.width + 30;
		}
	}
	if (tempW > w && tempW <= wmax) {
		w = tempW;
	}
	else {
		for (var i = tempW; i > w; i-=1) {
			tempW = i;
			if (tempW <= wmax) break;
		}
		w = tempW;
	}
	for (var i = 0; i<arr; i++) {
		x[i] = 20.5 + i*(w+5);
	}
}
function drawArrows() {
	for (var i = 0; i<fl; i++) {
		for (var j = 0; j<(families[i].member+1); j++) {
			ctx.beginPath();
			ctx.moveTo(x[j]+30,		y[i]);
			ctx.lineTo(x[j],		y[i]-h/2);
			ctx.lineTo(x[j]+w,		y[i]-h/2);
			ctx.lineTo(x[j]+w+30,	y[i]);
			ctx.lineTo(x[j]+w,		y[i]+h/2);
			ctx.lineTo(x[j],		y[i]+h/2);
			ctx.lineTo(x[j]+30,		y[i]);
			ctx.closePath();
			if (j == 0) {
				var grd = ctx.createLinearGradient(0, y[i]-h/2, 0 ,y[i]+h);
				grd.addColorStop(0, acm1[i]);
				grd.addColorStop(1, acm2[i]);
				ctx.fillStyle = grd;
			}
			else {
				ctx.fillStyle = bc[i];
			}
			ctx.fill();
		}
	}
}
function enterMain() {
	ctx.fillStyle = "#ffffff";
	ctx.textAlign = "left";
	ctx.textBaseline = "middle";
	for (var i = 0; i<fl; i++) {
		ctx.font = "16pt Verdana";
		var metrics = ctx.measureText(families[i].mother);
		if (metrics.width > (w-30)) {
			wrap3(ctx, families[i].mother, x[0] + 40, y[i], (w-30), 60, 16);
		}
		else {
			ctx.fillText(families[i].mother, x[0] + 40, y[i]);
		}
	}
}
function enterSub() {
	ctx.fillStyle="black";
	ctx.textAlign="left";
	ctx.textBaseline="middle";
	for (var i = 0; i<fl; i++) {
		for (var j = 0; j<families[i].member; j++) {
			ctx.font="13pt Verdana";
			var metrics = ctx.measureText(families[i].children[j]);
			if (metrics.width > (w-30)) {
				wrap3(ctx, families[i].children[j], x[j+1] + 40, y[i], (w-30), 60, 13);
			}
			else {
				ctx.fillText(families[i].children[j], x[j+1] + 40, y[i]);
			}
		}
	}
}