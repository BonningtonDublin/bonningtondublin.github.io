<html lang="en">
  <head>
  <!-- Required meta tags -->
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1, shrink-to-fit=no">
    <!-- Bootstrap CSS -->
    <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bootstrap@4.3.1/dist/css/bootstrap.min.css" integrity="sha384-ggOyR0iXCbMQv3Xipma34MD+dH/1fQ784/j6cY/iJTQUOhcWr7x9JvoRxT2MZw1T" crossorigin="anonymous">
    <link rel="stylesheet" href="reg.css">
  </head>

 <!-- Optional JavaScript  
 jQuery first, then Popper.js, then Bootstrap JS -->
    <script src="https://code.jquery.com/jquery-3.3.1.slim.min.js" integrity="sha384-q8i/X+965DzO0rT7abK41JStQIAqVgRVzpbzo5smXKp4YfRvH+8abtTE1Pi6jizo" crossorigin="anonymous"></script>
    <script src="https://cdn.jsdelivr.net/npm/popper.js@1.14.7/dist/umd/popper.min.js" integrity="sha384-UO2eT0CpHqdSJQ6hJty5KVphtPhzWj9WO1clHTMGa3JDZwrnQq4sF86dIHNDz0W1" crossorigin="anonymous"></script>
    <script src="https://cdn.jsdelivr.net/npm/bootstrap@4.3.1/dist/js/bootstrap.min.js" integrity="sha384-JjSmVgyd0p3pXB1rRibZUAYoIIy6OrQ6VrjIEaFf/nJGzIxFDsf4x0xIM+B07jRM" crossorigin="anonymous"></script>


<form action="https://api.sheetmonkey.io/form/iQMYhHKk257VGevi81mAqL" method="post" class="font-weight-bold text-uppercase">
    <div class="form-group">
    <label for="NAME">*Your Name:</label>
    <input type="text" id="NAME" name="NAME" class="form-control" autocomplete="off" onkeyup="this.value = this.value.toUpperCase();" required>
    </div>
    <div class="form-group">
    <label for="CAR-REGISTRATION">*Car Registration / License Plate:</label>
    <input type="text" id="CAR-REGISTRATION" name="CAR-REGISTRATION" class="form-control" autocomplete="off" onkeyup="this.value = this.value.toUpperCase();" required>
    </div>
    <div class="form-group row">
    <label for="ROOM" class="col-sm-5">*Room Number:</label>
    <label for="CHECK-OUT" class="col-sm-6" style="margin-left:40px">*Check-Out Date:</label>
    </div>
    <div class="form-group row">
    <label style="padding-left:15px"></label>
    <input type="number" min="80" max="5118" id="ROOM" name="ROOM" class="form-control col-sm-5" autocomplete="off" required>
    <input type="datetime-local" id="CHECK-IN" name="CHECK-IN" class="form-control" autocomplete="off" required hidden>
    <input type="date" id="CHECK-OUT" name="CHECK-OUT" class="form-control col-sm-6" style="margin-left:30px" autocomplete="off" required>
    </div>
    <div class="form-group">
    <label for="OBSERVATIONS">Remarks (Optional):</label>
    <input type="text" id="OBSERVATIONS" name="OBSERVATIONS" class="form-control" autocomplete="off" style="text-transform: capitalize;">
    </div>
    <div class="form-group">    
    <label for="CONFIRMED" style="word-wrap:break-word">
    <input type="checkbox" id="CONFIRMED" name="CONFIRMED" value="Yes" required> I confirm that the vehicle registration information provided above is accurate and true to the best of my knowledge. I understand that any inaccuracies may result in unauthorized parking and will lead to my vehicle being clamped.</label>
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
            <h5 class="modal-title" id="submitModalLabel">Please confirm your information!</h5>
            <button type="button" class="close" data-dismiss="modal" aria-label="Close">
              <span aria-hidden="true">&times;</span>
            </button>
          </div>
          <div class="modal-body" id="bodyModal">
          </div>
          <div class="modal-footer">
            <button type="button" class="btn btn-secondary btn-lg" data-dismiss="modal">Make Changes</button>
            <button type="submit" class="btn btn-primary btn-lg" data-toggle="modal" data-target="#submitModal">Confirm & Save</button>
          </div>
        </div>
      </div>
    </div>
  </form>
</html>

<script>

// getFullYear, getMonth, getDate, getHours, getMinutes all return values of local time.
const convertToDateTimeLocalString = (date) => {
  const year = date.getFullYear();
  const month = (date.getMonth() + 1).toString().padStart(2, "0");
  const day = date.getDate().toString().padStart(2, "0");
  const hours = date.getHours().toString().padStart(2, "0");
  const minutes = date.getMinutes().toString().padStart(2, "0");

  return `${year}-${month}-${day}T${hours}:${minutes}`;
}

//Check-in date as today
const currentTime = new Date();
document.getElementById('CHECK-IN').value = convertToDateTimeLocalString(currentTime);

//Minimun check-out date from 1 day ahead
var minDate = new Date(currentTime.setDate(currentTime.getDate() + 1)).toISOString().split("T")[0];
document.getElementsByName("CHECK-OUT")[0].setAttribute('min', minDate);


function submitText(){
        var html=$("#NAME").val()
                  +"<br>"+$("#CAR-REGISTRATION").val()
                  +"<br>"+$("#ROOM").val()
                  +"<br>"+$("#CHECK-OUT").val()
                  +"<br>"+$("#OBSERVATIONS").val();
        $("#bodyModal").html(html);
}
</script>
