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
    $("body").on("click", ".peaces_options .peaces_plus", function (e) {
      let count = parseInt($(this).parent().find("input").val());
      $(this)
        .parent()
        .find("input")
        .val(count + 1);
    });

    $("body").on("click", ".peaces_options .peaces_minus", function (e) {
      let count = parseInt($(this).parent().find("input").val());
      if (count == 1) {
        count = 1;
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
      dots: true,
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
            slidesToShow: 1,
          },
        },
      ],
    });
  }

  if ($(".img_slider_mobile").length) {
    $(".img_slider_mobile").slick({
      arrows: true,
    });
  }

  // date of shipping
  // Get the current date
  const options = {
    year: "numeric",
    month: "long", // Use "short" for abbreviated month names
    day: "numeric",
    weekday: "long", // Use "short" for abbreviated weekday names
  };

  const currentDate = new Date();
  const futureDate1 = new Date(currentDate);
  futureDate1.setDate(currentDate.getDate() + 15);
  const futureDate2 = new Date(currentDate);
  futureDate2.setDate(currentDate.getDate() + 20);

  const arabicLocale = "ar"; // Arabic (Saudi Arabia) locale

  $(".free_shipping .date1").text(
    futureDate1.toLocaleDateString(arabicLocale, options)
  );
  $(".free_shipping .date2").text(
    futureDate2.toLocaleDateString(arabicLocale, options)
  );

  // console.log("Current Date:", currentDate.toLocaleDateString(arabicLocale, options));
  // console.log("Date after 15 days:", futureDate1.toLocaleDateString(arabicLocale, options));
  // console.log("Date after 20 days:", futureDate2.toLocaleDateString(arabicLocale, options));
});

var watchrandomNumber = Math.floor(Math.random() * 100) + 1;
document.querySelector(".product_counter .counter_label p span").innerHTML =
  watchrandomNumber;

  
// Retrieve the previous number from localStorage, or set it to 9 initially
var currentNumber = parseInt(localStorage.getItem("currentNumber")) || 9;

// Display the current number
// console.log(currentNumber);

// Calculate the next number and update localStorage
var nextNumber = currentNumber > 1 ? currentNumber - 1 : 0;
localStorage.setItem("currentNumber", nextNumber.toString());
document.querySelector(".product_counter .counter_label h5 span").innerHTML =
  nextNumber;
