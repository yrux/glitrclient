$(document).ready(function () {

    // Mobile Navigation JS START

    $(".navigation-list ul").each(function () {
        var $this = $(this);
        $this.clone().attr("class", "mobile-nav-items").appendTo(".mobile-body");
    });

    $(".hamburger").on("click", function (e) {
        e.preventDefault();
        var body_element = $("body");

        if ((body_element).hasClass("mobile-view")) {
            body_element.removeClass("mobile-view");
        }
        else {
            body_element.addClass("mobile-view");
        }
    });

    $(".mobile-close").on("click", function (e) {
        e.preventDefault();
        var body_element = $("body");

        if ((body_element).hasClass("mobile-view")) {
            body_element.removeClass("mobile-view");
        }
    });

    $(document).mouseup(function (e) {
        var container = $(".mobile-nav");
        if (!container.is(e.target) && container.has(e.target).length === 0) {
            if ($("body").hasClass("mobile-view")) {
                $("body").removeClass("mobile-view");
            }
        }
    });

    $(window).resize(function () {
        var $this = $(this),
            win_width = $this.width();

        if (win_width > 990) {
            if ($("body").hasClass("mobile-view")) {
                $("body").removeClass("mobile-view");
            }
        }
    });

    // Mobile Navigation JS END

});