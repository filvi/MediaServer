<?php
// rename it .env.php before using it ==========================================

$variables = [
      'DB_HOST' => '',
      'DB_USERNAME' => '',
      'DB_PASSWORD' => '',
      'DB_NAME' => 'mediaserver',
  ];

  foreach ($variables as $key => $value) {
      putenv("$key=$value");
  }
?>