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


<form action="https://api.sheetmonkey.io/form/iQMYhHKk257VGevi81mAqL" method="post">
    <div class="form-group">
    <label for="NAME">*Name:</label>
    <input type="text" id="NAME" name="NAME" class="form-control" autocomplete="off"  onkeyup="this.value = this.value.toUpperCase();" required>
    </div>
    <div class="form-group">
    <label for="CAR-REGISTRATION">*Car Registration:</label>
    <input type="text" id="CAR-REGISTRATION" name="CAR-REGISTRATION" class="form-control" autocomplete="off" onkeyup="this.value = this.value.toUpperCase();" required>
    </div>
    <div class="form-group row">
    <label for="ROOM" class="col-sm-6">*Room Number:</label>
    <label for="CHECK-OUT" class="col-sm-6">*Check-Out Date:</label>
    </div>
    <div class="form-group row">
    <label style="padding-left:15px"></label>
    <input type="number" min="80" max="5118" id="ROOM" name="ROOM" class="form-control col-sm-5" autocomplete="off" required>
    <input type="datetime-local" id="CHECK-IN" name="CHECK-IN" class="form-control" autocomplete="off" required hidden>
    <label class="col-sm-1"></label>
    <input type="date" id="CHECK-OUT" name="CHECK-OUT" class="form-control col-sm-5" autocomplete="off" required>
    </div>
    <div class="form-group">
    <label for="OBSERVATIONS">Remarks:</label>
    <textarea type="text" id="OBSERVATIONS" name="OBSERVATIONS" class="form-control" autocomplete="off" style="text-transform: capitalize;"></textarea>
    </div>


    <button type="submit" class="btn btn-success btn-lg btn-block">REGISTER</button>

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
</script>
