
$(document).ready(function(){
	$('#btnSteps').addClass('active');
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
});
