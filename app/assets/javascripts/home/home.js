var slideFlag;
var slide1;
var slide2;
var slide3;
var slide4;
var slide5;

$(document).ready(function(){
	var male_white_sku = "BD0001";
	var male_black_sku = "BD0002";
	var male_lime_sku  = "BD0003";
	var male_blue_sku  = "BD0004";
	var male_pink_sku  = "BD0005";
	
	var female_white_sku = "BD0006";
	var female_black_sku = "BD0007";
	var female_lime_sku  = "BD0008";
	var female_blue_sku  = "BD0009";
	var female_pink_sku  = "BD0010";
	
	var color     = "Black";
	var gender	  = "Male";
	var hostname  = "http://kreyos.nesventures.net:8080";
	var watch_url = hostname+"/preorder?sku="+male_black_sku;
	
	// For Color
	$('.btnColor').click(function(){
		color = $(this).attr('rel');
		$('.current_color').html("");
		$('.color-indicator').css('border-top', '1px solid #dddddd');
		if(color == 'Black'){
			$('#imgWatch').addClass('imgWatch_black');
			$('#imgWatch').removeClass('imgWatch_white');
			$('#imgWatch').removeClass('imgWatch_pink');
			$('#imgWatch').removeClass('imgWatch_blue');
			$('#imgWatch').removeClass('imgWatch_lime');
			$('#color_indicator_black').css('border-top', 'solid 2px #00bcf2');
			$('#td-black').html(color);
			
			if(gender == "Male"){
				watch_url = hostname+"/preorder?sku="+male_black_sku;	
			}else if(gender == "Female"){
				watch_url = hostname+"/preorder?sku="+female_black_sku;
			}
			
		}else if(color == 'White'){
			$('#imgWatch').addClass('imgWatch_white');
			$('#imgWatch').removeClass('imgWatch_black');
			$('#imgWatch').removeClass('imgWatch_pink');
			$('#imgWatch').removeClass('imgWatch_blue');
			$('#imgWatch').removeClass('imgWatch_lime');
			$('#color_indicator_white').css('border-top', 'solid 2px #00bcf2');
			$('#td-white').html(color);
			
			if(gender == "Male"){
				watch_url = hostname+"/preorder?sku="+male_white_sku;	
			}else if(gender == "Female"){
				watch_url = hostname+"/preorder?sku="+female_white_sku;
			}
			
		}else if(color == 'Pink'){
			$('#imgWatch').addClass('imgWatch_pink');
			$('#imgWatch').removeClass('imgWatch_black');
			$('#imgWatch').removeClass('imgWatch_white');
			$('#imgWatch').removeClass('imgWatch_blue');
			$('#imgWatch').removeClass('imgWatch_lime');
			$('#color_indicator_pink').css('border-top', 'solid 2px #00bcf2');
			$('#td-pink').html(color);
			
			if(gender == "Male"){
				watch_url = hostname+"/preorder?sku="+male_pink_sku;	
			}else if(gender == "Female"){
				watch_url = hostname+"/preorder?sku="+female_pink_sku;
			}
			
		}else if(color == 'Blue'){
			$('#imgWatch').addClass('imgWatch_blue');
			$('#imgWatch').removeClass('imgWatch_black');
			$('#imgWatch').removeClass('imgWatch_white');
			$('#imgWatch').removeClass('imgWatch_pink');
			$('#imgWatch').removeClass('imgWatch_lime');
			$('#color_indicator_blue').css('border-top', 'solid 2px #00bcf2');
			$('#td-blue').html(color);
			
			if(gender == "Male"){
				watch_url = hostname+"/preorder?sku="+male_blue_sku;	
			}else if(gender == "Female"){
				watch_url = hostname+"/preorder?sku="+female_blue_sku;
			}
			
		}else if(color == 'Lime'){
			$('#imgWatch').addClass('imgWatch_lime');
			$('#imgWatch').removeClass('imgWatch_black');
			$('#imgWatch').removeClass('imgWatch_white');
			$('#imgWatch').removeClass('imgWatch_pink');
			$('#imgWatch').removeClass('imgWatch_blue');
			$('#color_indicator_green').css('border-top', 'solid 2px #00bcf2');
			$('#td-lime').html(color);
			
			if(gender == "Male"){
				watch_url = hostname+"/preorder?sku="+male_lime_sku;	
			}else if(gender == "Female"){
				watch_url = hostname+"/preorder?sku="+female_lime_sku;
			}
			
		}
	});
	
	// For Gender
	$('.btnGender').click(function(){
		gender = $(this).attr('rel');
		$('.current_gender').html("");
		$('.gender-indicator').css('border-top', '1px solid #dddddd');
		
		if(gender == "Male"){
			$('#gender_indicator_male').css('border-top', 'solid 2px #00bcf2');
			$('#td-male').html("Male");
			
			if(color == "White"){
				watch_url = hostname+"/preorder?sku="+male_white_sku;
			}else if(color == "Black"){
				watch_url = hostname+"/preorder?sku="+male_black_sku;
			}else if(color == "Lime"){
				watch_url = hostname+"/preorder?sku="+male_lime_sku;
			}else if(color == "Blue"){
				watch_url = hostname+"/preorder?sku="+male_blue_sku;
			}else if(color == "Pink"){
				watch_url = hostname+"/preorder?sku="+male_pink_sku;
			}
			
		}else if(gender == 'Female'){
			$('#gender_indicator_female').css('border-top', 'solid 2px #00bcf2');
			$('#td-female').html("Female");
			
			if(color == "White"){
				watch_url = hostname+"/preorder?sku="+female_white_sku;
			}else if(color == "Black"){
				watch_url = hostname+"/preorder?sku="+female_black_sku;
			}else if(color == "Lime"){
				watch_url = hostname+"/preorder?sku="+female_lime_sku;
			}else if(color == "Blue"){
				watch_url = hostname+"/preorder?sku="+female_blue_sku;
			}else if(color == "Pink"){
				watch_url = hostname+"/preorder?sku="+female_pink_sku;
			}
			
		}
	});
	
	// Onclick of Button Pre-order
	$('#btnSendPreOrder').click(function(){
		window.location = watch_url;
	});

});

$(window).load(function(){
	//callback_sliders();
});



function callback_sliders(){
	$('.slidejs-1').bxSlider({
		auto: true,
		mode: 'vertical',
		adaptiveHeight: true,
		pager: false,
		controls: false,
		speed: 900,
		autoDelay: 1000,
		responsive: true,
		adaptiveHeight: true
	});
	$('.slidejs-2').bxSlider({
		auto: true,
		mode: 'vertical',
		adaptiveHeight: true,
		pager: false,
		controls: false,
		speed: 900,
		autoDelay: 1500,
		responsive: true,
		adaptiveHeight: true
	});
	$('.slidejs-3').bxSlider({
		auto: true,
		mode: 'vertical',
		adaptiveHeight: true,
		pager: false,
		controls: false,
		speed: 900,
		autoDelay: 2000,
		responsive: true,
		adaptiveHeight: true
	});
	$('.slidejs-4').bxSlider({
		auto: true,
		mode: 'vertical',
		adaptiveHeight: true,
		pager: false,
		controls: false,
		speed: 900,
		autoDelay: 2500,
		responsive: true,
		adaptiveHeight: true
	});
	$('.slidejs-5').bxSlider({
		auto: true,
		mode: 'vertical',
		adaptiveHeight: true,
		pager: false,
		controls: false,
		speed: 900,
		autoDelay: 3000,
		responsive: true,
		adaptiveHeight: true
	});		
}