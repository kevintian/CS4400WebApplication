<?php

session_start();

//Connects to database and initializes variable $dbc
require 'dbConnection.php';

$username = $_POST["username"];
$password = $_POST["password"];

//check if user exists//
$stmt = $dbc->prepare('SELECT * FROM USER WHERE username = ?');
//s means string
$stmt->bind_param('s', $username);
$stmt->execute();
$response = $stmt->get_result();

//If the user exists
if ($response->num_rows != 0) {
    //Get the users hashed password
    $row = mysqli_fetch_assoc($response); //Gets the first (and only) row as an associative array

    $userType = $row["type"];
    $hashedPass = $row["password"];
    if (password_verify($password, $hashedPass)) {
        //If the password is correct, we check if the account is an accepted city official
        if ($row["type"] == "City Official") {
            $stmt = $dbc->prepare('SELECT * FROM CITY_OFFICIAL WHERE username = ?');
            $stmt->bind_param('s', $username);
            $stmt->execute();
            $response = $stmt->get_result();

            $row = mysqli_fetch_assoc($response);
            $status = $row["approved"];

            if (is_null($status)) {
                echo "Your account is currently pending.";
            } else if ($status == 1) {
                $_SESSION['username'] = $username;
                $_SESSION['user_type'] = $userType;
                $userInfo = array("user_type" => $userType, "username" => $username);
                echo json_encode($userInfo);
            } else {
                echo "Your account has been rejected.";
            }

        } else {
            //Log in normally if you are not a city official
            $_SESSION['username'] = $username;
            $_SESSION['user_type'] = $userType;
            $userInfo = array("user_type" => $userType, "username" => $username);
            echo json_encode($userInfo);
        }
    } else {
        echo "Incorrect username and password combination";
    }
} else {
    //We used to throw different error messages but that's not secure so changing this to the same
    echo "Incorrect username and password combination";
}

//Close prepared statement and result set
$stmt->close();
$response->close();

//Close connection
$dbc->close();

?>
