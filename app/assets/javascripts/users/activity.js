$(document).ready(function(){
	$('#day').addClass('active');
	
    //  When user clicks on tab, this code will be executed
    $("#tabs li").click(function() {
        //  First remove class "active" from currently active tab
        $("#tabs li").removeClass('active');
        $("#tabs li").children('a').children('div').removeClass('active');
 
        //  Now add class "active" to the selected/clicked tab
        $(this).addClass("active");
        $(this).children('a').children('div').addClass('active');
       //$(this).css(["width","67px", "height","39px", "background", "url('../../assets/common/dashboard/btn-day.png')no-repeat top center"]);
 
        //  Hide all tab content
        $(".tab_content").hide();
 
        //  Here we get the href value of the selected tab
        var selected_tab = $(this).find("a").attr("href");
 
        //  Show the selected tab content
        $(selected_tab).fadeIn();
 
        //  At the end, we add return false so that the click on the link is not executed
        return false;
    });
    
});
