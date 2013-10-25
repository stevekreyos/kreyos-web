$(document).ready(function(){
	setTimeout(function(){
		$('#SuccessnotificationContainer').css('display', 'none');
	},5000);
	
    
    $('.li-users').click(function(){
    	var uid = $(this).attr('id');
    	var txtb = $('#txtfuid');
    	var value = $.inArray(uid, mf_uid_arr);
    	
    	if(value < 0){
    		mf_uid_arr.push(uid);
    		$('<div class="selectedFriend"></div>').insertBefore($(this).children('#profile_picture'));
    	}else{
    		mf_uid_arr.splice(value, 1);
    		$(this).find('.selectedFriend').remove();
    	}    	
    	
    	txtb.val(mf_uid_arr);
    
    	if(txtb.val() == ''){
    		$('#btnRemoveFriends').css('display', 'none');
    	}else{
    		$('#btnRemoveFriends').css('display', 'block');
    	}
    });
    
    $('#btnDeleteFriends').click(function(){
    	var friends_email = $(this).attr('rel');
    	$('#txtfuid').val(friends_email);
    	$('#modal-confirmation').modal('show');
    });
    
    $('#btnYesDel').click(function(){
    	var frm = document.getElementById("frmDelFriends");
		frm.submit();	
    });
	
});
