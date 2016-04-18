<?php
    $file = 'textfile.txt';
    $item = file_get_contents('php://input');
    file_put_contents($file, $item);
?>