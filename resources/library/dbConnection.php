<?php
/**
 * Created by IntelliJ IDEA.
 * User: kevin
 * Date: 4/13/2017
 * Time: 10:59 PM
 */

$DB_USER = 'cs4400_41';
$DB_PASSWORD = 'QDbdOEtZ';
$DB_HOST = 'academic-mysql.cc.gatech.edu';
$DB_NAME = 'cs4400_41';
$dbc = new mysqli($DB_HOST, $DB_USER, $DB_PASSWORD, $DB_NAME);

// Check connection
if ($dbc->connect_error) {
    die("Connection failed: " . $dbc->connect_error);
}

?>