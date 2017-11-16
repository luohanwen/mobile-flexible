/**
 * @param {Object} win
 * @param {Object} doc
 * @author haven
 */
$(function() {
    var main = {
        onShow: function() {
            this.initFastclick();
            $("#submit").on("click", function() {
                alert(111);
            });
            $("#test").on("click", function() {
                $(this).html(Math.random());
            });
        },
        initFastclick: function() {
            FastClick.attach(document.body);
        }
    };
    main.onShow();
});