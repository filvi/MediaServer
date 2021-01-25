// Dropdown toggle system ======================================================
function toggle_topic(topic_name) {
    let lecture = document.querySelectorAll(`[data-id="${topic_name}"]`);
    for (let i = 0; i < lecture.length; i++) {
        let visible = lecture[i].getAttribute("data-visible");
        if (visible === "no") {
            lecture[i].setAttribute("data-visible", "yes")
        } else {
            lecture[i].setAttribute("data-visible", "no");
        }
    };
    let topic = document.querySelector(`[data-topic="${topic_name}"]`);
    let toggled = topic.getAttribute("data-collapsed");
    if (toggled === "no") {
        topic.setAttribute("data-collapsed", "yes")
    } else {
        topic.setAttribute("data-collapsed", "no");
    }
    topic.setAttribute
} // ===========================================================================






// fetch and display video from the script at mvc/components/video.php =========
function get_video(id, course, topic, lecture) {

    var video_ajax = () => {
        return new Promise((resolve) => {
            lecture = lecture.replace(" ", ".")
            path = `mvc/components/video.php?path=Videos/${course}/${topic}/${lecture}.mp4`
            let target = document.getElementById(id)
            target.dataset.watched = "yes";
            let xhttp = new XMLHttpRequest();
            xhttp.onreadystatechange = function () {
                if (this.readyState == 4 && this.status == 200) {
                    document.getElementById("main").innerHTML = this.responseText;
                }
            };
            xhttp.open("GET", path, true);
            xhttp.onload = () =>{resolve()}
            xhttp.onerror = () =>{console.error('Error in video_ajax()')}

            xhttp.send();
            
        })
    }
    video_ajax().then(get_sidebar(course, topic, lecture));
} // ===========================================================================






// fetch and display video from the script at mvc/components/video.php =========
function get_sidebar(course, topic, lecture) {
    course = course.toLowerCase().replace("."," ");
    topic = topic.toLowerCase().replace("."," ");
    lecture = lecture.toLowerCase().replace("."," ");
    var sidebar_ajax = () => {
        return new Promise((resolve, reject) => {
            lecture = lecture.replace(" ", ".")
            path = `mvc/components/sidebar.php?course=${course}&topic=${topic}&lecture=${lecture}`
            let xhttp = new XMLHttpRequest();
            xhttp.onreadystatechange = function () {
                if (this.readyState == 4 && this.status == 200) {
                    document.getElementById("sidebar").innerHTML = this.responseText;
                    console.log("get_sidebar" , path);
                }
            };
            xhttp.open("GET", path, true);
            xhttp.onload = () =>{resolve()}
            xhttp.onerror = () =>{console.error('Error in sidebar_ajax()')}
            xhttp.send();
            
        
        })
    }
    function post_sidebar_ajax() {
        try{

            var note = document.getElementById('insert_note');
            note = note.value;
            // #####################################################################
            note.addEventListener('focus', function (event) {
                // -----------------------------------------------------------------
                // document.removeEventListener('keyup', function (event) {}, true)
                note.addEventListener('keyup', function (event) {
                    // event.preventDefault();
                    // add the note with enter if focusing the textarea ----------------
                    if (event.code == "Enter" || event.code == "NumpadEnter") {
                        console.log("cao");
                        enable_notes();
                    } else if (event.code == "Space") {
                        console.log("space pressed")
                    }
                }, true)
                // -----------------------------------------------------------------
            });
        }catch{
            setTimeout(()=>{
            var note = document.getElementById('insert_note');
            note_value = note.value;
            // #####################################################################
            note.addEventListener('focus', function (event) {
                // -----------------------------------------------------------------
                // document.removeEventListener('keyup', function (event) {}, true)
                note.addEventListener('keyup', function (event) {
                    // event.preventDefault();
                    // add the note with enter if focusing the textarea ----------------
                    if (event.code == "Enter" || event.code == "NumpadEnter") {
                        console.log("cao");
                        enable_notes();
                    } else if (event.code == "Space") {
                        console.log("space pressed")
                    }
                }, true)
                // -----------------------------------------------------------------
            });
        }, 2000);
        }
        // #####################################################################

} // ===========================================================================

    sidebar_ajax().then(post_sidebar_ajax());
}





// enable the saving of the note ===============================================
function enable_notes() {
    setTimeout(() => {

        const note = document.getElementById('insert_note')


        var title = document.getElementById('video_title').innerText;
        var time = document.getElementById('video').currentTime;
        var comp_title = title.split(" ~ ");

        var course = comp_title[0];
        var topic = comp_title[1];
        var lecture = comp_title[2];
        insert_note_in_db(course, topic, lecture, time, note.value);
    }, 200);

} // ===========================================================================

function insert_note_in_db(course, topic, lecture, time, note) {
    var ajax_insertion = function () {
        return new Promise((resolve, reject) => {
            lecture = lecture.replace(" ", ".")
            path = `mvc/model/save_note.php?course=${course}&topic=${topic}&lecture=${lecture}&time=${time}&note=${note}`;
            let xhttp = new XMLHttpRequest();
            xhttp.onreadystatechange = function () {
                if (this.readyState == 4 && this.status == 200) {
                    console.log('Done');
                } 
            };
            xhttp.open("GET", path, true);
            xhttp.send();

            resolve();
        })
    
    }
    ajax_insertion().then(()=>{console.log("devo fare qualcosa qui per mostrare la nota creata")});

}

// Change video speed BTN ======================================================
function set_speed(val) {
    var vid = document.getElementById("video");
    if (val == 1) {
        vid.playbackRate = 1;
        document.getElementById('speed').value = vid.playbackRate.toFixed(2);
    } else if (val == "+") {
        vid.playbackRate += 0.05;
        document.getElementById('speed').value = vid.playbackRate.toFixed(2);
    } else if (val == "-") {
        vid.playbackRate -= 0.05;
        document.getElementById('speed').value = vid.playbackRate.toFixed(2);
    }
} // ===========================================================================




//  function to convert seconds into HH:mm:ss ==================================
function seconds_to_parsed(d) {
    d = Number(d);
    var h = Math.floor(d / 3600);
    var m = Math.floor(d % 3600 / 60);
    var s = Math.floor(d % 3600 % 60);

    var hDisplay = h >= 10 ? `${h}` : `0${h}`;
    var mDisplay = m >= 10 ? `${m}` : `0${m}`;
    var sDisplay = s >= 10 ? `${s}` : `0${s}`;
    return `${hDisplay}:${mDisplay}:${sDisplay}`;
} // ===========================================================================




// convert back to seconds from the time format ================================
function parsed_to_second(d) {
    timelist = d.split(":");
    var h = timelist[0];
    var m = timelist[1];
    var s = timelist[2];

    seconds = parseInt(h * 3600) + parseInt(m * 60) + parseInt(s);
    return seconds;
} // ===========================================================================




// Update the current time of the video ========================================
function update_time() {
    // get current video playing -----------------------------------------------
    var vid = document.getElementById("video");

    // get input for time travel -----------------------------------------------
    var display_time = document.getElementById('time');

    // Populate the total time of the video ------------------------------------
    var total_time = document.getElementById("total_time");
    total_time.innerText = seconds_to_parsed(vid.duration);

    // get the button GO ------------------------------------------------------- 
    var display_time_go = document.getElementById("go");


    // Update the timer in the input every one second --------------------------
    var time_interval = setInterval(() => {
        parsed_time = seconds_to_parsed(vid.currentTime);
        display_time.value = parsed_time;
    }, 1000)

    // bind the arrow keys to time travel ----------------------------------
    document.onkeydown = checkKey;

    // Remove the updating while focusing the input ----------------------------
    display_time.addEventListener('focus', (event) => {
        clearInterval(time_interval);
        // UNbind the arrow keys to time travel --------------------------------
        document.onkeydown = null;
    }, true);
    display_time.addEventListener('focusin', (event) => {
        clearInterval(time_interval);
        // UNbind the arrow keys to time travel --------------------------------
        document.onkeydown = null;
    }, true);

    // Update again the input 3 sec after focus out ----------------------------
    display_time.addEventListener('focusout', (event) => {

        // bind the arrow keys to time travel ----------------------------------
        document.onkeydown = checkKey;

        // Updates after 3 seconds ---------------------------------------------
        setTimeout(() => {
            time_interval = setInterval(() => {
                parsed_time = seconds_to_parsed(vid.currentTime);
                display_time.value = parsed_time;
            }, 1000)
        }, 3000)
    });


    // on clicking GO goto the desidered time ----------------------------------
    go.addEventListener("click", (event) => {
        event.preventDefault();
        let time_to_go = parsed_to_second(display_time.value)
        vid.currentTime = time_to_go;
    }, true)

    // binds the Enter and NumpadEnter Key to do the search --------------------
    const time = document.getElementById('time');
    time.addEventListener('keyup', function (event) {
        if (event.code == "Enter" || event.code == "NumpadEnter") {
            // if is not playing start the video -------------------------------
            if (!vid.playing) {
                vid.play();
            }
            return display_time_go.click()
        } else if (event.code == "Space") {
            if (!vid.playing) {
                vid.play();
            } else {
                vid.pause();
            }
        }
    }, true)

} // ===========================================================================




// defining the playing property for videos and audio if is playing ============
Object.defineProperty(HTMLMediaElement.prototype, 'playing', {
    get: function () {
        return !!(this.currentTime > 0 && !this.paused && !this.ended && this.readyState > 2);
    }
}) // ==========================================================================



// FIXME bind the arrow keys to +-5 sec +-10 sec if not input mode =============
function checkKey(e) {
    var vid = document.getElementById("video");
    e = e || window.event;
    if (e.keyCode == '38') {
        vid.currentTime += 10;
    } else if (e.keyCode == '40') {
        vid.currentTime -= 10;
    } else if (e.keyCode == '37') {
        vid.currentTime -= 5;
    } else if (e.keyCode == '39') {
        vid.currentTime += 5;
    }
} // ===========================================================================



// set the functionalities for the arrow =======================================
function time_travel(seconds) {
    var vid = document.getElementById("video");
    vid.currentTime += seconds;
} // ===========================================================================



// Set the playback speed of the video =========================================
function set_playback_speed() {
    vid = document.getElementById("video");
    button = document.getElementById("speedbtn");
    speed = document.getElementById("speed")
    vid.playbackRate = speed.value;
} // ===========================================================================


// Goto the time specified in the note =========================================
function goto_note_time(s) {
    vid = document.getElementById('video');
    vid.currentTime = s;
} // ===========================================================================



// Delete the note from the sidebar ============================================
function delete_note(element) {

    // find the ID of the note to delete ---------------------------------------
    let del_id = element.dataset.del_id;

    // get the note object -----------------------------------------------------
    let note = document.querySelector(`[data-note_id="${del_id}"]`)

    // get the parent of the note to remove it later ---------------------------
    let parent = document.querySelector(`[data-parent_id="${del_id}"]`)

    // retrieve some information for AJAX call to remove DB entries ------------
    let course = note.dataset.note_course;
    let topic = note.dataset.note_topic;
    let lecture = note.dataset.note_lecture;
    let time = note.dataset.note_time;

    // prompt user for note delition -------------------------------------------
    show_dialog_delete(parent, note, del_id, course, topic, lecture, time)
} // ===========================================================================



// FIXME  AJAX update notes ====================================================
function update_notes_db(del_id) {
    path = `mvc/model/delete_note.php?id=${del_id}`;
    let xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function () {
        if (this.readyState == 4 && this.status == 200) {
            console.log("Note deleted")
        } 
    };
    xhttp.open("GET", path, true);
    xhttp.send();

} // ===========================================================================


// Open Dialog Jquery UI =======================================================
function show_dialog_delete(parent, note, del_id, course, topic, lecture, time) {
    
    var choice = false;
    $(function () {
        $("#dialog-confirm").dialog({
            resizable: false,
            height: "auto",
            width: 400,
            modal: true,
            buttons: {
                "Delete note": function () {
                    choice = true;
                    $(this).dialog("close");
                    // updates the DB via AJAX -----------------------------------------
                    update_notes_db(del_id);
                    // remove the actual note ------------------------------------------
                    parent.removeChild(note);
                },
                Cancel: function () {
                    choice = false;
                    $(this).dialog("close");
                }
            }
        });
    });
} // ===========================================================================


// TODO aggiungere video.addEventListener('complete', () =>{})
// TODO aggiungere video.addEventListener('focus', () =>{ keyboardevent Oppure prevent default}) 
// TODO aggiungere il pulsante video visto [DB] + [JS]
// TODO aggiungere il pulsante video prossimo, precedente [JS]
// TODO aggiungere il data-viewed e data-completed [DB] + [JS]


// Speed up EVERY VIDEO in the page
// var vid = document.querySelectorAll("video");
// vid.forEach((v)=>{v.playbackRate = 1})      // reset
// vid.forEach((v)=>{v.playbackRate += 0.5})   // aumenta di 0.05
// vid.forEach((v)=>{v.playbackRate -= 0.5})   // diminuisce di 0.05
// vid.forEach((v)=>{v.playbackRate = 1.5})    // setta a velocita' a 1.5x



// window.onload("")
// window.addEventListener("load", function(event) {
//     console.log("Tutte le risorse hanno terminato il caricamento!");
//   });
// var cat = localStorage.getItem("myCat");