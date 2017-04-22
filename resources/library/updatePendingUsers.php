<?php
/**
 * Created by IntelliJ IDEA.
 * User: kevin
 * Date: 4/22/2017
 * Time: 2:37 PM
 */

//True means decode as an associative array
$data = json_decode($_POST["selected"], true);
$acceptUser = $_POST["acceptUser"];

require 'dbConnection.php';

//traversing the whole object and accessing properties:
$stmt;
foreach($data as $user){
    //For each selected element, update it
    $stmt = $dbc->prepare('UPDATE CITY_OFFICIAL SET approved= ? WHERE username= ?;');
    $stmt->bind_param('ss', $acceptUser, $user['username']);
    $stmt->execute();
}
unset($user); // break the reference with the last element

//Close prepared statement
$stmt -> close();

//Close connection
$dbc -> close();

if ($acceptUser == 0) {
    echo "Successfully rejected users";
} else {
    echo "Successfully accepted users";
}
?>