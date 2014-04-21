/** ***************************************
	
    @Author			Avanzare
	@Website		www.avanzare.co
	@Last Update	06:32 PM Sunday, April 08, 2014

	TABLE OF CONTENTS
	---------------------------
	 1. Preloader
     2. Backstrech
	 3. Cycle
	 4. Overlay
	 5. Ajax Subscribe
	 6. Ajax Contact
	 7. Google Analytics
		
 ** ***************************************/
 

/**	1. PRELOADER
 *****************************************************/
$(window).load(function() {
	
	  setTimeout(function() {
		$('.spinner').fadeOut("slow");
			
		  setTimeout(function() {
		  $('#prelaoder').fadeOut("slow");
		  
			  setTimeout(function() {
				  $('.content-block').addClass('animated fadeInDown').fadeIn("slow");
			       $('#footer').fadeIn('slow');
				   
			  }, 900);
		  }, 1000);	  
	  }, 1000);	
  
});

/**	2. BACKSTRETCH 
 *****************************************************/
$(document).ready( function(){
	
	$.backstretch('assets/img/1.jpg');

});

/**	3. CYCLE
 *****************************************************/
$(document).ready( function(){
	
	$('#slider').cycle({
		fx : 'fade',
		timeout: 5500,
		speed: 500,
		slides: '.slide'
	});
	
});

/**	4. OVERLAY
 *****************************************************/
$(document).ready( function(){

	var openBtn = ( '#open-overlay' ),
	    closeBtn = ( '#close-overlay' ),
		
		openBtnContact = ( '#open-contact' ),
	    closeBtnContact = ( '#close-contact' ),
		
		mainContent = ( '.content-block' ),
		mainContentFade = ( '#footer,#home' ),
		patternID = ( '#bg-pattern' ),
		
	    overlayID = ( '#overlay' ),
		overlayAboutID = ( '#overlay-about,#open-contact' ),
		overlayContactID = ( '#overlay-contact' ),
		
		ContentLeaveAnimation = ( 'animated fadeOutDown' ),
		ContentEnterAnimation = ( 'animated fadeInDown' ),
		
		OverlayContentOpenAnimation = ( 'animated fadeInUpBig' ),
		OverlayContentCloseAnimation = ( 'animated fadeOutDownBig' );
		
		ContactBtnOpenAnimation = ( 'animated fadeOutDownBig' ),
		ContactBtnCloseAnimation = ( 'animated fadeInDown' );
		
		
		
		$(openBtnContact).tooltip({ title: 'Contact'})
		$(closeBtnContact).tooltip({ title: 'Close'})
			  
		$(openBtn).click(function() {
		  
		  $(mainContent).removeClass(ContentEnterAnimation).addClass(ContentLeaveAnimation).fadeOut('slow');
		  $(mainContentFade).fadeOut('slow');
		  $(patternID).fadeOut('slow');
			   
			  setTimeout(function() {
				$(overlayID).fadeIn('slow');
				
				  setTimeout(function() {
					$(overlayAboutID).removeClass(OverlayContentCloseAnimation).addClass(OverlayContentOpenAnimation).fadeIn('slow'); 
					  
				  }, 500);
			  }, 650);
	    });
		
		
		$(closeBtn).click(function() {
			
		  $(overlayAboutID).removeClass(OverlayContentOpenAnimation).addClass(OverlayContentCloseAnimation).fadeOut('slow'); ;
		  
			  setTimeout(function() {
				$(overlayID).fadeOut('slow');
				
				  setTimeout(function() {
					$(mainContent).removeClass(ContentLeaveAnimation).addClass(ContentEnterAnimation).fadeIn('slow');
					$(mainContentFade).fadeIn('slow');
					$(patternID).fadeIn('slow');
					
				  }, 900);
			  }, 700);

	    });
		
		
		$(openBtnContact).click(function() {
			$(openBtnContact).tooltip('hide')
			$(openBtnContact).removeClass(ContactBtnCloseAnimation).addClass(ContactBtnOpenAnimation);
			$(overlayContactID).removeClass(OverlayContentCloseAnimation).addClass(OverlayContentOpenAnimation).fadeIn('slow')
			;
			 setTimeout(function() {
					$(closeBtnContact).removeClass(OverlayContentCloseAnimation).addClass(OverlayContentOpenAnimation).fadeIn('slow')
					   
			  }, 800);
	    });
		
		
		$(closeBtnContact).click(function() {
			$(closeBtnContact).tooltip('hide')
			$(closeBtnContact).removeClass(OverlayContentOpenAnimation).addClass(OverlayContentCloseAnimation).fadeOut('slow');
			
			setTimeout(function() {
				   $(overlayContactID).removeClass(OverlayContentOpenAnimation).addClass(OverlayContentCloseAnimation).fadeOut('slow');  
                   $(openBtnContact).removeClass(ContactBtnOpenAnimation).addClass(ContactBtnCloseAnimation);
				   
			  }, 200);
	    });

});

/**	5. AJAX SUBSCRIBE
 *****************************************************/
$(document).ready( function(){
	
	$('.subscribe-form').submit(function() {
		  var postdata = $('.subscribe-form').serialize();
		  $.ajax({
			  type: 'POST',
			  url: 'assets/subscribe.php',
			  data: postdata,
			  dataType: 'json',
			  success: function(json) {
				  if(json.valid == 0) {
					  $('.status-message').html(json.error);
					  $('.status-message').fadeIn('slow');
				  }
				  else {
					  $("input, textarea").val('');
					  $('.subscribe-form button').prop('disabled',true);
					  $('.status-message').html(json.message);
					   $('.status-message').fadeIn('slow');
				  }
			  }
			});
			return false;
		});
		
});

/**	6. AJAX CONTACT
 *****************************************************/
$(document).ready( function(){
	
	$('.contact-form form').submit(function() {
	
			$('.contact-form form .nameLabel').html('Name');
			$('.contact-form form .emailLabel').html('Email');
			$('.contact-form form .messageLabel').html('Message');
	
			var postdata = $('.contact-form form').serialize();
			$.ajax({
				type: 'POST',
				url: 'assets/sendmail.php',
				data: postdata,
				dataType: 'json',
				success: function(json) {
					if(json.nameMessage != '') {
						$('.contact-form form .nameLabel').append(' - <span class="violet" style="font-size: 13px; font-style: italic"> ' + json.nameMessage + '</span>');
					}
					if(json.emailMessage != '') {
						$('.contact-form form .emailLabel').append(' - <span class="violet" style="font-size: 13px; font-style: italic"> ' + json.emailMessage + '</span>');
					}
					if(json.messageMessage != '') {
						$('.contact-form form .messageLabel').append(' - <span class="violet" style="font-size: 13px; font-style: italic"> ' + json.messageMessage + '</span>');
					}
					if(json.nameMessage == '' && json.emailMessage == '' && json.messageMessage == '') {
							$('.contact-form .status-message-contact').addClass('animated fadeIn').html('EMAIL SENT SUCCESSFULLY.');
							$('input[type="text"],textarea').val('');
					}
				}
			});
			return false;
		});	
			
});

/**	7. GOOGLE ANALYTICS
 *****************************************************/
$(document).ready( function(){
	
	var google_analytics_id = '';  // Enter your ID here. like this: UA-2121212-22
		  
		  if(google_analytics_id != '') {
			  var _gaq = _gaq || [];
			  _gaq.push(['_setAccount', google_analytics_id]);
			  _gaq.push(['_trackPageview']);
			  
			  (function() {
			  var ga = document.createElement('script'); ga.type = 'text/javascript'; ga.async = true;
			  ga.src = ('https:' == document.location.protocol ? 'https://ssl' : 'http://www') + '.google-analytics.com/ga.js';
			  var s = document.getElementsByTagName('script')[0]; s.parentNode.insertBefore(ga, s);
			  })();
		  }	
		  
});