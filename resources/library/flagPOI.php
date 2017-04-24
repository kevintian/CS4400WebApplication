<?php
/**
 * Created by IntelliJ IDEA.
 * User: kevin
 * Date: 4/23/2017
 * Time: 4:16 PM
 */

require 'dbConnection.php';

$locationName = $_POST["locationName"];
$flag = $_POST["flag"];

if ($flag == 1) {
    $query = 'UPDATE POI SET flag = ?, dateFlagged = now() WHERE locationName = ?';
    echo "Successfully flagged POI";
} else {
    $query = 'UPDATE POI SET flag = ?, dateFlagged = null WHERE locationName = ?';
    echo "Successfully unflagged POI";
}

$stmt = $dbc->prepare($query);
$stmt->bind_param('is', $flag, $locationName);
$stmt->execute();


//Close prepared statement and result set
$stmt->close();

//Close connection
$dbc->close();
