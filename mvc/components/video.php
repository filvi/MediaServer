<?php

if(isset($_GET["path"])){
$path = $_GET["path"];
}
// $path = "./Master/sciprog/Theory.Part.B/Lecture.1.mp4";
$video=<<<EOT
<video controls autoply id="video">
<source src="$path">
</video>
<br>

<div class="btns">
<div class="darkbtn" onclick="set_speed('-')"><i class="fas fa-minus"></i></div>
<div class="darkbtn" onclick="set_speed(1)"> <i class="fas fa-undo"></i></div>
<div class="darkbtn" onclick="set_speed('+')"><i class="fas fa-plus"></i></div>
</div>


EOT;

echo $video;