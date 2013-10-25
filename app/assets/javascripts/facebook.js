var fb_user_uid;
var referral_url;

window.fbAsyncInit = function() {
  FB.init({
    // appId      : "593710007324797", // App ID
    // channelUrl : '//kreyos.nesventures.net/channel.html', // Channel File for x-domain communication
	appId      : "409074415884872", // App ID
    ChannelUrl : '//localhost:3000/channel.html', // Channel File for x-domain communication
    status     : true, // check login status
    cookie     : true, // enable cookies to allow the server to access the session
    xfbml      : true,  // parse XFBML
    //frictionlessRequests: true
    
  });

	$(function(){
		$("#btn-LoginFb").click(function(){
        FB.login(function(response) {
            if (response.authResponse) {
            	window.location = "auth/facebook";
            	return false;
            }else{
              //  alert('Login Failed!');
            }
			}, {scope: 'email, user_birthday, read_stream,publish_stream,offline_access'});
		});
		
		$("#btnLandingFB").click(function(){
        FB.login(function(response) {
            if (response.authResponse) {
            	window.location = "auth/facebook";
            	return false;
            }else{
              //  alert('Login Failed!');
            }
			}, {scope: 'email, user_birthday, read_stream,publish_stream,offline_access'});
		});

	       $('#dv-fb-share').click(function(e){
			e.preventDefault();
			FB.ui({
				method: 'feed',
				name: 'Kreyos',
				link: 'http://kreyos.nesventures.net/',
				picture: '',
				caption: "Don't make a proimse. Make a goal!",
				//description: 'Description Testing',
			});
		});
		
		$('#dvSocialFacbook').click(function(e){
			e.preventDefault();
			FB.ui({
				method: 'feed',
				name: 'Kreyos',
				link: 'http://kreyos.nesventures.net/',
				caption: "Don't make a promise. Make a goal!",
				//description: 'Description Testing',
			});
		});
		
		$('#btnfb').click(function(e){
			e.preventDefault();
			var title = $('#referral_fb_title').val();
			var ulink = $('#referral_fb_url').val();
			var description = $('#referral_fb_desc').val();
			referral_url =$('#referral_url').val();
			
			FB.ui({
				method: 'feed',
				name: title,
				link: ulink,
				picture: 'http://kreyos.nesventures.net/assets/curebit/deal_default.png',
				caption: 'http://kreyos.nesventures.net/',
				description: description,
			}, referralRequestCallback);
		});
	});

	
	$(function() {
		$("#btn-LogoutFb").click(function(){
			FB.getLoginStatus(function(response){
				if(response.authResponse){
					FB.logout();
				}
			});
		});
	});	
 };
// Load the SDK Asynchronously
(function(d){
   var js, id = 'facebook-jssdk', ref = d.getElementsByTagName('script')[0];
   if (d.getElementById(id)) {return;}
   js = d.createElement('script'); js.id = id; js.async = true;
   js.src = '//connect.facebook.net/en_US/all.js';
   ref.parentNode.insertBefore(js, ref);
 }(document));

	function sendRequestToRecipients(id) {
		fb_user_uid = id;
		
		FB.ui({method: 'apprequests',
	    message: 'Join Kreyos today and set your Goals!',
	    to: id
	   }, requestCallback);
	 }
	 
	 
	 function requestCallback(response) {
        if(response != null){
        	saved_friend_id(fb_user_uid);
        }
     }
     
     function referralRequestCallback(response) {
		if(response != null){
			console.log(response);
			
			$.ajax({
				type: "post",
				url: referral_url 
			});
		}
     }
     
     function saved_friend_id(uid){
     	$.ajax({
     		type: "get",
     		url: "friends/save/friend",
     		data: { uid: uid },
     		error: function(err){
     			console.log(err);
     		}
     	});
     }
