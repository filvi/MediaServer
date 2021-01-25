<?php
include('Database.php');
error_reporting(E_ALL);
ini_set('display_errors', 1);


if(isset($_GET['id'])){$del_id = $_GET['id'];} else {echo '$_GET[id] not found';}

$db = new Database;
$db::delete_notes($del_id);




