$(document).ready(function() {
  // Default setting for "OBSERVATIONS" (Remarks)
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
  $("#GUEST").click(function() {
    setFieldsForGuest();
  });

  $("#CROFT_MCG").click(function() {
    setFieldsForCroftMcGettigans();
  });

  $("#OTHER").click(function() {
    setFieldsForOtherReason();
  });

  function setFieldsForGuest() {
    $("#GUEST-INFO").show();
    document.getElementById('ROOM').required = true;
    document.getElementById('CHECK-OUT').value = '';
    document.getElementById('OBSERVATIONS').value = 'Hotel Guest';
    toggleMainFields(true);
  }

  function setFieldsForCroftMcGettigans() {
    $("#GUEST-INFO").hide();
    document.getElementById('ROOM').required = false;
    document.getElementById('CHECK-OUT').value = minDateStr;
    document.getElementById('OBSERVATIONS').value = "Croft Bar / McGettigan's";
    toggleMainFields(true);
  }

  function setFieldsForOtherReason() {
    $("#GUEST-INFO").hide();
    document.getElementById('ROOM').required = false;
    document.getElementById('CHECK-OUT').value = minDateStr;
    document.getElementById('OBSERVATIONS').value = "Event | Meeting | Other";
    toggleMainFields(true);
  }

  function toggleMainFields(show) {
    if (show) {
      $("#main-fields").show();
      $("#change-reason").show();
      $("#submit-button").show();
    } else {
      $("#main-fields").hide();
      $("#change-reason").hide();
      $("#submit-button").hide();
    }
  }

  $("#change-reason-button").click(function() {
    toggleMainFields(false);
    $("#reason-buttons").show();
    resetFields();
  });

  function resetFields() {
    $("#NAME").val('');
    $("#CAR-REGISTRATION").val('');
    $("#OBSERVATIONS").val('Hotel Guest');
    $("#ROOM").val('');
    document.getElementById('CHECK-OUT').value = '';
  }
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
