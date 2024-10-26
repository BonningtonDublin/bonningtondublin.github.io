<html lang="en">
<head>
  <!-- Required meta tags -->
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1, shrink-to-fit=no">
  
  <!-- Bootstrap CSS -->
  <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bootstrap@4.3.1/dist/css/bootstrap.min.css" integrity="sha384-ggOyR0iXCbMQv3Xipma34MD+dH/1fQ784/j6cY/iJTQUOhcWr7x9JvoRxT2MZw1T" crossorigin="anonymous">
  <link rel="stylesheet" href="reg.css">

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
  <script src="reg.js"></script>

  <form action="https://api.sheetmonkey.io/form/iQMYhHKk257VGevi81mAqL" method="post" class="needs-validation" novalidate>
    <div class="form-group">
      <label for="NAME">*Your Name:</label>
      <input type="text" id="NAME" name="NAME" class="form-control" autocomplete="off" onkeyup="this.value = this.value.toUpperCase();" required>
    </div>

    <div class="form-group">
      <label for="CAR-REGISTRATION">*Car Registration / License Plate:</label>
      <input type="text" id="CAR-REGISTRATION" name="CAR-REGISTRATION" class="form-control" autocomplete="off" onkeyup="this.value = this.value.toUpperCase();" required>
    </div>

    <div class="form-group">
      <label>Reason:</label>
      <div class="form-check">
        <input type="radio" id="GUEST" name="REASON" value="guest" class="form-check-input" checked>
        <label class="form-check-label" for="GUEST">Hotel Guest</label>
      </div>
      <div class="form-check">
        <input type="radio" id="CROFT_MCG" name="REASON" value="croft_mcgettigans" class="form-check-input">
        <label class="form-check-label" for="CROFT_MCG">Croft Bar or McGetigan's</label>
      </div>
      <div class="form-check">
        <input type="radio" id="OTHER" name="REASON" value="other" class="form-check-input">
        <label class="form-check-label" for="OTHER">Other Reason</label>
      </div>
    </div>

    <div id="GUEST-INFO" class="mb-3">
      <div class="form-group row">
        <label for="ROOM" class="col-sm-5">*Room Number:</label>
        <label for="CHECK-OUT" class="col-sm-5">*Check-Out Date:</label>
      </div>
      <div class="form-group row">
        <input type="number" min="80" max="5118" id="ROOM" name="ROOM" class="form-control col-sm-5" required>
      </div>
      <div class="form-group row mt-3">
        <input type="datetime-local" id="CHECK-IN" name="CHECK-IN" class="form-control" style="margin-left:15px" required hidden>
        <input type="date" id="CHECK-OUT" name="CHECK-OUT" class="form-control col-sm-5" style="margin-left:5px" required>
      </div>
    </div>

    <div class="form-group">
      <label for="OBSERVATIONS">Remarks (Optional):</label>
      <input type="text" id="OBSERVATIONS" name="OBSERVATIONS" class="form-control" autocomplete="off" style="text-transform: capitalize;">
    </div>

    <div class="row g-2 mb-3">
      <input class="form-check-input" type="checkbox" id="CONFIRMED" name="CONFIRMED" value="Yes" checked required>
      <label class="form-check-label" for="CONFIRMED">
        I confirm that the vehicle registration information provided above is accurate. I understand that any inaccuracies may result in unauthorized parking and will lead to my vehicle being clamped.
      </label>
    </div>
    <p class="ml-2">By submitting, you agree to the terms stated above.</p>

    <button type="button" class="btn btn-primary btn-lg btn-block" data-toggle="modal" data-target="#submitModal" onClick="submitText()">SUBMIT</button>

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

  <script>
    function submitText() {     
      const reason = $("input[name='REASON']:checked").val();
      let html = reason === 'guest' 
        ? `Car Registration: <div class='font-weight-bold'>${$("#CAR-REGISTRATION").val()}</div><br>Check-Out Date: <div class='font-weight-bold'>${$("#CHECK-OUT").val()}</div>`
        : `Name: <div class='font-weight-bold'>${$("#NAME").val()}</div><br>Car Registration: <div class='font-weight-bold'>${$("#CAR-REGISTRATION").val()}</div><br>Remarks: <div class='font-weight-bold'>${$("#OBSERVATIONS").val()}</div>`;
      $("#bodyModal").html(html);
    }

    (function () {
      'use strict';
      const forms = document.querySelectorAll('.needs-validation');
      Array.prototype.slice.call(forms).forEach((form) => {
        form.addEventListener('submit', (event) => {
          if (!form.checkValidity()) {
            event.preventDefault();
            event.stopPropagation();
          }
          form.classList.add('was-validated');
        }, false);
      });
    })();
  </script>
</body>
</html>
