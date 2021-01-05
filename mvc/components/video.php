<?php

if(isset($_GET["path"])){
    $path = $_GET["path"];
    $path = str_replace("%20", ".", $path);
}

$title = explode("/", $path);

$course =  str_replace(".", " ",$title[1]);
$topic =  str_replace(".", " ",$title[2]);
$lecture =  str_replace(".", " ",str_replace(".mp4", "", $title[3]));
$video=<<<VIDEO
<h1 class="oswald main-title"> $course <span class="sepia main-title">></span> $topic <span class="sepia main-title">></span> $lecture</h1>

<video controls autoply id="video">
<source src="$path">
</video>
<br>

<div id="time-frame">
    <input 
        id="time"
        class="oswald time" 
        type="text" 
        value="16.30" 
    > 
    <a
        href="#" 
        id="go" 
        class="oswald go"
    >
    go</a>
</div>

<div class="btns">
    <div class="darkbtn" onclick="set_speed('-')"><i class="fas fa-minus"></i></div>
    <div class="darkbtn" onclick="set_speed(1)"> <i class="fas fa-undo"></i></div>
    <div class="darkbtn" onclick="set_speed('+')"><i class="fas fa-plus"></i></div>
</div>

VIDEO;

include("../model/Database.php");
$db = new Database;
$db::insert_viewed($course,$topic,$lecture);

echo $video;

