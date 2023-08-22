// inputs
$(".product_form #cname").on("keyup", function (e) {
  customername = e.target.value;
  // console.log(customername);
  sendObject.customer.customer_name = customername;
});

$(".product_form #ccity").on("keyup", function (e) {
  city = e.target.value;
  // console.log(city);
  sendObject.customer.city = city;
});

$(".product_form #cnumber").on("keyup", function (e) {
  phone = e.target.value;
  // console.log(phone);
  sendObject.customer.phone = phone;
});

$(".product_form #cadress").on("keyup", function (e) {
  address = e.target.value;
  // console.log(address);
  sendObject.customer.address = address;
});

var color = "";
var size = "";
var quantity = 0;
var total = 0;
var price = 229;
totalpriceperItem = 0;
var dataIndex = 0;
var productname = $(".product_info_details .name h5").text();
const path = window.location.pathname;
var customername = "";
var city = "";
var phone = "";
var address = "";
var allQuantity = 0;
// console.log(path);

var sendObject = {
  total: "",
  customer: {
    customer_name: customername,
    city: city,
    phone: phone,
    address: address,
  },
  product: {
    product_name: productname,
    product_url: path,
  },
  items: [],
};

$(".colors input").on("change", function (e) {
  color = e.target.value;
});
$(".sizes input").on("change", function (e) {
  size = e.target.value;
});

$("body").on("click", "#modalcartproducts .options .peaces_plus", function () {
  var quan = parseInt($(this).parent().find("input")[0].value);
  var item = $(this).closest("li");
  updateQuantity(quan, item, "plus");
  updateQuantityforItemApi(allQuantity, item, "plus");
  $(item).find(".peaces_options .peaces_minus").removeAttr("disabled");
});

$("body").on("click", "#modalcartproducts .options .peaces_minus", function () {
  var quan = parseInt($(this).parent().find("input")[0].value);
  // console.log("quan",quan);
  var item = $(this).closest("li");

  if (quan - 1 <= 1) {
    $(item).find(".peaces_options .peaces_minus").attr("disabled", "disabled");
  } else {
    $(item).find(".peaces_options .peaces_minus").removeAttr("disabled");
  }
  updateQuantity(quan, item, "minus");
  updateQuantityforItemApi(allQuantity, item, "minus");
});

// submit form
$(".peaces_number .btn_submit .btn").on("click", function (e) {
  e.preventDefault();
  quantity = parseInt($(this).parent().parent().find("input")[0].value);
  // console.log(color, size);
  if (color === "") {
    toastr.error("برجاء اختيار اللون اولا");
    window.scrollTo({ top: 0, behavior: "smooth" });
  } else if (size === "") {
    toastr.error("برجاء اختيار المقاس");
    window.scrollTo({ top: 0, behavior: "smooth" });
  } else {
    console.log(quantity);
    addToCart(quantity);
  }
});

const updateQuantity = (quan, item, type) => {
  if (type == "plus") {
    $(item)
      .find(".price span")
      .text(`${(quan + 1) * price}MAD`);
    updateTotal(price, "plus");
  } else if (type == "minus") {
    if (quan == 1) {
      $(item).find(".price span").text(`229MAD`);
    } else {
      $(item)
        .find(".price span")
        .text(`${(quan - 1) * price}MAD`);
      updateTotal(price, "minus");
    }
  }
};

const updateQuantityforItemApi = (quan, item, type) => {
  var indexToUpadate = item.attr("data-index");
  if (type == "plus") {
    sendObject.items[indexToUpadate].quantity = quan + 1;
    quantity = quan + 1;
    allQuantity = allQuantity + 1;
    // console.log(allQuantity);
    cheackQuantityTomakeTheDiscount();
  } else if (type == "minus") {
    sendObject.items[indexToUpadate].quantity = quan - 1;
    quantity = quan - 1;
    allQuantity = allQuantity - 1;
    // console.log(allQuantity);
    cheackQuantityTomakeTheDiscount();
  }
  // console.log(sendObject);
};

const updateTotal = (totalpriceperItem, type) => {
  if (type == "plus") {
    total = parseInt(total + totalpriceperItem);
    console.log(total);
    sendObject.total = total;
  } else if (type == "minus") {
    total = parseInt(total - totalpriceperItem);
    sendObject.total = total;
  }
  $("#modalcartproducts .moda_footer .first_price h6").text(`${total}MAD`);
};

$("body").on("click", "#modalcartproducts li .delete", function () {
  var item = $(this).closest("li");
  deleteCartItem(item);
});

const deleteCartItem = (item) => {
  const indexToRemove = item.attr("data-index");
  item.remove();
  sendObject.items.splice(indexToRemove, 1);
  itemTotaltodelete = parseInt(item.find(".price span").text());
  updateTotal(itemTotaltodelete, "minus");

  var delquan = item.find(".peaces_options input")[0].value;
  allQuantity = allQuantity - parseInt(delquan);

  $("#modalcartproducts li").map((index, item) => {
    const itemIndex = $(item).attr("data-index");
    $(item).attr("data-index", index);
  });

  cheackQuantityTomakeTheDiscount();
};

// document.querySelector(".swal2-actions .swal2-confirm").innerText = "اغلاق"

const addToCart = (quantity) => {
  var obj = { size: size, color: color, quantity: quantity };
  sendObject.items.push(obj);
  totalpriceperItem = quantity * price;
  updateTotal(totalpriceperItem, "plus");
  console.log(totalpriceperItem);
  allQuantity += quantity;
  // console.log(allQuantity);

  var cartListItem = `<li class="d-flex align-items-center justify-content-between" data-index=${dataIndex}>
  <div class="delete">
    <button><img src="./assets/images/delete.svg" alt=""></button>
  </div>
  <div class="name_picture d-flex align-items-center">
    <div class="card-img">
      <div class="img-parent">
        <img src="./assets/images/slider1.png" alt="">
      </div>
    </div>
    <div class="cart_body">
      <h5>قميص رجالي من الكتان بياقة كلاسيكية و ثلاثة أزرار</h5>
      <p>${price}MAD</p>
    </div>
  </div>
  <div class="options peaces_options">
    <button class="box-style peaces_plus"><img src="./assets/images/plus.svg" alt=""></button>
    <input type="text" value=${quantity}>
    <button class="box-style peaces_minus"><img src="./assets/images/minus.svg" alt=""></button>
  </div>
  <div class="price">
    <span>${totalpriceperItem}MAD</span>
  </div>
  </li>`;

  $("#modalcartproducts ul").append(cartListItem);
  dataIndex++;
  Swal.fire("تم الاضافه للسله بنجاح!", "", "success");
  document.querySelector(".swal2-actions .swal2-confirm").innerText = "اغلاق";
  cheackQuantityTomakeTheDiscount();
};

var finalTotal = 0;
const cheackQuantityTomakeTheDiscount = () => {
  // console.log("all quantity" + allQuantity)

  if (allQuantity == 0) {
    $("#modalcartproducts .moda_footer .final_price h6").text(total);
    sendObject.total = total;
  }

  if (allQuantity == 1) {
    // console.log(allQuantity);
    $("#modalcartproducts .warning_strip").addClass("active_strip");
    $("#modalcartproducts .warning_strip .number").text("1");
    $("#modalcartproducts .warning_strip .discount").text("5");
    $("#modalcartproducts .more_disscount").removeClass("active_discount");

    $("#modalcartproducts .moda_footer .final_price h6").text(total);
    sendObject.total = total;
  }
  if (allQuantity == 2) {
    // console.log(allQuantity);
    $("#modalcartproducts .warning_strip").addClass("active_strip");
    $("#modalcartproducts .warning_strip .number").text("1");
    $("#modalcartproducts .warning_strip .discount").text("10");

    $("#modalcartproducts .more_disscount").addClass("active_discount");
    $("#modalcartproducts .more_disscount span").text("5");

    finalTotal = parseInt(total * (95 / 100));
    $("#modalcartproducts .moda_footer .final_price h6").text(finalTotal);
    sendObject.total = finalTotal;
  } else if (allQuantity > 2) {
    // console.log(allQuantity);
    $("#modalcartproducts .warning_strip").removeClass("active_strip");
    $("#modalcartproducts .more_disscount").addClass("active_discount");
    $("#modalcartproducts .more_disscount span").text("10");

    finalTotal = parseInt(total * (90 / 100));
    $("#modalcartproducts .moda_footer .final_price h6").text(finalTotal);
    sendObject.total = finalTotal;
  }
};

// validate form
$("#datatForm").validate();

// sendData
const url = "https://dev.justyol.com/api/v3/google/sheets/create-order";

$("#datatForm").on("submit", function (e) {
  var itesmli = $("#modalcartproducts li");
  e.preventDefault();
  if (color === "") {
    toastr.error("برجاء اختيار اللون اولا");
    window.scrollTo({ top: 0, behavior: "smooth" });
  } else if (size === "") {
    toastr.error("برجاء اختيار المقاس");
    window.scrollTo({ top: 0, behavior: "smooth" });
  } else if (itesmli.length == 0) {
    toastr.error("برجاء اضف  الى  السله اولا");
    window.scrollTo({ top: 0, behavior: "smooth" });
  } else {
    sendDataToSheet();
  }
});

$(".product_counter .counter_btn").on("click", function (e) {
  var itesmli = $("#modalcartproducts li");
  e.preventDefault();
  if (color === "") {
    toastr.error("برجاء اختيار اللون اولا");
    window.scrollTo({ top: 0, behavior: "smooth" });
  } else if (size === "") {
    toastr.error("برجاء اختيار المقاس");
    window.scrollTo({ top: 0, behavior: "smooth" });
  } else if (itesmli.length == 0) {
    toastr.error("برجاء اضف  الى  السله اولا");
    window.scrollTo({ top: 0, behavior: "smooth" });
  } else {
    sendDataToSheet();
  }
});

const sendDataToSheet = () => {
  $(".product_form .btn_submit .btn").attr("disabled", "true");
  // Validate the form
  if ($("#datatForm").valid()) {
    console.log(sendObject);

    fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        // You can add more headers here if needed
      },
      body: JSON.stringify(sendObject),
    })
      .then((responseData) => {
        // console.log("Response:", responseData);
        $(".product_form .btn_submit .btn").removeAttr("disabled");
        toastr.clear();
        toastr.success("تم ارسال الطلب بنجاح");
        window.location.replace("product-thanks.html");
      })
      .catch((error) => {
        console.error("Error:", error);
        $(".product_form .btn_submit .btn").removeAttr("disabled");
        toastr.clear();
        toastr.error("برجاء المحاوله مره اخرى");
      });
  } else {
    // Form is not valid, do something (display error message, etc.)
    $(".product_form .btn_submit .btn").removeAttr("disabled");
    toastr.clear();
    toastr.error("برجاء ملئ البيانات");
  }
};
