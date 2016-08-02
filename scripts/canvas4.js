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
var h3;
var x;
var y;
var offsety;

function canvas4() {
	setUML();	
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
	if (umls.length > 6) {
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
		writeMethods();
		var oImg = canvas.toDataURL();
		document.getElementById("outputImg").src = oImg;
	}
}
function setPattern() {
	if (umls.length > 4 && umls.length < 7) {
		Width = WIDTH/3;
		Height = HEIGHT/2;
	}
	else if (umls.length == 4) {	
		Width = WIDTH/2;
		Height = HEIGHT/2;
	}
	else if (umls.length == 3) {	
		Width = WIDTH/3;
		Height = HEIGHT;
	}
	else if (umls.length == 2) {
		Width = WIDTH/2;
		Height = HEIGHT;
	}
	else if (umls.length == 1) {
		Width = WIDTH;
		Height = HEIGHT;
	}
	pattern.width = Width;
	pattern.height = Height;
}
function setUMLHeight() {
	h1 = 50;
	h2 = 100;
	h3 = 100;
	ls = 30;
	offsety = 17;
	var temp1 = 3;
	var temp2 = 3;
	for (var i = 0; i<umls.length; i++) {
		if (umls[i].variables.length > 3) {
			for (var i = 0; i<families.length; i++) {
				if (umls[i].variables.length > temp1) temp1 = umls[i].variables.length;
			}
		}
	}
	for (var i = 0; i<umls.length; i++) {
		if (umls[i].methods.length > 3) {
			for (var i = 0; i<families.length; i++) {
				if (umls[i].methods.length > temp2) temp2 = umls[i].methods.length;
			}
		}
	}
	if (umls.length < 4) {
		var tot = temp1 + temp2;
		var diff = temp1 + temp2 - 6;
		if (diff != 0) {
			if (tot < 17) {
				h2 = temp1*30 + 10;
				h3 = temp2*30 + 10;
				h = h1 + h2 + h3;
			}
			else {
				h2 = (temp1/tot)*500 + 10;
				h3 = (temp2/tot)*500 + 10;
				h = h1 + h2 + h3;
				offset = 10;
				ls = ls - (diff-10)*1.5;
			}
		}
	}
	if (umls.length > 3) {
		var diff = temp1 + temp2 - 6;
		if (diff != 0) {
			offset = 10;
			ls = ls - 5 - diff*2.5;
		}
	}
}
function setUMLWidth() {
	for (var i = 0; i<umls.length; i++) {
		ctx.font = "16pt Verdana";
		ctx.textAlign = "center";
		ctx.textBaseline = "middle";
		var xmetrics = ctx.measureText(umls[i].className);
		if (xmetrics.width > (w-10)) {
			if (w < (Width-40)) {
				while (w < (Width-40)) {
					w = w + 10;
					if (xmetrics.width <= (w-10)) break;
				}
			}
		}
	}
	for (var i = 0; i<umls.length; i++) {
		for (var j = 0; j<umls[i].variables.length; j++) {
			ctx.font = "13pt Verdana";
			ctx.textAlign = "left";
			ctx.textBaseline = "middle";
			var xmetrics = ctx.measureText(umls[i].variables[j]);
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
	for (var i = 0; i<umls.length; i++) {
		for (var j = 0; j<umls[i].methods.length; j++) {
			ctx.font = "13pt Verdana";
			ctx.textAlign = "left";
			ctx.textBaseline = "middle";
			var xmetrics = ctx.measureText(umls[i].methods[j]);
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
	
	ptx.beginPath();
	ptx.moveTo(x, y+h1+h2);
	ptx.lineTo(x, y+h1+h2+h3);
	ptx.lineTo(x+w, y+h1+h2+h3);
	ptx.lineTo(x+w, y+h1+h2);
	ptx.closePath();
	ptx.stroke();
	
	ctx.beginPath();
	var tyu = ctx.createPattern(pattern, "repeat");
	ctx.fillStyle=tyu;
	ctx.fillRect(0,0,WIDTH,HEIGHT);
	ctx.closePath();
	if (umls.length == 5) {
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
	for (var i = 0; i<umls.length; i++) {
		var xmetrics = ctx.measureText(umls[i].className);
		if (xmetrics.width > (w-10)) {
			for (var pt=16; pt>=8; pt-=0.5) {
				ctx.font=pt+"pt Verdana";
				xmetrics = ctx.measureText(umls[i].className);
				if (xmetrics.width <= (w-10)) break;
			}
		}
		ctx.fillText(umls[i].className, xm, ym);
		if (umls.length == 2 || umls.length == 3) {
			xm = xm + Width;
		}
		else if (umls.length == 4) {
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
		else if (umls.length > 4) {
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
			else if (umls.length == 6 && i == 4) {
				xm = xm + Width;
			}
		}
	}
}
function writeVariables() {
	xp = x + 20;
	yp = y + h1 + offsety;
	xc = x + 40;
	yc = y + h1 + offsety;
	for (var i = 0; i<umls.length; i++) {
		if(umls[i].variables.length != 0) {
			for (var j = 0; j<umls[i].variables.length; j++) {
				ctx.beginPath();
				ctx.arc(xp, yp, 3, 0, 2*Math.PI, false);
				ctx.closePath();
				ctx.fill();
				ctx.font="13pt Verdana";
				ctx.textAlign="left";
				var xmetrics = ctx.measureText(umls[i].variables[j]);
				if (xmetrics.width > (w-45)) {
					wrap1(ctx, umls[i].variables[j], xc, yc, w-45, 13);
				}
				else {
					ctx.fillText(umls[i].variables[j], xc, yc);
					yc = yc + ls;
					yp = yp + ls;
				}
			}
		}
		if (umls.length < 4) {
			xc = xc + Width;
			yc = y + h1 + offsety;
			xp = xp + Width;
			yp = y + h1 + offsety;
		}
		else if (umls.length == 4) {
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
		else if (umls.length > 4) {
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
			else if (i == 4 && umls.length == 6) {
				xc = xc + Width;
				yc = y + h1 + Height + offsety;
				xp = xp + Width;
				yp = y + h1 + Height + offsety;
			}
		}
	}
}
function writeMethods() {
	xp = x + 20;
	yp = y + h1 + h2 + offsety;
	xc = x + 40;
	yc = y + h1 + h2 + offsety;
	for (var i = 0; i<umls.length; i++) {
		if(umls[i].methods.length != 0) {
			for (var j = 0; j<umls[i].methods.length; j++) {
				ctx.beginPath();
				ctx.arc(xp, yp, 3, 0, 2*Math.PI, false);
				ctx.closePath();
				ctx.fill();
				ctx.font="13pt Verdana";
				ctx.textAlign="left";
				var xmetrics = ctx.measureText(umls[i].methods[j]);
				if (xmetrics.width > (w-45)) {
					wrap1(ctx, umls[i].methods[j], xc, yc, w-45, 13);
				}
				else {
					ctx.fillText(umls[i].methods[j], xc, yc);
					yc = yc + ls;
					yp = yp + ls;
				}
			}
		}
		if (umls.length < 4) {
			xc = xc + Width;
			yc = y + h1 + h2 + offsety;
			xp = xp + Width;
			yp = y + h1 + h2 + offsety;
		}
		else if (umls.length == 4) {
			if (i == 0) {
				xc = xc + Width;
				yc = y + h1 + h2 + offsety;
				xp = xp + Width;
				yp = y + h1 + h2 + offsety;
			}
			else if (i == 1) {
				xc = xc - Width;
				yc = y + h1 + h2 + Height + offsety;
				xp = xp - Width;
				yp = y + h1 + h2 + Height + offsety;
			}
			else if (i == 2) {
				xc = xc + Width;
				yc = y + h1 + h2 + Height + offsety;
				xp = xp + Width;
				yp = y + h1 + h2 + Height + offsety;
			}
		}
		else if (umls.length > 4) {
			if (i == 0 || i == 1) {
				xc = xc + Width;
				yc = y + h1 + h2 + offsety;
				xp = xp + Width;
				yp = y + h1 + h2 + offsety;
			}
			else if (i == 2) {
				xc = xc - 2*Width;
				yc = y + h1 + h2 + Height + offsety;
				xp = xp - 2*Width;
				yp = y + h1 + h2 + Height + offsety;
			}
			else if (i == 3) {
				xc = xc + Width;
				yc = y + h1 + h2 + Height + offsety;
				xp = xp + Width;
				yp = y + h1 + h2 + Height + offsety;
			}
			else if (i == 4 && umls.length == 6) {
				xc = xc + Width;
				yc = y + h1 + h2 + Height + offsety;
				xp = xp + Width;
				yp = y + h1 + h2 + Height + offsety;
			}
		}
	}
}