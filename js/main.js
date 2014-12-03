// Hello.
//
// This is The Scripts used for Bloggler Theme
//
//

function main() {

(function () {
   'use strict';

	//Page Loader Script
	//<![CDATA[
	//-----------------------------------
     $(window).load(function() { // makes sure the whole site is loaded
        $('#status').fadeOut(); // will first fade out the loading animation
        $('#preloader').delay(350).fadeOut('slow'); // will fade out the white DIV that covers the website.
        $('body').delay(350).css({'overflow':'visible'});
    });
    //]]>

  //Main Pages - mCustomScrollbar Plugin Script
	//-----------------------------------
    jQuery(document).ready(function(){
        if(jQuery(window).width() >=768){
          $("#content").mCustomScrollbar({
            theme:"inset-2-dark",
            mouseWheelPixels: 185,
            scrollInertia: 550
          });
        }
      });
      jQuery(window).resize(function(){
        if(jQuery(this).width() >=768){
          $("#content").mCustomScrollbar({
            theme:"inset-2-dark",
            mouseWheelPixels: 185,
            scrollInertia: 550
          });
        }
        else{
          $("#content").mCustomScrollbar("destroy");
        }
      });

  //Single Blog Post - mCustomScrollbar Plugin Script
	//-----------------------------------
	$("#post").mCustomScrollbar({
          	setHeight: 580,
          	theme:"inset-2-dark",
          	mouseWheelPixels: 185,
          	scrollInertia: 550
        });


}());


}
main();