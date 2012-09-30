$(document).ready(function() {
  	initPage();
})

function initPage() {	
	initSlider();
		  
	 $('#li-login').click(function(e) {
		e.preventDefault();	
		$('#modalCommentOverlay').show();
		$('#facebook-login p').html('');
		$('#facebook-login').show();
		
		var _docHeight = (document.height !== undefined) ? document.height : document.body.offsetHeight;
		var _winHeight = $(window).height();
		
		if(_docHeight > _winHeight) {
			$('#modalCommentOverlay').css('height',_docHeight+55);
		} else {
			$('#modalCommentOverlay').css('height',_winHeight);
		}
		
		
		
		$('#modalCommentOverlay').click(function(e) {
			$('#modalCommentOverlay').hide();
			$('#facebook-login').hide();	
			$('#facebook-login p').html('To continue commenting, please login or register through Facebook or email');	  
		});	
	});	
	
	$('#li-search').click(function(e) {
		e.preventDefault();	
		$('#modalOverlay').show();
		$('#search-box').show();
		
		
		var _docHeight = (document.height !== undefined) ? document.height : document.body.offsetHeight;
		var _winHeight = $(window).height();
		
		if(_docHeight > _winHeight) {
			$('#modalOverlay').css('height',_docHeight+55);
		} else {
			$('#modalOverlay').css('height',_winHeight);
		}
		
		
		$('#modalOverlay').click(function(e) {
			$('#modalOverlay').hide();
			$('#search-box').hide();		  
		});	
	});	
		
	$('#submit_btn').click(function(e) {
		
		e.preventDefault();
		
		$('#modalOverlay').hide();
		$('#search-box').hide();	
		
		// Call to fake data query
		$.get("search-results.html", function(data) {	
			$.fancybox(data,{					   
				'showCloseButton': false,
				'scrolling' : false,
				'onComplete' : initSearchResults
				});	
		});	
		
	});	
	
	$('.news-link').click(function(e) {
		
		var articleID = $(this).attr('id');
		e.preventDefault();
		
		// Call to fake data query
		$.get("article-preview.html", function(data) {	
			$.fancybox(data,{					   
				'showCloseButton': false,
				'scrolling' : false,
				'onComplete' : initPreview
				});	
		});	
		
	});	
	
	$('#frm_act #submit-act').click(function(e) {
		e.preventDefault();	
		$('#modalCommentOverlay').show();
		$('#act-sent').show();		
		
		$('#act-twitter').click(function(e) {	
			e.preventDefault();	
			alert('add twitter call');
		});	
		
		$('#act-facebook').click(function(e) {	
			e.preventDefault();	
			alert('add twitter call');
		});	
		
		var _docHeight = (document.height !== undefined) ? document.height : document.body.offsetHeight;
		var _winHeight = $(window).height();
		
		if(_docHeight > _winHeight) {
			$('#modalCommentOverlay').css('height',_docHeight+55);
		} else {
			$('#modalCommentOverlay').css('height',_winHeight);
		}	
		
		$('.act-close .btn-close').click(function(e) {	
			$('#modalCommentOverlay').hide();
			$('#act-sent').hide();
		});	
			
		$('#modalCommentOverlay').click(function(e) {
			$('#modalCommentOverlay').hide();
			$('#act-sent').hide();	
		});	
	});	
	
	// form watermarks
	$('#frm_signin .email').watermark('email address');
	$('#frm_signin .password').watermark('password');
	$('#frm_signup .firstname').watermark('first name');
	$('#frm_signup .lastname').watermark('last name');
	$('#frm_signup .email').watermark('email address');
						
	$('#frm_support .fname').watermark('first name - required');
	$('#frm_support .lname').watermark('last name - required');
	$('#frm_support .email').watermark('email address - required');
	$('#frm_support .message').watermark('enter your message here - required');
	$('#frm_business .fname').watermark('first name - required');
	$('#frm_business .lname').watermark('last name - required');
	$('#frm_business .email').watermark('email address - required');
	$('#frm_business .message').watermark('enter your message here - required');
	
						
	$('#frm_act .fname').watermark('first name - required');
	$('#frm_act .lname').watermark('last name - required');
	$('#frm_act .email').watermark('email address - required');
	$('#frm_act .zipcode').watermark('zip code - required');
	$('#frm_act .subject').watermark('subject - required');
	$('#frm_act .message').watermark('enter your message here - required');
	

}


function initSlider() {	
	$( "#slider" ).slider({
		value:8,
		min: 0,
		max: 16,
		step: 1,
		slide: function( event, ui ) {
			$( "#amount" ).val( "$" + ui.value );
		},							
		stop: function(event, ui) { 
			alert(ui.value);
		},
		slide: function(event, ui) {
			switch (ui.value) {
				case 0:
					$('.ui-slider .ui-slider-handle').css('background-image', 'url("images/1.png")');
					$('.ui-slider .ui-slider-handle').css('top', '26px');
					$('.ui-slider .ui-slider-handle').css('left', '18px');
				  break;
				case 1:
					$('.ui-slider .ui-slider-handle').css('background-image', 'url("images/2.png")');
					$('.ui-slider .ui-slider-handle').css('top', '20px');
					$('.ui-slider .ui-slider-handle').css('left', '0');
				  break;
				case 2:
					$('.ui-slider .ui-slider-handle').css('background-image', 'url("images/3.png")');
					$('.ui-slider .ui-slider-handle').css('top', '15px');
					$('.ui-slider .ui-slider-handle').css('left', '0');
				  break;
				case 3:
					$('.ui-slider .ui-slider-handle').css('background-image', 'url("images/4.png")');
					$('.ui-slider .ui-slider-handle').css('top', '10px');
					$('.ui-slider .ui-slider-handle').css('left', '0');
				  break;
				case 4:
					$('.ui-slider .ui-slider-handle').css('background-image', 'url("images/5.png")');
					$('.ui-slider .ui-slider-handle').css('top', '5px');
					$('.ui-slider .ui-slider-handle').css('left', '0');
				  break;
				case 5:
					$('.ui-slider .ui-slider-handle').css('background-image', 'url("images/6.png")');
					$('.ui-slider .ui-slider-handle').css('top', '3px');
					$('.ui-slider .ui-slider-handle').css('left', '0');
				  break;
				case 6:
					$('.ui-slider .ui-slider-handle').css('background-image', 'url("images/7.png")');
					$('.ui-slider .ui-slider-handle').css('top', '2px');
					$('.ui-slider .ui-slider-handle').css('left', '0');
				  break;
				case 7:
					$('.ui-slider .ui-slider-handle').css('background-image', 'url("images/8.png")');
					$('.ui-slider .ui-slider-handle').css('top', '1px');
					$('.ui-slider .ui-slider-handle').css('left', '0');
				  break;
				case 8:
					// center
					$('.ui-slider .ui-slider-handle').css('background-image', 'url("images/9.png")');
					$('.ui-slider .ui-slider-handle').css('top', '0');
					$('.ui-slider .ui-slider-handle').css('left', '0');
				  break;
				case 9:
					$('.ui-slider .ui-slider-handle').css('background-image', 'url("images/10.png")');
					$('.ui-slider .ui-slider-handle').css('top', '1px');
					$('.ui-slider .ui-slider-handle').css('left', '0');
				  break;
				case 10:
					$('.ui-slider .ui-slider-handle').css('background-image', 'url("images/11.png")');
					$('.ui-slider .ui-slider-handle').css('top', '2px');
					$('.ui-slider .ui-slider-handle').css('left', '0');
				  break;
				case 11:
					$('.ui-slider .ui-slider-handle').css('background-image', 'url("images/12.png")');
					$('.ui-slider .ui-slider-handle').css('top', '3px');
					$('.ui-slider .ui-slider-handle').css('left', '0');
				  break;
				case 12:
					$('.ui-slider .ui-slider-handle').css('background-image', 'url("images/13.png")');
					$('.ui-slider .ui-slider-handle').css('top', '5px');
					$('.ui-slider .ui-slider-handle').css('left', '0');
				  break;
				case 13:
					$('.ui-slider .ui-slider-handle').css('background-image', 'url("images/14.png")');
					$('.ui-slider .ui-slider-handle').css('top', '10px');
					$('.ui-slider .ui-slider-handle').css('left', '0');
				  break;
				case 14:
					$('.ui-slider .ui-slider-handle').css('background-image', 'url("images/15.png")');
					$('.ui-slider .ui-slider-handle').css('top', '15px');
					$('.ui-slider .ui-slider-handle').css('left', '0');
				  break;
				case 15:
					$('.ui-slider .ui-slider-handle').css('background-image', 'url("images/16.png")');
					$('.ui-slider .ui-slider-handle').css('top', '20px');
					$('.ui-slider .ui-slider-handle').css('left', '0');
				  break;
				case 16:
					$('.ui-slider .ui-slider-handle').css('background-image', 'url("images/17.png")');
					$('.ui-slider .ui-slider-handle').css('top', '26px');
					$('.ui-slider .ui-slider-handle').css('left', '-18px');
				  break;
				default:
				
			}
		}
	});
}

function initSearchResults() {	
	$('.result-pane').click(function(e) {	
		e.preventDefault();	
		alert("We'll need to set an ID on each pane to load the article on the right");
	});	
	
	$('#result-preview').click(function(e) {	
		e.preventDefault();	
		 window.open('article-display.html','_newtab');
	});
	
}


function initPreview() {	
	
	$('.facebook-close .btn-close').click(function(e) {	
		e.preventDefault();	
		$('#modalCommentOverlay').hide();
		$('#facebook-login').hide();		 
	});		
	
	$('.preview-close .btn-close').click(function(e) {	
		e.preventDefault();	
		$.fancybox.close();
	});	
	
	$('#like').click(function(e) {
		e.preventDefault();	
		e.stopPropagation();
		alert('Set like');
	});	
	
	$('#retweet').click(function(e) {
		e.preventDefault();	
		e.stopPropagation();
		alert('Set retweet');
	});	
	
	$('#favorite').click(function(e) {
		e.preventDefault();	
		e.stopPropagation();
		alert('Set favorite');
	});	
	
	$('#decreaseFont').click(function(e) {
		e.preventDefault();	
		e.stopPropagation();
		decreaseFont('#synopsis');		
	});	
	
	$('#increaseFont').click(function(e) {
		e.preventDefault();	
		e.stopPropagation();
		increaseFont('#synopsis');		
	});	
	
	// Set custom scrollbar
	//$('#scrollbar1 ').tinyscrollbar();
	
	$('#comments-header').click(function(e) {
		e.preventDefault();	
		$('#synopsis-comments').animate({
			height: '451'
		});
		$('#close-comment').show();
		
		$('#close-comment').click(function(e) {
			e.preventDefault();	
			e.stopPropagation();
			$('#close-comment').hide();
			$('#synopsis-comments').animate({
				height: '46'
			});
		});	
	});		
	
	
	$('#comment_btn').click(function(e) {
		e.preventDefault();	
		$('#modalCommentOverlay').show();
		$('#facebook-login').show();
		
		var _docHeight = (document.height !== undefined) ? document.height : document.body.offsetHeight;
		$('#modalCommentOverlay').css('height',_docHeight+55);
		
		
		$('#modalCommentOverlay').click(function(e) {
			$('#modalCommentOverlay').hide();
			$('#facebook-login').hide();		  
		});	
	});	
	
		
	 $('#carousel-slider').simplyScroll({
		'frameRate' : 12							
	});
	
}

function increaseFont(divID) {
	var currentFontSize = $(divID).css('font-size');
	var currentFontSizeNum = parseFloat(currentFontSize, 10);
	var newFontSize = currentFontSizeNum + 2;
	if(newFontSize <= 36) {
		$(divID).css('font-size',newFontSize+'px');
	}
}

function decreaseFont(divID) {
	var currentFontSize = $(divID).css('font-size');
	 var currentFontSizeNum = parseFloat(currentFontSize, 10);
	var newFontSize = currentFontSizeNum - 2;
	if(newFontSize > 9) {
		$(divID).css('font-size',newFontSize+'px');
	}
}