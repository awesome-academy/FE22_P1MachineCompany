
onload = start();
function start(){
    var i = 1;
    function Move(){
        i = (i%3)+1;
        document.getElementById('i'+i).checked = true;
    }
    setInterval(Move, 3000);
}
function changeIt(i){
    document.getElementById(`i${(i === 3) ? 1 : i+1}`).checked = true;
}
window.onresize = function(){
var hei = document.getElementsByClassName("slider__img-move")[0].clientHeight;
document.getElementById("slider").style.height = `${hei}px`;
}