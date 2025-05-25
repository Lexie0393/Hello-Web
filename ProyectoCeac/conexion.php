<?php
    //Establecemos la conexión en este archivo, para no tener que escribirlo en cada archivo.
    $conexion = new mysqli("127.0.0.1:3307", "root", "1234", "patigo_db");

    //Comprobación de la conexión
    if ($conexion->connect_error) {
        die("Error de conexión: " . $conexion->connect_error);
    }
?>