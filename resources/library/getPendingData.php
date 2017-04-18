<?php
/**
 * Created by IntelliJ IDEA.
 * User: kevin
 * Date: 4/18/2017
 * Time: 1:28 AM
 */

require 'dbConnection.php';

//Get all POI names
$stmt = $dbc->prepare('SELECT locationName, type, dataValue, dateSubmitted FROM DATA_POINT WHERE accepted IS NULL;');
$stmt->execute();
$response = $stmt->get_result();

$pendingData = array();

if ($response) {
    //Loop through result set
    while ($row = mysqli_fetch_assoc($response)) {
        $tempData = array();

        //add to array
        $tempData['locationName'] = $row['locationName'];
        $tempData['dateSubmitted'] = $row['dateSubmitted'];
        $tempData['dataValue'] = $row['dataValue'];
        $tempData['type'] = $row['type'];

        //Add user to overall array
        $pendingData[] = $tempData;
    }
}

//Close prepared statement and result set
$stmt->close();
$response->close();

//Close connection
$dbc->close();

echo json_encode($pendingData);
