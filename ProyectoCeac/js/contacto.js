document.addEventListener('DOMContentLoaded', () => {
    const form = document.querySelector('.contacto-form');
    
    form.addEventListener('submit', async (e) => {
        e.preventDefault();
        
        // Validar el formulario
        if (!validarFormulario()) {
            return;
        }

        // Recoger los datos del formulario
        const formData = new FormData(form);
        const datos = Object.fromEntries(formData.entries());

        try {
            // Aquí iría la llamada al backend para procesar el formulario
            // Por ahora, simulamos una respuesta exitosa
            await simularEnvio(datos);
            
            // Mostrar mensaje de éxito
            mostrarMensaje('¡Mensaje enviado correctamente! Nos pondremos en contacto contigo pronto.', 'success');
            
            // Limpiar formulario
            form.reset();
        } catch (error) {
            mostrarMensaje('Ha ocurrido un error al enviar el mensaje. Por favor, inténtalo de nuevo.', 'error');
        }
    });
});

function validarFormulario() {
    const nombre = document.getElementById('nombre').value.trim();
    const email = document.getElementById('email').value.trim();
    const asunto = document.getElementById('asunto').value.trim();
    const mensaje = document.getElementById('mensaje').value.trim();
    const politica = document.querySelector('input[name="politica"]').checked;

    // Validar nombre
    if (nombre.length < 2) {
        mostrarMensaje('Por favor, introduce un nombre válido', 'error');
        return false;
    }

    // Validar email
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
        mostrarMensaje('Por favor, introduce un email válido', 'error');
        return false;
    }

    // Validar asunto
    if (asunto.length < 3) {
        mostrarMensaje('Por favor, introduce un asunto válido', 'error');
        return false;
    }

    // Validar mensaje
    if (mensaje.length < 10) {
        mostrarMensaje('Por favor, introduce un mensaje más largo', 'error');
        return false;
    }

    // Validar política de privacidad
    if (!politica) {
        mostrarMensaje('Debes aceptar la política de privacidad', 'error');
        return false;
    }

    return true;
}

function mostrarMensaje(mensaje, tipo) {
    // Eliminar mensaje anterior si existe
    const mensajeAnterior = document.querySelector('.mensaje-alerta');
    if (mensajeAnterior) {
        mensajeAnterior.remove();
    }

    // Crear nuevo mensaje
    const div = document.createElement('div');
    div.className = `mensaje-alerta mensaje-${tipo}`;
    div.textContent = mensaje;

    // Insertar mensaje después del título del formulario
    const form = document.querySelector('.formulario-contacto');
    form.insertBefore(div, form.querySelector('form'));

    // Eliminar mensaje después de 5 segundos
    setTimeout(() => {
        div.remove();
    }, 5000);
}

async function simularEnvio(datos) {
    // Simular delay de red
    return new Promise((resolve) => {
        setTimeout(() => {
            console.log('Datos enviados:', datos);
            resolve();
        }, 1000);
    });
}

// Añadir estilos dinámicamente para los mensajes
const styles = `
    .mensaje-alerta {
        padding: 1rem;
        margin-bottom: 1rem;
        border-radius: 0.375rem;
        font-weight: 500;
    }

    .mensaje-success {
        background-color: #dcfce7;
        color: #166534;
        border: 1px solid #16a34a;
    }

    .mensaje-error {
        background-color: #fee2e2;
        color: #991b1b;
        border: 1px solid #dc2626;
    }
`;

const styleSheet = document.createElement('style');
styleSheet.textContent = styles;
document.head.appendChild(styleSheet); 