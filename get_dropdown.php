<?php
include 'config.php';
global $conn;
$sql = "SELECT * FROM `my_data`";
$result = mysqli_query($conn, $sql);
if(mysqli_num_rows($result) > 0){
    while($row = mysqli_fetch_assoc($result)){ 
        echo '<option value="'.$row['info_id'].'">'.$row['f_name'].' '.$row['l_name'].'</option>';
    }
}else{
    echo '<option value="">No More Employee</option>';
}
?>