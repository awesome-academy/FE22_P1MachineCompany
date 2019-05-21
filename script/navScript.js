var $ = document.querySelector.bind(document);
function myFunc() {
    var x = document.getElementById('collapse');
    if (x.className === 'navbar__menu') {
        x.className += ' responsive';
    }else {
        x.className = 'navbar__menu';
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
cartIcon();