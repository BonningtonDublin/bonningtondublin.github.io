<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bootstrap@4.3.1/dist/css/bootstrap.min.css">
  
  <style>
    .conditional-fields, #main-fields, #other-fields, #confirm-section { display: none; }
  </style>

</head>
<body>
  <script src="https://code.jquery.com/jquery-3.3.1.slim.min.js" integrity="sha384-q8i/X+965DzO0rT7abK41JStQIAqVgRVzpbzo5smXKp4YfRvH+8abtTE1Pi6jizo" crossorigin="anonymous"></script>
  <script src="https://cdn.jsdelivr.net/npm/popper.js@1.14.7/dist/umd/popper.min.js" integrity="sha384-UO2eT0CpHqdSJQ6hJty5KVphtPhzWj9WO1clHTMGa3JDZwrnQq4sF86dIHNDz0W1" crossorigin="anonymous"></script>
  <script src="https://cdn.jsdelivr.net/npm/bootstrap@4.3.1/dist/js/bootstrap.min.js" integrity="sha384-JjSmVgyd0p3pXB1rRibZUAYoIIy6OrQ6VrjIEaFf/nJGzIxFDsf4x0xIM+B07jRM" crossorigin="anonymous"></script>
  <script src="reg.js"></script>

<div class="container">
  <h2 class="mx-auto">REGISTER YOUR CAR</h2>
  
  <!-- Step 1: Select Reason for Visit with Buttons -->
  <div id="reason-buttons">
    <button type="button" class="btn btn-outline-primary btn-block mb-4" onclick="selectReason('guest')">Hotel Guest</button>
    <button type="button" class="btn btn-outline-secondary btn-block mb-4" onclick="selectReason('croft_mcgettigans')">Croft Bar or McGettigan's</button>
    <button type="button" class="btn btn-outline-info btn-block mb-4" onclick="selectReason('other')">Other Reason</button>
  </div>

  <!-- Change Reason Button -->
  <div id="change-reason" style="display: none;">
    <button type="button" class="btn btn-warning mb-3" onclick="changeReason()">Change Reason for Visit</button>
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

    <!-- Confirmation Checkbox and Submit Button -->
    <div id="confirm-section">
      <div class="form-check mb-3">
        <input type="checkbox" id="CONFIRMED" name="CONFIRMED" class="form-check-input" value="Yes" checked required>
        <label for="CONFIRMED" class="form-check-label">I confirm that the vehicle registration information provided above is accurate. I understand that any inaccuracies may result in unauthorized parking and will lead to my vehicle being clamped.</label>
        <p class="ml-2">By submitting, you agree to the terms stated above.</p>
      </div>
      <button type="button" class="btn btn-primary" data-toggle="modal" data-target="#submitModal" onclick="populateModal()">Submit</button>
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

<script src="https://code.jquery.com/jquery-3.3.1.slim.min.js"></script>
<script src="https://cdn.jsdelivr.net/npm/popper.js@1.14.7/dist/umd/popper.min.js"></script>
<script src="https://cdn.jsdelivr.net/npm/bootstrap@4.3.1/dist/js/bootstrap.min.js"></script>

</body>
</html>
