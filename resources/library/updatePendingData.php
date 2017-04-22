<?php
/**
 * Created by IntelliJ IDEA.
 * User: kevin
 * Date: 4/22/2017
 * Time: 1:37 PM
 */

//True means decode as an associative array
$data = json_decode($_POST["selected"], true);
$acceptData = $_POST["acceptData"];

require 'dbConnection.php';

//traversing the whole object and accessing properties:
$stmt;
foreach($data as $dataPoint){
    //For each selected element, update it
    $stmt = $dbc->prepare('UPDATE DATA_POINT SET accepted = ? WHERE locationName = ? AND dateSubmitted= ?;');
    $stmt->bind_param('sss', $acceptData, $dataPoint['locationName'], $dataPoint['dateSubmitted']);
    $stmt->execute();
}
unset($dataPoint); // break the reference with the last element

//Close prepared statement
$stmt -> close();

//Close connection
$dbc -> close();

if ($acceptData == 0) {
    echo "Successfully rejected datapoints";
} else {
    echo "Successfully accepted datapoints";
}
?>