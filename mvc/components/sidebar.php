<?php

// import all the variables passed through GET =================================
if(isset($_GET['course'])){
    $course = str_replace(".", " ", $_GET['course']);
}
if(isset($_GET['topic'])){
    $topic = str_replace(".", " ", $_GET['topic']);
}
if(isset($_GET['lecture'])){
    $lecture = str_replace(".", " ", $_GET['lecture']);
}
// =============================================================================
include('../model/Database.php');

$db = new Database();
?>


    <nav class="stack pb-2">
        <h1 class="side-title"><i class="fas fa-save sepia checkpoints"></i> Checkpoint</h1>
        <div id="notes_container">
            <input type="text" class="mb-1" id="insert_note">
            <div id="confirm_note" onclick="enable_notes()">
                <i class="fas fa-check"></i>
            </div>
        </div>

<?php
    $db::get_notes($course, $topic, $lecture);
?>
    </nav>
