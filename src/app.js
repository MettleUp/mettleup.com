(function($){
    $(document).ready(loaded);

    function loaded() {
        var fullsize = [$('.home'), $('.portfolio')];

        var small = {
            center: true,
            dots: false,
            loop: true,
            nav: true,
            navText: [
                "<i class='fa fa-angle-left'></i>",
                "<i class='fa fa-angle-right'></i>"
            ],
            responsive: {
                0: {items: 2},
                480: {items: 3},
                768: {items: 4},
                1000: {items: 5},
                2000: {items: 7}
            },
            stagePadding: 30
        };
        var large = {
            //animateIn: "fadeInLeft",
            animateOut: "zoomOut",
            center: true,
            dots: false,
            items: 1,
            loop: true,
            mouseDrag: false,
            nav: true,
            navText: [
                "<i class='fa fa-angle-left'></i>",
                "<i class='fa fa-angle-right'></i>"
            ],
            smartSpeed: 450,
            touchDrag: false
        };
        var publication = {
            nav: false,
            responsive: {
                0: {items: 2},
                480: {items: 3},
                768: {items: 4},
                1000: {items: 5},
                2000: {items: 5}
            }
        };

        fullImages(fullsize);
        $(window).resize(fullImages.bind(null, fullsize));

        navAnimate();
        $(window).scroll(navAnimate);

        $('#owl-clients').owlCarousel(small);
        $('#owl-portfolio').owlCarousel(large);
        $('#owl-publications').owlCarousel(Object.assign(small, publication));

        $('#form_reserve').on('shown.bs.modal', function () {
            ga('send', 'event', 'contact', 'opened');
            $('#form_reserve form').validator().on('submit', function(e) {
                if (!e.isDefaultPrevented()) {
                    rForm = $(this);
                    $.ajax({
                        url: "//formspree.io/andy@mettleup.com",
                        method: "POST",
                        data: $(rForm).serialize(),
                        dataType: "json",
                        success: function(data, status, o) {
                            if (data.success == "email sent") {
                                $(rForm).parents('.modal-body').html($('#response-thankyou').html()).siblings('.modal-header').find('.modal-title').html('Wonderful!');
                            } else {
                                $(rForm).parents('.modal-body').html($('#response-problem').html());
                            }
                        },
                        error: function(o, status, e) {
                                $(rForm).parents('.modal-body').html($('#response-problem').html());
                        }
                    });
                    ga('send', 'event', 'contact', 'sent');
                }

                return false;
            });
        });
    }

    function fullImages(sections) {
        $.each(sections, adjustHeight);
    }

    function adjustHeight(i, section) {
        if (section.length > 0) {
            var height = $(window).height();

            if (section.hasClass('full-height')) section.height(height);
            else if (section.hasClass('portfolio')) section.height(Math.max(Math.min(650, height), 420));
            else section.height(height * 0.85);
        }
    }

    function navAnimate() {
        var nav = $('.navbar');
        var wobble = $('#wobble');
        var top = $(window).scrollTop();

        if( top >= (nav.height() * 4) ) {
            nav.removeClass('navbar-transparent');
            wobble.removeClass('wobble');
        }
        else {
            nav.addClass('navbar-transparent');
        }
    }

})(jQuery);