// inputs
$(".product_form #cname").on("keyup", function (e) {
  customername = e.target.value;
  console.log(customername);
  sendObject.customer.customer_name = customername;
});

$(".product_form #ccity").on("keyup", function (e) {
  city = e.target.value;
  console.log(city);
  sendObject.customer.city = city;
});

$(".product_form #cnumber").on("keyup", function (e) {
  phone = e.target.value;
  console.log(phone);
  sendObject.customer.phone = phone;
});

$(".product_form #cadress").on("keyup", function (e) {
  address = e.target.value;
  console.log(address);
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
console.log(path);

var sendObject = {
  total: total,
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
  updateQuantityforItemApi(item, quan, "plus");
});

$("body").on("click", "#modalcartproducts .options .peaces_minus", function () {
  var quan = parseInt($(this).parent().find("input")[0].value);
  var item = $(this).closest("li");
  updateQuantity(quan, item, "minus");
  updateQuantityforItemApi(item, quan, "minus");
});

// submit form
$(".peaces_number .btn_submit .btn").on("click", function (e) {
  e.preventDefault();
  quantity = parseInt($(this).parent().parent().find("input")[0].value);
  addToCart(quantity);
});

const updateQuantity = (quan, item, type) => {
  if (type == "plus") {
    $(item)
      .find(".price span")
      .text(`${(quan + 1) * price}MAD`);
    updateTotal(price, "plus");
  } else if (type == "minus") {
    if (quan == 0) {
      $(item).find(".price span").text(`0MAD`);
    } else {
      $(item)
        .find(".price span")
        .text(`${(quan - 1) * price}MAD`);
      updateTotal(price, "minus");
    }
  }
};

const updateQuantityforItemApi = (item, quan, type) => {
  var indexToUpadate = item.attr("data-index");
  if (type == "plus") {
    sendObject.items[indexToUpadate].quantity = quan + 1;
  } else if (type == "minus") {
    sendObject.items[indexToUpadate].quantity = quan - 1;
  }
  console.log(sendObject);
};

const updateTotal = (totalpriceperItem, type) => {
  if (type == "plus") {
    total = parseInt(total + totalpriceperItem);
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
};

const addToCart = (quantity) => {
  var obj = { size: size, color: color, quantity: quantity };
  sendObject.items.push(obj);
  totalpriceperItem = quantity * price;
  updateTotal(totalpriceperItem, "plus");

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
    <span class="box-style peaces_plus"><img src="./assets/images/plus.svg" alt=""></span>
    <input type="text" value=${quantity}>
    <span class="box-style peaces_minus"><img src="./assets/images/minus.svg" alt=""></span>
  </div>
  <div class="price">
    <span>${totalpriceperItem}MAD</span>
  </div>
  </li>`;

  $("#modalcartproducts ul").append(cartListItem);
  dataIndex++;
};

// validate form
$("#datatForm").validate();

// sendData
const url = "https://dev.justyol.com/api/v3/google/sheets/create-order";

$("#datatForm").on("submit", function (e) {
  e.preventDefault();
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
        console.log("Response:", responseData);
        $(".product_form .btn_submit .btn").removeAttr("disabled");
        toastr.clear();
        toastr.success("تم ارسال الطلب بنجاح");
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
});

