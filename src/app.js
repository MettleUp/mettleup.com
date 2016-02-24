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

        $('.form_reserve').on('click', function() {
            $.featherlight('#form_reserve', {
               afterOpen: function(e) {
                    $('.featherlight-inner form').validator().on('submit', function(e) {
                        if (!e.isDefaultPrevented()) {
                            rForm = $(this);
                            $.ajax({
                                url: "//formspree.io/andy@mettleup.com",
                                method: "POST",
                                data: $(rForm).serialize(),
                                dataType: "json",
                                success: function(data, status, o) {
                                    if (data.success == "email sent") {
                                        $(rForm).parents('.featherlight-inner').html('<p>Wonderful! Thank you for reaching out, we will get in contact with you very soon.</p><img src="http://i.giphy.com/10bHcDcPM925ry.gif" alt="" />');
                                    } else {
                                        $(rForm).parents('.featherlight-inner').html("Well that's odd. The email server that handles delivery between the web site and our inbox may not have been reached. We would hate to miss out on the chance to talk, so please do feel free to contact us directly at <a href='mailto:info@mettleup.com'>info@mettleup.com</a> and let us know what you're looking for!");
                                    }
                                },
                                error: function(o, status, e) {
                                        $(rForm).parents('.featherlight-inner').html("Well that's odd. The email server that handles delivery between the web site and our inbox may not have been reached. We would hate to miss out on the chance to talk, so please do feel free to contact us directly at <a href='mailto:info@mettleup.com'>info@mettleup.com</a> and let us know what you're looking for!");
                                }
                            });
                        }

                        return false;
                    });
               }
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