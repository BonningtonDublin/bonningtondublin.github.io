<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bootstrap@4.3.1/dist/css/bootstrap.min.css">
  <title>REGISTER YOUR CAR</title>
  <style>
    .conditional-fields { display: none; }
  </style>
</head>
<body>

<div class="container">
  <h2>REGISTER YOUR CAR</h2>
  
  <!-- Main Form -->
  <form id="registration-form" class="needs-validation" novalidate>
    
    <!-- Step 1: Select Reason for Visit -->
    <div class="form-group">
      <label><strong>Select Reason for Visit:</strong></label>
      <div class="form-check">
        <input type="radio" id="GUEST" name="REASON" value="guest" class="form-check-input" onclick="toggleFields()" required>
        <label class="form-check-label" for="GUEST">Hotel Guest</label>
      </div>
      <div class="form-check">
        <input type="radio" id="CROFT_MCG" name="REASON" value="croft_mcgettigans" class="form-check-input" onclick="toggleFields()">
        <label class="form-check-label" for="CROFT_MCG">Croft Bar or McGetigan's</label>
      </div>
      <div class="form-check">
        <input type="radio" id="OTHER" name="REASON" value="other" class="form-check-input" onclick="toggleFields()">
        <label class="form-check-label" for="OTHER">Other Reason</label>
      </div>
    </div>
    
    <!-- Common Fields: Name and Car Registration -->
    <div class="form-group">
      <label for="NAME">*Your Name:</label>
      <input type="text" id="NAME" name="NAME" class="form-control" required>
    </div>
    <div class="form-group">
      <label for="CAR-REGISTRATION">*Car Registration / License Plate:</label>
      <input type="text" id="CAR-REGISTRATION" name="CAR-REGISTRATION" class="form-control" required>
    </div>
    
    <!-- Conditional Fields -->
    <div id="guest-fields" class="conditional-fields">
      <div class="form-group">
        <label for="ROOM">*Room Number:</label>
        <input type="number" id="ROOM" name="ROOM" class="form-control" min="80" max="5118">
      </div>
      <div class="form-group">
        <label for="CHECK-OUT">*Check-Out Date:</label>
        <input type="date" id="CHECK-OUT" name="CHECK-OUT" class="form-control">
      </div>
    </div>
    
    <div id="other-fields" class="conditional-fields">
      <div class="form-group">
        <label for="OBSERVATIONS">Remarks (Optional):</label>
        <input type="text" id="OBSERVATIONS" name="OBSERVATIONS" class="form-control">
      </div>
    </div>
    
    <!-- Confirmation and Submit -->
    <div class="form-check mb-3">
      <input type="checkbox" id="CONFIRMED" name="CONFIRMED" class="form-check-input" required>
      <label for="CONFIRMED" class="form-check-label">I confirm that the information provided is accurate.</label>
    </div>
    <button type="button" class="btn btn-primary" data-toggle="modal" data-target="#submitModal" onclick="populateModal()">Submit</button>
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
  function toggleFields() {
    const guestFields = document.getElementById("guest-fields");
    const otherFields = document.getElementById("other-fields");
    
    if (document.getElementById("GUEST").checked) {
      guestFields.style.display = "block";
      otherFields.style.display = "none";
      document.getElementById("ROOM").required = true;
      document.getElementById("CHECK-OUT").required = true;
      document.getElementById("OBSERVATIONS").required = false;
    } else if (document.getElementById("OTHER").checked) {
      guestFields.style.display = "none";
      otherFields.style.display = "block";
      document.getElementById("ROOM").required = false;
      document.getElementById("CHECK-OUT").required = false;
      document.getElementById("OBSERVATIONS").required = false;
    } else {
      guestFields.style.display = "none";
      otherFields.style.display = "none";
    }
  }

  function populateModal() {
    const reason = document.querySelector("input[name='REASON']:checked").value;
    const name = document.getElementById("NAME").value;
    const carRegistration = document.getElementById("CAR-REGISTRATION").value;
    const room = document.getElementById("ROOM").value;
    const checkout = document.getElementById("CHECK-OUT").value;
    const remarks = document.getElementById("OBSERVATIONS").value;

    let confirmationText = `<strong>Reason for Visit:</strong> ${reason}<br>
                            <strong>Name:</strong> ${name}<br>
                            <strong>Car Registration:</strong> ${carRegistration}<br>`;
    
    if (reason === "guest") {
      confirmationText += `<strong>Room Number:</strong> ${room}<br>
                           <strong>Check-Out Date:</strong> ${checkout}`;
    } else if (reason === "other") {
      confirmationText += `<strong>Remarks:</strong> ${remarks}`;
    }
    
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
