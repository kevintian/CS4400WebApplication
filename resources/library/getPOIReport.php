<?php
/**
 * Created by IntelliJ IDEA.
 * User: kevin
 * Date: 4/18/2017
 * Time: 1:28 AM
 */

require 'dbConnection.php';

//Get all POI names
$stmt = $dbc->prepare('SELECT * FROM POI_REPORT;');
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
        $tempData['min_Mold'] = $row['min_Mold'];
        $tempData['avg_Mold'] = $row['avg_Mold'];
        $tempData['max_Mold'] = $row['max_Mold'];
        $tempData['min_AQ'] = $row['min_AQ'];
        $tempData['avg_AQ'] = $row['avg_AQ'];
        $tempData['max_AQ'] = $row['max_AQ'];
        $tempData['count_Data'] = $row['count_Data'];

        if($row['flag'] == 1) {
            $tempData['flag'] = "Yes";
        } else {
            $tempData['flag'] = "No";
        }

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
