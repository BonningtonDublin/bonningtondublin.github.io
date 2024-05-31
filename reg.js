$(document).ready(function(){

//set observations as hotel guest by default
document.getElementById('OBSERVATIONS').value = 'Hotel Guest';

//Check-in date as today
const currentTime = new Date();
const today = convertToDateTimeLocalString(currentTime);
document.getElementById('CHECK-IN').value = today;

//Minimun check-out date from 1 day ahead
var minDate = new Date(currentTime.setDate(currentTime.getDate() + 1)).toISOString().split("T")[0];
document.getElementsByName("CHECK-OUT")[0].setAttribute('min', minDate);

  $("#GUEST").click(function(){
    $("#GUEST-INFO").show();
    document.getElementById('CHECK-OUT').value = '';
    document.getElementById('OBSERVATIONS').value = 'Hotel Guest';
  });
  $("#CROFT").click(function(){
    $("#GUEST-INFO").hide();
    document.getElementById('ROOM').required = false;
    document.getElementById('CHECK-OUT').value = minDate;
    document.getElementById('OBSERVATIONS').value = 'Croft Bar';
  });
  $("#MCG").click(function(){
    $("#GUEST-INFO").hide();
    document.getElementById('ROOM').required = false;
    document.getElementById('CHECK-OUT').value = minDate;
    document.getElementById('OBSERVATIONS').value = "McGettigan's";
  });
  $("#FUNCTION").click(function(){
    $("#GUEST-INFO").hide();
    document.getElementById('ROOM').required = false;
    document.getElementById('CHECK-OUT').value = minDate;
    document.getElementById('OBSERVATIONS').value = "Function Event";
  });
});

// getFullYear, getMonth, getDate, getHours, getMinutes all return values of local time.
const convertToDateTimeLocalString = (date) => {
  const year = date.getFullYear();
  const month = (date.getMonth() + 1).toString().padStart(2, "0");
  const day = date.getDate().toString().padStart(2, "0");
  const hours = date.getHours().toString().padStart(2, "0");
  const minutes = date.getMinutes().toString().padStart(2, "0");

  return `${year}-${month}-${day}T${hours}:${minutes}`;
}
