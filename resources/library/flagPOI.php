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


$stmt = $dbc->prepare('UPDATE POI SET flag = ?, dateFlagged = now() WHERE locationName = ?');
$stmt->bind_param('is', $flag, $locationName);

if ($stmt->execute()) {

    if ($flag == 1) {
        echo "Successfully flagged POI";
    } else {
        echo "Successfully unflagged POI";
    }
}
