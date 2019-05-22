
var currentTab = 0; //first tab
showTab(currentTab); // Display the current tab
// function show tab
function showTab(tabIndex) {
  var tab = $$(".tab");
  tab[tabIndex].style.display = "block";
  // display previous button
  if (tabIndex == 0) {
    $("#prevBtn").style.display = "none";
    if(localStorage.length == 0){
        $("#nextBtn").style.display = "none";
    }else {
        $("#nextBtn").style.display = "inline-block";
    }
  } else {
    $("#prevBtn").style.display = "inline-block";
  }
  // Change text next button
  if (tabIndex == (tab.length - 1)) {
    $("#nextBtn").innerHTML = "Xác nhận";
    $("#nextBtn").addEventListener("click",() => {
        if(confirm("Xác nhận đơn hàng ?")){
            localStorage.removeItem("cartItem");
            window.location.href = "grid.html";
        }else {
            window.location.href = "shoping.html";
        }
    })
    getInputValue();
  } else {
    $("#nextBtn").innerHTML = "Thanh toán";
  }
  // display the correct step indicator:
  fixStepIndicator(tabIndex)
}
function nextPrev(tabIndex) {
  // This function will figure out which tab to display
  var tab = $$(".tab");
  // Exit the function if any field in the current tab is invalid:
  if (tabIndex == 1 && !validateForm()) return false;
  // Hide the current tab:
  tab[currentTab].style.display = "none";
  // Increase or decrease the current tab by 1:
  currentTab = currentTab + tabIndex;
  // if you have reached the end of the form...
  if (currentTab >= tab.length) {
    $$("#form").submit();
    return false;
  }
  // Otherwise, display the correct tab:
  showTab(currentTab);
}
//Check the form field
function validateForm() {
  var tab, inputValue, i, valid = true;
  tab = $$(".tab");
  inputValue = tab[currentTab].getElementsByClassName("form-group__input");
  // A loop that checks every input field in the current tab:
  autoFillInput();
  var arrayInput = [];
  for (i = 0; i < inputValue.length; i++) {
    // If a field is empty...
    if (inputValue[i].value == "") {
      // add an "invalid" class to the field:
      inputValue[i].className += " invalid";
      // and set the current valid status to false
      valid = false;
    }else {
      arrayInput.push(inputValue[i].value);
      getInputValue();
    }
  }
  // If the valid status is true, mark the step as finished and valid:
  if (valid) {
    localStorage.setItem("arrayInput", arrayInput);
    $$(".step")[currentTab].className += " finish";

  }
  return valid;
}
function fixStepIndicator(tabIndex) {
  // This function removes the "active" class of all steps...
  var i, step = $$(".step"); 
  for (i = 0; i < step.length; i++) {
    step[i].className = step[i].className.replace(" sactive", "");
  }
  //... and adds the "active" class on the current step:
  step[tabIndex].className += " sactive";
}
function getInputValue(){
    var tab = $$(".tab");
    var input = tab[1].getElementsByClassName("form-group__input");
    var result = tab[2].getElementsByClassName("form-group__input");
    for(var i = 0; i< input.length; i++){
        result[i].readOnly = true;
        result[i].value = input[i].value;
    }
}
function autoFillInput(){
    var tab = $$(".tab")
    var inputValue = tab[1].getElementsByClassName("form-group__input")
    if(localStorage.getItem("arrayInput") != null){
        var arrayInput = localStorage.getItem("arrayInput").split(",")
        for(var i =0; i< inputValue.length; i++){
            inputValue[i].value = arrayInput[i];
        }
        return true;
    }
}