<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1, shrink-to-fit=no">
    <meta http-equiv="x-ua-compatible" content="ie=edge">
    <title>Login</title>
    <!-- Font Awesome -->
    <link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/font-awesome/4.7.0/css/font-awesome.min.css">
    <!-- Bootstrap core CSS -->
    <link href="css/bootstrap.min.css" rel="stylesheet">
    <!-- Material Design Bootstrap -->
    <link href="css/mdb.min.css" rel="stylesheet">

    <!--Custom CSS-->
    <link href="css/style.css" rel="stylesheet">

</head>

<body>

<div style="height: 100vh">
    <div class="flex-center flex-column animated fadeIn background">
        <!--Form without header-->
        <div class="card w-25">
            <div class="card-block">

                <!--Header-->
                <div class="text-center">
                    <h3>Login</h3>
                    <hr class="mt-2 mb-2">
                </div>

                <!--Body-->
                <div class="md-form">
                    <i class="fa fa-user-circle-o prefix"></i>
                    <input type="text" id="username" class="form-control">
                    <label for="username">Your username</label>
                </div>

                <div class="md-form">
                    <i class="fa fa-lock prefix"></i>
                    <input type="password" id="password" class="form-control">
                    <label for="password">Your password</label>
                </div>

                <div class="text-center">
                    <button id="login" class="btn btn-cyan">Login</button>
                </div>

            </div>

            <!--Footer-->
            <div class="modal-footer">
                <div class="options">
                    <p>Not a member? <a href="register.html">Sign Up</a></p>
                </div>
            </div>

        </div>
        <!--/Form without header-->
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
<!--Custom JavaScript-->
<script type="text/javascript" src="js/login.js"></script>

</body>

</html>
