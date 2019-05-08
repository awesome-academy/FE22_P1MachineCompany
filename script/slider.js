
var items = document.getElementsByClassName("slider-corp__list-item")
var list = document.getElementById("slider-corp__list")
onload = slide();
function moveLeft(){
    list.insertBefore(items[4], list.childNodes[0])
     list.style.left = "100px";
    for(var i = 0; i< items.length; i++){
      items[i].style.animation = "scroll .7s ease-in-out";
    }
  }
function moveRight(){
    list.insertBefore(items[0], null);
    list.style.animation = "scroll .7s ease-in-out";
    for(var i = 0; i< items.length; i++){
      items[i].style.animation = "scroll .7s ease-in-out";
    }
  }
function slide(){
  setInterval(moveRight, 2000);
}