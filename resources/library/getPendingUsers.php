<?php
/**
 * Created by IntelliJ IDEA.
 * User: kevin
 * Date: 4/18/2017
 * Time: 1:28 AM
 */

require 'dbConnection.php';

//Get all POI names
$stmt = $dbc->prepare('SELECT USER.username, email, city, state, title FROM CITY_OFFICIAL INNER JOIN USER 
ON CITY_OFFICIAL.username = USER.username WHERE approved IS NULL');
$stmt->execute();
$response = $stmt->get_result();

$pendingUsers = array();

if ($response) {
    //Loop through result set
    while ($row = mysqli_fetch_assoc($response)) {
        //add to array
        $tempUser = array();

        $tempUser['username'] = $row['username'];
        $tempUser['email'] = $row['email'];
        $tempUser['city'] = $row['city'];
        $tempUser['state'] = $row['state'];
        $tempUser['title'] = $row['title'];

        //Add user to overall array
        $pendingUsers[] = $tempUser;
    }

}

//Close prepared statement and result set
$stmt->close();
$response->close();

//Close connection
$dbc->close();

echo json_encode($pendingUsers);
