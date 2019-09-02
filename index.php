<?php

$dev = glob("Devel/*");
$film = glob("Film/*");
$serie = glob("Serie.tv/*");
// var_dump($dev);
// var_dump($film);
// var_dump($serie);

include('./mvc/components/header.php');
include('./mvc/components/body.php');



// foreach ($serie as $value){
//     $stagioni = glob($value . '/*');
//     foreach ($stagioni as $stagione){
//         echo '------------';
//         var_dump($stagione);
//         $episodi = glob($stagione . '/*');
//         var_dump($episodi);
//         echo('<br>');
//     }
// }
// References
// ===============================================================================
// JS VIDEO TIMINGS --> https://www.w3schools.com/tags/av_prop_currenttime.asp
// ===============================================================================

?>