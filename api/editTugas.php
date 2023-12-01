<?php
require 'koneksi.php';
$input = file_get_contents('php://input');
$data = json_decode($input, true);
//terima data dari mobile
$id = trim($data['id']);
$nama_tugas = trim($data['nama_tugas']);
$deskripsi = trim($data['deskripsi']);
http_response_code(201);
if ($nama_tugas != '' and $deskripsi != '') {
    $query = mysqli_query($koneksi, "update tugas set nama_tugas='$nama_tugas',deskripsi='$deskripsi' where 
id='$id'");
    $pesan = true;
} else {
    $pesan = false;
}
echo json_encode($pesan);
echo mysqli_error($koneksi);
