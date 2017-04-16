<?php
/**
 * Created by IntelliJ IDEA.
 * User: kevin
 * Date: 4/15/2017
 * Time: 11:08 PM
 */

require 'dbConnection.php';

//This is the final json with all of the array information
$dropDownInfo = array ();


//Get all POI names
$stmt = $dbc->prepare('SELECT DISTINCT locationName FROM POI;');
$stmt->execute();
$response = $stmt->get_result();


if ($response) {
    $locations = array();
    //Loop through result set
    while ($row = mysqli_fetch_assoc($response)) {
        //adds the location name to the location array
        $locations[] = $row['locationName'];
    }
    $dropDownInfo['locations'] = $locations;
}

//Get all datatypes
$stmt = $dbc->prepare('SELECT DISTINCT type FROM DATA_TYPE;');
$stmt->execute();
$response = $stmt->get_result();


if ($response) {
    $dataTypes = array();
    //Loop through result set
    while ($row = mysqli_fetch_assoc($response)) {
        $dataTypes[] = $row['type'];
    }
    $dropDownInfo['dataTypes'] = $dataTypes;
}

//Get all city state combinations
$stmt = $dbc->prepare('SELECT city, state FROM CITY_STATE;');
$stmt->execute();
$response = $stmt->get_result();


if ($response) {
    $cityStates = array();
    //Loop through result set
    while ($row = mysqli_fetch_assoc($response)) {
        $cityStates[] = $row['city'].', '.$row['state'];
    }
    $dropDownInfo['cityStates'] = $cityStates;
}


//Close prepared statement and result set
$stmt->close();
$response->close();

//Close connection
$dbc->close();

echo json_encode($dropDownInfo);


?>