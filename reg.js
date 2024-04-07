function isDateSelected(){ 
    var today = new Date();
    var inputDate = document.getElementById("CHECK-OUT").valueAsDate;
    if (inputDate <= today) {
        alert("The check-out date needs to be after today!");
        return false;
    }
    return true;
}