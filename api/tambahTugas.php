<?php
require 'koneksi.php';
$input = file_get_contents('php://input');
$data = json_decode($input, true);
//terima data dari mobile
$nama_tugas = trim($data['nama_tugas']);
$deskripsi = trim($data['deskripsi']);
http_response_code(201);
if ($nama_tugas != '' and $deskripsi != '') {
    $query = mysqli_query($koneksi, "insert into tugas(nama_tugas,deskripsi) values('$nama_tugas','$deskripsi')");
    $pesan = true;
} else {
    $pesan = false;
}
echo json_encode($pesan);
echo mysqli_error($koneksi);
