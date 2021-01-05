
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
    path = `mvc/components/video.php?path=Master/${course}/${topic}/${lecture}.mp4`
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
function secondsToHms(d) {
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
function hmsToSeconds(d) {
    timelist = d.split(":");
    var h = timelist[0];
    var m = timelist[1];
    var s = timelist[2];

    seconds = parseInt(h*3600) + parseInt(m*60) + parseInt(s);
    return seconds;
}

// Update the current time of the video ========================================
function update_time(){
    var display_time = document.getElementById('time');
    var vid = document.getElementById("video");
    var time_interval = setInterval(()=>{
            parsed_time = secondsToHms(vid.currentTime);
            display_time.value = parsed_time;
    }, 1000)

    display_time.addEventListener('focus', (event) => {
        clearInterval(time_interval);
    });
    display_time.addEventListener('focusin', (event) => {
        clearInterval(time_interval);
    });

    display_time.addEventListener('focusout', (event) => {
        setTimeout(()=>{
            time_interval = setInterval(()=>{
                parsed_time = secondsToHms(vid.currentTime);
                display_time.value = parsed_time;
                }, 1000)
        }, 3000)
    });


    var display_time_go = document.getElementById("go");

    go.addEventListener("click", (event)=>{
        event.preventDefault();
        let time_to_go = hmsToSeconds(display_time.value)
        vid.currentTime = time_to_go;
    })

    document.addEventListener('keydown', function (event) {
     
        
        if (event.keyCode == 13) {
            return display_time_go.click()
        }
        // if is not playing start the video ===================================
        if(!document.getElementById('video').playing){
            document.getElementById('video').play();
        }
    })
    
}


// defining the playing property for videos and audio if is playing ============
Object.defineProperty(HTMLMediaElement.prototype, 'playing', {
    get: function(){
        return !!(this.currentTime > 0 && !this.paused && !this.ended && this.readyState > 2);
    }
})




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