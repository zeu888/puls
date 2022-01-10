/*$(document).ready(function () {
	$('.carousel__inner').slick({
		speed: 1200,
		//adaptiveHeight: true,
		prevArrow: '<button type="button" class="slick-prev"><img src="icons/left.svg"></button>',
		nextArrow: '<button type="button" class="slick-next"><img src="icons/right.svg"></button>',
		responsive:[
			{
				breakpoint: 768,
				settings: {					
					dots: true,
					arrow: false
					}
			}
		]
	 });
});*/

$(document).ready(function () {
	
	const slider = tns({
		container: '.carousel__inner',
		items: 1,
		slideBy: 'page',
		autoplay: false,
		controls: false,
		nav: false,
		responsive:{
			320 : {
				autoplay: true,
				speed: 300,
			},
			768 : {
				autoplay: false
			}
		}	
	});

	document.querySelector('.prev').onclick = function () {
		slider.goTo('prev');
	};
	document.querySelector('.next').onclick = function () {
		slider.goTo('next');
	};

	$('ul.catalog__tabs').on('click', 'li:not(.catalog__tab_active)', function() {
		$(this)
		  .addClass('catalog__tab_active').siblings().removeClass('catalog__tab_active')
		  .closest('div.container').find('div.catalog__content').removeClass('catalog__content_active').eq($(this).index()).addClass('catalog__content_active');
	 });

		//	 function toggleSlide(item) {
		//		$(item).each(function(i) {
		//			 $(this).on('click', function(e) {
		//				  e.preventDefault();
		//				  $('.catalog-item__content').eq(i).toggleClass('catalog-item__content_active');
		//				  $('.catalog-item__list').eq(i).toggleClass('catalog-item__list_active');
		//			 })
		//		});

		//		toggleSlide('.catalog-item__link');
		//		toggleSlide('.catalog-item__back');
		//  };


	 $('.catalog-item__link').each(function(i) {
		 $(this).on('click', function(e) {
			e.preventDefault();
				$('.catalog-item__content').eq(i).toggleClass('catalog-item__content_active');
				$('.catalog-item__list').eq(i).toggleClass('catalog-item__list_active');
		 })
	 });

	 $('.catalog-item__back').each(function(i) {
		$(this).on('click', function(e) {
		  e.preventDefault();
			  $('.catalog-item__content').eq(i).toggleClass('catalog-item__content_active');
			  $('.catalog-item__list').eq(i).toggleClass('catalog-item__list_active');
		})
	});

	//Modal

	$('[data-modal=consultation]').on('click', function() {
		$('.overlay, #consultation').fadeIn('slow');
	});
	$('.modal__close').on('click', function() {
		$('.overlay, #consultation, #thanks, #order').fadeOut('slow');
	});
	
	$('.button_mini').each(function(i) {
		$(this).on('click', function() {
			$('#order .modal__descr').text($('.catalog-item__subtitle').eq(i).text());
			$('.overlay, #order').fadeIn('slow');
		})
	});
	
	//$('#consultation-form').validate();
	//$('#consultation form').validate({
	//	rules: {
	//		name: "required",
	//		phone: "required",
	//		email: {
	//			required: true,
   //   		email: true
	//		}
	//	},
	//	messages: {
	//		name: "Пожалуйста, укажите ваше имя",
	//		phone: "Пожалуйста, укажите ваш телефон",
	//		email: {
	//		required: "Укажите ваш адрес почты",
	//		email: "Неправилььно введен адрес почты"
	//		}
	//	 }
	//});
	//$('#order form').validate();

	function valideForms(form) {
		$(form).validate({
			rules: {
				name: "required",
				phone: "required",
				email: {
					required: true,
					email: true
				}
			},
			messages: {
				name: "Пожалуйста, укажите ваше имя",
				phone: "Пожалуйста, укажите ваш телефон",
				email: {
				required: "Укажите ваш адрес почты",
				email: "Неправилььно введен адрес почты"
				}
			 }
		});
	};
	
	valideForms('#consultation-form');
	valideForms('#consultation form');
	valideForms('#order form');

	$('form').submit(function(e) {
		e.preventDefault();
		S.ajax({
			type: "POST",
			url: "mailer/smart.php",
			data: $(this).serialize()
		}).done(function() {
			$(this).find("input").val("");
			$('#consultation, #order').fadeOut();
			$('.overlay, #thanks').fadeIn('slow');
			$('form').trigger('reset');
		});
		return false;
	});

	//pageup

	$(window).scroll(function() {
		if ($(this).scrollTop() > 1750) {
			$('.pageup').fadeIn();
		} else {
			$('.pageup').fadeOut();
		}
	});

	$("a[href=#up]").click(function(){
		const _href = $(this).attr("href");
		$("html, body").animate({scrollTop: $(_href).offset().top+"px"});
		return false;
  });

  //wow
  new WOW().init();


});








