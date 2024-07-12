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
      const clientId;

      socket.onopen = function() {
        console.log('WebSocket connection established.');
        clientId = getClientId();
        console.log(`Registering as: ${clientId}`);
        socket.send(JSON.stringify({ register: clientId }));
      };

      socket.onmessage = function(event) {
        console.log('Received message:', event.data);

        // Check if the received data is a Blob
        if (event.data instanceof Blob) {
          // Handle Blob data (binary data) as needed
          handleBlobData(event.data);
        } else {
          // Assume it's JSON and try to parse it
          try {
            const message = JSON.parse(event.data);
            console.log('Parsed JSON:', message);
            // Process and update UI with JSON data
            updateUI(message);
          } catch (error) {
            console.error('Error parsing JSON:', error);
          }
        }
      };

      function handleBlobData(blob) {
        // Example: Convert Blob to a readable format (like text)
        const reader = new FileReader();
        reader.onload = function() {
          const text = reader.result;
          console.log('Blob converted to text:', text);
          try {
              const message = JSON.parse(text);
              console.log('Parsed JSON from Blob:', message);
              // Process and update UI with JSON data
              updateUI(message);
            } catch (error) {
              console.error('Error parsing JSON from Blob:', error);
            }
        };
        reader.readAsText(blob);
      }

      function updateUI(data) {
        if(data.target) {
            if(clientId == data.target) {
            if(data.name) document.getElementById('NAME').value = data.name;
            if(data.room) document.getElementById('ROOM').value = data.room;
            if(data.checkout) updateDateField(data.checkout);
          }
        }
      }


      socket.onerror = function(error) {
        console.error('WebSocket error: ', error);
      };

      socket.onclose = function(event) {
        if (event.wasClean) {
          console.log(`Connection closed cleanly, code=${event.code}, reason=${event.reason}`);
        } else {
          console.error('Connection died unexpectedly');
        }
      };

      function getClientId() {
        const userAgent = navigator.userAgent.toLowerCase();
        if (userAgent.includes('android')) {
          return 'samsung'; // Samsung
        } else if (userAgent.includes('ipad') || userAgent.includes('iphone') || userAgent.includes('mac')) {
          return 'ipad'; // Apple
        }
        return 'unknown';
      }

      function updateDateField(dateTimeString) {
        const dateTimeParts = dateTimeString.split(' ');
        if (dateTimeParts.length > 0) {
          const datePart = dateTimeParts[0];
          const formattedDate = formatDate(datePart);
          console.log(datePart);
          console.log(formattedDate);
          document.getElementById('CHECK-OUT').value = formattedDate;
        } else {
          console.error('Invalid date format received from server:', dateTimeString);
        }
      }

      function formatDate(dateString) {
        const parts = dateString.split('/');
        if (parts.length === 3) {
          return `${parts[2]}-${parts[1]}-${parts[0]}`;
        } else {
          console.error('Invalid date format:', dateString);
          return dateString;
        }
      }
    </script>

  </head>

 <!-- Optional JavaScript - jQuery first, then Popper.js, then Bootstrap JS -->
  <script src="https://code.jquery.com/jquery-3.3.1.slim.min.js" integrity="sha384-q8i/X+965DzO0rT7abK41JStQIAqVgRVzpbzo5smXKp4YfRvH+8abtTE1Pi6jizo" crossorigin="anonymous"></script>
  <script src="https://cdn.jsdelivr.net/npm/popper.js@1.14.7/dist/umd/popper.min.js" integrity="sha384-UO2eT0CpHqdSJQ6hJty5KVphtPhzWj9WO1clHTMGa3JDZwrnQq4sF86dIHNDz0W1" crossorigin="anonymous"></script>
  <script src="https://cdn.jsdelivr.net/npm/bootstrap@4.3.1/dist/js/bootstrap.min.js" integrity="sha384-JjSmVgyd0p3pXB1rRibZUAYoIIy6OrQ6VrjIEaFf/nJGzIxFDsf4x0xIM+B07jRM" crossorigin="anonymous"></script>

  <!-- Internal Functions -->
  <script type="text/javascript" src="reg.js"></script>


<form action="https://api.sheetmonkey.io/form/iQMYhHKk257VGevi81mAqL" method="post" class="needs-validation" novalidate>
    <div class="form-group">
      <label for="NAME">*Your Name:</label>
      <input type="text" id="NAME" name="NAME" class="form-control" autocomplete="off" onkeyup="this.value = this.value.toUpperCase();" required>
    </div>
    <div class="form-group">
      <label for="CAR-REGISTRATION">*Car Registration / License Plate:</label>
      <input type="text" id="CAR-REGISTRATION" name="CAR-REGISTRATION" class="form-control" autocomplete="off" onkeyup="this.value = this.value.toUpperCase();" required>
    </div>

    <div class="form-group row g-2">
      <input type="radio" id="GUEST" name="REASON" value="guest" style="margin-left:15px" checked>
      <label class="role" for="GUEST">Hotel Guest</label>
      <input type="radio" id="CROFT" name="REASON" value="croft">
      <label class="role" for="CROFT">Croft Bar</label>
    </div>
    <div class="form-group row g-2">
      <input type="radio" id="MCG" name="REASON" value="mcg" style="margin-left:15px" >
      <label class="role" for="MCG">McGettigan's</label>
      <input type="radio" id="OTHER" name="REASON" value="other">
      <label class="role" for="OTHER">Other Reason</label>
    </div>

    <div id="GUEST-INFO">
      <div class="form-group row">
        <label for="ROOM" class="col-sm-5">*Room Number:</label>
        <label for="CHECK-OUT" class="col-sm-5" style="margin-left:40px">*Check-Out Date:</label>
      </div>
      <div class="form-group row">
        <label style="padding-left:15px"></label>
        <input type="number" min="80" max="5118" id="ROOM" name="ROOM" class="form-control col-sm-5" autocomplete="off" required>
        <input type="datetime-local" id="CHECK-IN" name="CHECK-IN" class="form-control" autocomplete="off" required hidden>
        <input type="date" id="CHECK-OUT" name="CHECK-OUT" class="form-control col-sm-5" style="margin-left:30px" autocomplete="off" required>
      </div>
    </div>

    <div class="form-group">
      <label for="OBSERVATIONS">Remarks (Optional):</label>
      <input type="text" id="OBSERVATIONS" name="OBSERVATIONS" class="form-control" autocomplete="off" style="text-transform: capitalize;">
    </div>

    <div class="row g-2" style="margin-bottom:1rem">          
      <input class="form-check-input" type="checkbox" id="CONFIRMED" name="CONFIRMED" value="Yes" style="margin-left:15px" required>
      <label class="form-check-label col-md-11" for="CONFIRMED" style="word-wrap:break-word; margin-left:20px">
        I confirm that the vehicle registration information provided above is accurate. I understand that any inaccuracies may result in unauthorized parking and will lead to my vehicle being clamped.
      </label>
    </div>

    <!-- Button trigger modal -->
    <button type="button" class="btn btn-primary btn-lg btn-block" data-toggle="modal" data-target="#submitModal" onClick="submitText()"> <!-- here was an syntax error. you were calling method by uts name without () sign -->
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
          <div class="modal-body" id="bodyModal">
          </div>
          <div class="modal-footer">
            <button type="button" class="btn btn-secondary btn-lg" data-dismiss="modal">Back</button>
            <button type="submit" class="btn btn-primary btn-lg" data-toggle="modal" data-target="#submitModal">Confirm & Save</button>
          </div>
        </div>
      </div>
    </div>
  </form>
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
