<?php
    $bd = mysqli_connect('localhost','root','root','veterinaria_capidev');
    mysqli_set_charset($bd, 'utf8'); // Para formto en json
    if (!$bd) {
        echo 'No se conecto a la base de datos';
    }
    
?>