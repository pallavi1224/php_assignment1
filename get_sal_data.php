<?php
include 'config.php';
global $conn;
$i = 0;
$sql = "SELECT * FROM `my_data` INNER JOIN `tbl_salary` ON my_data.`info_id` = tbl_salary.info_id";
$result = mysqli_query($conn, $sql);

if (mysqli_num_rows($result) > 0) {
    while($row = mysqli_fetch_assoc($result)) {
        $arr[$i] = array("info_id"=>$row["info_id"],"f_name"=>$row["f_name"],"l_name"=>$row["l_name"],"email"=>$row["email_id"],"amount"=>$row["amount"],"sal_id"=>$row["sal_id"]);
		$i++;
    }
	echo json_encode($arr);
}else{
    $arr_empty = array('success' => 0, 'error' => 1);
    echo json_encode($arr_empty);
}
mysqli_close($conn);
?>
