<?php
    // Incluimos los archivos necesarios
    include('conexion.php');
    require_once('seguridad.php');

    // Si el formulario ha sido enviado
    if ($_SERVER["REQUEST_METHOD"] == "POST") {
        // Si se pulsa el botón cancelar
        if(isset($_POST['cancelar'])) {
            header('Location: index.php');
            exit;
        }

        // Si se pulsa el botón enviar
        if(isset($_POST['enviar'])) {
            // Limpiamos los datos usando la función de seguridad.php
            $nombre = limpiarDato($_POST['nombre']);
            $email = limpiarDato($_POST['email']);
            $asunto = limpiarDato($_POST['asunto']);
            $mensaje_usuario = limpiarDato($_POST['mensaje']);

            // Validaciones básicas
            if (empty($nombre) || empty($email) || empty($asunto) || empty($mensaje_usuario)) {
                echo "<script>mostrarError('Por favor, rellena todos los campos');</script>";
            } 
            // Validar email usando la función de seguridad.php
            elseif (!validarEmail($email)) {
                echo "<script>mostrarError('El email no es válido');</script>";
            }
            // Validar longitud del mensaje
            elseif (strlen($mensaje_usuario) < 10) {
                echo "<script>mostrarError('El mensaje debe tener al menos 10 caracteres');</script>";
            }
            else {
                // Escapamos los datos usando la función de seguridad.php
                $nombre = escaparSQL($conexion, $nombre);
                $email = escaparSQL($conexion, $email);
                $asunto = escaparSQL($conexion, $asunto);
                $mensaje_usuario = escaparSQL($conexion, $mensaje_usuario);

                // Guardamos en la base de datos
                $sql = "INSERT INTO mensajes_contacto (nombre, email, asunto, mensaje) 
                       VALUES ('$nombre', '$email', '$asunto', '$mensaje_usuario')";
                
                // Intentamos guardar
                $guardado = $conexion->query($sql);
                
                if ($guardado) {
                    echo "<script>alert('¡Mensaje enviado correctamente!');</script>";
                    // Limpiamos el formulario
                    $_POST['nombre'] = '';
                    $_POST['email'] = '';
                    $_POST['asunto'] = '';
                    $_POST['mensaje'] = '';
                } else {
                    echo "<script>alert('Error: No se pudo enviar el mensaje');</script>";
                }
            }
        }
    }
?>
<!DOCTYPE html>
<html lang="es">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Contacto - PatiGo</title>
    <link rel="stylesheet" href="css/normalize.css">
    <link href="https://fonts.googleapis.com/css2?family=Staatliches&display=swap" rel="stylesheet">
    <link rel="stylesheet" href="css/style.css">
    <script>
        // Función para mostrar mensajes de error
        function mostrarError(mensaje) {
            alert(mensaje);
        }
    </script>
</head>
<body>
    <header class="header">
        <a href="index.php">
            <img class="header__logo" src="img/LogoPatiGo.png" alt="Logotipo">
        </a>
    </header>

    <nav class="navegacion">
        <a class="navegacion__enlace" href="index.php">Inicio</a>
        <a class="navegacion__enlace" href="productos_gatos.php">Productos</a>
        <a class="navegacion__enlace navegacion__enlace--activo" href="contacto.php">Contacto</a>
    </nav>

    <main class="contenedor">
        <h1>Contacto</h1>

        <form class="formulario" method="POST">
            <div class="campo">
                <label for="nombre">Nombre:</label>
                <input type="text" id="nombre" name="nombre" required 
                       value="<?php echo isset($_POST['nombre']) ? htmlspecialchars($_POST['nombre']) : ''; ?>">
            </div>

            <div class="campo">
                <label for="email">Email:</label>
                <input type="email" id="email" name="email" required
                       value="<?php echo isset($_POST['email']) ? htmlspecialchars($_POST['email']) : ''; ?>">
            </div>

            <div class="campo">
                <label for="asunto">Asunto:</label>
                <input type="text" id="asunto" name="asunto" required
                       value="<?php echo isset($_POST['asunto']) ? htmlspecialchars($_POST['asunto']) : ''; ?>">
            </div>

            <div class="campo">
                <label for="mensaje">Mensaje:</label>
                <textarea id="mensaje" name="mensaje" required minlength="10"><?php 
                    echo isset($_POST['mensaje']) ? htmlspecialchars($_POST['mensaje']) : ''; 
                ?></textarea>
            </div>

            <div class="botones">
                <button type="submit" name="enviar" class="boton">Enviar</button>
                <button type="submit" name="cancelar" class="boton boton-cancelar">Cancelar</button>
            </div>
        </form>
    </main>

    <footer class="footer">
        <p class="footer__texto">PatiGo - Todos los derechos Reservados <?php echo date('Y'); ?></p>
    </footer>
</body>
</html>
<?php
    $conexion->close();
?> 