$(document).ready(function(){
	// Toggle advanced settings
	var $elem = $('#wrapper');

	$(".btn-advanced").click(function(e) {
		e.preventDefault();
		$(".advanced-settings").slideToggle("fast");
		$('html, body').animate({scrollTop: $elem.height()}, 800);
	});
	
	// Check/Uncheck checkbox on links
	$('.links th').click(function() {
		var $checkboxes = $('input:checkbox', $(this).parent());
		var mustCheck = $checkboxes.not(':checked').size() > $checkboxes.filter(':checked').size();
		$checkboxes.prop('checked', mustCheck);
	});
	
	$(".links tr:first-child td").css("text-align", "center");

});