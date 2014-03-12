$("document").ready(function() {

	$(document).ready(function() {
		$('.bxslider').bxSlider({
			mode: 'fade',
			pagerCustom: '#bx-pager',
			infiniteLoop: true,
			easing: 'easeOutElastic',
		});
	});
	//SLIDE TEXT

	$(function() {
		$(".dotexts").slideTextLeft({
			words: [
				"I do website designing, photoshop works..",
				"But my life always drags me to th hell of php!",
				"Twig",
				"Scrollorama",
				"Smooth Scroll",
				"Fittext",
				"Slabtext",
				"Slide Text",
				"boilerplate",
				"Bootstrap",
				"Iconmoon",
				"Fontello",
				"Inkscape"
			], // multiple words to tranistion through in a loop
			delay: 3000 // the time to wait before the transistion
		});
	});
	// $("#fronttext").fitText(1, { minFontSize: '4px', maxFontSize: '15px' });
	// $("#midtext").fitText();
	// // // $("#bottext").fitText();
	// $(".cir-text").fitText(0.4);
	// $(".maincontent h2").fitText(2);
	// $(".maincontent p").fitText(5);

	// SLAB TEXT


	$("h1").slabText({
		// Don't slabtext the headers if the viewport is under 380px
		"viewportBreakpoint": 380
	});


	// SCROLLORAMA

	var scrollorama = $.scrollorama({
		blocks: '.frame'
	});
	var screewidth = $('div.top').width();
	var halfscreen = -screewidth / 2;
	// assign function to add behavior for onBlockChange event
	scrollorama.onBlockChange(function() {
		var i = scrollorama.blockIndex;
	});



	$('nav span#abo-link').click(function() {
		$.smoothScroll({
			autoCoefficent: 2,
			scrollTarget: '#abo',
			speed: 500
		});
	});

	$('nav span#int-link').click(function() {
		$.smoothScroll({
			scrollTarget: '#int',
			speed: 500
		});
	});

	$('nav span#wor-link').click(function() {
		$.smoothScroll({
			scrollTarget: '#wor',
			speed: 500
		});
	});

	$('nav span#con-link').click(function() {
		$.smoothScroll({
			scrollTarget: '#con',
			speed: 500
		});
	});

	$('nav span#cre-link').click(function() {
		$.smoothScroll({
			scrollTarget: '#cre',
			speed: 500
		});
	});

	$('nav span#en-link').click(function() {
		$.smoothScroll({
			scrollTarget: '#en',
			speed: 500
		});
	});



	$(function() {

		$(".dotext").typed({
			strings: [
				"Islam tidak monolitik. Fiqh misalnya, telah lazim diketahui, fiqh dipahami secara berbeda dikalangan mazhab Hanafi, Syafi'i, Maliki, Hanbali, Zahiri, Salafi, Auza'i, Ja'fari, Ismaili, Zaidi, Itsna Asy'ari, dan lainnya.",
				"Islam tidak monolitik. Konsep tauhid beragam. Akidah dipahami secara berbeda di kalangan mazhab Salafiyah, Jabariyah, Murji'ah, Mu'tazilah, Asy'ariyah, Maturidiyah atau lainnya.",
				"Berkaitan dengan interpretasi, tentu tidak satupun manusia bisa mengklaim pemahaman dan pandangannya mutlak benar. Karena interpretasi dari syari'at itu beragam maka semua pemahaman semestinya bisa dipegang.",
				"tidak ada yang perlu diresahkan sepanjang tidak menganjurkan kebencian yang menimbulkan efek destruktif secara sosial, atau melahirkan tafsir Islam yang keras dan penuh pemaksaan, intoleransi, atau mudah mengkafirkan atau menyesatkan golongan lain yang berbeda.",
				"Thanks to everyone!"
			],
			typeSpeed: 6,
			backDelay: 500,
			loop: true,
			// defaults to false for infinite loop
			loopCount: false,
			callback: function() {
				foo();
			}
		});

		function foo() {
			console.log("Callback");
		}

	});

	$("#flickrItems").diamonds({
		size: 100,
		gap: 5,
		hideIncompleteRow: false, // default: false
		autoRedraw: true, // default: true
		itemSelector: ".item"
	});


	$(".rotate").textrotator({
		animation: "flip",
		speed: 2000
	});


	$(".royalSlider").royalSlider({
		// options go here
		// as an example, enable keyboard arrows nav
		keyboardNavEnabled: true,
		autoScaleSliderHeight: 300,
		arrowsNav: false,
		transitionType: 'move',
		controlNavigation: 'tabs'

	});


	// var name = $('span.pagename span').text();
	// $('span#abo-link').hover(function() {
	// 	$('span.pagename span').text('about');
	// }, function() {
	// 	$('span.pagename span').text(name);
	// 	var name='';
	// });



	function findpagename(){
		var windowHeight=$(window).height();
		var docHeight=$(document).height();
		var name;
		if($(document).scrollTop()==0)
			name='home';
		else if($(document).scrollTop() > (windowHeight*4))
			name='end';
		else if($(document).scrollTop() > (windowHeight*3))
			name='credit';
		else if($(document).scrollTop() > (windowHeight*2))
			name='contact';
		else if($(document).scrollTop() > (windowHeight*1))
			name='works';
		else if($(document).scrollTop() >= windowHeight)
			name='about';
		return name;
	}

		$(document).scroll(function(){
			$('span.pagename span').text(findpagename());
			$('span#int-link').hover(function() {
				$('span.pagename span').text('home');
			}, function() {
				$('span.pagename span').text(findpagename);
				var name='';
			});
			$('span#abo-link').hover(function() {
				$('span.pagename span').text('about');
			}, function() {
				$('span.pagename span').text(findpagename);
				var name='';
			});
			$('span#wor-link').hover(function() {
				$('span.pagename span').text('works');
			}, function() {
				$('span.pagename span').text(findpagename);
				var name='';
			});
			$('span#con-link').hover(function() {
				$('span.pagename span').text('contact');
			}, function() {
				$('span.pagename span').text(findpagename);
				var name='';
			});
			$('span#cre-link').hover(function() {
				$('span.pagename span').text('credits');
			}, function() {
				$('span.pagename span').text(findpagename);
				var name='';
			});
			$('span#en-link').hover(function() {
				$('span.pagename span').text('end');
			}, function() {
				$('span.pagename span').text(findpagename);
				var name='';
			});
		});

});

$('#bx-pager a').click(function() {

	$('#bx-pager i').remove();
	$(this).css('text-decoration', 'none');
	$(this).prepend('<i class="ciricon icon-angle-right"></i>');
});