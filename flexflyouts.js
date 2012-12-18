/*========================================================*
(c) 2012 Tim Giegel (tmgiegel@gmail.com)
autoPosFlyouts(str:nav container, str:top nav element, str:flyout container)
containerParam = #subnav
navBtnParam = li.subnav-lvl1
flyoutParam = ul
========================================================*/
function autoPosFlyouts(containerParam,navBtnParam,flyoutParam) {
	var navBtnWidth = 0, /*holds all the subnav widths that are found*/
		flyoutPos = 10, /*add any inital padding*/
		navWidth = 1000, //$(containerParam).outerWidth(); /*nav container width*/
		activeClass = 'subnav-active',
		flyoutClass = 'flyoutAvailable';
	/*loop through each nav item*/
	$(navBtnParam).each(function(index) {

		/*get the width of the nav button*/
		navBtnWidth = $(this).outerWidth();
			
		/*if the nav item has a flyout, add and activate it*/
		var hasFlyout = $(this).find(flyoutParam);
		if ( hasFlyout.length != 0) {
			
			/*apply flyout class for additional styling on the nav button - add down arrow*/
			$(this).find('a').first().addClass(flyoutClass);
			
			/*get the width of the nav button again since it has a new class - down arrow adds width*/
			navBtnWidth = $(this).outerWidth();
			
			/*set classes for end columns*/
			$(this).children('ul').first().addClass('leftBorder');
			$(this).children('ul').last().addClass('rightBorder');
			
			/*loop through all columns*/
			var colLeft =  0,
				colHeight = 0,
				flyoutSize = 0,
				flyoutCorrection = 0,
				colWidth = Array();
			$(this).children('ul').each(function(index) {		
				var colWidthInner = 0;		
				/*set inner width*/
				$(this).find('a').each(function(i) { if (colWidthInner < $(this).width() ) {colWidthInner = $(this).width();} }); /*find max a width and save as the column width*/
				colWidthInner += 20; /*save the inner width of the column + 10 to prevent text wrap*/
				$(this).css('width',colWidthInner); 
				
				/*save the outter colum width (width + padding + margin)*/
				colWidth[index] = $(this).outerWidth();
				
				/*save flyout size*/
				flyoutSize +=  colWidth[index];
				
				/*save hight*/
				if (colHeight < $(this).height() ) {colHeight = $(this).height();} /*find the max height*/
			});
			
			/*set column abs position correction*/
			flyoutSize += flyoutPos;
			if (flyoutSize > navWidth) {
				flyoutCorrection = flyoutSize - navWidth;
			}
			
			/*loop through each column again*/
			var colSize = 0;
			$(this).children('ul').each(function(index) {
				/*set height*/
				$(this).css('height',colHeight); 
				/*set position*/
				colLeft = colSize + flyoutPos - flyoutCorrection;
				$(this).css('left',colLeft);
				colSize += colWidth[index];
				/*hide display*/
				$(this).css('display','none');
			});

		} /*end flyout if*/
		
		/*add flyoutPos to total position*/
		flyoutPos += navBtnWidth;
		
	}); /*end loop*/
	
	/*activate the flyouts*/
	$(function() {
		$(navBtnParam).hover(
			function(over) {
				$(this).addClass(activeClass);
				$(this).children(flyoutParam).stop(true,true).slideDown('fast');
			},
			function(out) {
				$(this).children(flyoutParam).stop(true,true).hide();
				$(this).removeClass(activeClass);
			}
		);
	});
}
