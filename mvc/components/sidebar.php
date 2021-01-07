<?php

// import all the variables passed through GET =================================
if(isset($_GET['course'])){
    $course = $_GET['course'];
}
if(isset($_GET['topic'])){
    $topic = $_GET['topic'];
}
if(isset($_GET['lecture'])){
    $lecture = $_GET['lecture'];
}
// =============================================================================



?>


    <nav class="stack pb-2">
        <h1 class="side-title"><i class="fas fa-save sepia checkpoints"></i> Checkpoint</h1>
        <div id="notes_container">
            <textarea class="mb-1" id="insert_note"> </textarea>
            <div id="confirm_note">
                <i class="fas fa-check"></i>
            </div>
        </div>

        <div class="cursor-pointer" data-parent_id="0">
            <div class="note-item" data-note_id="0" data-note_course="Course Id #" data-note_topic="Topic Id #" data-note_lecture="Lecture Id #" data-note_time="time 4342">
                <div class="note" onclick="goto_note_time(555)">Cosa importante 1 che devo sapere per fare quella cosa li che non mi ricordo</div>
                <div class="del" onclick="delete_note(this)" data-del_id="0">
                    <i class="fas fa-times-circle"></i>
                </div>
            </div>
        </div>

        <div class="cursor-pointer" data-parent_id="1">
            <div class="note-item" data-note_id="1" data-note_course="Course Id #" data-note_topic="Topic Id #" data-note_lecture="Lecture Id #" data-note_time="time 4342">
                <div class="note" onclick="goto_note_time(555)">Cosa importante 2</div>
                <div class="del" onclick="delete_note(this)" data-del_id="1">
                    <i class="fas fa-times-circle"></i>
                </div>
            </div>
        </div>

        
        <div class="cursor-pointer" data-parent_id="2">
            <div class="note-item" data-note_id="2" data-note_course="Course Id #" data-note_topic="Topic Id #" data-note_lecture="Lecture Id #" data-note_time="time 4342">
                <div class="note" onclick="goto_note_time(555)">Banane</div>
                <div class="del" onclick="delete_note(this)" data-del_id="2">
                    <i class="fas fa-times-circle"></i>
                </div>
            </div>
        </div>
        <div class="cursor-pointer" data-parent_id="3">
            <div class="note-item" data-note_id="3" data-note_course="Course Id #" data-note_topic="Topic Id #" data-note_lecture="Lecture Id #" data-note_time="time 4342">
                <div class="note" onclick="goto_note_time(555)">Latte</div>
                <div class="del" onclick="delete_note(this)" data-del_id="3">
                    <i class="fas fa-times-circle"></i>
                </div>
            </div>
        </div>
    </nav>

<?php