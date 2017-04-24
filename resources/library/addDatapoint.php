<?php
/**
 * Created by IntelliJ IDEA.
 * User: kevin
 * Date: 4/15/2017
 * Time: 11:55 PM
 */

require 'dbConnection.php';

$poiName = $_POST["poiName"];
$dataType = $_POST["dataType"];
$dateTime = $_POST["dateTime"];
$dataValue = $_POST["dataValue"];

$stmt = $dbc->prepare('INSERT INTO DATA_POINT (locationName, dateSubmitted, dataValue, type) 
VALUES (?,?,?,?)');
//s means string
$stmt->bind_param('ssss', $poiName, $dateTime, $dataValue, $dataType);

if ($stmt->execute()) {
    echo "Successfully added new datapoint!";
} else {
    echo "Error occurred while adding new datapoint!";
}


//Close prepared statement and result set
$stmt -> close();

//Close connection
$dbc -> close();