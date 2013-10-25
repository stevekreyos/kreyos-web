$(document).ready(function(){
	
	// Numbers Only
	$("#txtOrderID").keydown(function(event) {
        // Allow: backspace, delete, tab, escape, and enter
        if ( event.keyCode == 46 || event.keyCode == 8 || event.keyCode == 9 || event.keyCode == 27 || event.keyCode == 13 || 
             // Allow: Ctrl+A
            (event.keyCode == 65 && event.ctrlKey === true) || 
             // Allow: home, end, left, right
            (event.keyCode >= 35 && event.keyCode <= 39)) {
                 // let it happen, don't do anything
                 return;
        }
        else {
            // Ensure that it is a number and stop the keypress
            if (event.shiftKey || (event.keyCode < 48 || event.keyCode > 57) && (event.keyCode < 96 || event.keyCode > 105 )) {
                event.preventDefault(); 
            }   
        }
    });
    
    $('#btnOrderIDSubmit').click(function(){
    	var txtOrderID = $('#txtOrderID').val().trim();
    	var ErrFlag = false;
    	var regex = /^\d+$/;
    	
    	if(txtOrderID == ""){
    		$('#error_container').html("Please provide the Order ID");
    		ErrFlag = true;
    	}else if(!regex.test(txtOrderID)){
    		$('#error_container').html("Order ID should contain numbers only");
    		ErrFlag = true;
    	}
    	
    	if(ErrFlag){
    		$('#error_container').css('display', 'block');
    	}else{
    		$('#frmOrderID').submit();
    	}
    });    
});
