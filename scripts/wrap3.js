function wrap3(context, text, x, y, maxWidth, maxHeight, fs) {
	var words = text.split(" ");
	var lines = new Array();
	if (words.length > 1) {
		var i = 0;
		var j = 0;
		while (i<words.length) {
			var testLine = words[i] + " " + words[i+1];
			var metrics = context.measureText(testLine);
			if (metrics.width > maxWidth) {
				lines[j] = words[i];
				i++;
				j++;
			}
			else {
				lines[j] = testLine;
				i+=2;
				j++;
			}
		}
		var lineHeight = maxHeight/lines.length;
		var ypos = y - 30 + lineHeight/2;
		for (var k = 0; k < lines.length; k++) {
			var metrics = context.measureText(lines[k]);
			if (metrics.width > maxWidth) {
				for (var pt=fs; pt>=8; pt-=0.5) {
					context.font=pt+"pt Verdana";
					metrics = context.measureText(lines[k]);
					if (metrics.width <= maxWidth) break;
				}
			}
			context.fillText(lines[k], x, ypos);
			ypos += lineHeight;
			context.font=fs+"pt Verdana";
		}
	}
	
	else {
		var metrics = context.measureText(text);
		if (metrics.width > (w-30)) {
			for (var pt=fs; pt>=8; pt-=0.5) {
				context.font=pt+"pt Verdana";
				metrics = context.measureText(text);
				if (metrics.width <= maxWidth) break;
			}
		}
		context.fillText(text, x, y);
	}
}