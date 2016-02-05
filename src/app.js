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