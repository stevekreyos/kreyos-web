var lb = "full-leaderboards";

$(document).ready(function(){
	$('#bnt-Day').addClass('active');
    //  When user clicks on tab, this code will be executed
    $("#tabs li").click(function() {
        //  First remove class "active" from currently active tab
        // $("#tabs li").removeClass('active');
        $("#tabs li").children('a').removeClass('active');
 
        //  Now add class "active" to the selected/clicked tab
        // $(this).addClass("active");
        $(this).children('a').addClass('active');
       
 
        //  Hide all tab content
        $(".tab_content").hide();
 
        //  Here we get the href value of the selected tab
        var selected_tab = $(this).find("a").attr("href");
 
        //  Show the selected tab content
        $(selected_tab).fadeIn();
 
        //  At the end, we add return false so that the click on the link is not executed
        return false;
    });
    
    $('#full-btn').click(function(){
    	if(lb == 'top-five'){
    		$(this).html('<a style="cursor:pointer">Full Leaderboard</a>');
    		$('#leaderboard-title').html("Top 5 Leaderboard");
    		$('.fullLeaderboards').css('display', 'none');
	    	$('.topFiveLeaderboards').css('display', 'block');
	    	lb = 'full-leaderboards';
    	}else if(lb == 'full-leaderboards'){
    		$(this).html('<a style="cursor:pointer">Top 5 Leaderboard</a>');
    		$('#leaderboard-title').html("Full Leaderboard");
    		$('.topFiveLeaderboards').css('display', 'none');
			$('.fullLeaderboards').css('display', 'block');
			lb = 'top-five';
    	}
    });
	
	// On Modal Close button click
    $("#modal-close").click(function(){
        $("#modal").fadeOut();
        $("#modal").modal("hide");
        return false;
    });
    

    $('.myDatepicker').datepicker({
		format: "yyyy-mm-dd",
		startDate: "0m",
		endDate: "+2m",
		autoclose: true
	});

    //modal-sliders
    $("#calorie-slider").slider().on("slide", function(ev){
        $('#calories-burned').val(ev.value);
    });

    $("#miles-slider").slider().on("slide", function(ev){
        $('#miles-traveled').val(ev.value);
    });

    $("#steps-slider").slider().on("slide", function(ev){
        $("#steps-taken").val(ev.value);
    });
    
    // On click New Goal Save
    $('#btnSaveNewGoal').click(function(){
    	frm_goal_validate();
    });
    
    // On click Edit Goal Save
    $('#btnGoalSaveEdit').click(function(){
    	frm_edit_goal_validate();
    });
    
    // On click Delete Goal
    $('#btnGoalDel').click(function(){
		var goal_id = $('#goal_id').val();
		$('#deletGoalModal').modal("hide");
		
		window.location = "/delete_goal?goalID="+ goal_id;
	});
});

function frm_goal_validate(){
	var txtName = $('#goalName').val().trim();
	var txtCal = $('#calories-burned').val().trim();
	var txtDistance = $('#miles-traveled').val().trim();
	var txtSteps = $('#steps-taken').val().trim();
	var txtExpires = $('#goalExpiration').val().trim();
	
	if(txtName == '' || txtCal == '' || txtDistance == '' || txtDistance == 0 || txtSteps == '' || txtSteps == 0 || txtExpires == '' || txtExpires == "Select a Date"){
		$('#errMsg').css('display', 'block');
		$('#errMsg').html("All fields are required");
	}else{
		$('#errMsg').css('display', 'none');
		$('#errMsg').html("");
		frm_goal = document.getElementById('frm_new_goals');
		frm_goal.submit();
	}
}

function frm_edit_goal_validate(){
	var etxtName = $('#egoalName').val().trim();
	var etxtCal = $('#ecalories-burned').val().trim();
	var etxtDistance = $('#emiles-traveled').val().trim();
	var etxtSteps = $('#esteps-taken').val().trim();
	var etxtExpires = $('#egoalExpiration').val().trim();
	
	if(etxtName == '' || etxtCal == '' || etxtDistance == '' || etxtDistance == 0 || etxtSteps == '' || etxtSteps == 0 || etxtExpires == '' || etxtExpires == "Select a Date"){
		$('#EditerrMsg').css('display', 'block');
		$('#EditerrMsg').html("All fields are required");
	}else{
		$('#EditerrMsg').css('display', 'none');
		$('#EditerrMsg').html("");
		frm_goal = document.getElementById('frm_edit_goals');
		frm_goal.submit();
	}
}
