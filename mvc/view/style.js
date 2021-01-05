
// Dropdown toggle system
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
    // console.log(topic);
    if (toggled === "no") {
        topic.setAttribute("data-collapsed", "yes")
    } else {
        topic.setAttribute("data-collapsed", "no");
    }
    topic.setAttribute
}


// fetch and display video from the script at mvc/components/video.php =========
function get_video(id, course, topic, lecture){
    lecture = lecture.replace(" ", ".")
    path = `mvc/components/video.php?path=Videos/${course}/${topic}/${lecture}.mp4`
    var target = document.getElementById(id)
    target.dataset.watched = "yes";
    var xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function() {
    if (this.readyState == 4 && this.status == 200) {
        document.getElementById("main").innerHTML = this.responseText;
    }
  };
  xhttp.open("GET", path, true);
  xhttp.send();

}

// Change video speed BTN ======================================================
function set_speed(val){ 
    var vid = document.getElementById("video");
    if (val == 1){
        vid.playbackRate = 1;
        document.getElementById('speed').value = vid.playbackRate.toFixed(2);
    } else if (val == "+"){
        vid.playbackRate += 0.05;
        document.getElementById('speed').value = vid.playbackRate.toFixed(2);
    } else if (val == "-"){
        vid.playbackRate -= 0.05;
        document.getElementById('speed').value = vid.playbackRate.toFixed(2);
    }
}

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
}

// convert back to seconds from the time format ================================
function parsed_to_second(d) {
    timelist = d.split(":");
    var h = timelist[0];
    var m = timelist[1];
    var s = timelist[2];

    seconds = parseInt(h*3600) + parseInt(m*60) + parseInt(s);
    return seconds;
}

// Update the current time of the video ========================================
function update_time(){
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
    var time_interval = setInterval(()=>{
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
    });
    display_time.addEventListener('focusin', (event) => {
        clearInterval(time_interval);
        // UNbind the arrow keys to time travel --------------------------------
        document.onkeydown = null;
    });

    // Update again the input 3 sec after focus out ----------------------------
    display_time.addEventListener('focusout', (event) => {
        
        // bind the arrow keys to time travel ----------------------------------
        document.onkeydown = checkKey;

        // Updates after 3 seconds ---------------------------------------------
        setTimeout(()=>{
            time_interval = setInterval(()=>{
                parsed_time = seconds_to_parsed(vid.currentTime);
                display_time.value = parsed_time;
                }, 1000)
        }, 3000)
    });

    
    // on clicking GO goto the desidered time ----------------------------------
    go.addEventListener("click", (event)=>{
        event.preventDefault();
        let time_to_go = parsed_to_second(display_time.value)
        vid.currentTime = time_to_go;
    })

    // binds the Enter and NumpadEnter Key to do the search --------------------
    document.addEventListener('keypress', function (event) {
        if (event.code == "Enter" || event.code == "NumpadEnter" ) {
            // if is not playing start the video -------------------------------
            if(!vid.playing){
                vid.play();
            }
            return display_time_go.click()
        }else if (event.code == "Space"){
            if(!vid.playing){
                vid.play();
            } else {
                vid.pause();
            }
        }
    })

}


// defining the playing property for videos and audio if is playing ============
Object.defineProperty(HTMLMediaElement.prototype, 'playing', {
    get: function(){
        return !!(this.currentTime > 0 && !this.paused && !this.ended && this.readyState > 2);
    }
})



// bind the arrow keys to +-5 sec +-10 sec if not input mode ---------------
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
}


// set the functionalities for the arrow
function time_travel(seconds){
    var vid = document.getElementById("video");
    vid.currentTime += seconds;
}



function set_playback_speed(){
    vid = document.getElementById("video");
    button = document.getElementById("speedbtn");
    speed = document.getElementById("speed")
    vid.playbackRate = speed.value ;
}

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