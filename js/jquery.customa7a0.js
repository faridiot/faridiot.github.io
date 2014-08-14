/*-----------------------------------------------------------------------------------

 	Custom JS - All front-end jQuery
 
-----------------------------------------------------------------------------------*/
 
jQuery(document).ready(function() {
	
	function portfolio_quicksand() {
		
		// Setting Up Our Variables
		var $filter;
		var $container;
		var $containerClone;
		var $filterLink;
		var $filteredItems
		
		// Set Our Filter
		$filter = jQuery('.filter li.active a').attr('class');
		
		// Set Our Filter Link
		$filterLink = jQuery('.filter li a');
		
		// Set Our Container
		$container = jQuery('ul.filterable-grid');
		
		// Clone Our Container
		$containerClone = $container.clone();
		
		// Apply our Quicksand to work on a click function
		// for each for the filter li link elements
		$filterLink.click(function(e) 
		{
			// Remove the active class
			jQuery('.filter li').removeClass('active');
			
			// Split each of the filter elements and override our filter
			$filter = jQuery(this).attr('class').split(' ');
			
			// Apply the 'active' class to the clicked link
			jQuery(this).parent().addClass('active');
			
			// If 'all' is selected, display all elements
			// else output all items referenced to the data-type
			if ($filter == 'all') {
				$filteredItems = $containerClone.find('li'); 
			}
			else {
				$filteredItems = $containerClone.find('li[data-type~=' + $filter + ']'); 
			}
			
			// Finally call the Quicksand function
			$container.quicksand($filteredItems, 
			{
				// The Duration for animation
				duration: 500,
				// the easing effect when animation
				easing: 'easeInOutQuad'
			});
			
			//Initalize our PrettyPhoto Script When Filtered
			$container.quicksand($filteredItems, 
				function () { lightbox(); }
			);			
		});
	}
		
	if(jQuery().quicksand) {
        var max = Math.max.apply( null, jQuery('.filterable-grid').children('.single-portfolio')
           .map(function(){
               return jQuery(this).height();
           }).get()
        );
        jQuery('.single-portfolio').css('height', max);
		portfolio_quicksand();
	}
		
	function lightbox() {
		// Apply PrettyPhoto to find the relation with our portfolio item
		jQuery("a[rel^='prettyPhoto']").prettyPhoto({
			// Parameters for PrettyPhoto styling
			animationSpeed:'fast',
			slideshow:5000,
			theme:'pp_default',
			show_title:false,
			overlay_gallery: false,
			social_tools: false
			
		});
	}
	
	if(jQuery().prettyPhoto) {
		lightbox();
	}

	
}); 
// END OF DOCUMENT