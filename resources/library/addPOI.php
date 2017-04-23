<?php
/**
 * Created by IntelliJ IDEA.
 * User: kevin
 * Date: 4/15/2017
 * Time: 11:56 PM
 */

require 'dbConnection.php';

$locationName = $_POST["locationName"];
$city = $_POST["city"];
$state = $_POST["state"];
$zipcode = $_POST["zipcode"];

$stmt = $dbc->prepare('INSERT INTO POI (locationName, zipcode, city, state) 
VALUES (?,?,?,?)');
//s means string
$stmt->bind_param('ssss', $locationName, $zipcode, $city, $state);

if ($stmt->execute()) {
    echo "Successfully added new point of interest!";
} else {
    echo "Error occurred while adding new point of interest!";
}



//Close prepared statement and result set
$stmt -> close();

//Close connection
$dbc -> close();