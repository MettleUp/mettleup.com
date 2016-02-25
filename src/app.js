(function($){
    $(document).ready(loaded);

    function loaded() {
        var fullsize = [$('.home'), $('.portfolio')];

        var client = {
            center: true,
            dots: false,
            loop: true,
            nav: true,
            navText: [
                "<i class='fa fa-angle-left'></i>",
                "<i class='fa fa-angle-right'></i>"
            ],
            responsive: {
                0: {
                    items: 2
                },
                480: {
                    items: 3
                },
                768: {
                    items: 4
                },
                1000: {
                    items: 5
                },
                2000: {
                    items: 7
                }
            },
            stagePadding: 30
        };
        var portfolio = {
            animateIn: "fadeIn",
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

        fullImages(fullsize);
        $(window).resize(fullImages.bind(null, fullsize));

        navAnimate();
        $(window).scroll(navAnimate);

        $('#owl-clients').owlCarousel(client);
        $('#owl-portfolio').owlCarousel(portfolio);

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
            if (section.hasClass('full-height')) {
                section.height($(window).height());
            } else {
                section.height($(window).height() * 0.85);
            }
        }
    }

    function navAnimate() {
        var nav = $('.navbar');
        var top = $(window).scrollTop();

        if( top >= (nav.height() * 4) ) {
            nav.removeClass('navbar-transparent');
        }
        else {
            nav.addClass('navbar-transparent');
        }
    }

})(jQuery);