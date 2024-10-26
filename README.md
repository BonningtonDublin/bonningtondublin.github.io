<html lang="en">
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1, shrink-to-fit=no">
  <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bootstrap@4.3.1/dist/css/bootstrap.min.css" integrity="sha384-ggOyR0iXCbMQv3Xipma34MD+dH/1fQ784/j6cY/iJTQUOhcWr7x9JvoRxT2MZw1T" crossorigin="anonymous">
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
      display: none; /* Hides elements with this class */
    }
  </style>

  <script>
    function showForm(reason) {
      // Hide the initial selection buttons
      document.getElementById('initialSelection').classList.add('hidden');
      
      // Show the form and specific fields based on the reason selected
      document.getElementById('formContainer').classList.remove('hidden');
      document.getElementById('GUEST-INFO').style.display = reason === 'guest' ? 'block' : 'none';
      document.getElementById('remarksSection').style.display = reason === 'other' ? 'block' : 'none';

      // Display the "Change Reason" button
      document.getElementById('changeReason').classList.remove('hidden');
    }

    function changeReason() {
      // Show initial selection buttons and hide form container
      document.getElementById('initialSelection').classList.remove('hidden');
      document.getElementById('formContainer').classList.add('hidden');

      // Hide specific sections within the form
      document.getElementById('GUEST-INFO').style.display = 'none';
      document.getElementById('remarksSection').style.display = 'none';

      // Hide the "Change Reason" button
      document.getElementById('changeReason').classList.add('hidden');
    }
  </script>
</head>

<body>
  <!-- Initial Selection Screen -->
  <div id="initialSelection" class="hidden">
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
    <!-- "Change Reason" Button -->
    <button id="changeReason" class="btn btn-link hidden" onclick="changeReason()">Change Reason</button>
  </div>

  <!-- jQuery, Popper, and Bootstrap JS -->
  <script src="https://code.jquery.com/jquery-3.3.1.slim.min.js" crossorigin="anonymous"></script>
  <script src="https://cdn.jsdelivr.net/npm/popper.js@1.14.7/dist/umd/popper.min.js" crossorigin="anonymous"></script>
  <script src="https://cdn.jsdelivr.net/npm/bootstrap@4.3.1/dist/js/bootstrap.min.js" crossorigin="anonymous"></script>
</body>
</html>


<script>

//add info to modal
function submitText(){     
  jQuery("input[name='REASON']").each(function() {
  console.log( this.value + ":" + this.checked );
    if(this.checked){
      if(this.value === 'guest'){
        var html="Car Registration: <div class='font-weight-bold'>"+$("#CAR-REGISTRATION").val() + "</div>"
                  +"<br>Check-Out Date: <div class='font-weight-bold'>"+$("#CHECK-OUT").val() + "</div>";
        $("#bodyModal").html(html);
      }
      else{
        var html="Name: <div class='font-weight-bold'>"+$("#NAME").val() + "</div>"
                  +"<br>Car Registration: <div class='font-weight-bold'>"+$("#CAR-REGISTRATION").val() + "</div>"
                  +"<br>Remarks: <div class='font-weight-bold'>"+$("#OBSERVATIONS").val() + "</div>";
        $("#bodyModal").html(html);
      }
    }
  });
}

//JavaScript for disabling form submissions if there are invalid fields
(function () {
  'use strict'

  // Fetch all the forms we want to apply custom Bootstrap validation styles to
  var forms = document.querySelectorAll('.needs-validation')

  // Loop over them and prevent submission
  Array.prototype.slice.call(forms)
    .forEach(function (form) {
      form.addEventListener('submit', function (event) {
        if (!form.checkValidity()) {
          event.preventDefault()
          event.stopPropagation()
        }

        form.classList.add('was-validated')
      }, false)
    })
})()
</script>
