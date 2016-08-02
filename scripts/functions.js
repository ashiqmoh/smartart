//startup functions/setups
$(document).ready(function() {
	//vertical tabs
	$(function() {
		$("#tabs").tabs({
			event:"click",
			heightStyle:"auto",
			hide:{effect:'slide',duration:250},
			show:{effect:'slide',duration:250}
		});
		$("#tabs").tabs().addClass("ui-tabs-vertical ui-helper-clearfix");
		$("#tabs li").removeClass("ui-corner-top").addClass("ui-corner-left");
	});
	//radio button settings
	window.onload = function() {
		$('input[name=template]:nth(0)').attr("checked","checked");
		$('label:nth(0)').addClass('selected').siblings().addClass('others');
		$('input:radio').addClass('input_hidden');
		$("#input").val("-point1\n\t-subpoint1.1\n\t-subpoint1.2\n\t---\n\t-method1.1\n-point2\n\t-subpoint2.1\n\t-subpoint2.2");
		setFamily();
	}
	$("label").mousedown(function() {
		$(this).addClass('selected').siblings().addClass('others');
		$(this).removeClass('others').siblings().removeClass('selected');
	});
	$("label").mouseup(function() {
		setTimeout(function(){
			if(isNaN(document.getElementById("input").value)) {
				setFamily();
			}
		}, 100);
	});
	//dialogs
	$("#dialog-error").dialog({
		title:"Invalid Input",
		autoOpen:false,
		modal:true,
		draggable:false,
		resizable:false,
		show:'clip',
		hide:'fade',
		buttons:{
			Ok: function() {
				$(this).dialog("close");
			}
		}
	});
	$("#helpmessage").dialog({
		title:"Welcome",
		autoOpen:true,
		resizable:false,
		draggable:false,
		modal:true,
		hide:'fade',
		close: function() {
			$(':input:enabled:visible:first').focus();
		}
	});
	$("#dialog-sorry").dialog({
		title:"Ooops...",
		autoOpen:false,
		resizable:false,
		draggable:false,
		modal:true,
		hide:'fade'
	});
	//sets tooltips
	$(document).tooltip();
	$("#outputImg").tooltip({
		items:"img",
		content:"Right click to save me!",
		position:{my:"right center", at: "right top"},
		//track:true,
		hide:{effect:"fade", duration:500}
	});
	$("#ok").tooltip({
		items:"button",
		content:"View Result",
		position:{my:"center top+5", at:"center bottom"}
	});
	$("#clear").tooltip({
		items:"button",
		content:"Clear Console",
		position:{my:"center top+5", at:"center bottom"}		
	});
	$("#console").tooltip({
		items:"li",
		content:"Console"
	});
	$("#Templates").tooltip({
		items:"li",
		content:"Templates"
	});
	$("#smart").tooltip({
		items:"h1",
		content:"created by ashiqmoh",
		show:"clip",
		hide:"fade",
		position:{my:"center+170 center", at:"center center"}
	});
	//ok button onclick
	$("#ok").click(setFamily);
	//scrollbar settings
	$("#tab2").tinyscrollbar({
		size:100,
		sizethumb:20
	});
});