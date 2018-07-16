<?php
include 'config.php';
global $conn;
$id = $_POST['id'];
$sql = "SELECT * FROM `tbl_info` WHERE `info_id` = '".$id."'";
$result = mysqli_query($conn, $sql);

if (mysqli_num_rows($result) > 0) {
    while($row = mysqli_fetch_assoc($result)) {
        $arr = array("id"=>$row["info_id"],"f_name"=>$row["f_name"],"l_name"=>$row["l_name"],"mobile"=>$row["mobile"],"email"=>$row["email_id"]);
    }
	echo json_encode($arr);
}
mysqli_close($conn);

?>
