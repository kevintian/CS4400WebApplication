<?php
/**
 * Created by IntelliJ IDEA.
 * User: kevin
 * Date: 4/23/2017
 * Time: 3:53 PM
 */

require 'dbConnection.php';

//Because some of the query parameters can be null, we dynamically build the query string
$locationName = $_POST["locationName"];
$type = $_POST["type"];
$minValue = $_POST["minValue"];
$maxValue = $_POST["maxValue"];
$startTime = $_POST["startTime"];
$endTime = $_POST["endTime"];

//This is to create the query string
$filterValues = [];

/* Bind parameters. Types: s = string, i = integer, d = double,  b = blob */
$param_type = '';

$a_params = array(
    0 => & $param_type
);

if($locationName) {
    $filterValues[] = " locationName = ? ";
    $param_type .= 's';
    $a_params[] = & $locationName;
}

if($type){
    $filterValues[] = " type = ? ";
    $param_type .= 's';
    $a_params[] = & $type;
}

if($minValue){
    $filterValues[] = " dataValue > ? ";
    $param_type .= 'i';
    $a_params[] = & $minValue;
}

if($maxValue){
    $filterValues[] = " dataValue < ? ";
    $param_type .= 'i';
    $a_params[] = & $maxValue;
}

if($startTime) {
    $filterValues[] = " dateSubmitted > ? ";
    $param_type .= 's';
    $a_params[] = & $startTime;
}

if($endTime) {
    $filterValues[] = " dateSubmitted < ? ";
    $param_type .= 's';
    $a_params[] = & $endTime;
}


$query = "SELECT * FROM DATA_POINT WHERE accepted = 1";


$stmt;

if (!empty($filterValues)) {
    $query .= ' AND'.implode('AND', $filterValues);
    $stmt  = $dbc->prepare($query);
    call_user_func_array(array($stmt, 'bind_param'), $a_params);
} else {
    $stmt  = $dbc->prepare($query);
}

$stmt->execute();
$response = $stmt->get_result();

$dataPoints = array();

if ($response) {
    //Loop through result set
    while ($row = mysqli_fetch_assoc($response)) {
        $tempData = array();

        //add to array
        $tempData['locationName'] = $row['locationName'];
        $tempData['dataValue'] = $row['dataValue'];
        $tempData['type'] = $row['type'];
        $tempData['dateSubmitted'] = $row['dateSubmitted'];

        //Add user to overall array
        $dataPoints[] = $tempData;
    }
}

//Close prepared statement and result set
$stmt->close();
$response->close();

//Close connection
$dbc->close();

echo json_encode($dataPoints);