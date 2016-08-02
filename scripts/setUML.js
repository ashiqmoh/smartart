var umls = new Array();
var nu = 0;

var className = null;
var variables = new Array();
var methods = new Array();

var tempA;
var tempClass = null;
var tempVariable = new Array();
var tempMethod = new Array();
var currentJ = 0;

function setUML() {
	umls = [];
	nu = 0;
	for (var i = 0; i<families.length; i++) {
		var q = 0;
		var w = 0;
		for (var j = 0; j<families[i].member; j++) {
			if (families[i].children[j] == "--") {
				currentJ = j+1;
				break;
			}
			else {
				tempVariable[q] = families[i].children[j];
				q++;
			}
		}
		if (currentJ != 0) {
			for(var j = currentJ; j<families[i].member; j++) {
				tempMethod[w] = families[i].children[j];
				w++;
			}
		}
		tempClass = families[i].mother;
		tempA = new myUML(tempClass, tempVariable, tempMethod);
		umls[nu] = tempA;
		nu++;
		tempClass = null;
		tempVariable = [];
		tempMethod = [];
		currentJ = 0;
	}
}

function myUML(c, v, m) {
	this.className = c;
	this.variables = v;
	this.methods = m;
}