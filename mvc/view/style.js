function toggle_season(season_name) {

    let episode = document.querySelectorAll(`[data-id="${season_name}"]`);
    
    for (let i = 0; i < episode.length; i++) {
        let visible = episode[i].getAttribute("data-visible");
        if (visible === "no") {
            episode[i].setAttribute("data-visible", "yes")
        } else {
            episode[i].setAttribute("data-visible", "no");
        }
    };
    
    
    let season = document.querySelector(`[data-season="${season_name}"]`);
    let toggled = season.getAttribute("data-collapsed");
    // console.log(season);
    if (toggled === "no") {
        season.setAttribute("data-collapsed", "yes")
    } else {
        season.setAttribute("data-collapsed", "no");
    }
    season.setAttribute
}



function get_video(id, item, season, episode){
    
    
    episode = episode.replace(" ", ".")
    path = `mvc/components/video.php?path=Master/${item}/${season}/${episode}.mp4`
    var target = document.getElementById(id)
    // console.log(path);
     var xhttp = new XMLHttpRequest();
  xhttp.onreadystatechange = function() {
    if (this.readyState == 4 && this.status == 200) {
     document.getElementById("main").innerHTML = this.responseText;
    // console.log(this.responseText);
    }
  };
  xhttp.open("GET", path, true);
  xhttp.send();
    

}


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