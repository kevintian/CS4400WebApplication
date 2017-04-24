<?php
/**
 * Created by IntelliJ IDEA.
 * User: kevin
 * Date: 4/23/2017
 * Time: 4:16 PM
 */

require 'dbConnection.php';

$locationName = $_POST["locationName"];

$stmt = $dbc->prepare('SELECT * FROM POI WHERE locationName = ?;');
$stmt->bind_param('s', $locationName);
$stmt->execute();
$response = $stmt->get_result();

if ($response) {
    $row = mysqli_fetch_assoc($response);

    echo $row["flag"];
}
