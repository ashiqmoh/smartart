var mother;
var children = new Array();
var member = 0;
var nF = 0;
var tempMother = null;
var tempChildren = new Array();
var tempLength = 0;
var tL = 0;
var j = 0;
var Input = null;
var families = new Array();
var tempArray;

function setFamily() {
	$("#test").empty();
	nF = 0;
	families = [];
	if(isNaN(document.getElementById("input").value)) {
		var In = document.getElementById("input").value;
		Input = In.split("\n");
		var pos = Input[0].indexOf("-");
		tL = Input.length;	
		for (var i=0; i<tL; i++) {
			if(Input[i].charAt(0)=="-") {
				tempMother = Input[i].substring(1,Input[i].length).trim();
				j = 0;
				if (i == (tL-1)) {
					tempArray = new myFamily(tempMother, tempChildren, tempLength);
					families[nF] = tempArray;
					nF++;
					tempMother = null;
					tempChildren = [];
					tempLength = 0;
				}
				else if (i<(tL-1) && Input[i+1].charAt(0)=="-") {
					tempArray = new myFamily(tempMother, tempChildren, tempLength);
					families[nF] = tempArray;
					nF++;
					tempMother = null;
					tempChildren = [];
					tempLength = 0;
				}
			}
			else if (Input[i].charAt(1)=="-") {
				tempChildren[j] = Input[i].substring(2,Input[i].length).trim();
				j++;
				if ((i<(tL-1) && Input[i+1].charAt(0)=="-") || i==(tL-1)) {
					tempLength = tempChildren.length;
					tempArray = new myFamily(tempMother, tempChildren, tempLength);
					families[nF] = tempArray;
					nF++;
					tempMother = null;
					tempChildren = [];
					tempLength = 0;
				}
			}
			else if (Input[i]=="" || Input[i]=="\t" || Input[i]==" ") {
				if ((i<(tL-1) && Input[i+1].charAt(0)=="-") || i==(tL-1)) {
					tempLength = tempChildren.length;
					tempArray = new myFamily(tempMother, tempChildren, tempLength);
					families[nF] = tempArray;
					nF++;
					tempMother = null;
					tempChildren = [];
					tempLength = 0;
				}
			}
		}
		/*for (var i=0; i<nF; i++) {
			var j = families[i].member;
			$("#test").append("<span>Point </span>" + [i+1] + "<span>:\t</span>" + families[i].mother + "<br/>");
			if (j != 0) {
				for (var k=0; k<j; k++) {
					$("#test").append("<span>Subpoint </span>" + [i+1] + "<span>.</span>" + [k+1] + "<span>:\t</span>" + families[i].children[k] + "<br/>");
				}
			}
		}*/
		var checking = $('input[name=template]:checked', '#chooseTemp').val();
		if (checking == "template1") canvas1();
		else if (checking == "template2") canvas2();
		else if (checking == "template3") canvas3();
		else if (checking == "template4") canvas4();
		$("#outputDiv").css('border','1px solid #c3c3c3');
	}
	else {
		$("#dialog-error").dialog("open");
		$(':input:enabled:visible:first').focus();
	}
}
function myFamily(m, c, n) {
	this.mother = m;
	this.children = c;
	this.member = n;
}
function clearArray() {
	for (var i=0; i<families.length; i++) {
		families[i].mother=[];
		families[i].member=0;
		families[i].children=[];
	}
	families.length=0;
}