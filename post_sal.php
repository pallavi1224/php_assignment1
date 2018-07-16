<?php
include 'config.php';
global $conn;
$salary = $_POST['salary'];
$info_id = $_POST['info_id'];
$design_id = $_POST['design_id'];

$sql_filter = "SELECT * FROM `tbl_salary` WHERE `info_id_ref`= '".$info_id."'";
$res = mysqli_query($conn, $sql_filter);
if(mysqli_num_rows($res)>0) {
    $arr = array('success' => 2);
    echo json_encode($arr);
}
else{
    $sql = "INSERT INTO `tbl_salary`(`amount`, `info_id_ref`, `desig_id_ref`) VALUES ('".$salary."','".$info_id."','".$design_id."')";
    $arr = array('success' => 1, 'error' => 0);
        if ($conn->query($sql) === TRUE) {
        echo json_encode($arr);
        } else {
	       array('success' => 0, 'error' => 1);
            echo json_encode($arr);
        }
}

$conn->close();
?>