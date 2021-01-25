<?php
include('Database.php');
error_reporting(E_ALL);
ini_set('display_errors', 1);

if(isset($_GET['course'])){$course = str_replace(".", " ", strtolower($_GET['course']));} else {echo '$_GET[course] not found';}

echo $course;
if(isset($_GET['topic'])){$topic = str_replace(".", " ", strtolower($_GET['topic']));} else {echo '$_GET[topic] not found';}

echo $topic;
if(isset($_GET['lecture'])){$lecture = str_replace(".", " ", strtolower($_GET['lecture']));} else {echo '$_GET[lecture] not found';}

echo $lecture;
if(isset($_GET['time'])){$time =  strtolower($_GET['time']);} else {echo '$_GET[time] not found';}

echo $time;
if(isset($_GET['note'])){$note = str_replace(".", " ", strtolower($_GET['note']));} else {echo '$_GET[note] not found';}

echo $note;
$db = new Database;
$db::insert_notes($course,$topic,$lecture,$time,$note);





