var canvas;
var ctx;
var WIDTH;
var HEIGHT;
var pattern;
var ptx;
var Width;
var Height;
var w;
var h;
var h1;
var h2;
var x;
var y;

function canvas4() {
	canvas = document.createElement("canvas");
	canvas.width = 870;
	canvas.height = 580;
	ctx = canvas.getContext("2d");
	WIDTH = canvas.width;
	HEIGHT = canvas.height;
	pattern = document.createElement("canvas");
	ptx = pattern.getContext("2d");
	w = 250;
	h = 250;
	if (families.length > 6) {
		$("#dialog-sorry").dialog("open");
		$(':input:enabled:visible:first').focus();
	}
	else {
		clearCanvas();
		setPattern();
		setUMLHeight();
		setUMLWidth();
		drawUML();
		writeClass();
		writeVariables();
		var oImg = canvas.toDataURL();
		document.getElementById("outputImg").src = oImg;
	}
}
function setPattern() {
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
}
function setUMLHeight() {
	h1 = 50;
	/*if (families.length < 4) {
		ls = 30;
		var temp = 3;
		for (var i = 0; i<families.length; i++) {
			if (families[i].variables.length > temp) temp = families[i].variables.length;
		}
		var diff = temp - 3;
		if (diff != 0) {
			if (diff < 11) {
				h2 = h2 + diff*30;
				h = h1 + h2 + h3;
			}
			else {
				h2 = h2 + 10*30;
				h = h2 + 40;
				ls = ls - (diff-10)*1.5;
			}
		}
	}
	else {*/
		h2 = 200;
	//}
}
function setUMLWidth() {
	for (var i = 0; i<families.length; i++) {
		ctx.font = "16pt Verdana";
		ctx.textAlign = "center";
		ctx.textBaseline = "middle";
		var xmetrics = ctx.measureText(families[i].mother);
		if (xmetrics.width > (w-10)) {
			if (w < (Width-40)) {
				while (w < (Width-40)) {
					w = w + 10;
					if (xmetrics.width <= (w-10)) break;
				}
			}
		}
	}
	for (var i = 0; i<families.length; i++) {
		for (var j = 0; j<families[i].member; j++) {
			ctx.font = "13pt Verdana";
			ctx.textAlign = "left";
			ctx.textBaseline = "middle";
			var xmetrics = ctx.measureText(families[i].children[j]);
			if (xmetrics.width > (w-45)) {
				if (w < (Width-40)) {
					while (w < (Width-40)) {
						w = w + 10;
						if (xmetrics.width <= (w-45)) break;
					}
				}
			}
		}
	}
}
function drawUML() {
	x = (Width/2)-(w/2)+0.5;
	y = (Height/2)-(h/2)+0.5;
	var xtext = x;
	var ytext = y;
	ptx.beginPath();
	ptx.moveTo(x, y);
	ptx.lineTo(x+w, y);
	ptx.lineTo(x+w, y+h1);
	ptx.lineTo(x, y+h1);
	ptx.lineTo(x, y);
	ptx.closePath();
	ptx.fillStyle="#ccc";
	ptx.fill();
	ptx.strokeStyle = "black";
	ptx.lineWidth = 1;
	ptx.stroke();
	
	ptx.beginPath();
	ptx.moveTo(x, y+h1);
	ptx.lineTo(x, y+h1+h2);
	ptx.lineTo(x+w, y+h1+h2);
	ptx.lineTo(x+w, y+h1);
	ptx.closePath();
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
function writeClass() {
	ctx.font="16pt Verdana";
	ctx.fillStyle="black";
	ctx.textAlign="center";
	ctx.textBaseline="middle";
	xm = x + (w/2);
	ym = y + (h1/2);
	for (var i = 0; i<families.length; i++) {
		var xmetrics = ctx.measureText(families[i].mother);
		if (xmetrics.width > (w-10)) {
			for (var pt=16; pt>=8; pt-=0.5) {
				ctx.font=pt+"pt Verdana";
				xmetrics = ctx.measureText(families[i].mother);
				if (xmetrics.width <= (w-10)) break;
			}
		}
		ctx.fillText(families[i].mother, xm, ym);
		if (families.length == 2 || families.length == 3) {
			xm = xm + Width;
		}
		else if (families.length == 4) {
			if (i == 0) {
				xm = xm + Width;
			}
			else if (i == 1) {
				xm = xm - Width;
				ym = ym + Height;
			}
			else if (i == 2) {
				xm = xm + Width;
			}
		}
		else if (families.length > 4) {
			if (i == 0) {
				xm = xm + Width;
			}
			else if (i == 1) {
				xm = xm + Width;
			}
			else if (i == 2) {
				xm = xm - 2*Width;
				ym = ym + Height;
			}
			else if (i == 3) {
				xm = xm + Width;
			}
			else if (families.length == 6 && i == 4) {
				xm = xm + Width;
			}
		}
	}
}
function writeVariables() {
	var offsety = 17;
	if (families.length > 3) {
		var temp = 6;
		for (var i = 0; i<families.length; i++) {
			if (families[i].member > temp) temp = families[i].variables.length;
		}
		var diff = temp - 6;
		if (diff != 0) {
			offset = 15;
			ls = ls - 5 - (diff-1)*2.5;
		}
	}
	xp = x + 20;
	yp = y + h1 + offsety;
	xc = x + 40;
	yc = y + h1 + offsety;
	xs = x;
	for (var i = 0; i<families.length; i++) {
		if(families[i].member != 0) {
			for (var j = 0; j<families[i].member; j++) {
				if (families[i].children[j] == "--") {
					ctx.beginPath();
					ctx.moveTo(xs, yp);
					ctx.lineTo(xs+w, yp);
					ctx.closePath();
					ctx.lineWidth="1";
					ctx.strokeStyle="black";
					ctx.stroke();
					yc = yc + ls;
					yp = yp + ls;
				}
				else {
					ctx.beginPath();
					ctx.arc(xp, yp, 3, 0, 2*Math.PI, false);
					ctx.closePath();
					ctx.fill();
					ctx.font="13pt Verdana";
					ctx.textAlign="left";
					var xmetrics = ctx.measureText(families[i].children[j]);
					if (xmetrics.width > (w-45)) {
						wrap1(ctx, families[i].children[j], xc, yc, w-45, 13);
					}
					else {
						ctx.fillText(families[i].children[j], xc, yc);
						yc = yc + ls;
						yp = yp + ls;
					}
				}
			}
		}
		if (families.length < 4) {
			xc = xc + Width;
			yc = y + h1 + offsety;
			xp = xp + Width;
			yp = y + h1 + offsety;
			xs = 
		}
		else if (families.length == 4) {
			if (i == 0) {
				xc = xc + Width;
				yc = y + h1 + offsety;
				xp = xp + Width;
				yp = y + h1 + offsety;
			}
			else if (i == 1) {
				xc = xc - Width;
				yc = y + h1 + Height + offsety;
				xp = xp - Width;
				yp = y + h1 + Height + offsety;
			}
			else if (i == 2) {
				xc = xc + Width;
				yc = y + h1 + Height + offsety;
				xp = xp + Width;
				yp = y + h1 + Height + offsety;
			}
		}
		else if (families.length > 4) {
			if (i == 0 || i == 1) {
				xc = xc + Width;
				yc = y + h1 + offsety;
				xp = xp + Width;
				yp = y + h1 + offsety;
			}
			else if (i == 2) {
				xc = xc - 2*Width;
				yc = y + h1 + Height + offsety;
				xp = xp - 2*Width;
				yp = y + h1 + Height + offsety;
			}
			else if (i == 3) {
				xc = xc + Width;
				yc = y + h1 + Height + offsety;
				xp = xp + Width;
				yp = y + h1 + Height + offsety;
			}
			else if (i == 4 && families.length == 6) {
				xc = xc + Width;
				yc = y + h1 + Height + offsety;
				xp = xp + Width;
				yp = y + h1 + Height + offsety;
			}
		}
	}
}