

var items = document.getElementsByClassName("aside__list-item")
var actived = document.getElementsByClassName("active")
for(var i=0; i<items.length; i++){
  items[i].onclick = function(){
    var list = document.getElementById("aside__list");
    // if (!active) {
        list.insertBefore(this, list.childNodes[0]);
        actived[0].style.display = "none"
    //}
    //list.style.overflow = "hidden";
  }
}