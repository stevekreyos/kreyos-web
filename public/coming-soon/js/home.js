var slideFlag;
var slide1;
var slide2;
var slide3;
var slide4;
var slide5;

$(document).ready(function(){
	
	var black_sku = "black-watch-001";//"Black-001"
	var white_sku = "white-watch-002";//"White-002";
	var pink_sku  = "pink-watch-band-003";//"Pink-003";
	var blue_sku  = "blue-watch-004";//"Blue-004";
	var lime_sku  = "lime-watch-005";//"Lime-005";
	var color     = "Black";
	var hostname  = "http://kreyos.nesventures.net:8080";
	var watch_url = hostname+"/preorder?sku="+black_sku;
	
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
			watch_url = hostname+"/preorder?sku="+black_sku;
		}else if(color == 'White'){
			$('#imgWatch').addClass('imgWatch_white');
			$('#imgWatch').removeClass('imgWatch_black');
			$('#imgWatch').removeClass('imgWatch_pink');
			$('#imgWatch').removeClass('imgWatch_blue');
			$('#imgWatch').removeClass('imgWatch_lime');
			$('#color_indicator_white').css('border-top', 'solid 2px #00bcf2');
			$('#td-white').html(color);
			watch_url = hostname+"/preorder?sku="+white_sku;
		}else if(color == 'Pink'){
			$('#imgWatch').addClass('imgWatch_pink');
			$('#imgWatch').removeClass('imgWatch_black');
			$('#imgWatch').removeClass('imgWatch_white');
			$('#imgWatch').removeClass('imgWatch_blue');
			$('#imgWatch').removeClass('imgWatch_lime');
			$('#color_indicator_pink').css('border-top', 'solid 2px #00bcf2');
			$('#td-pink').html(color);
			watch_url = hostname+"/preorder?sku="+pink_sku;
		}else if(color == 'Blue'){
			$('#imgWatch').addClass('imgWatch_blue');
			$('#imgWatch').removeClass('imgWatch_black');
			$('#imgWatch').removeClass('imgWatch_white');
			$('#imgWatch').removeClass('imgWatch_pink');
			$('#imgWatch').removeClass('imgWatch_lime');
			$('#color_indicator_blue').css('border-top', 'solid 2px #00bcf2');
			$('#td-blue').html(color);
			watch_url = hostname+"/preorder?sku="+blue_sku;
		}else if(color == 'Lime'){
			$('#imgWatch').addClass('imgWatch_lime');
			$('#imgWatch').removeClass('imgWatch_black');
			$('#imgWatch').removeClass('imgWatch_white');
			$('#imgWatch').removeClass('imgWatch_pink');
			$('#imgWatch').removeClass('imgWatch_blue');
			$('#color_indicator_green').css('border-top', 'solid 2px #00bcf2');
			$('#td-lime').html(color);
			watch_url = hostname+"/preorder?sku="+lime_sku;
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