<?php
include 'config.php';
$design_id = $_POST['design_id'];
global $conn;
$i = 0;
$sql = "SELECT * FROM tbl_info INNER JOIN tbl_desig ON tbl_info.desig_id_ref=tbl_desig.desig_id WHERE `desig_id_ref`= '".$design_id."'";
$result = mysqli_query($conn, $sql);

if (mysqli_num_rows($result) > 0) {
    while($row = mysqli_fetch_assoc($result)) {
        $arr['sEcho'] = 1;
        $arr['iDisplayStart'] = 10;
        $arr['iTotalDisplayRecords'] = 10;
        $arr['iTotalRecords'] = mysqli_num_rows($result);
        $arr['aaData'][$i] = array("seq"=>$i+1,"id"=>$row["info_id"],"f_name"=>$row["f_name"],"l_name"=>$row["l_name"],"mobile"=>$row["mobile"],"email"=>$row["email_id"],"profile"=>$row["profile"],"desig_name"=>$row["desig_name"],"ts_create"=>$row["ts_create"],"ts_update"=>$row["ts_update"],"desig_id"=>$row["desig_id"]);
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
