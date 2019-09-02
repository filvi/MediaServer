<aside>
    <img class="logo" src="mvc/view/img/logo/logo.svg">
    <nav class="stack">

        <?php
foreach ($series as $serie){
    $stagioni = glob($serie . '/*');
    $serie_index = strripos($serie, '/');
    $serie_name = substr($serie, $serie_index + 1);
    
    echo<<< EOE
        <div>
            <h1 class="serie_name">$serie_name</h1>
        </div>
        
        EOE;
    foreach ($stagioni as $stagione){
        $season_index = strripos($stagione, '/');
        $season_name = substr($stagione, $season_index + 1);
        $season_name_spaced = str_replace('.', ' ', $season_name);

    
        echo<<<EOT
            <div class="season">
                <!-- staating Season 1 -->
                <a href="#" data-clicked="none" onclick="toggle_season('$serie_name.$season_name')" data-target="$serie_name.$season_name">
                    <div class="series_season"  data-collapsed="no" data-completed="no">$season_name_spaced</div>
                </a>
                <div class="episodes">
        EOT;
        $episodes = glob($stagione . '/*');
        foreach ($episodes as $episode) {
            $episode_index = strripos($episode, "/");
            $episode_name = str_replace('.', ' ', substr(substr($episode, $episode_index + 8),0,-4));

            echo<<<EOF
                    <div class="series_episode" data-id="$serie_name.$season_name" data-watched="no" data-visible="no">$episode_name</div>
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