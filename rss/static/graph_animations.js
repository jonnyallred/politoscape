/****************************************************************************
 * graph)_animations.js
 *
 * Engineering Sciences 21
 * Project
 *
 * Political graph animations
 ***************************************************************************/
 
jQuery(document).ready(function(){
	$('.accordion .head').click(function() {
		$(this).next().toggle('slow');
		return false;
	}).next().hide();
});