<?php
include 'config.php';
$design_id = $_POST['design_id'];
global $conn;
$i = 0;
$sql = "SELECT * FROM tbl_salary INNER JOIN `tbl_info` ON tbl_info.`info_id` = tbl_salary.info_id_ref INNER JOIN tbl_desig ON tbl_salary.desig_id_ref = tbl_desig.desig_id where tbl_salary.desig_id_ref = '".$design_id."'";
$result = mysqli_query($conn, $sql);

if (mysqli_num_rows($result) > 0) {
    while($row = mysqli_fetch_assoc($result)) {
        $arr['sEcho'] = 1;
        $arr['iDisplayStart'] = 10;
        $arr['iTotalDisplayRecords'] = 10;
        $arr['iTotalRecords'] = mysqli_num_rows($result);
        $arr['aaData'][$i] = array("seq"=>$i+1,"info_id"=>$row["info_id"],"f_name"=>$row["f_name"],"l_name"=>$row["l_name"],"email"=>$row["email_id"],"mobile"=>$row["mobile"],"desig_name"=>$row["desig_name"],"amount"=>$row["amount"],"sal_id"=>$row["sal_id"]);
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
