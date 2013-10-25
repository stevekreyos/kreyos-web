var lbs_flag = 0;
var kg_flag = 0;
var ft_inch_flag = 0;
var cm_flag = 0;
var h_flag;
    

$(document).ready(function(){
		
	$('#dvleftTabs-account').addClass('active');
	$('#dvleftTabs-account').closest('a').children('div').children('h3').addClass('active');
	
    //  When user clicks on tab, this code will be executed
    $("#tabs li").click(function() {
        //  First remove class "active" from currently active tab
        $("#tabs li").removeClass('active');
        $("#tabs li").children('a').children('div').children('h3').removeClass('active');
        $("#tabs li").children('a').children('div').removeClass('active');
 
        //  Now add class "active" to the selected/clicked tab
        $(this).addClass("active");
        $(this).children('a').children('div').children('h3').addClass('active');
        $(this).children('a').children('div').addClass('active');
 
        //  Hide all tab content
        $(".tab_content").hide();
 
        //  Here we get the href value of the selected tab
        var selected_tab = $(this).find("a").attr("href");
 
        //  Show the selected tab content
        $(selected_tab).fadeIn();
 
        //  At the end, we add return false so that the click on the link is not executed
        return false;
    });    
    
    // Save Button Clicked
    $('#btn-Settings-Save').click(function(){
    	validate_form();
    });
    
    // Radio Button Punds(lbs) Clicked
    $('#rdlbs').click(function(){
    	var value = $('#weight-pounds').val();
    	$('#unit-weight').html("POUNDS");
    	
    	if(value != '' && lbs_flag != 1){
			value_to_lbs = Math.round(value * 2.2);
    		$('#weight-pounds').val(value_to_lbs);
    		lbs_flag = 1;
    		kg_flag = 0;
    	}
    });
    
    // Radio Button Kilograms(kg) Clicked
    $('#rdkg').click(function(){
    	var value = $('#weight-pounds').val();
    	$('#unit-weight').html("KILOGRAMS");
    	
    	if(value != '' && kg_flag != 1){
			value_to_kg = Math.round(value / 2.2);
    		$('#weight-pounds').val(value_to_kg);
    		kg_flag = 1;
    		lbs_flag = 0;
    	}
    }); 
    
    // Radio Button Feet-Inch(inch) Clicked
    $('#rdftInch').click(function(){
    	h_flag = 1;
    	var height_value = $('#txtheightValue').val();
    	$('#unit-height').html("FEET/INCHES");
    	
    	if(height_value != '' && ft_inch_flag != 1){
    		var inches = (height_value * 0.393700787).toFixed(0);
	    	var feet = Math.floor(inches / 12);
	    	inches %= 12;
	    	
	    	$('#txtheightValue').val(feet + "'" + inches + '"');
	    	ft_inch_flag = 1;
	    	cm_flag = 0;
	    }
    });
    
    // Radio Button Centimeters(cm) Clicked
    $('#rdCm').click(function(){
    	h_flag = 2;
    	var value = $('#txtheightValue').val();
    	var feet = $('#txtheightValue').val().split("'")[0];
    	var inches = $('#txtheightValue').val().split("'")[1].split('"')[0];
    	
    	$('#unit-height').html("CENTIMETERS");
    	
    	if(value != '' && cm_flag != 1){
    		var centimeter = Math.round((parseInt(feet * 12) + parseInt(inches)) * 2.54);
	    	$('#txtheightValue').val(centimeter);	    	
	    	cm_flag = 1;
	    	ft_inch_flag = 0;
	    }
    });
    
    // Height / Weight / ZIPCODE Number only
    $("#txtheightValue ,#weight-pounds, #dvSettings_zip").keydown(function(event) {
    	if (h_flag == 1){
    		var allowed_key = event.keyCode == 46 || event.keyCode == 8 || event.keyCode == 9 || event.keyCode == 27 || event.keyCode == 13 || event.keyCode == 222;
    	}else{
    		var allowed_key = event.keyCode == 46 || event.keyCode == 8 || event.keyCode == 9 || event.keyCode == 27 || event.keyCode == 13;
    	}
        // Allow: backspace, delete, tab, escape, and enter
        if (  allowed_key ||
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
    
});
	
	// Check what is the current weight and height unit
	function check_current_height_weight_unit(height_unit, weight_unit){
		if(height_unit == "cm"){
			cm_flag = 1;
			h_flag = 2;
		}else{
			ft_inch_flag = 1;
			h_flag = 1;
		}
		
		if(weight_unit == "kg"){
			kg_flag = 1;
		}else{
			lbs_flag = 1;
		}
	}

	// Birthday Loops
	// function birthday(day, month, year){
		// var start;
		// var today = new Date();
		// var months = ['Month', 'January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
		// var current_year = today.getFullYear() + 1;
		// var dropdown_day = document.getElementById('dd_day');
		// var dropdown_month = document.getElementById('dd_month');
		// var dropdown_year = document.getElementById('dd_year');
// 		
		// // Days
		// for(i=1; i<32; i++){
			// var o1 = new Option(i, i);
// 			
			// dropdown_day[dropdown_day.length] = o1;
			// if(day!=0 && i==day){
				// o1.setAttribute("selected","selected");
			// }
		// }
// 		
		// // Months
		// for(i=0; i<=months.length; i++){
			// var o2 = new Option(months[i], i);
// 			
			// dropdown_month[dropdown_month.length] = o2;
			// if(month!=0 && i==month){
				// o2.setAttribute("selected","selected");
			// }
		// }
// 		
		// // Years
		// for(start=1940; start<current_year; start++){
			// var o3 = new Option(start, start);
// 			
			// dropdown_year[dropdown_year.length] = o3;
			// if(year!=0 && start	==year){
				 // o3.setAttribute("selected","selected");
			// }
		// }		
	// }
	
	// Validate Form
	function validate_form(){
		var nameRegEx = /^[a-zA-ZñÑ ]*$/;
		var fname = $('#dvSettings_fname').val().trim();
		//var lname = $('#dvSettings_lname').val().trim();
		var nickname = $('#dvSettings_nickname').val().trim();
		var height = $('#txtheightValue').val().trim();
		var weight = $('#weight-pounds').val().trim();
		var country = $('#slcCountry').val();
		var city = $('#dvSettings_city').val().trim();
		var zip = $('#dvSettings_zip').val().trim();
		var day = document.getElementById('dd_day');
		var month = document.getElementById('dd_month');
		var year = document.getElementById('dd_year');
		// var day_value = day.options[day.selectedIndex].value;
		// var month_value = month.options[month.selectedIndex].value;
		// var year_value = year.options[year.selectedIndex].value;
		var errContainer = document.getElementById("errorContainer");
		var errFlag = false;
		var errMessage = '';
		
		//return alert(day_value + "-" + month_value + "-" + year_value)
		
		if(fname == ''){
			errFlag = true;
			errMessage = errMessage + "<br />- First Name is required"	
		}else if(!fname.match(nameRegEx)){
			errFlag = true;
			errMessage = errMessage + "<br />- First name should not contain numbers or special characters"
		}
		
		// if(lname == ''){
			// errFlag = true;
			// errMessage = errMessage + "<br />- Last Name is required"	
		// }else if(!lname.match(nameRegEx)){
			// errFlag = true;
			// errMessage = errMessage + "<br />- Last name should not contain numbers or special characters"
		// }
		
		if(nickname == ''){
			errFlag = true;
			errMessage = errMessage + "<br />- Nickname is required"	
		}
		
		// if(month_value == 0 ||day_value == 'Day'|| year_value == 'Year'){
			// errFlag = true;
			// errMessage = errMessage + "<br />- Indicate your full birthday"	
		// }
		
		if(height == ''){
			errFlag = true;
			errMessage = errMessage + "<br />- Height is required"	
		}
		
		if(weight == ''){
			errFlag = true;
			errMessage = errMessage + "<br />- Weight is required"
		}
		
		if(city == ''){
			errFlag = true;
			errMessage = errMessage + "<br />- City is required"
		}
		
		if(zip == ''){
			errFlag = true;
			errMessage = errMessage + "<br />- Zip Code is required"
		}
		
		if(country == "Country"){
			errFlag = true;
			errMessage = errMessage + "<br />- County is required"
		}
		
		if(errFlag){
			errContainer.innerHTML = errMessage;
			$('#ErrornotificationContainer').css('display', 'block');
			$('#SuccessnotificationContainer').css('display', 'none');
		    $.scrollTo( '.tab_content', 800, {easing:'swing'} );
			return false;
		}else{
			submitform();
		}
		
	}
		
	// Form Submit
	function submitform(){
		var frm = document.getElementById("frmSettings");
		frm.submit();		
	}
	
	
	
