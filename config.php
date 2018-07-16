<?php
$username = "root";
$host = "localhost";
$password = "";
$database = "testing_data";

$conn = mysqli_connect($host,$username,$password,$database);

if(!$conn) {
    die("Connection failed: " . mysqli_connect_error());
}
?>