<!DOCTYPE html>
<html lang="en">
<head>
  <!-- Required meta tags and Bootstrap CSS -->
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1, shrink-to-fit=no">
  <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bootstrap@4.3.1/dist/css/bootstrap.min.css" integrity="sha384-ggOyR0iXCbMQv3Xipma34MD+dH/1fQ784/j6cY/iJTQUOhcWr7x9JvoRxT2MZw1T" crossorigin="anonymous">
  <link rel="stylesheet" href="reg.css">

  <style>
    /* Center the selection screen */
    #initialSelection {
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      height: 100vh;
    }
    .hidden {
      display: none;
    }
  </style>

  <script>
    function showForm(reason) {
      // Hide the initial selection screen and show the form container
      document.getElementById('initialSelection').classList.add('hidden');
      document.getElementById('formContainer').classList.remove('hidden');

      // Show specific fields based on the reason selected
      document.getElementById('GUEST-INFO').style.display = reason === 'guest' ? 'block' : 'none';
      document.getElementById('OBSERVATIONS').parentElement.style.display = reason === 'other' ? 'block' : 'none';
    }
  </script>
</head>

<body>
  <!-- Initial Selection Screen -->
  <div id="initialSelection">
    <h3>Select your reason for visit:</h3>
    <button class="btn btn-primary btn-lg my-2" onclick="showForm('guest')">Hotel Guest</button>
    <button class="btn btn-primary btn-lg my-2" onclick="showForm('croft')">Croft Bar / McGettigans</button>
    <button class="btn btn-primary btn-lg my-2" onclick="showForm('other')">Other Reason</button>
  </div>

  <!-- Form Container (Initially Hidden) -->
  <div id="formContainer" class="hidden">
    <form action="https://api.sheetmonkey.io/form/iQMYhHKk257VGevi81mAqL" method="post" class="needs-validation" novalidate>
      
      <div class="form-group">
        <label for="NAME">*Your Name:</label>
        <input type="text" id="NAME" name="NAME" class="form-control" autocomplete="off" onkeyup="this.value = this.value.toUpperCase();" required>
      </div>

      <div class="form-group">
        <label for="CAR-REGISTRATION">*Car Registration / License Plate:</label>
        <input type="text" id="CAR-REGISTRATION" name="CAR-REGISTRATION" class="form-control" autocomplete="off" onkeyup="this.value = this.value.toUpperCase();" required>
      </div>

      <!-- Guest Info for "Hotel Guest" -->
      <div id="GUEST-INFO" class="hidden">
        <div class="form-group row">
          <label for="ROOM" class="col-sm-5">*Room Number:</label>
          <label for="CHECK-OUT" class="col-sm-5" style="margin-left:40px">*Check-Out Date:</label>
        </div>
        <div class="form-group row">
          <input type="number" min="80" max="5118" id="ROOM" name="ROOM" class="form-control col-sm-5" autocomplete="off">
          <input type="date" id="CHECK-OUT" name="CHECK-OUT" class="form-control col-sm-5" style="margin-left:30px" autocomplete="off">
        </div>
      </div>

      <!-- Remarks for "Other Reason" -->
      <div class="form-group hidden" id="remarksSection">
        <label for="OBSERVATIONS">Remarks (Optional):</label>
        <input type="text" id="OBSERVATIONS" name="OBSERVATIONS" class="form-control" autocomplete="off" style="text-transform: capitalize;">
      </div>

      <!-- Confirmation Checkbox -->
      <div class="row g-2" style="margin-bottom:1rem">          
        <input class="form-check-input" type="checkbox" id="CONFIRMED" name="CONFIRMED" value="Yes" style="margin-left:15px" checked required>
        <label class="form-check-label col-md-11" for="CONFIRMED" style="margin-left:20px">
          I confirm that the vehicle registration information provided above is accurate. Any inaccuracies may result in unauthorized parking and my vehicle being clamped.
        </label>
      </div>

      <p style="margin-left:15px">By submitting, you agree to the terms stated above.</p>

      <!-- Submit Button -->
      <button type="button" class="btn btn-primary btn-lg btn-block" data-toggle="modal" data-target="#submitModal" onclick="submitText()">
        SUBMIT
      </button>

      <!-- Modal -->
      <div class="modal fade" id="submitModal">
        <div class="modal-dialog">
          <div class="modal-content">
            <div class="modal-header">
              <h4 class="modal-title" id="submitModalLabel">Please confirm your information!</h4>
              <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                <span aria-hidden="true">&times;</span>
              </button>
            </div>
            <div class="modal-body" id="bodyModal"></div>
            <div class="modal-footer">
              <button type="button" class="btn btn-secondary btn-lg" data-dismiss="modal">Back</button>
              <button type="submit" class="btn btn-primary btn-lg">Confirm & Save</button>
            </div>
          </div>
        </div>
      </div>
    </form>
  </div>

  <!-- jQuery, Popper, and Bootstrap JS -->
  <script src="https://code.jquery.com/jquery-3.3.1.slim.min.js" crossorigin="anonymous"></script>
  <script src="https://cdn.jsdelivr.net/npm/popper.js@1.14.7/dist/umd/popper.min.js" crossorigin="anonymous"></script>
  <script src="https://cdn.jsdelivr.net/npm/bootstrap@4.3.1/dist/js/bootstrap.min.js" crossorigin="anonymous"></script>
</body>
</html>
