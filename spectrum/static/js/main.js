$(document).ready(function() {
  	initPage();
})

function initPage() {
	initSlider();	
	
	var _docHeight = (document.height !== undefined) ? document.height : document.body.offsetHeight;
	var _winHeight = $(window).height();
	
	if(_docHeight > _winHeight) {
		$('#loadingDiv').css('height',_docHeight+55);
	} else {
		$('#loadingDiv').css('height',_winHeight);
	}

	$('#loadingDiv').show();
	
	$('#li-refresh').click(function(e) {
		e.preventDefault();	
		$('#loadingDiv').show();
		location.reload();
		setTimeout("$('#loadingDiv').hide()", 400);
	});
	
	
	$('#loadingDiv')
		.ajaxStart(function() {	
			var _docHeight = (document.height !== undefined) ? document.height : document.body.offsetHeight;
			var _winHeight = $(window).height();
			
			if(_docHeight > _winHeight) {
				$('#loadingDiv').css('height',_docHeight+55);
			} else {
				$('#loadingDiv').css('height',_winHeight);
			}
			$(this).show();
		})
		.ajaxStop(function() {
			$(this).hide();
		})
	;
	/* 
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
    */
	$('#submit_btn').click(function(e) {
		
		e.preventDefault();
		
		$('#modalOverlay').hide();
		$('#search-box').hide();	
		
		// Call to fake data query
		$.get("search-results.html", function(data) {	
			$.fancybox(data,{	
				'centerOnScroll' : true,
				'showCloseButton': false,
				'scrolling' : false,
				'onComplete' : initSearchResults
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
	
	setTimeout("$('#loadingDiv').hide()", 600);
}



function initIndexpage() { 
	reloadArticles(0);
	
	$(window).resize(function(){
		resizeFullArticles();
	});
}

function resizeFullArticles() {
	
	var nRowWidth = $('#art_2_1').css('width');
	var nRowWidthNum = parseFloat(nRowWidth, 10);
	
	var nRowHeight = nRowWidthNum * .67;
	
	$('.news_article_scroll').css('height',nRowHeight+'px');	
	$('.news_article_scroll .article_tile').css('height',nRowHeight+'px');
	
	var firstRowWidth = $('#art_1_1').css('width');
	var firstRowWidthNum = parseFloat(firstRowWidth, 10);
	
	var firstRowHeight = firstRowWidthNum * .6;
	
	$('.news_article_scroll.row1').css('height',firstRowHeight+'px');
	$('.news_article_scroll.row1 .article_tile').css('height',firstRowHeight+'px');
	
	
	$('.news-link').click(function(e) {
		
		var articleID = $(this).attr('id').split("_")[1];
		e.preventDefault();
		
		// Call to fake data query
		$.get("article_preview/"+articleID, function(data) {	
			$.fancybox(data,{	
				'centerOnScroll' : true,				   
				'showCloseButton': false,
				'scrolling' : false,
				'onComplete' : initPreview
				});	
		});	
		
	});	
	
}

function initACTPage() {
	setInterval("startUserCommentSlider()", 8000);	
}

function startUserCommentSlider () {
	
	// Set LI width
	var liWidth = 295;
	
	var currentMargin = $('#act-carousel-slider').css('margin-left');
	var currentMarginNum = parseFloat(currentMargin, 10);

	var ulWidth = $('#act-carousel-slider li').length * liWidth;
	
	if($('#act-carousel-slider li').length > 3) {	
		$('#act-carousel-slider').width(ulWidth);
		
		
		$("#act-carousel-slider").animate({"marginLeft": "-=295px"}, 2000, function() {
				var firstLI = $('ul#act-carousel-slider li:first');
				$('ul#services li:first').remove();
				$('ul#act-carousel-slider').append(firstLI);
				
																					
				$("#act-carousel-slider").css('margin-left','0');
		  });
		
	}	
}

function initSearchResults() {	
	$('.result-pane').click(function(e) {	
		e.preventDefault();	
		alert("We'll need to set an ID on each pane to load the article on the right");
	});	
	
	$('#result-preview').click(function(e) {	
		e.preventDefault();	
		e.stopPropagation();	
		
		
		var _docHeight = (document.height !== undefined) ? document.height : document.body.offsetHeight;
		var _winHeight = $(window).height();
		
		if(_docHeight > _winHeight) {
			$('#modalCommentOverlay').css('height',_docHeight+55);
		} else {
			$('#modalCommentOverlay').css('height',_winHeight);
		}
		
		$('#modalCommentOverlay').show();
		$('#search-article-display').show();		
		
		$('#search-article-header .article-btn-close').click(function(e) {		
			e.preventDefault();									 
			e.stopPropagation();
			$('#modalCommentOverlay').hide();
			$('#search-article-display').hide();
		});	
		
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

function reloadArticles(pValue) {
	// left is -1 - -8
	// center is 0
	// right is +1 - +8	 
		 			
	$.get("article_query/"+pValue+"/", 
	{ },
	function(data) {   
		$('#contentbody').empty().prepend(data);	
		resizeFullArticles();		
	});	
	
}


function initSlider() {	
	$( "#slider" ).slider({
		value:0,
		min: -8,
		max: 8,
		step: 1,
		slide: function( event, ui ) {
			$( "#amount" ).val( "$" + ui.value );
		},							
		stop: function(event, ui) { 
			reloadArticles(ui.value);
		},
		slide: function(event, ui) {
			switch (ui.value) {
				case -8:
					$('.ui-slider .ui-slider-handle').css('background-image', 'url("/static/images/1.png")');
					$('.ui-slider .ui-slider-handle').css('top', '26px');
					$('.ui-slider .ui-slider-handle').css('left', '18px');
				  break;
				case -7:
					$('.ui-slider .ui-slider-handle').css('background-image', 'url("/static/images/2.png")');
					$('.ui-slider .ui-slider-handle').css('top', '20px');
					$('.ui-slider .ui-slider-handle').css('left', '0');
				  break;
				case -6:
					$('.ui-slider .ui-slider-handle').css('background-image', 'url("/static/images/3.png")');
					$('.ui-slider .ui-slider-handle').css('top', '15px');
					$('.ui-slider .ui-slider-handle').css('left', '0');
				  break;
				case -5:
					$('.ui-slider .ui-slider-handle').css('background-image', 'url("/static/images/4.png")');
					$('.ui-slider .ui-slider-handle').css('top', '10px');
					$('.ui-slider .ui-slider-handle').css('left', '0');
				  break;
				case -4:
					$('.ui-slider .ui-slider-handle').css('background-image', 'url("/static/images/5.png")');
					$('.ui-slider .ui-slider-handle').css('top', '5px');
					$('.ui-slider .ui-slider-handle').css('left', '0');
				  break;
				case -3:
					$('.ui-slider .ui-slider-handle').css('background-image', 'url("/static/images/6.png")');
					$('.ui-slider .ui-slider-handle').css('top', '3px');
					$('.ui-slider .ui-slider-handle').css('left', '0');
				  break;
				case -2:
					$('.ui-slider .ui-slider-handle').css('background-image', 'url("/static/images/7.png")');
					$('.ui-slider .ui-slider-handle').css('top', '2px');
					$('.ui-slider .ui-slider-handle').css('left', '0');
				  break;
				case -1:
					$('.ui-slider .ui-slider-handle').css('background-image', 'url("/static/images/8.png")');
					$('.ui-slider .ui-slider-handle').css('top', '1px');
					$('.ui-slider .ui-slider-handle').css('left', '0');
				  break;
				case 0:
					// center
					$('.ui-slider .ui-slider-handle').css('background-image', 'url("/static/images/9.png")');
					$('.ui-slider .ui-slider-handle').css('top', '0');
					$('.ui-slider .ui-slider-handle').css('left', '0');
				  break;
				case 1:
					$('.ui-slider .ui-slider-handle').css('background-image', 'url("/static/images/10.png")');
					$('.ui-slider .ui-slider-handle').css('top', '1px');
					$('.ui-slider .ui-slider-handle').css('left', '0');
				  break;
				case 2:
					$('.ui-slider .ui-slider-handle').css('background-image', 'url("/static/images/11.png")');
					$('.ui-slider .ui-slider-handle').css('top', '2px');
					$('.ui-slider .ui-slider-handle').css('left', '0');
				  break;
				case 3:
					$('.ui-slider .ui-slider-handle').css('background-image', 'url("/static/images/12.png")');
					$('.ui-slider .ui-slider-handle').css('top', '3px');
					$('.ui-slider .ui-slider-handle').css('left', '0');
				  break;
				case 4:
					$('.ui-slider .ui-slider-handle').css('background-image', 'url("/static/images/13.png")');
					$('.ui-slider .ui-slider-handle').css('top', '5px');
					$('.ui-slider .ui-slider-handle').css('left', '0');
				  break;
				case 5:
					$('.ui-slider .ui-slider-handle').css('background-image', 'url("/static/images/14.png")');
					$('.ui-slider .ui-slider-handle').css('top', '10px');
					$('.ui-slider .ui-slider-handle').css('left', '0');
				  break;
				case 6:
					$('.ui-slider .ui-slider-handle').css('background-image', 'url("/static/images/15.png")');
					$('.ui-slider .ui-slider-handle').css('top', '15px');
					$('.ui-slider .ui-slider-handle').css('left', '0');
				  break;
				case 7:
					$('.ui-slider .ui-slider-handle').css('background-image', 'url("/static/images/16.png")');
					$('.ui-slider .ui-slider-handle').css('top', '20px');
					$('.ui-slider .ui-slider-handle').css('left', '0');
				  break;
				case 8:
					$('.ui-slider .ui-slider-handle').css('background-image', 'url("/static/images/17.png")');
					$('.ui-slider .ui-slider-handle').css('top', '26px');
					$('.ui-slider .ui-slider-handle').css('left', '-18px');
				  break;
				default:
				
			}
		}
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

