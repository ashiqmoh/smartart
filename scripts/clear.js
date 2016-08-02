$(document).ready(function() {
	$("#dialog-confirm").dialog({
		title:"Clear Console?",
		autoOpen:false,
		modal:true,
		resizable:false,
		draggable:false,
		show:'highlight',
		hide:'explode',
		buttons:{
			"Clear": function() {
				$(this).dialog("close");
				document.getElementById("input").value="";
				clearCanvas();
				$('input[name=template]:nth(0)').attr("checked","checked");
				$('#label1').addClass('selected').siblings().addClass('others');
				$('#label1').removeClass('others').siblings().removeClass('selected');
				$(':input:enabled:visible:first').focus();
			},
			Cancel: function() {
				$(this).dialog("close");
				$(':input:enabled:visible:first').focus();
			}
		}
		
	});
	$("#clear").click(function() {
		if (isNaN(document.getElementById("input").value)) {
			$("#dialog-confirm").dialog("open");
		}
		else {
			document.getElementById("input").value="";
			clearCanvas();
			$('input[name=template]:nth(0)').attr("checked","checked");
			$('#label1').addClass('selected').siblings().addClass('others');
			$('#label1').removeClass('others').siblings().removeClass('selected');
			$(':input:enabled:visible:first').focus();
		}
	});
});
function clearCanvas() {
	var canvas = document.createElement("canvas");
	canvas.width = 870;
	canvas.height = 580;
	var context = canvas.getContext("2d");
	context.clearRect(0, 0, canvas.width, canvas.height);
	var oImg = canvas.toDataURL();
	document.getElementById("outputImg").src = oImg;
}