<?php
include 'config.php';
global $conn;
$i = 0;
$sql = "SELECT * FROM `tbl_desig`";
$result = mysqli_query($conn, $sql);

if (mysqli_num_rows($result) > 0) {
    while($row = mysqli_fetch_assoc($result)) {
        $arr['sEcho'] = 1;
        $arr['iDisplayStart'] = 10;
        $arr['iTotalDisplayRecords'] = 10;
        $arr['iTotalRecords'] = mysqli_num_rows($result);
        $arr['aaData'][$i] = array("seq"=>$i+1,"desig_id"=>$row["desig_id"],"desig_name"=>$row["desig_name"],"desig_desc"=>$row["desig_desc"]);
		$i++;
    }
	echo json_encode($arr);
}else{
        $arr['sEcho'] = 0;
        $arr['iDisplayStart'] = "0";
        $arr['iTotalDisplayRecords'] = "0";
        $arr['iTotalRecords'] = "0";
        $arr['aaData'] = [];
        echo json_encode($arr);
}
mysqli_close($conn);
?>
