var cartListItem = `<li class="d-flex align-items-center justify-content-between">
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
    <p>229 MAD</p>
  </div>
</div>
<div class="options peaces_options">
  <span class="box-style peaces_plus"><img src="./assets/images/plus.svg" alt=""></span>
  <input type="text" value="1">
  <span class="box-style peaces_minus"><img src="./assets/images/minus.svg" alt=""></span>
</div>
<div class="price">
  <span>687 MAD</span>
</div>
</li>`;

var color = "";
var size = "";

$(".colors input").on('change', function(e){
  color = e.target.value;
})
$(".sizes input").on('change', function(e){
  size = e.target.value;
})


const addToCart = () => {
  
}