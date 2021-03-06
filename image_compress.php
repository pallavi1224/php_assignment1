<!DOCTYPE html>
<html>
<head>
    <title>Image compressor</title>
</head>
<body>
    <form method="post" enctype="multipart/form-data" action="image_compress.php">
        <input type="file" name="upload_images">
        <input type="submit">
    </form>
</body>
</html>

<?php
$file_type_error = '';
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
    else 
    {
        $file_type_error = "Upload only jpg or gif or png file type";
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
?>