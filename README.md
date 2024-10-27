<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bootstrap@4.3.1/dist/css/bootstrap.min.css">
  
  <style>
    .conditional-fields, #main-fields, #other-fields, #confirm-section { display: none; }
  </style>

  <script>
    const socket = new WebSocket('wss://car-reg-websocket-server.glitch.me');

    socket.onopen = () => socket.send(JSON.stringify({ register: getClientId() }));

    socket.onmessage = (event) => {
      const data = event.data instanceof Blob ? handleBlobData(event.data) : JSON.parse(event.data);
      updateUI(data);
    };

    function handleBlobData(blob) {
      const reader = new FileReader();
      reader.onload = () => updateUI(JSON.parse(reader.result));
      reader.readAsText(blob);
    }

    function updateUI(data) {
      if (data.target === getClientId()) {
        if (data.name) document.getElementById('NAME').value = data.name;
        if (data.room) document.getElementById('ROOM').value = data.room;
        if (data.checkout) updateDateField(data.checkout);
      }
    }

    socket.onerror = console.error;

    socket.onclose = (event) => {
      const message = event.wasClean 
        ? `Connection closed cleanly, code=${event.code}, reason=${event.reason}` 
        : 'Connection died unexpectedly';
      console.log(message);
    };

    function getClientId() {
      const userAgent = navigator.userAgent.toLowerCase();
      return userAgent.includes('android') ? 'samsung' :
             userAgent.includes('ipad') || userAgent.includes('iphone') || userAgent.includes('mac') ? 'ipad' : 'unknown';
    }

    function updateDateField(dateTimeString) {
      const datePart = dateTimeString.split(' ')[0];
      if (datePart) document.getElementById('CHECK-OUT').value = formatDate(datePart);
    }

    function formatDate(dateString) {
      const parts = dateString.split('/');
      return parts.length === 3 ? `${parts[2]}-${parts[1]}-${parts[0]}` : dateString;
    }
  </script>
</head>
<body>
  <script src="https://code.jquery.com/jquery-3.3.1.slim.min.js" integrity="sha384-q8i/X+965DzO0rT7abK41JStQIAqVgRVzpbzo5smXKp4YfRvH+8abtTE1Pi6jizo" crossorigin="anonymous"></script>
  <script src="https://cdn.jsdelivr.net/npm/popper.js@1.14.7/dist/umd/popper.min.js" integrity="sha384-UO2eT0CpHqdSJQ6hJty5KVphtPhzWj9WO1clHTMGa3JDZwrnQq4sF86dIHNDz0W1" crossorigin="anonymous"></script>
  <script src="https://cdn.jsdelivr.net/npm/bootstrap@4.3.1/dist/js/bootstrap.min.js" integrity="sha384-JjSmVgyd0p3pXB1rRibZUAYoIIy6OrQ6VrjIEaFf/nJGzIxFDsf4x0xIM+B07jRM" crossorigin="anonymous"></script>

<div class="container">
  <h2 class="mx-auto">REGISTER YOUR CAR</h2>
  
  <!-- Step 1: Select Reason for Visit with Buttons -->
  <div id="reason-buttons">
    <button type="button" class="btn btn-outline-primary btn-block mb-4" onclick="selectReason('guest')">Hotel Guest</button>
    <button type="button" class="btn btn-outline-secondary btn-block mb-4" onclick="selectReason('croft_mcgettigans')">Croft Bar or McGettigan's</button>
    <button type="button" class="btn btn-outline-info btn-block mb-4" onclick="selectReason('other')">Other Reason</button>
  </div>

  <!-- Change Reason and Submit Button -->
  <div id="change-reason" style="display: none;">
    <button type="button" class="btn btn-warning mb-3" onclick="changeReason()">Change Reason for Visit</button>
    <button type="button" class="btn btn-primary" data-toggle="modal" data-target="#submitModal" onclick="populateModal()">Submit</button>
  </div>

  <!-- Main Form -->
  <form id="registration-form" action="https://api.sheetmonkey.io/form/iQMYhHKk257VGevi81mAqL" method="post" class="needs-validation" novalidate>
    
    <!-- Common Fields: Name and Car Registration -->
    <div id="main-fields">
      <div class="form-group">
        <label for="NAME">*Your Name:</label>
        <input type="text" id="NAME" name="NAME" class="form-control" required>
      </div>
      <div class="form-group">
        <label for="CAR-REGISTRATION">*Car Registration / License Plate:</label>
        <input type="text" id="CAR-REGISTRATION" name="CAR-REGISTRATION" class="form-control" required>
      </div>
    </div>

    <!-- Conditional Fields -->
    <div id="guest-fields" class="conditional-fields">
      <div class="form-group">
        <label for="ROOM">*Room Number:</label>
        <input type="number" id="ROOM" name="ROOM" class="form-control" min="80" max="5118">
      </div>
      <input type="datetime-local" id="CHECK-IN" name="CHECK-IN" class="form-control" required hidden>
      <div class="form-group">
        <label for="CHECK-OUT">*Check-Out Date:</label>
        <input type="date" id="CHECK-OUT" name="CHECK-OUT" class="form-control">
      </div>
    </div>
    
    <div id="other-fields">
      <div class="form-group">
        <label for="OBSERVATIONS">Remarks (Optional):</label>
        <input type="text" id="OBSERVATIONS" name="OBSERVATIONS" class="form-control">
      </div>
    </div>

    <!-- Confirmation Checkbox -->
    <div id="confirm-section">
      <div class="form-check mb-3">
        <input type="checkbox" id="CONFIRMED" name="CONFIRMED" class="form-check-input" value="Yes" checked required>
        <label for="CONFIRMED" class="form-check-label">I confirm that the vehicle registration information provided above is accurate. I understand that any inaccuracies may result in unauthorized parking and will lead to my vehicle being clamped.</label>
        <p class="ml-2">By submitting, you agree to the terms stated above.</p>
      </div>      
    </div>
  </form>
</div>

<!-- Modal for Confirmation -->
<div class="modal fade" id="submitModal" tabindex="-1" role="dialog" aria-labelledby="submitModalLabel" aria-hidden="true">
  <div class="modal-dialog" role="document">
    <div class="modal-content">
      <div class="modal-header">
        <h5 class="modal-title" id="submitModalLabel">Please confirm your information!</h5>
        <button type="button" class="close" data-dismiss="modal" aria-label="Close">
          <span aria-hidden="true">&times;</span>
        </button>
      </div>
      <div class="modal-body" id="modalBody"></div>
      <div class="modal-footer">
        <button type="button" class="btn btn-secondary" data-dismiss="modal">Back</button>
        <button type="button" class="btn btn-primary" onclick="submitForm()">Confirm & Save</button>
      </div>
    </div>
  </div>
</div>

<!-- Script to Toggle Fields and Populate Modal -->
<script>
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
</script>

<script src="https://code.jquery.com/jquery-3.3.1.slim.min.js"></script>
<script src="https://cdn.jsdelivr.net/npm/popper.js@1.14.7/dist/umd/popper.min.js"></script>
<script src="https://cdn.jsdelivr.net/npm/bootstrap@4.3.1/dist/js/bootstrap.min.js"></script>

</body>
</html>
