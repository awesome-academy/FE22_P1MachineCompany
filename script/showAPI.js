
var $ = document.querySelector.bind(document)
var $$ = document.querySelectorAll.bind(document);
getDataCart()
removeItemCart();
//updateCart()
function updateCart(){
	var inputCount = $$(".shoping__row-input");
	var btn = $$(".removeBtn");
	var storageValue = localStorage.getItem("cartItem").split(",").map(Number);
	for(var i=0; i< inputCount.length; i++){
		inputCount[i].addEventListener("keyup", function(element){
			var id = this.getAttribute("data-set")
			var index = this.getAttribute("data-index")
			var value = this.value;
			if(element.keyCode == 13){
				//change local storage
				var removed = removeId(storageValue, id);
				for(var i=0; i < this.value; i++){
					removed.push(id);
				}
				localStorage.setItem("cartItem", removed)
				// Change total value
				var getPrice = $$(".product-price")[0].textContent.split(".").join("");
				$$(".total-price")[index].textContent = stringToPriceFormated(Number(getPrice)*this.value);
				getDataCart();
			}
			
		})
	}
}
function getDataCart(){
	var urlId = getLocalStorage();
	axios.get(`http://localhost:3000/grid?${urlId}`)
		.then((res) => {
			renderCart(res.data);
			PaymentPrice(res.data);
			removeItemCart();
			updateCart();
		})
		.catch((err) => {
			console.log(err);
		})
}
function removeItemCart(){
	var btn = $$(".removeBtn");
	var storageValue = localStorage.getItem("cartItem").split(",").map(Number);
	for(var i = 0; i< btn.length; i++){
		var valueBtn = btn[i].getAttribute("value");
		btn[i].addEventListener("click", function(){
			if(confirm("Bạn có muốn xóa sản phẩm này ?")){
				var removed = storageValue.filter(function(value){
						return value != valueBtn;
					});
				localStorage.setItem("cartItem", removed);
				getDataCart();

			}
		})
	}

}
function renderCart(input){
	var arrayProductCart = getLocalStorageProduct();
	var arr = [];
	for(var i=0; i < arrayProductCart.length; i++){
		var priceToNum = Number(input[i].price.split('.').join(""))*arrayProductCart[i];
		var priceFormat = stringToPriceFormated(priceToNum);
		var retrn = `<tr class="shoping__row">
					<th>${i+1}</th>
					 <th><img src="${input[i].img}"></th>
					 <th>${input[i].title}</th>
					 <th><span class="product-price">${input[i].price}</span> <span> Đ</span></th>
					 <th>
		              <input class="shoping__row-input" type="number" value="${arrayProductCart[i]}" data-set="${input[i].id}" data-index="${i}">
		             </th>
		             <th><span class="total-price">${priceFormat}</span><span> Đ</span></th>
		             <th><a class="removeBtn" value ="${input[i].id}">
		             		<i class="shoping__row--icon fas fa-times"></i>
		             	</a>
		             </th>
				</tr>`;
		arr.push(retrn);
	}
	$("tbody").innerHTML = arr.join(" ");

}
function getLocalStorage(){
	//convert to array number
	var arrayCartItem = localStorage.getItem("cartItem").split(",").map(Number);
	var keyItem = getKeyID(countOccurrences(arrayCartItem));
	var urlId = keyItem.map((item) => {
		return `id=${item}&`;
	})
	return urlId.join("");

}
function getLocalStorageProduct(){
	//convert to array number
	var arrayCartItem = localStorage.getItem("cartItem").split(",").map(Number);
	var valueID = getValueID(countOccurrences(arrayCartItem));
	return valueID;

}
function countOccurrences(arr) {
	//convert array to object
	return  arr.reduce(function(tally, num){
		tally[num] = (tally[num] || 0 ) + 1;
		return tally;
	}, {});

}
function getKeyID(obj){
	//get key object
	var arr = [];
	for(var key in obj){
		if(obj.hasOwnProperty(key)){
			arr.push(key)
		}
	}
	return arr;

}
function getValueID(obj){
	//get value object
	var arr = [];
	for(var key in obj){
		if(obj.hasOwnProperty(key)){
			arr.push(obj[key])
		}
	}
	return arr;

}
function stringToPriceFormated(num){
	return new Intl.NumberFormat('VND', 
		{ maximumSignificantDigits:  3}).format(num);

}
function PaymentPrice(input){
	var vatPrice, paymentPrice, totalPrice = 0;
	var arrayProductCart = getLocalStorageProduct();
	for(var i=0; i<arrayProductCart.length; i++){
		var priceToNum = Number(input[i].price.split('.').join(""))*arrayProductCart[i];
		totalPrice += priceToNum;
	}
	vatPrice = stringToPriceFormated(totalPrice*0.03) ;
	paymentPrice = stringToPriceFormated(totalPrice + totalPrice*0.03);
	totalPrice = stringToPriceFormated(totalPrice);
	//Inner HTML
	$("#total-price").textContent = totalPrice + " Đ";
	$("#vat-price").textContent = vatPrice + " Đ";
	$("#payment-price").textContent = paymentPrice + " Đ";

}
function removeId(arr, itemRemove){
	var filtered = arr.filter(function(value){
		return value != itemRemove;
	})
	return filtered;

}