<?php
session_start();

if (!isset($_SESSION['username']) || !isset($_SESSION['user_type'])) {
    header("location: index.html");
    exit();
}
?>
<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1, shrink-to-fit=no">
    <meta http-equiv="x-ua-compatible" content="ie=edge">
    <title>Home</title>
    <!-- Font Awesome -->
    <link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/font-awesome/4.7.0/css/font-awesome.min.css">

    <link href="css/style.css" rel="stylesheet">


    <!-- Bootstrap core CSS -->
    <link href="css/bootstrap.min.css" rel="stylesheet">
    <!-- Material Design Bootstrap -->
    <link href="css/mdb.min.css" rel="stylesheet">
</head>

<body>

<div style="height: 100vh">
    <div class="text-right">
        <h2 class="text-right logout" id="logout">Logout</h2>
    </div>
    <div class="flex-column">
        <div class="text-center animated fadeIn" style="animation-duration: 2s; margin: 4em 0 4em 0">
            <h1>Welcome, <?php echo $_SESSION['username'] ?></h1>
            <p class="text-muted">City Scientist</p>
        </div>

        <div class="text-center animated fadeInDown">

            <h2>What would you like to do?</h2>

            <div class="card-deck w-50 card-center">
                <div id="POIcard" class="card hoverable card-clickable">
                    <img class="card-img-top" src="img/POICard.jpg" alt="Card image cap">
                    <div class="card-block">
                        <h4 class="card-title">Submit new point of interest</h4>
                        <p class="card-text">Add a new POI location. Locations include location name, city, state, and zip code.</p>
                    </div>
                </div>

                <div id="datacard" class="card hoverable card-clickable">
                    <img class="card-img-top" src="img/dataCard.jpg" alt="Card image cap">
                    <div class="card-block">
                        <h4 class="card-title">Add new data point</h4>
                        <p class="card-text">Add a new data point to a POI. Data points include location, date/time, and data information.</p>
                    </div>
                </div>
            </div>
        </div>
    </div>

</div>

<!-- SCRIPTS -->
<!-- JQuery -->
<script type="text/javascript" src="js/jquery-3.1.1.min.js"></script>
<!-- Bootstrap tooltips -->
<script type="text/javascript" src="js/tether.min.js"></script>
<!-- Bootstrap core JavaScript -->
<script type="text/javascript" src="js/bootstrap.min.js"></script>
<!-- MDB core JavaScript -->
<script type="text/javascript" src="js/mdb.min.js"></script>

<script type="text/javascript" src="js/homepage.js"></script>


</body>

</html>
