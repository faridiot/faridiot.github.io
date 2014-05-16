//James Padolsey's Cross-Browser DOCHEIGHT and DOCWIDTH
function getDocHeight() {
    var D = document;
    return Math.max(
        Math.max(D.body.scrollHeight, D.documentElement.scrollHeight),
        Math.max(D.body.offsetHeight, D.documentElement.offsetHeight),
        Math.max(D.body.clientHeight, D.documentElement.clientHeight)
    );
}
function getDocWidth() {
    var D = document;
    return Math.max(
        Math.max(D.body.scrollWidth, D.documentElement.scrollWidth),
        Math.max(D.body.offsetWidth, D.documentElement.offsetWidth),
        Math.max(D.body.clientWidth, D.documentElement.clientWidth)
    );
}

//BG CLASSES
var bgClasses = ['bgpurple','bgred','bgblue','bggreen','bgired','bgblue2','bgblue3','bgwhite','bgyellow','bgblack'];

//DATA URI Object
var imgDatas = {};

//DATA URI OBJECT VALUES MAPPER
var dataMap = {
	'cloud1':'cloud_down_back',
	'cloud2':'cloud_down_middle',
	'cloud3':'cloud_down_front',
	'cloud4':'cloud_up_back',
	'cloud5':'cloud_up_middle',
	'cloud6':'cloud_up_front'
};

//LENGTH OF ARRAYOFIMAGES
var lenArray;

//PRELOAD IMAGES
function preload(arrayOfImages) {
	lenArray = arrayOfImages.length;
	var di = document.createElement('div');
    $(arrayOfImages).each(function(index){
        $('<img />')
        .attr('src', arrayOfImages[index])
        .load(function(){
            $(di).append($(this));
            // Your other custom code
            var ima = new canImg(arrayOfImages[index]);
        });
    });
    
}


//CANVAS IMG CLASS
function canImg(_path){
	this.dataURL;
	this.dataRAW;
	this.imgURL = _path;
	this.imgName = this.imgURL.slice(4,-4);
	this.imageObj = document.createElement('img');
	this.imageObj.src=_path;
	var that = this;
	this.genDataURL = function(_path){
		var that2 = that;
		$(this.imageObj).load(function(){
			var img = that2.imageObj,
				canvas = document.createElement('canvas'),
				canvasContext = canvas.getContext('2d'),
				imgW = img.width,
				imgH = img.height;
			canvas.width = imgW;
			canvas.height = imgH;
			canvasContext.drawImage(img, 0, 0);
			var imgPixels = canvasContext.getImageData(0, 0, imgW, imgH);
			canvasContext.putImageData(imgPixels, 0, 0, 0, 0, imgPixels.width, imgPixels.height);
			that2.dataRAW = canvas.toDataURL();
			that2.dataURL = "url('"+that2.dataRAW+"')";
            imgDatas[that2.imgName] = that2.dataURL;
            if(countKeys(imgDatas)==lenArray-1){
            	window.setTimeout(function(){
            		$(ninja).trigger("whenLoaded");
            	},1000);
            	
            }
		});
	}
	this.genDataURL();
}

//
function countKeys(_obj){
	var i =0;
	for(key in _obj){
		i=i+1;
	}
	return i;
}





var ninja = document.createElement('div');

$(ninja).on("whenLoaded",function(){
	console.log('Adding');
	$('.cloud1').css('background-image',imgDatas['cloud_down_back']);
	$('.cloud2').css('background-image',imgDatas['cloud_down_middle']);
	$('.cloud3').css('background-image',imgDatas['cloud_down_front']);
	$('.cloud4').css('background-image',imgDatas['cloud_up_back']);
	$('.cloud5').css('background-image',imgDatas['cloud_up_middle']);
	$('.cloud6').css('background-image',imgDatas['cloud_up_front']);
	$('.backlay').css('background-image',imgDatas['snow']+','+imgDatas['snow2']+','+imgDatas['snow3']);
	$('.wall').trigger('away');
});



$('.wall').on("away",function(){
	window.setTimeout(
		function(){
			$('.wall').fadeOut();
		},300);
});

function animateClouds(a,b,c){
	var sample = "-webkit-transition: __check__ __speed__ linear infinite;-moz-transition: __check__ __speed__ linear infinite;-o-transition: __check__ __speed__ linear infinite;-ms-transition: __check__ __speed__ linear infinite;transition: __check__ __speed__ linear infinite";
	
}


function fixLayout(){
	var wh = window.innerHeight;
	var theight =(parseInt(wh*0.8) + 'px');
	//$('.members,.portfolio,.serives').css('height',theight);
	$('.members,.services,.portfolio').css('height',theight);
	console.log('Fixed Heights',theight);
}




$(document).ready(function(){

	$(window).resize(function(){
		fixLayout();
	});
	$(window).load(function(){
		fixLayout();
	});


	//PRELOAD STUFF
	preload([
		'img/cloud_up_middle.png',
		'img/cloud_up_back.png',
		'img/cloud_up_front.png',
		'img/cloud_down_middle.png',
		'img/cloud_down_back.png',
		'img/cloud_down_front.png',
		'img/snow.png',
		'img/snow2.png',
		'img/snow3.png'
	]);
	

	//CLEAR BACKGROUNDS
	$('.backlay').css('background-image','none');
	$('.cloud1,.cloud2,.cloud3,.cloud4,.cloud5,.cloud6').css('background-image','none');


	//CAROUSEL
	$('.carousel').carousel();

	//Fix Layout

	
	
	//GBIOFIN LOGO BOUNCE
	$('.hBig').addClass('bounce_in_down').addClass('bounce_in_down_active');

	//Tooltips
	$("a[rel='tooltip']").tooltip({
		placement: 'top',
		trigger: 'hover',
		animation: 'true'
	});
	$("li[rel='tooltip']").tooltip({
		placement: 'top',
		trigger: 'hover',
		animation: 'true'
	});


	
	//var dh = getDocHeight()*0.9 + 'px';
	//$('.contentBox').css('height',dh);

	//BACKGROUND CLICKS FUNCTION
	$('.bgoptions li').on("click",function(){
		var cl = $(this)[0].className,
			ac = $(".bgbox section[acKey='active']")[0],
			acl = ac.className,
			bgb = $('.bgbox')[0];
			ot = $(".bgbox section[acKey='disabled']")[0];
		$(ac).attr('acKey','disabled').removeClass(acl);
		$(ot).attr('acKey','active').addClass(cl);
		$(bgb).addClass(acl);
		$(ac).css('opacity','0');
		$(ot).css('opacity','1');
	});


	$('.choiceBox section h1').live("click",function(){
		$(this).removeClass('broken_down_active').addClass('broken_down_active');
		$('.landing').slideUp();
		var target=$(this).attr('data-box');
		$('.scroller').hide();
		$('.contentBox').fadeIn();
		var targetD = document.getElementsByClassName(target)[0];
		$(targetD).slideDown();
		fixLayout();

	
	});

	$('.snowToggle').live("click",function(){
		$('.backlay').toggle();
		$(this).toggleClass('btn-success').toggleClass('btn-primary');
	});

	//Home Button Code

	$('.homeButton').live("click",function(){
		$('.contentBox').slideUp();
		$('.landing').fadeIn();
	});


});