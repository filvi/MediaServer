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
<h1 class="oswald main-title" id="video_title"> $course <span class="sepia main-title">~</span> $topic <span class="sepia main-title">~</span> $lecture</h1>

<video controls autoplay id="video" onplay="update_time()">
    <source src="$path">
</video>
<br>
<div id="time-frame">
    <a
        href="#" 
        id="go" 
        class="oswald timebtn tooltip"
    >    
    <span class="tooltiptext">Time travel</span>
    go</a>
    <input 
        id="time"
        class="oswald time" 
        type="text" 
        value="00:00:00" 
    > 
    <div id="total_time" class="total_time px-1" >
        00:00:00
    </div>
    
    <div class="timebtn ml-2 tooltip" onclick="time_travel(-10)">
        <span class="tooltiptext">-10s<br><i class="fas fa-arrow-circle-down"></i> key</span>
        <i class="fas fa-angle-double-left"></i>
    </div>
    <div class="timebtn tooltip mx1px" onclick="time_travel(-5)">
        <span class="tooltiptext">-5s<br><i class="fas fa-arrow-circle-left"></i> key</span>
        <i class="fas fa-angle-left"></i>
    </div>
    <div class="timeclock">
        <i class="far fa-clock"></i>
    </div>
    <div class="timebtn tooltip mx1px" onclick="time_travel(5)">
        <span class="tooltiptext">+5s<br><i class="fas fa-arrow-circle-right"></i> key</span>
        <i class="fas fa-angle-right"></i>
    </div>
    <div class="timebtn tooltip" onclick="time_travel(10)">
        <span class="tooltiptext">+10s<br><i class="fas fa-arrow-circle-up"></i> key</span>
        <i class="fas fa-angle-double-right"></i>
    </div>
</div>

<div class="btns">

    <!-- start of INPUT SPEED -->
    <div id="speedbtn" class="speedbtn tooltip" onclick="set_playback_speed()">
    <span class="tooltiptext">speed</span>
        <i class="fas fa-tachometer-alt"></i>
    </div>
    <input id="speed" class="speed" type="text"  value="1" > 
    <!-- end of INPUT SPEED -->
    
    <!-- start of BTN SET SPEED -->
    <div class="speedbtn ml-2 tooltip" onclick="set_speed('-')">
        <span class="tooltiptext">-0.5<br>speed</span>        
        <i class="fas fa-minus"></i>
    </div>
    <div  class="mx1px speedbtn tooltip" onclick="set_speed(1)">
        <span class="tooltiptext">1x<br>speed</span>    
        <i class="fas fa-undo"></i>
    </div>
    <div class="speedbtn tooltip" onclick="set_speed('+')">
        <span class="tooltiptext">+0.5<br>speed</span>
        <i class="fas fa-plus"></i>
    </div>

    <div class="speedbtn ml-2 tooltip" onclick="goto('next')">
        <span class="tooltiptext">Prev. Video</span>
        <i class="fas fa-step-backward"></i>
    </div>
    <div class="speedbtn-accent  mx1px tooltip" onclick="set_done(this)">
        <span class="tooltiptext">Done</span>
        <i class="fas fa-check"></i>
    </div>
    <div class="speedbtn tooltip" onclick="goto('next')">
        <span class="tooltiptext">Next Video</span>
        <i class="fas fa-step-forward"></i>
    </div>
    <!-- end of BTN SET SPEED -->
</div>

VIDEO;
include("../model/Database.php");
$db = new Database;
$db::insert_viewed($course,$topic,$lecture);

echo $video;