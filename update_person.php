<?php
include 'config.php';
global $conn;

$id = $_POST['id'];
$f_name = $_POST['f_name'];
$l_name = $_POST['l_name'];
$email = $_POST['email'];
$mobile = $_POST['mobile'];

$sql = "UPDATE `tbl_info` SET `f_name`= '".$f_name."',`l_name`= '".$l_name."',`mobile`= '".$mobile."',`email_id`='".$email."' WHERE `info_id`='".$id."'";

$arr = array('success' => 1, 'error' => 0);
if ($conn->query($sql) === TRUE) {
    echo json_encode($arr);
} else {
	array('success' => 0, 'error' => 1);
    echo json_encode($arr);
}

$conn->close();
?>


