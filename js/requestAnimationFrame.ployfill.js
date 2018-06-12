(function() {
    "use strict";
    if (!Date.now) {
        Date.now = function now() {
            return Date.now();
        };
    }
    var vendors = ["webkit", "moz", "o", "ms"];
    vendors.forEach(function(item) {
        if (!window.requestAnimationFrame) {
            window.requestAnimationFrame =
                window[item + "RequestAnimationFrame"];
            window.cancelAnimationFrame =
                window[item + "CancelAnimationFrame"] ||
                window[item + "CancelRequestAnimationFrame"];
        }
    });
    if (!window.requestAnimationFrame) {
        var lastTime = 0;
        window.requestAnimationFrame = function(callback) {
            var currTime = Date.now();
            var timeToCall = Math.max(0, 16 - (currTime - lastTime));
            var id = window.setTimeout(function() {
                callback(currTime + timeToCall);
            }, timeToCall);
            lastTime = currTime + timeToCall;
            return id;
        };
    }
    if (!window.cancelAnimationFrame) {
        window.cancelAnimationFrame = function(id) {
            clearTimeout(id);
        };
    }
})();
