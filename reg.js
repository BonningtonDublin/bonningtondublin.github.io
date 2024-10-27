let selectedReason = "";
document.getElementById('OBSERVATIONS').value = '';

// Setting the CHECK-IN date to today's date
const currentTime = new Date();
const today = convertToDateTimeLocalString(currentTime);
document.getElementById('CHECK-IN').value = today;

// Set minimum CHECK-OUT date to 1 day from today
let minDate = new Date();
minDate.setDate(minDate.getDate() + 1);
const minDateStr = minDate.toISOString().split("T")[0];
document.getElementsByName("CHECK-OUT")[0].setAttribute('min', minDateStr);

// Helper function to format date to "YYYY-MM-DDTHH:MM"
const convertToDateTimeLocalString = (date) => {
  const year = date.getFullYear();
  const month = (date.getMonth() + 1).toString().padStart(2, "0");
  const day = date.getDate().toString().padStart(2, "0");
  const hours = date.getHours().toString().padStart(2, "0");
  const minutes = date.getMinutes().toString().padStart(2, "0");

  return `${year}-${month}-${day}T${hours}:${minutes}`;
};

function selectReason(reason) {
  selectedReason = reason;
  document.getElementById("reason-buttons").style.display = "none";
  document.getElementById("main-fields").style.display = "block";
  document.getElementById("other-fields").style.display = "block";
  document.getElementById("change-reason").style.display = "block";
  document.getElementById("confirm-section").style.display = "block";
  
  if (reason === "guest") {
    document.getElementById("guest-fields").style.display = "block";
    document.getElementById("other-fields").style.display = "block";
    document.getElementById("ROOM").required = true;
    document.getElementById("CHECK-OUT").required = true;
    document.getElementById("OBSERVATIONS").value = 'Hotel Guest';
  } else if(reason === "croft_mcgettigans") {
    document.getElementById("other-fields").style.display = "block";
    document.getElementById("guest-fields").style.display = "none";
    //document.getElementById("CHECK-OUT").value = minDateStr;
    document.getElementById("OBSERVATIONS").value = "Croft Bar / McGettigan's";
  } else if (reason === "other") {
    document.getElementById("other-fields").style.display = "block";
    document.getElementById("guest-fields").style.display = "none";
    //document.getElementById("CHECK-OUT").value = minDateStr;
    document.getElementById("OBSERVATIONS").value = 'Event | Meeting | Other';
  } else {
    document.getElementById("guest-fields").style.display = "none";
    document.getElementById("other-fields").style.display = "none";
  }
}

function changeReason() {
  document.getElementById("reason-buttons").style.display = "block";
  document.getElementById("main-fields").style.display = "none";
  document.getElementById("change-reason").style.display = "none";
  document.getElementById("confirm-section").style.display = "none";
  document.getElementById("guest-fields").style.display = "none";
  document.getElementById("other-fields").style.display = "none";
}

function populateModal() {
  const name = document.getElementById("NAME").value;
  const carRegistration = document.getElementById("CAR-REGISTRATION").value;
  const room = document.getElementById("ROOM").value;
  const checkout = document.getElementById("CHECK-OUT").value;
  const remarks = document.getElementById("OBSERVATIONS").value;

  let confirmationText = `<strong>Reason for Visit:</strong> ${selectedReason}<br>
                          <strong>Name:</strong> ${name}<br>
                          <strong>Car Registration:</strong> ${carRegistration}<br>`;
  
  if (selectedReason === "guest") {
    confirmationText += `<strong>Room Number:</strong> ${room}<br>
                         <strong>Check-Out Date:</strong> ${checkout}<br>`;
  }
  
  confirmationText += `<strong>Remarks:</strong> ${remarks}`;
  
  document.getElementById("modalBody").innerHTML = confirmationText;
}

function submitForm() {
  document.getElementById("registration-form").submit();
}