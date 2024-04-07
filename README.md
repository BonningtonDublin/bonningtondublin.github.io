<html lang="en">
  <head>
  <!-- Required meta tags -->
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1, shrink-to-fit=no">
    <!-- Bootstrap CSS -->
    <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bootstrap@4.3.1/dist/css/bootstrap.min.css" integrity="sha384-ggOyR0iXCbMQv3Xipma34MD+dH/1fQ784/j6cY/iJTQUOhcWr7x9JvoRxT2MZw1T" crossorigin="anonymous">
    <!-- Optional JavaScript - jQuery first, then Popper.js, then Bootstrap JS -->
    <script src="https://code.jquery.com/jquery-3.3.1.slim.min.js" integrity="sha384-q8i/X+965DzO0rT7abK41JStQIAqVgRVzpbzo5smXKp4YfRvH+8abtTE1Pi6jizo" crossorigin="anonymous"></script>
    <script src="https://cdn.jsdelivr.net/npm/popper.js@1.14.7/dist/umd/popper.min.js" integrity="sha384-UO2eT0CpHqdSJQ6hJty5KVphtPhzWj9WO1clHTMGa3JDZwrnQq4sF86dIHNDz0W1" crossorigin="anonymous"></script>
    <script src="https://cdn.jsdelivr.net/npm/bootstrap@4.3.1/dist/js/bootstrap.min.js" integrity="sha384-JjSmVgyd0p3pXB1rRibZUAYoIIy6OrQ6VrjIEaFf/nJGzIxFDsf4x0xIM+B07jRM" crossorigin="anonymous"></script>    
    <script src="https://code.jquery.com/jquery-3.6.0.js"></script>
    <script src="https://code.jquery.com/ui/1.13.2/jquery-ui.js"></script>
    <script>
    document.getElementById("CHECK-IN").valueAsDate = new Date(); 
    $( function() {
      $("#CHECK-OUT").datepicker({ minDate: '0' });
    } );
    </script>
  </head>

<h4>We ask that all guests please provide their car registration.</h4>

<form action="https://api.sheetmonkey.io/form/wTtg3wkPyv7RdnBEzrRdDY" method="post">
    <div class="form-group">
    <label for="NAME">*Name:</label>
    <input type="text" id="NAME" name="NAME" class="form-control" autocomplete="off"  onkeyup="this.value = this.value.toUpperCase();" required>
    </div>
    <div class="form-group">
    <label for="CAR-REGISTRATION">*Car Registration:</label>
    <input type="text" id="CAR-REGISTRATION" name="CAR-REGISTRATION" class="form-control" autocomplete="off" onkeyup="this.value = this.value.toUpperCase();" required>
    </div><!--
    <div class="form-group row">
    <div class="col-md-1">
    <input class="form-check-input" type="radio" name="type" id="guest">
    <label class="form-check-label" for="guest">Hotel Guest</label>
    </div>
    <div class="col-md-2">
    <input class="form-check-input" type="radio" name="type" id="bar">
    <label class="form-check-label" for="bar">Bar / Restaurant / Private Event</label>
    </div></div> ----->
    <div class="form-group guest">
    <label for="ROOM">*Room Number:</label>
    <input type="number" min="80" max="5118" id="ROOM" name="ROOM" class="form-control" autocomplete="off" required>
    </div>
    <input type="date" id="CHECK-IN" name="CHECK-IN" class="form-control" autocomplete="off" required hidden>
    <div class="form-group guest">
    <label for="CHECK-OUT">*Check-Out Date:</label>
    <input type="date" id="CHECK-OUT" name="CHECK-OUT" class="form-control" autocomplete="off" required>
    </div>
    <div class="form-group">
    <label for="OBSERVATIONS">Remarks:</label>
    <textarea type="text" id="OBSERVATIONS" name="OBSERVATIONS" class="form-control" autocomplete="off" style="text-transform: capitalize;"></textarea>
    </div>
    <button type="submit" class="btn btn-primary btn-lg btn-block">REGISTER</button>

  </form>
</html>
