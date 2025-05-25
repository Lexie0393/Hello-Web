<?php
    // ====== FUNCIONES BÁSICAS DE SEGURIDAD ======

    // 1. Limpia un texto para evitar ataques XSS (Cross-Site Scripting)
    function limpiarTexto($texto) {
        return htmlspecialchars(trim($texto));
    }

    // 2. Protege contra inyección SQL
    function seguridadSQL($conexion, $texto) {
        return $conexion->real_escape_string($texto);
    }

    // 3. Comprueba si el usuario está logueado
    function estaLogueado() {
        return isset($_SESSION['id_usuario']);
    }

    // 4. Comprueba si un número es válido y positivo
    function esNumeroValido($numero) {
        return is_numeric($numero) && $numero > 0;
    }

    // ======= FUNCIONES DE SEGURIDAD BÁSICAS =======

    // 1. Función para limpiar datos de entrada
    function limpiarDato($dato) {
        // Quitamos espacios al inicio y final
        $dato = trim($dato);
        // Quitamos las barras invertidas
        $dato = stripslashes($dato);
        // Convertimos caracteres especiales en entidades HTML
        $dato = htmlspecialchars($dato);
        return $dato;
    }

    // 2. Función para prevenir inyección SQL
    function escaparSQL($conexion, $dato) {
        return $conexion->real_escape_string($dato);
    }

    // 3. Función para validar un email
    function validarEmail($email) {
        return filter_var($email, FILTER_VALIDATE_EMAIL);
    }

    // 4. Función para generar un token CSRF
    function generarTokenCSRF() {
        if (!isset($_SESSION['csrf_token'])) {
            $_SESSION['csrf_token'] = bin2hex(random_bytes(32));
        }
        return $_SESSION['csrf_token'];
    }

    // 5. Función para validar un token CSRF
    function validarTokenCSRF($token) {
        if (!isset($_SESSION['csrf_token'])) {
            return false;
        }
        return hash_equals($_SESSION['csrf_token'], $token);
    }

    // 6. Función para mostrar mensajes de error de forma segura
    function mostrarError($mensaje) {
        return htmlspecialchars($mensaje);
    }
?> 