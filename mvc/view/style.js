
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
function get_video(id, item, season, episode){
    episode = episode.replace(" ", ".")
    path = `mvc/components/video.php?path=Master/${item}/${season}/${episode}.mp4`
    var target = document.getElementById(id)
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
    } else if (val == "+"){
        vid.playbackRate += 0.05;
    } else if (val == "-"){
        vid.playbackRate += 0.05;
    }
}


// Update the current time of the video ========================================
function update_time(){
    display_time = document.getElementById('time');
    vid = document.getElementById("video");
    setInterval(()=>{

            if (vid.currentTime >= 60){
                minutes = Math.floor(parseInt(vid.currentTime) / 60);
                if (minutes < 10){
                    minutes = "0"+parseInt(minutes).toString()
                }
                seconds = parseInt(vid.currentTime) % 60;
                if(seconds < 10){
                    parsed_time = `${minutes}:0${seconds}`
                }else {
                    parsed_time = `${minutes}:${seconds}`
                }
            } else {
                seconds = parseInt(vid.currentTime)
                if(seconds < 10){
                    parsed_time = `00:0${seconds}`
                }else {
                    parsed_time = `00:${seconds}`
                }
            }
            display_time.value = parsed_time;

    }, 1000)
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