$(document).ready(function(){
	var timer = null;
	var scrollArea = $("html, body");
	var win = $(window);
	var body = $("body");
	var upHasContentClass = 'up-has-content';
	var downHasContentClass = 'down-has-content';
  
  var scrollMax = scrollArea.height() - win.height();
	var scrollTime = scrollMax / 1000 * 20000;
	
	var scrollMax = scrollArea.height() - win.height();
	var scrollTime = scrollMax / 1000 * 20000;
  
  var initSetting = function() {
    // AddHeight
    var boxHeight = $('.box.up').innerHeight();
    $('.box').height(boxHeight);
    $('.wrapper').height(boxHeight);
    
    scrollMax = scrollArea.height() - win.height();
	  scrollTime = scrollMax / 1000 * 20000;

    /*Start offset, put it at same as*/
    $('.down').css({'margin-top': scrollMax * (-1)})
    
    body.addClass(downHasContentClass);
    
    autoScroll();
  }
  
  win.on('load', initSetting);
  

  	
	// AutoScroll	
	function autoScroll() {
		var ws = win.scrollTop();
		var autoScrollTime = ws === 0 ? scrollTime : (scrollMax - ws) / scrollMax * scrollTime;
		
		// console.log('autoScrollTime', autoScrollTime)
		
		scrollArea.animate({ scrollTop: scrollMax }, scrollTime, 'linear');
	}
	
	// up & down control
	win.on('scroll', function(){
		$('.down').css('transform', 'translate3d(0,' + win.scrollTop()*2 + 'px, 0)'); 
		
		if(win.scrollTop() !== 0) body.addClass(upHasContentClass);
		else body.removeClass(upHasContentClass);
	});
	
	// wheel event
	win.on('wheel', function(){
		scrollArea.stop();
		if(timer !== null) clearTimeout(timer);
		timer = setTimeout(function(){
			autoScroll();
			timer = null;
		}, 500)
	});
	
	
});