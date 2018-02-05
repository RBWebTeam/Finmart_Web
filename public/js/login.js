
$(window, document, undefined).ready(function () {

    $('input').blur(function () {
        var $this = $(this);
        if ($this.val())
            $this.addClass('used');
        else
            $this.removeClass('used');
    });

    var $ripples = $('.ripples');

    $ripples.on('click.Ripples', function (e) {

        var $this = $(this);
        var $offset = $this.parent().offset();
        var $circle = $this.find('.ripplesCircle');

        var x = e.pageX - $offset.left;
        var y = e.pageY - $offset.top;

        $circle.css({
            top: y + 'px',
            left: x + 'px'
        });

        $this.addClass('is-active');

    });

    $ripples.on('animationend webkitAnimationEnd mozAnimationEnd oanimationend MSAnimationEnd', function (e) {
        $(this).removeClass('is-active');
    });


    var flag = 0;
    $("input[type=text],input[type=number],input[type=email],input[type=tel],input[type=password]").focus(function () {
        flag = 1;
    });

    $("input[type=text],input[type=number],input[type=email],input[type=tel],input[type=password]").blur(function () {
        //alert("hello");
        if (flag == 1) {
            if ($(this).val() != "") {
                $(this).next().next().css("background", "#009ee3");
            } else {
                $(this).next().next().css("background", "#ccc");
            }
            flag = 0;
        }
    });

    // Ripple-effect animation
    (function ($) {
        $(".ripple-effect").click(function (e) {
            var rippler = $(this);

            // create .ink element if it doesn't exist
            if (rippler.find(".ink").length == 0) {
                rippler.append("<span class='ink'></span>");
            }

            var ink = rippler.find(".ink");

            // prevent quick double clicks
            ink.removeClass("animate");

            // set .ink diametr
            if (!ink.height() && !ink.width())
            {
                var d = Math.max(rippler.outerWidth(), rippler.outerHeight());
                ink.css({height: d, width: d});
            }

            // get click coordinates
            var x = e.pageX - rippler.offset().left - ink.width() / 2;
            var y = e.pageY - rippler.offset().top - ink.height() / 2;

            // set .ink position and add class .animate
            ink.css({
                top: y + 'px',
                left: x + 'px'
            }).addClass("animate");
        })
    })(jQuery);

});

$(document).ready(function () {
    $("#eye").click(function () {
        //alert($(this).attr("src"));
        if ($(this).attr("src") == "images/login-eye.png")
        {
            $("input.password").attr("type", "text");
            $(this).attr("src", "images/login-eye-hover.png");
        } else
        {
            $("input.password").attr("type", "password");
            $(this).attr("src", "images/login-eye.png");
        }
    });

    $("input.username").keyup(function () {
        if ($(this).val() != "")
            $(this).css({"background": "url('images/login-profile-hover.png') no-repeat", "background-position": "right center"});
        else {
            $(this).css({"background": "url('images/login-profile.png') no-repeat", "background-position": "right center"});
        }
    });

    $("input.username").blur(function () {
        if ($(this).val() != "")
            $(this).css({"background": "url('images/login-profile-hover.png') no-repeat", "background-position": "right center"});
        else {
            $(this).css({"background": "url('images/login-profile.png') no-repeat", "background-position": "right center"});
        }
    });

    $("input.password").keyup(function () {
        if ($(this).val() != "")
            $(this).css({"background": "url('images/login-lock-icon-hover.png') no-repeat", "background-position": "right center"});
        else {
            $(this).css({"background": "url('images/login-lock-icon.png') no-repeat", "background-position": "right center"});
        }
    });

    $("input.password").blur(function () {
        if ($(this).val() != "")
            $(this).css({"background": "url('images/login-lock-icon-hover.png') no-repeat", "background-position": "right center"});
        else {
            $(this).css({"background": "url('images/login-lock-icon.png') no-repeat", "background-position": "right center"});
        }
    });
});
$('#login_button').click(function (){
   if(! $('#login_form').valid()){
       return false;
   }else{
           $.post('/authenticate', $('#login_form').serialize())
             .done(function(msg){ 
                 if(msg.status===1){
                     $('#welcome').empty().append("Welcome Mr. "+msg.name);
                 }else{
                     $('#welcome').empty().append(msg.error);
                 }
                     })
             .fail(function(xhr, status, error) {
                 console.log(error);
            });
   }
});

