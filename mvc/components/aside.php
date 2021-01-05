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
            <h1 class="course_name">$item_name</h1>
        </div>
        
        EOE;

    foreach ($lectures as $lecture){
        $topic_index = strripos($lecture, '/');
        $topic_name = substr($lecture, $topic_index + 1);
        $topic_name_spaced = str_replace('.', ' ', $topic_name);

    
        echo<<<EOT
            <div class="topic">
                <!-- staating topic 1 -->
                <a href="#" data-clicked="none"  onclick="toggle_topic('$item_name - $topic_name_spaced')" data-target="$item_name - $topic_name_spaced">
                    <div class="courses_topic" data-topic="$item_name - $topic_name_spaced" data-collapsed="no" data-completed="no">$topic_name_spaced</div>
                </a>
                <div class="lectures">
        EOT;
        $lectures = glob($lecture . '/*');
        foreach ($lectures as $lecture) {
            $lecture_index = strripos($lecture, "/");
            $lecture_path = substr(substr($lecture, $lecture_index + 1 ),0,-4);
            $lecture_name = str_replace('.', ' ', substr(substr($lecture, $lecture_index + 1 ),0,-4));

            echo<<<EOF
                    <div class="courses_lecture" onclick="get_video(this.id, '$item_name', '$topic_name', '$lecture_path')" id="$item_name - $topic_name_spaced - $lecture_name"  data-id="$item_name - $topic_name_spaced" data-name="$item_name - $topic_name_spaced - $lecture_name" data-watched="no" data-visible="no">$lecture_name</div>
                    
                EOF;
        }
                echo "</div>";
        echo "</div>";
    }
}
        ?>
        <!-- finishing topic 1 -->

    </nav>
</aside>