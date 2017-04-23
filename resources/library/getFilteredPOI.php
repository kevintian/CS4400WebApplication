<?php
/**
 * Created by IntelliJ IDEA.
 * User: kevin
 * Date: 4/23/2017
 * Time: 2:50 AM
 */

require 'dbConnection.php';

//Because some of the query parameters can be null, we dynamically build the query string
$locationName = $_POST["locationName"];
$city = $_POST["city"];
$state = $_POST["state"];
$zipCode = $_POST["zipCode"];
$flag = $_POST["flag"];
$dateFlaggedStart = $_POST["dateFlaggedStart"];
$dateFlaggedEnd = $_POST["dateFlaggedEnd"];

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

if($city){
    $filterValues[] = " city = ? ";
    $param_type .= 's';
    $a_params[] = & $city;
}

if($state) {
    $filterValues[] = " state = ? ";
    $param_type .= 's';
    $a_params[] = & $state;
}

if($zipCode) {
    $filterValues[] = " zipcode = ? ";
    $param_type .= 's';
    $a_params[] = & $zipCode;
}

if($flag) {
    $filterValues[] = " flag = ? ";
    $param_type .= 's';

    if ($flag == "Yes") {
        $flag = "1";
    } else {
        $flag = "0";
    }
    $a_params[] = & $flag;
}

if($dateFlaggedStart) {
    $filterValues[] = " dateFlagged > ? ";
    $param_type .= 's';
    $a_params[] = & $dateFlaggedStart;
}

if($dateFlaggedEnd) {
    $filterValues[] = " dateFlagged < ? ";
    $param_type .= 's';
    $a_params[] = & $dateFlaggedEnd;
}

$query = "SELECT * FROM POI";


$stmt;

if (!empty($filterValues)) {
    $query .= ' WHERE' . implode('AND', $filterValues);
    $stmt  = $dbc->prepare($query);
    call_user_func_array(array($stmt, 'bind_param'), $a_params);
} else {
    $stmt  = $dbc->prepare($query);
}

$stmt->execute();
$response = $stmt->get_result();

$poiData = array();

if ($response) {
    //Loop through result set
    while ($row = mysqli_fetch_assoc($response)) {
        $tempData = array();

        //add to array
        $tempData['locationName'] = $row['locationName'];
        $tempData['city'] = $row['city'];
        $tempData['state'] = $row['state'];
        $tempData['zipCode'] = $row['zipcode'];
        if($row['flag'] == 1) {
            $tempData['flag'] = "Yes";
        } else {
            $tempData['flag'] = "No";
        }
        $tempData['dateFlagged'] = $row['dateFlagged'];

        //Add user to overall array
        $poiData[] = $tempData;
    }
}

//Close prepared statement and result set
$stmt->close();
$response->close();

//Close connection
$dbc->close();

echo json_encode($poiData);