/*

    countUp.js
    by @inorganik
    v 1.1.0

*/

// target = id of html element or var of previously selected html element where counting occurs
// startVal = the value you want to begin at
// endVal = the value you want to arrive at
// decimals = number of decimal places, default 0
// duration = duration of animation in seconds, default 2
// options = optional object of options (see below)

function countUp(target, startVal, endVal, decimals, duration, options) {

    // default options
    this.options = options || {
        useEasing : true, // toggle easing
        useGrouping : true, // 1,000,000 vs 1000000
        separator : ',', // character to use as a separator
        decimal : '.' // character to use as a decimal
    }
    
    // make sure requestAnimationFrame and cancelAnimationFrame are defined
    // polyfill for browsers without native support
    // by Opera engineer Erik Möller
    var lastTime = 0;
    var vendors = ['webkit', 'moz', 'ms'];
    for(var x = 0; x < vendors.length && !window.requestAnimationFrame; ++x) {
        window.requestAnimationFrame = window[vendors[x]+'RequestAnimationFrame'];
        window.cancelAnimationFrame =
          window[vendors[x]+'CancelAnimationFrame'] || window[vendors[x]+'CancelRequestAnimationFrame'];
    }
    if (!window.requestAnimationFrame) {
        window.requestAnimationFrame = function(callback, element) {
            var currTime = new Date().getTime();
            var timeToCall = Math.max(0, 16 - (currTime - lastTime));
            var id = window.setTimeout(function() { callback(currTime + timeToCall); },
              timeToCall);
            lastTime = currTime + timeToCall;
            return id;
        }
    }
    if (!window.cancelAnimationFrame) {
        window.cancelAnimationFrame = function(id) {
            clearTimeout(id);
        }
    }

    var self = this;
    
    this.d = (typeof target === 'string') ? document.getElementById(target) : target;
    this.startVal = Number(startVal);
    this.endVal = Number(endVal);
    this.countDown = (this.startVal > this.endVal) ? true : false;
    this.startTime = null;
    this.timestamp = null;
    this.remaining = null;
    this.frameVal = this.startVal;
    this.rAF = null;
    this.decimals = Math.max(0, decimals || 0);
    this.dec = Math.pow(10, this.decimals);
    this.duration = duration * 1000 || 2000;
    
    // Robert Penner's easeOutExpo
    this.easeOutExpo = function(t, b, c, d) {
        return c * (-Math.pow(2, -10 * t / d) + 1) * 1024 / 1023 + b;
    }
    this.count = function(timestamp) {
        
        if (self.startTime === null) self.startTime = timestamp;

        self.timestamp = timestamp;

        var progress = timestamp - self.startTime;
        self.remaining = self.duration - progress;
        
        // to ease or not to ease
        if (self.options.useEasing) {
            if (self.countDown) {
                var i = self.easeOutExpo(progress, 0, self.startVal - self.endVal, self.duration);
                self.frameVal = self.startVal - i;
            } else {
                self.frameVal = self.easeOutExpo(progress, self.startVal, self.endVal - self.startVal, self.duration);
            }
        } else {
            if (self.countDown) {
                var i = (self.startVal - self.endVal) * (progress / self.duration);
                self.frameVal = self.startVal - i;
            } else {
                self.frameVal = self.startVal + (self.endVal - self.startVal) * (progress / self.duration);
            }
        }
        
        // decimal
        self.frameVal = Math.round(self.frameVal*self.dec)/self.dec;
        
        // don't go past endVal since progress can exceed duration in the last frame
        if (self.countDown) {
            self.frameVal = (self.frameVal < self.endVal) ? self.endVal : self.frameVal;
        } else {
            self.frameVal = (self.frameVal > self.endVal) ? self.endVal : self.frameVal;
        }
        
        // format and print value
        self.d.innerHTML = self.formatNumber(self.frameVal.toFixed(self.decimals));
               
        // whether to continue
        if (progress < self.duration) {
            self.rAF = requestAnimationFrame(self.count);
        } else {
            if (self.callback != null) self.callback();
        }
    }  
    this.start = function(callback) {
        self.callback = callback;
        // make sure values are valid
        if (!isNaN(self.endVal) && !isNaN(self.startVal)) {
            self.rAF = requestAnimationFrame(self.count);
        } else {
            console.log('countUp error: startVal or endVal is not a number');
            self.d.innerHTML = '--';
        }
        return false;
    }
    this.stop = function() {
        cancelAnimationFrame(self.rAF);
    }
    this.reset = function() {
        self.startTime = null;
        cancelAnimationFrame(self.rAF);
        self.d.innerHTML = self.formatNumber(self.startVal.toFixed(self.decimals));
    }
    this.resume = function() {
        self.startTime = null;
        self.duration = self.remaining;
        self.startVal = self.frameVal;
        requestAnimationFrame(self.count);
    }
    this.formatNumber = function(nStr) {
        nStr += '';
        var x, x1, x2, rgx;
        x = nStr.split('.');
        x1 = x[0];
        x2 = x.length > 1 ? self.options.decimal + x[1] : '';
        rgx = /(\d+)(\d{3})/;
        if (self.options.useGrouping) {
            while (rgx.test(x1)) {
                x1 = x1.replace(rgx, '$1' + self.options.separator + '$2');
            }
        }
        return x1 + x2;
    }

    // format startVal on initialization
    self.d.innerHTML = self.formatNumber(self.startVal.toFixed(self.decimals));
}

// Example:
// var numAnim = new countUp("SomeElementYouWantToAnimate", 0, 99.99, 2, 2.5);
// numAnim.start();
// with optional callback:
// numAnim.start(someMethodToCallOnComplete);

    // set countUp options
    var options = {
        useEasing : true, // toggle easing
        useGrouping : true, // 1,000,000 vs 1000000
        separator : ',', // character to use as a separator
        decimal : '.', // character to use as a decimal
    }
    var useOnComplete = false;
    var useEasing = true;
    var useGrouping = true;
    
    // create instance
    window.onload = function() {
        // fire animation
        // var element = document.querySelector('.jumbo');
        var demo = new countUp('clicks', 4.502, 4.621, 3, 900.5, options);
        demo.start();
    }

    // for demo:
    function swapValues() {
        var oldStartVal = document.getElementById("startVal").value;
        var oldEndVal = document.getElementById("endVal").value;
        document.getElementById("startVal").value = oldEndVal;
        document.getElementById("endVal").value = oldStartVal;
        updateCodeVisualizer();
    }
    var code;
    function createCountUp() {

        var startVal = document.getElementById("startVal").value;
        startVal = Number(startVal.replace(',','').replace(' ',''));
        var endVal = document.getElementById("endVal").value;
        endVal = Number(endVal.replace(',','').replace(' ',''));
        var decimals = document.getElementById("decimals").value;
        var duration = document.getElementById("duration").value; 

        options = {
            useEasing : useEasing,
            useGrouping : useGrouping,
            separator : document.getElementById("separator").value,
            decimal : document.getElementById("decimal").value
        }

        // you don't have to create a new instance of countUp every time you start an animation,
        // but I do here in case user changes values in demo.
        demo = new countUp("myTargetElement", startVal, endVal, decimals, duration, options);

        if (useOnComplete) {
            demo.start(methodToCallOnComplete);
        } else {
            demo.start();
        }

        updateCodeVisualizer();
    }
    function showCodeAndStop() {
        code = 'demo.stop();';
        document.getElementById("codeVisualizer").innerHTML = code;

        demo.stop();
    }
    function showCodeAndReset() {
        code = 'demo.reset();';
        document.getElementById("codeVisualizer").innerHTML = code;

        demo.reset();
    }
    function showCodeAndResume() {
        code = 'demo.resume();';
        document.getElementById("codeVisualizer").innerHTML = code;

        demo.resume();
    }
    function toggleOnComplete(checkbox) {

        if (checkbox.checked) {
            useOnComplete = true;
        } else {
            useOnComplete = false;
        }
        updateCodeVisualizer();
    }
    function toggleEasing(checkbox) {

        if (checkbox.checked) {
            useEasing = true;
        } else {
            useEasing = false;
        }
        updateCodeVisualizer();
    }
    function toggleGrouping(checkbox) {

        if (checkbox.checked) {
            useGrouping = true;
        } else {
            useGrouping = false;
        }
        updateCodeVisualizer();
    }
    function methodToCallOnComplete() {
        console.log('COMPLETE!');
        alert('COMPLETE!');
    }
    function updateCodeVisualizer() {
        var startVal = document.getElementById("startVal").value;
        startVal = Number(startVal.replace(',','').replace(' ',''));
        var endVal = document.getElementById("endVal").value;
        endVal = Number(endVal.replace(',','').replace(' ',''));
        var decimals = document.getElementById("decimals").value;
        var duration = document.getElementById("duration").value;
        var separator = document.getElementById("separator").value;
        var decimal = document.getElementById("decimal").value;

        var code = 'var options = {<br>';
        code += (useEasing) ? '&emsp;&emsp;useEasing : true, <br>' : '&emsp;&emsp;useEasing : false, <br>';
        code += (useGrouping) ? '&emsp;&emsp;useGrouping : true, <br>' : '&emsp;&emsp;useGrouping : false, <br>';
        code += '&emsp;&emsp;separator : \''+separator+'\', <br>';
        code += '&emsp;&emsp;decimal : \''+decimal+'\' <br>';
        code += '}<br>';
        code += 'var demo = new countUp("myTargetElement", '+startVal+', '+endVal+', '+decimals+', '+duration+', options);<br>';
        if (useOnComplete) {
            code += 'demo.start(methodToCallOnComplete);';
        } else {
            code += 'demo.start();';
        }
        document.getElementById("codeVisualizer").innerHTML = code;
    }                                                               
