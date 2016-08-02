var canvas;var ctx;var WIDTH = 870;var HEIGHT = 580;
var m;var h1;var h2;var r;var bp = new Array();
var bc1 = new Array("#CFFA24", "#412F93", "#FF2121", "#0DF76F", "#EE2DFF", "#FF930E");
var bc2 = new Array("#A3CB05", "#39315C", "#8D1C1C", "#308051", "#63186A", "#714C1F");
var fl;var xpp;var Width;var Height;var dw;var ls;

function canvas2() {
	canvas = document.createElement("canvas");
	canvas.width = WIDTH;
	canvas.height = HEIGHT;
	ctx = canvas.getContext("2d");
	w = WIDTH - 60;
	m = HEIGHT/2;
	w1 = 0.9*w;
	w2 = 0.1*w;
	h1 = 80;
	h2 = 160;
	r = 15;
	fl = families.length;
	xpp = (WIDTH)/(fl+1);
	Width = 2*xpp - 2*r;
	dw = 180;
	if (fl > 6) {
		$("#dialog-sorry").dialog("open");
		$(':input:enabled:visible:first').focus();
	}
	else {
		clearCanvas();
		drawArrow();
		setWidth();
		drawBullet();
		writeMain();
		writeSub();
		var oImg = canvas.toDataURL();
		document.getElementById("outputImg").src = oImg;
	}
}
function drawArrow() {
	ctx.beginPath();
	ctx.moveTo(30.5, m-h1/2);
	ctx.lineTo(30.5+w1, m-h1/2);
	ctx.lineTo(30.5+w1, m-h2/2);
	ctx.lineTo(WIDTH-30.5, m);
	ctx.lineTo(30.5+w1, m+h2/2);
	ctx.lineTo(30.5+w1, m+h1/2);
	ctx.lineTo(20.5, m+h1/2);
	ctx.lineTo(60.5, m);
	ctx.lineTo(30.5, m-h1/2);
	ctx.closePath();
	var grd = ctx.createLinearGradient(0,m-h2/2, 0, m+h2/2);
	grd.addColorStop(1, "#f9f9f9");
	grd.addColorStop(0, "#a7a7a7");
	ctx.fillStyle = grd;
	ctx.shadowColor = '#D3DCAD';
	ctx.shadowBlur = 30;
	ctx.shadowOffsetX = 10;
	ctx.shadowOffsetY = -5;
	ctx.fill();
}
function setWidth() {
	ctx.font = "16pt Verdana";
	ctx.textAlign = "center";
	ctx.textBaseline = "middle";
	for (var i = 0; i<fl; i++) {
		var xmetrics = ctx.measureText(families[i].mother);
		if (xmetrics.width > dw) {
			if (dw < Width) {
				while (dw < Width) {
					dw = dw + 2;
					if (xmetrics.width <= dw) break;
				}
			}
		}
	}
	for (var i = 0; i<families.length; i++) {
		for (var j = 0; j<families[i].member; j++) {
			ctx.font = "12pt Verdana";
			ctx.textAlign = "left";
			ctx.textBaseline = "middle";
			var xmetrics = ctx.measureText(families[i].children[j]);
			var aw = w2-45;
			if (xmetrics.width > (dw-20)) {
				if (dw < Width) {
					while (dw < Width) {
						dw = dw + 2;
						if (xmetrics.width <= (dw-20)) break;
					}
				}
			}
		}
	}
}
function drawBullet() {
	for (var i=0; i<fl; i++) {
		bp[i] = (i+1)*xpp;
		ctx.beginPath();
		ctx.arc(bp[i], m, r, 0, 2*Math.PI, false);
		ctx.closePath();
		var grd1 = ctx.createLinearGradient(100,m-15,100,m+15);
		grd1.addColorStop(0, bc1[i]);
		grd1.addColorStop(1, bc2[i]);
		ctx.fillStyle = grd1;
		ctx.fill();
		if (i%2 == 0) {
			ctx.beginPath();
			ctx.moveTo(bp[i], 50);
			ctx.lineTo(bp[i] - (dw/2), 50);
			ctx.moveTo(bp[i], 50);
			ctx.lineTo(bp[i] + (dw/2), 50);
			ctx.closePath();
			ctx.strokeStyle = bc1[i];
			ctx.lineWidth = 2;
			ctx.stroke();
		}
		if (i%2 != 0) {
			ctx.beginPath();
			ctx.moveTo(bp[i], m+100);
			ctx.lineTo(bp[i] - (dw/2), m+100);
			ctx.moveTo(bp[i], m+100);
			ctx.lineTo(bp[i] + (dw/2), m+100), 
			ctx.closePath();
			ctx.strokeStyle = bc1[i];
			ctx.lineWidth = 2;
			ctx.stroke();
		}
	}
}
function writeMain() {
	var ty
	ctx.font = "16pt Verdana";
	ctx.fillStyle = "black";
	ctx.textAlign = "center";
	ctx.textBaseline = "middle";			
	for (var i = 0; i<fl; i++) {
		var xmetrics = ctx.measureText(families[i].mother);
		if (xmetrics.width > dw) {
			for (var pt=16; pt>=8; pt-=0.5) {
				ctx.font=pt+"pt Verdana";
				xmetrics = ctx.measureText(families[i].mother);
				if (xmetrics.width <= dw) break;
			}
		}
		if (i%2 == 0) ty = 30;
		else if (i%2 != 0) ty = m+80;
		ctx.fillText(families[i].mother, bp[i], ty);
		ctx.font = "16pt Verdana";
	}
}
function writeSub() {
	ls = 30;
	var sz = 12;
	for (var i = 0; i<fl; i++) {
		var temp = 6;
		if (families[i].member > temp) {
			temp = families[i].member;
			ls = (HEIGHT-m-100)/temp;
		}
		if (temp > 9) sz = 11;
		if (i%2 == 0) sy = 40+ls;
		else if (i%2 != 0) sy = m+90+ls;
		if (families[i].member != 0) {
			for (var j = 0; j<families[i].member; j++) {
				ctx.beginPath();
				ctx.arc(bp[i]-(dw/2)+5, sy, 3, 0, 2*Math.PI, false);
				ctx.closePath();
				ctx.fill();
				ctx.font=sz+"pt Verdana";
				ctx.textAlign = "left";
				ctx.textBaseline = "middle";
				var xmetrics = ctx.measureText(families[i].children[j]);
				if (xmetrics.width > (dw-20)) {
					wrap2(ctx, families[i].children[j], bp[i]-(dw/2)+20, sy, dw-20, 50, 12);
				}
				else {
					ctx.fillText(families[i].children[j], bp[i]-(dw/2)+20, sy);
					sy = sy + ls;
				}
			}
		}
	}	
}