<?php
include 'config.php';
global $conn;
$desig_name = $_POST['desig_name'];
$desig_desc = $_POST['desig_desc'];

$sql = "INSERT INTO `tbl_desig`(`desig_name`,`desig_desc`) VALUES ('".$desig_name."','".$desig_desc."')";
if ($conn->query($sql) === TRUE) {
        $arr = array('success' => 1, 'error' => 0);
        echo json_encode($arr);
    } else {
	    array('success' => 0, 'error' => 1);
        echo json_encode($arr);
    }
$conn->close();
?>