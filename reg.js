$(document).ready(function() {
  // Default setting for "OBSERVATIONS" (Remarks) based on default selection
  document.getElementById('OBSERVATIONS').value = 'Hotel Guest';

  // Setting the CHECK-IN date to today's date
  const currentTime = new Date();
  const today = convertToDateTimeLocalString(currentTime);
  document.getElementById('CHECK-IN').value = today;

  // Set minimum CHECK-OUT date to 1 day from today
  let minDate = new Date();
  minDate.setDate(minDate.getDate() + 1);
  const minDateStr = minDate.toISOString().split("T")[0];
  document.getElementsByName("CHECK-OUT")[0].setAttribute('min', minDateStr);

  // Event listeners for reason selection buttons
  $("#reason-buttons button").click(function() {
    const reason = $(this).text().toLowerCase();

    if (reason.includes("hotel guest")) {
      setFieldsForGuest();
    } else if (reason.includes("croft") || reason.includes("mcgettigan")) {
      setFieldsForCroftMcGettigans();
    } else if (reason.includes("other")) {
      setFieldsForOtherReason();
    }

    // Show main fields and confirm section after reason is selected
    $("#main-fields, #confirm-section").show();
    $("#reason-buttons").hide();
    $("#change-reason").show();
  });

  function setFieldsForGuest() {
    // Show guest-specific fields and set requirements
    $("#guest-fields").show();
    document.getElementById('ROOM').required = true;
    document.getElementById('CHECK-OUT').value = '';
    document.getElementById('OBSERVATIONS').value = 'Hotel Guest';
  }

  function setFieldsForCroftMcGettigans() {
    // Hide guest-specific fields and set default values for Croft Bar/McGettigan's
    $("#guest-fields").hide();
    document.getElementById('ROOM').required = false;
    document.getElementById('CHECK-OUT').value = minDateStr;
    document.getElementById('OBSERVATIONS').value = "Croft Bar / McGettigan's";
  }

  function setFieldsForOtherReason() {
    // Hide guest-specific fields and set default values for other reasons
    $("#guest-fields").hide();
    document.getElementById('ROOM').required = false;
    document.getElementById('CHECK-OUT').value = minDateStr;
    document.getElementById('OBSERVATIONS').value = "Event | Meeting | Other";
  }

  // Change reason function to reset values
  $("#change-reason button").click(function() {
    $("#reason-buttons").show();
    $("#main-fields, #confirm-section, #guest-fields").hide();
    $("#OBSERVATIONS").value = 'Hotel Guest';
  });
});

// Helper function to format date to "YYYY-MM-DDTHH:MM"
const convertToDateTimeLocalString = (date) => {
  const year = date.getFullYear();
  const month = (date.getMonth() + 1).toString().padStart(2, "0");
  const day = date.getDate().toString().padStart(2, "0");
  const hours = date.getHours().toString().padStart(2, "0");
  const minutes = date.getMinutes().toString().padStart(2, "0");

  return `${year}-${month}-${day}T${hours}:${minutes}`;
};
