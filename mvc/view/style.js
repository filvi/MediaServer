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

