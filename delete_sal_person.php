<?php
include 'config.php';
global $conn;
$id = $_POST['id'];

$sql = "DELETE FROM `tbl_salary` WHERE `sal_id` = '".$id."'";

$arr = array('success' => 1, 'error' => 0);
if ($conn->query($sql) === TRUE) {
    echo json_encode($arr);
} else {
	array('success' => 0, 'error' => 1);
    echo json_encode($arr);
}

$conn->close();
?>