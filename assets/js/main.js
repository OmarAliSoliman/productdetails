$(document).ready(function () {
  if ($(".custom_select").length) {
    $(".custom_select").niceSelect();
  }

  if ($(".images_slider").length) {
    $(".small_images .thubm_img").on("click", function (e) {
      let imgsrc = $(this).find("img").attr("src");
      $(".images_slider .big_imag img").attr("src", imgsrc);
    });
  }

  if ($(".peaces_options").length) {
    $(".peaces_options .peaces_plus").on("click", function (e) {
      let count = parseInt($(this).parent().find("input").val());
      $(this)
        .parent()
        .find("input")
        .val(count + 1);
    });

    $(".peaces_options .peaces_minus").on("click", function (e) {
      let count = parseInt($(this).parent().find("input").val());
      if (count == 0) {
        count = 0;
      } else {
        $(this)
          .parent()
          .find("input")
          .val(count - 1);
      }
    });
  }

  if ($(".related_products_slider").length) {
    $(".related_products_slider").slick({
      rtl: true,
      slidesToShow: 4,
      arrows: false,
      slidesToScroll: 1,
      infinite: true,
      autoplay: true,
      autoplaySpeed: 1000,
      responsive: [
        {
          breakpoint: 1024,
          settings: {
            slidesToShow: 3,
            slidesToScroll: 1,
            infinite: true,
            dots: false,
          },
        },
        {
          breakpoint: 991,
          settings: {
            slidesToShow: 3,
          },
        },
        {
          breakpoint: 600,
          settings: {
            slidesToShow: 1.4,
          },
        },
      ],
    });
  }
});
