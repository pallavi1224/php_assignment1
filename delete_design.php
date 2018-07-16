<?php
include 'config.php';
global $conn;
$desig_id = $_POST['desig_id'];

$sql = "DELETE FROM `tbl_desig` WHERE `desig_id` = '".$desig_id."'";


if (mysqli_query($conn, $sql)) {
    if(mysqli_affected_rows($conn) >= 1){
      $arr = array('success' => 1, 'error' => 0);
      echo json_encode($arr);  
    }
} else {
    $arr = array('success' => 0, 'error' => 1);    
    echo json_encode($arr);
}

mysqli_close($conn);
?>
