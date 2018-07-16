<?php
include 'config.php';
global $conn;
$f_name = $_POST['f_name'];
$l_name = $_POST['l_name'];
$mobile = $_POST['mobile'];
$email = $_POST['email'];
$desig_id = $_POST["desig_id"];

if($_FILES['upload_images']['name']) {
    $upload_dir = "temp/";
    if (($_FILES["upload_images"]["type"] == "image/gif") ||
    ($_FILES["upload_images"]["type"] == "image/jpeg") ||
    ($_FILES["upload_images"]["type"] == "image/png") ||
    ($_FILES["upload_images"]["type"] == "image/pjpeg")) 
    {
        $file_name = $_FILES["upload_images"]["name"];
        $upload_file = $upload_dir.$file_name;
        if(move_uploaded_file($_FILES['upload_images']['tmp_name'],$upload_file))
        {
            $source_image = $upload_file;
            $image_destination = $upload_dir."min-".$file_name;
            $compress_images = compressImage($source_image, $image_destination);
            unlink('temp/'.$_FILES['upload_images']['name']);
        }
    } 
}

function compressImage($source_image, $compress_image) {
    $image_info = getimagesize($source_image);
    if ($image_info['mime'] == 'image/jpeg') 
    {
        $source_image = imagecreatefromjpeg($source_image);
        imagejpeg($source_image, $compress_image, 75);
    } 
    else if ($image_info['mime'] == 'image/gif') 
    {
        $source_image = imagecreatefromgif($source_image);
        imagegif($source_image, $compress_image, 75);
    } 
    else if ($image_info['mime'] == 'image/png') 
    {
        $source_image = imagecreatefrompng($source_image);
        imagepng($source_image, $compress_image, 6);
    }
    return $compress_image;
}

$sql = "INSERT INTO `tbl_info`(`f_name`, `l_name`, `mobile`, `email_id`, `profile`, `desig_id_ref`) VALUES ('".$f_name."','".$l_name."','".$mobile."','".$email."','".$image_destination."','".$desig_id."')";

$arr = array('success' => 1, 'error' => 0);
if ($conn->query($sql) === TRUE) {
    echo json_encode($arr);
} else {
	array('success' => 0, 'error' => 1);
    echo json_encode($arr);
}

$conn->close();
?>


