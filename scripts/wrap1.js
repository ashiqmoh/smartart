
	
function wrap1(context, text, xpos, ypos, maxWidth, fs) {
	var words = text.split(" ");
	var line = "";
	var lines = new Array();
	var j = 0;
	var lineHeight = 20;
	if (words.length > 1) {
		for (var i = 0; i<words.length; i++) {
			var testLine = line + words[i] + " ";
			var metrics = context.measureText(testLine);
			if (metrics.width > maxWidth) {
				lines[j] = line;
				line = words[i] + " ";
				j++;
			}
			else {
				line = testLine;
			}
			if (i == (words.length - 1)) {
				lines[j] = line;
			}
		}
		for (var k = 0; k < lines.length; k++) {
			var metrics = context.measureText(lines[k]);
			if (metrics.width > maxWidth) {
				for (var pt=fs; pt>=8; pt-=0.5) {
					context.font=pt+"pt Verdana";
					metrics = context.measureText(lines[k]);
					if (metrics.width <= maxWidth) break;
				}
			}
			//
			context.fillText(lines[k], xpos, ypos);
			ypos += lineHeight;
			context.font=fs+"pt Verdana";
			
		}
		yc = ypos - lineHeight + ls;
		yp = ypos - lineHeight + ls;
	}
	
	else {
		var metrics = context.measureText(text);
		if (metrics.width > maxWidth) {
			for (var pt=fs; pt>=8; pt-=0.5) {
				context.font=pt+"pt Verdana";
				metrics = context.measureText(text);
				if (metrics.width <= maxWidth) break;
			}
		}
		context.fillText(text, xpos, ypos);
		yc = ypos + ls;
		yp = ypos + ls;
	}
}

function setWrapls(context, text, maxWidth, ls) {
	var words = text.split(" ");
	var line = "";
	var lines = new Array();
	var j = 0;
	var lineHeight = 20;
	if (words.length > 1) {
		for (var i = 0; i<words.length; i++) {
			var testLine = line + words[i] + " ";
			var metrics = context.measureText(testLine);
			if (metrics.width > maxWidth) {
				lines[j] = line;
				line = words[i] + " ";
				j++;
			}
			else {
				line = testLine;
			}
			if (i == (words.length - 1)) {
				lines[j] = line;
			}
		}
		ls = ls - (lines.length-1)*2.5;
		lineHeight = 2/3*ls;
	}
}