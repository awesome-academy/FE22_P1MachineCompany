function myFunc() {
    var x = document.getElementById('collapse');
    if (x.className === 'navbar__menu') {
        x.className += ' responsive';
    }else {
        x.className = 'navbar__menu';
    }
}