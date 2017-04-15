<?php

$DB_USER = 'cs4400_Group_41';
$DB_PASSWORD = 'GCuX34XN';
$DB_HOST = 'academic-mysql.cc.gatech.edu';
$DB_NAME = 'cs4400_Group_41';
$dbc = new mysqli($DB_HOST, $DB_USER, $DB_PASSWORD, $DB_NAME);

// Check connection
if ($dbc->connect_error) {
    die("Connection failed: " . $dbc->connect_error);
}

?>