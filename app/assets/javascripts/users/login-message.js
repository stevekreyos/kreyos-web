
$(document).ready(function(){
	$(".menu").click(function(event){
		event.preventDefault();
		$("#login-message-modal").modal('show');
	});
});
