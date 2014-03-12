/*
Infinite slider Lite
http://code.google.com/p/jquery-slider-lite/

Martin Conte Mac Donell <Reflejo@gmail.com>
*/

jQuery.fn.slider = function(options){
  // This is the huge dynamic container. This will be masked by sliderVisible
  var container = $('<div class="sliderContainer" />');
  var width = 0, height = 0;
  var images = this.find('img');
  var defaultOptions = {
    duration: 25000
  };

  // Create mask, set height/width and replace given object with our slider.
  var craftSlider = function(where) {
    var visible = $('<div class="sliderVisible" />');

    // Set container
    container.width(width)
             .height(height)
             .css('position', 'absolute');

    // Hidde overflow and position "fixed" because img are absolutes.
    visible.css({
      overflow: 'hidden',
      position: 'fixed'
    }).height(height);

    // Insert into page
    $(where).replaceWith(visible.append(container));
  };

  // Main loop, search for images inside given object
  options = $.extend(defaultOptions, options);
  $.each(images, function(i, obj) {
    var img = $(obj);
    // Put image just after the last one.
    img.css({
      display: 'block',
      position: 'absolute',
      left: width
    });
    width += img.width();

    // Keep max height to set containers.
    height = Math.max(img.height(), height);

    // Add image into container
    container.append(img);
  });

  craftSlider(this);

  // Start first animation.
  container.animate(
    {left: (-container.width()) + 'px'},
    {
      easing: 'linear',
      duration: options.duration
    }
  );

  var mLeft = 0;
  var count = 0, last = images.length;

  // Check if images is outside the cointainer
  setInterval(function(){
    var diff = mLeft - container.position().left;
    var firstImage = $(images[(last == count) ? 0: count]);

    // If our first images is outside the container, move it to the right
    if (diff > firstImage.width())
    {
      // Resize container
      container.width(width + firstImage.width());

      // Move image
      firstImage.css('left', width);

      // Set next width
      width += firstImage.width();

      // Enqueue next animation.
      container.animate(
        {left: (-width) + 'px'},
        {
          easing: 'linear',
          duration: options.duration / last
        }
      );

      mLeft = container.position().left;
      count = (last == count) ? 1: count + 1;
    }
  }, 500);

  return this;
}