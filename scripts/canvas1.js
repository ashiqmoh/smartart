var canvas;var ctx;var WIDTH;var HEIGHT;
var pattern;var ptx;var Width;var Height;
var x1;var x2;var y1;var y2;
var r;var w;var h;
var w1;var w2;var h1;var h2;
var xm;var ym;var xc;var yc;

function canvas1() {
	canvas = document.createElement("canvas");
	canvas.width = 870;
	canvas.height = 580;
	ctx = canvas.getContext("2d");
	WIDTH = canvas.width;
	HEIGHT = canvas.height;
	pattern = document.createElement("canvas");
	ptx = pattern.getContext("2d");
	r = 10;
	w = 250;
	h = 250;
	if (families.length > 6) {
		$("#dialog-sorry").dialog("open");
		clearCanvas();
		$(':input:enabled:visible:first').focus();
	}
	else {
		drawColumn();
		insertMain();
		insertSub();
		var oImg = canvas.toDataURL();
		document.getElementById("outputImg").src = oImg;
	}
}
//draws columns
function drawColumn() {
	ctx.clearRect(0, 0, WIDTH, HEIGHT);
	if (families.length > 4 && families.length < 7) {
		Width = WIDTH/3;
		Height = HEIGHT/2;
	}
	else if (families.length == 4) {	
		Width = WIDTH/2;
		Height = HEIGHT/2;
	}
	else if (families.length == 3) {	
		Width = WIDTH/3;
		Height = HEIGHT;
	}
	else if (families.length == 2) {
		Width = WIDTH/2;
		Height = HEIGHT;
	}
	else if (families.length == 1) {
		Width = WIDTH;
		Height = HEIGHT;
	}
	pattern.width = Width;
	pattern.height = Height;
	w1 = 0.88*w;
	w2 = 0.88*w;
	h1 = 0.24*h;
	h2 = 0.84*h;
	x1 = (Width/2)-(w/2)+0.5;
	x2 = (Width/2)-(w/2)+30.5;
	y1 = (Height/2)-(h/2)+0.5;
	y2 = (Height/2)-(h/2)+40.5;
	ptx.beginPath();
	ptx.moveTo(x1+r, y1);
	ptx.lineTo(x1+w1-r, y1);
	ptx.arc(x1+w1-r, y1+r, r, 1.5*Math.PI, 0, false);
	ptx.lineTo(x1+w1, y1+h1-r);
	ptx.arc(x1+w1-r, y1+h1-r, r, 0, 0.5*Math.PI, false);
	ptx.lineTo(x1+r, y1+h1);
	ptx.arc(x1+r, y1+h1-r, r, 0.5*Math.PI, 1*Math.PI, false);
	ptx.lineTo(x1, y1+r);
	ptx.arc(x1+r, y1+r, r, 1*Math.PI, 1.5*Math.PI, false);
	ptx.closePath();
	ptx.fillStyle="#717AF6";
	ptx.fill();
	
	ptx.beginPath();
	ptx.moveTo(x2+r, y2);
	ptx.lineTo(x2+w2-r, y2);
	ptx.arc(x2+w2-r, y2+r, r, 1.5*Math.PI, 0, false);
	ptx.lineTo(x2+w2, y2+h2-r);
	ptx.arc(x2+w2-r, y2+h2-r, r, 0, 0.5*Math.PI, false);
	ptx.lineTo(x2+r, y2+h2);
	ptx.arc(x2+r, y2+h2-r, r, 0.5*Math.PI, 1*Math.PI, false);
	ptx.lineTo(x2, y2+r);
	ptx.arc(x2+r, y2+r, r, 1*Math.PI, 1.5*Math.PI, false);
	ptx.closePath();
	ptx.strokeStyle="#717AF6";
	ptx.stroke();
	ctx.beginPath();
	var tyu = ctx.createPattern(pattern, "repeat");
	ctx.fillStyle=tyu;
	ctx.fillRect(0,0,WIDTH,HEIGHT);
	ctx.closePath();
	if (families.length == 5) {
		ctx.clearRect(580, 290, WIDTH, HEIGHT);
	}
}
//writes main points
function insertMain() {
	ctx.font="16pt Verdana";
	ctx.fillStyle="black";
	ctx.textAlign="center";
	ctx.textBaseline="middle";
	xm = x1;
	ym = y1;
	for (var i = 0; i<families.length; i++) {
		var xmetrics = ctx.measureText(families[i].mother);
		if (xmetrics.width > (w1-10)) {
			if (w < (Width-40)) {
				while (w < (Width-40)) {
					w = w + 10;
					drawColumn();
					if (xmetrics.width <= (w1-10)) {
						ctx.beginPath();
						ctx.font="16pt Verdana";
						ctx.fillStyle="black";
						ctx.textAlign="center";
						ctx.textBaseline="middle";
						xm = x1;
						ym = y1;
						break;
					}
				}
			}
		}
	}
	for (var i = 0; i<families.length; i++) {
		if (xmetrics.width > (w1-10)) {
			for (var pt=16; pt>=8; pt-=0.5) {
				ctx.font=pt+"pt Verdana";
				xmetrics = ctx.measureText(families[i].mother);
				if (xmetrics.width <= (w1-10)) break;
			}
		}
		ctx.fillText(families[i].mother, xm+(w1/2), ym+(h1/2));
		if (families.length == 2) {
			var currentXM = xm + (Width/2);
			xm = xm + (WIDTH/2);
		}
		else if (families.length == 3) {
			xm = xm  + (WIDTH/3);
		}
		else if (families.length == 4) {
			if (i == 0) {
				xm = xm + (WIDTH/2);
			}
			else if (i == 1) {
				xm = xm - (WIDTH/2);
				ym = ym + (HEIGHT/2);
			}
			else if (i == 2) {
				xm = xm + (WIDTH/2);
			}
		}
		else if (families.length > 4) {
			if (i == 0) {
				xm = xm + (WIDTH/3);
			}
			else if (i == 1) {
				xm = xm + (WIDTH/3);
			}
			else if (i == 2) {
				xm = xm - 2*(WIDTH/3);
				ym = ym + (HEIGHT/2);
			}
			else if (i == 3) {
				xm = xm + (WIDTH/3);
			}
			else if (families.length == 6 && i == 4) {
				xm = xm + (WIDTH/3);
			}
		}
	}
	ctx.closePath();
}
//writes subpoint
function insertSub() {
	xp = x2 + 20;
	yp = y2 + 40;
	xc = x2 + 40;
	yc = y2 + 40;
	for (var i = 0; i<families.length; i++) {
		if(families[i].member != 0) {
			for (var j = 0; j<families[i].member; j++) {
				ctx.beginPath();
				ctx.arc(xp, yp, 3, 0, 2*Math.PI, false);
				ctx.closePath();
				ctx.fill();
				ctx.font="13pt Verdana";
				ctx.textAlign="left";
				var xmetrics = ctx.measureText(families[i].children[j]);
				if (xmetrics.width > (w2-45)) {
					for (var pt=12; pt>=3; pt-=0.5) {
						ctx.font=pt+"pt Verdana";
						xmetrics = ctx.measureText(families[i].children[j]);
						if (xmetrics.width <= (w2-45)) break;
					}
				}
				ctx.fillText(families[i].children[j], xc, yc);
				yc = yc + 30;
				yp = yp + 30;
				var currentXC = xc;
			}
		}
		if (families.length < 4) {
			xc = xc + Width;
			yc = y2 + 40;
			xp = xp + Width;
			yp = y2 + 40;
		}
		else if (families.length == 4) {
			if (i == 0) {
				xc = xc + Width;
				yc = y2 + 40;
				xp = xp + Width;
				yp = y2 + 40;
			}
			else if (i == 1) {
				xc = xc - Width;
				yc = y2 + 40 + Height;
				xp = xp - Width;
				yp = y2 + 40 + Height;
			}
			else if (i == 2) {
				xc = xc + Width;
				yc = y2 + 40 + Height;
				xp = xp + Width;
				yp = y2 + 40 + Height;
			}
		}
		else if (families.length > 4) {
			if (i == 0 || i == 1) {
				xc = xc + Width;
				yc = y2 + 40;
				xp = xp + Width;
				yp = y2 + 40;
			}
			else if (i == 2) {
				xc = xc - 2*Width;
				yc = y2 + 40 + Height;
				xp = xp - 2*Width;
				yp = y2 + 40 + Height;
			}
			else if (i == 3) {
				xc = xc + Width;
				yc = y2 + 40 + Height;
				xp = xp + Width;
				yp = y2 + 40 + Height;
			}
			else if (i == 4 && families.length == 6) {
				xc = xc + Width;
				yc = y2 + 40 + Height;
				xp = xp + Width;
				yp = y2 + 40 + Height;
			}
		}
	}
}