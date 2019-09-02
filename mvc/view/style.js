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
}





window.onload = function (){
    let episodes = document.querySelectorAll(".series_episode");
    for (let i = 0 ; i < episodes.length; i++ ){
        episodes[i].addEventListener("mouseenter", function () {
        eWidth = episodes[i].offsetWidth;
        console.log(eWidth);
        });
    }
}
