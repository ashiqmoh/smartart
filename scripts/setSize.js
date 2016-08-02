$(document).ready(function() {
	var W = $(document).width();
	var H = $(document).height();

});

$(function(){
	$(window).resize(function(){
		var W = $(document).width();
		var H = $(document).height();
		$("#input").width(0.335*W);
		$("#input").height(0.665*H);
		$("#output").width(0.64*W);
		$("#output").height(0.672*H);
	});
});