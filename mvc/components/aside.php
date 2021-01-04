<aside>
    <img class="logo" src="mvc/view/img/logo/logo.svg">
    <nav class="stack">

        <?php
foreach ($items as $item){
    $lectures = glob("./" . $item . '/*');
    $item_index = strripos($item, '/');
    $item_name = substr($item, $item_index + 1);
    
    echo<<< EOE
        <div>
            <h1 class="serie_name">$item_name</h1>
        </div>
        
        EOE;

    foreach ($lectures as $lecture){
        $season_index = strripos($lecture, '/');
        $season_name = substr($lecture, $season_index + 1);
        $season_name_spaced = str_replace('.', ' ', $season_name);

    
        echo<<<EOT
            <div class="season">
                <!-- staating Season 1 -->
                <a href="#" data-clicked="none"  onclick="toggle_season('$item_name - $season_name_spaced')" data-target="$item_name - $season_name_spaced">
                    <div class="series_season" data-season="$item_name - $season_name_spaced" data-collapsed="no" data-completed="no">$season_name_spaced</div>
                </a>
                <div class="episodes">
        EOT;
        $episodes = glob($lecture . '/*');
        foreach ($episodes as $episode) {
            $episode_index = strripos($episode, "/");
            $episode_name = str_replace('.', ' ', substr(substr($episode, $episode_index + 1 ),0,-4));

            echo<<<EOF
                    <div class="series_episode" onclick="get_video(this.id, '$item_name', '$season_name', '$episode_name')" id="$item_name - $season_name_spaced - $episode_name"  data-id="$item_name - $season_name_spaced" data-name="$item_name - $season_name_spaced - $episode_name" data-watched="no" data-visible="no">$episode_name</div>
                    
                EOF;
        }
                echo "</div>";
        echo "</div>";
    }
}
        ?>
        <!-- finishing Season 1 -->

    </nav>
</aside>