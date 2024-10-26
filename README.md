<html lang="en">
<head>
  <!-- Required meta tags -->
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1, shrink-to-fit=no">

  <!-- Bootstrap CSS -->
  <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bootstrap@4.3.1/dist/css/bootstrap.min.css" integrity="sha384-ggOyR0iXCbMQv3Xipma34MD+dH/1fQ784/j6cY/iJTQUOhcWr7x9JvoRxT2MZw1T" crossorigin="anonymous">
  <link rel="stylesheet" href="reg.css">

  <!-- WebSocket & Helper Functions -->
  <script>
    const socket = new WebSocket('wss://car-reg-websocket-server.glitch.me');

    socket.onopen = () => {
      console.log('WebSocket connection established.');
      const clientId = getClientId();
      console.log(`Registering as: ${clientId}`);
      socket.send(JSON.stringify({ register: clientId }));
    };

    socket.onmessage = (event) => {
      console.log('Received message:', event.data);
      if (event.data instanceof Blob) {
        handleBlobData(event.data);
      } else {
        try {
          const message = JSON.parse(event.data);
          console.log('Parsed JSON:', message);
          updateUI(message);
        } catch (error) {
          console.error('Error parsing JSON:', error);
        }
      }
    };

    function handleBlobData(blob) {
      const reader = new FileReader();
      reader.onload = () => {
        const text = reader.result;
        console.log('Blob converted to text:', text);
        try {
          const message = JSON.parse(text);
          console.log('Parsed JSON from Blob:', message);
          updateUI(message);
        } catch (error) {
          console.error('Error parsing JSON from Blob:', error);
        }
      };
      reader.readAsText(blob);
    }

    function updateUI(data) {
      if (data.target && getClientId() === data.target) {
        if (data.name) document.getElementById('NAME').value = data.name;
        if (data.room) document.getElementById('ROOM').value = data.room;
        if (data.checkout) updateDateField(data.checkout);
      }
    }

    socket.onerror = (error) => {
      console.error('WebSocket error:', error);
    };

    socket.onclose = (event) => {
      if (event.wasClean) {
        console.log(`Connection closed cleanly, code=${event.code}, reason=${event.reason}`);
      } else {
        console.error('Connection died unexpectedly');
      }
    };

    function getClientId() {
      const userAgent = navigator.userAgent.toLowerCase();
      return userAgent.includes('android') ? 'samsung' : 
             userAgent.includes('ipad') || userAgent.includes('iphone') || userAgent.includes('mac') ? 'ipad' : 
             'unknown';
    }

    function updateDateField(dateTimeString) {
      const datePart = dateTimeString.split(' ')[0];
      if (datePart) {
        const formattedDate = formatDate(datePart);
        console.log(formattedDate);
        document.getElementById('CHECK-OUT').value = formattedDate;
      } else {
        console.error('Invalid date format received from server:', dateTimeString);
      }
    }

    function formatDate(dateString) {
      const parts = dateString.split('/');
      return parts.length === 3 ? `${parts[2]}-${parts[1]}-${parts[0]}` : dateString;
    }
  </script>
</head>

<body>
  <!-- Form Submission & Validation Scripts -->
  <script src="https://code.jquery.com/jquery-3.3.1.slim.min.js" integrity="sha384-q8i/X+965DzO0rT7abK41JStQIAqVgRVzpbzo5smXKp4YfRvH+8abtTE1Pi6jizo" crossorigin="anonymous"></script>
  <script src="https://cdn.jsdelivr.net/npm/popper.js@1.14.7/dist/umd/popper.min.js" integrity="sha384-UO2eT0CpHqdSJQ6hJty5KVphtPhzWj9WO1clHTMGa3JDZwrnQq4sF86dIHNDz0W1" crossorigin="anonymous"></script>
  <script src="https://cdn.jsdelivr.net/npm/bootstrap@4.3.1/dist/js/bootstrap.min.js" integrity="sha384-JjSmVgyd0p3pXB1rRibZUAYoIIy6OrQ6VrjIEaFf/nJGzIxFDsf4x0xIM+B07jRM" crossorigin="anonymous"></script>
  <script src="reg.js"></script>

  <!-- Form -->
  <form action="https://api.sheetmonkey.io/form/iQMYhHKk257VGevi81mAqL" method="post" class="needs-validation" novalidate>
    <!-- Input Fields -->
    <div class="form-group">
      <label for="NAME">*Your Name:</label>
      <input type="text" id="NAME" name="NAME" class="form-control" autocomplete="off" onkeyup="this.value = this.value.toUpperCase();" required>
    </div>

    <div class="form-group">
      <label for="CAR-REGISTRATION">*Car Registration / License Plate:</label>
      <input type="text" id="CAR-REGISTRATION" name="CAR-REGISTRATION" class="form-control" autocomplete="off" onkeyup="this.value = this.value.toUpperCase();" required>
    </div>

    <!-- Radio Buttons for Reason Selection -->
    <div class="form-group row g-2">
      <input type="radio" id="GUEST" name="REASON" value="guest" style="margin-left:15px" checked>
      <label class="role" for="GUEST">Hotel Guest</label>
      <input type="radio" id="CROFT" name="REASON" value="croft">
      <label class="role" for="CROFT">Croft Bar</label>
      <input type="radio" id="MCG" name="REASON" value="mcg" style="margin-left:15px">
      <label class="role" for="MCG">McGettigan's</label>
      <input type="radio" id="OTHER" name="REASON" value="other">
      <label class="role" for="OTHER">Other Reason</label>
    </div>

    <!-- Guest Information -->
    <div id="GUEST-INFO">
      <div class="form-group row">
        <label for="ROOM" class="col-sm-5">*Room Number:</label>
        <label for="CHECK-OUT" class="col-sm-5" style="margin-left:40px">*Check-Out Date:</label>
      </div>
      <div class="form-group row">
        <input type="number" min="80" max="5118" id="ROOM" name="ROOM" class="form-control col-sm-5" autocomplete="off" required>
        <input type="datetime-local" id="CHECK-IN" name="CHECK-IN" class="form-control" autocomplete="off" required hidden>
        <input type="date" id="CHECK-OUT" name="CHECK-OUT" class="form-control col-sm-5" style="margin-left:30px" autocomplete="off" required>
      </div>
    </div>

    <!-- Additional Observations -->
    <div class="form-group">
      <label for="OBSERVATIONS">Remarks (Optional):</label>
      <input type="text" id="OBSERVATIONS" name="OBSERVATIONS" class="form-control" autocomplete="off" style="text-transform: capitalize;">
    </div>

    <!-- Confirmation Checkbox -->
    <div class="row g-2" style="margin-bottom:1rem">
      <input class="form-check-input" type="checkbox" id="CONFIRMED" name="CONFIRMED" value="Yes" style="margin-left:15px" checked required>
      <label class="form-check-label col-md-11" for="CONFIRMED" style="word-wrap:break-word; margin-left:20px">
        I confirm that the vehicle registration information provided above is accurate. I understand that any inaccuracies may result in unauthorized parking and will lead to my vehicle being clamped.
      </label>
    </div>
    <p style="margin-left:15px">By submitting, you agree to the terms stated above.</p>

    <!-- Submit Modal Trigger -->
    <button type="button" class="btn btn-primary btn-lg btn-block" data-toggle="modal" data-target="#submitModal" onClick="submitText()">SUBMIT</button>

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
          <div class="modal-body" id="bodyModal"></div
