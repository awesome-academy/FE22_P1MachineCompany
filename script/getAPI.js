

var $ = document.querySelector.bind(document);
var $$ = document.querySelectorAll.bind(document);

var cart;
if(localStorage.getItem("cartItem") == null){
	cart = [];
}else {
	cart = localStorage.getItem("cartItem").split(",").map(Number);
}
console.log(cart)
getData();
function getData(){
	var url = "http://localhost:3000/grid";
	axios.get(url)
		.then((res) => {
		var item = res.data
		render(item);
		getCartItem();
		cartIcon();
		})
		.catch((err) => {
			console.log(err);
		})
}
function render(item){
	let content = item.map(function(item) {
		return `<div class="product__card">
					<div class="card">
						<img class="card__img" src=${item.img.toString()} />
						<h3 class="card__price"> ${item.price} <span> Đ</span></h3>
						<p class="card__title"> ${item.title} </p>
						<div class="card__evaluate">
							<i class="fas fa-star card__evaluate-star"></i>
							<i class="fas fa-star card__evaluate-star"></i>
							<i class="fas fa-star card__evaluate-star"></i>
							<i class="fas fa-star card__evaluate-star"></i>
							<p class="card__evaluate-rate">(${item.rates}) đánh giá</p>
						</div>
						<div class="card__btn">
							<a class="card__btn--buy" href="#" value="${item.id}" >mua ngay</a>
							<a class="card__btn--info" href="#">xem chi tiết</a>
						</div>
					</div>
				</div>`;
	})
	document.getElementById("product-grid__content").innerHTML = content.join(" ");
}
function getCartItem(){
	var btn = $$(".card__btn--buy")
	for(var i=0; i<btn.length; i++){
		btn[i].addEventListener("click", function(){
			cart.push(this.getAttribute("value"));
			localStorage.setItem("cartItem", cart);
			cartIcon();
		})
	}
}
function cartIcon(){
	if(localStorage.length == 0){
		$(".header__navbar__cart").setAttribute("content-value", 0);
	}else {
		var local = localStorage.getItem("cartItem").split(",").map(Number).length;
		$(".header__navbar__cart").setAttribute("content-value", local);
	}
}

