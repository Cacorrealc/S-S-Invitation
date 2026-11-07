INVITACIÓN S&S · GUÍA RÁPIDA

ARCHIVOS
- index.html: estructura de la invitación.
- css/styles.css: diseño, colores, tipografías y adaptación a celulares.
- js/main.js: música, confirmación, fotografías y animaciones.
- assets/photos/: carpeta para las fotografías de Sebastián y Santiago.

FOTOGRAFÍAS
Guarda las imágenes optimizadas en formato JPG dentro de assets/photos:
- portada.jpg  (fotografía horizontal o vertical de portada; ideal 1800 px de alto)
- foto-1.jpg
- foto-2.jpg
- foto-3.jpg
La página muestra marcadores mientras no encuentre las fotos.

MÚSICA
El video de YouTube indicado por los novios está configurado en js/main.js con el ID _pysf5ixCTQ.
La reproducción se solicita cuando el invitado pulsa “Descubrir invitación”. Algunos navegadores pueden bloquear el audio; el botón “Música” permite volver a iniciarlo o pausarlo.

CONFIRMACIÓN DE ASISTENCIA
1. Crear un Google Form con estos campos:
   - Nombre completo (obligatorio)
   - ¿Confirmas tu asistencia? (Sí / No; obligatorio)
   - ¿Tienes alguna restricción alimentaria? (opcional)
2. No incluir campo de acompañantes ni cantidad de invitados: la invitación es estrictamente individual.
3. Copiar el enlace público para responder el formulario.
4. Abrir js/main.js y pegarlo en CONFIG.RSVP_FORM_URL.

UBICACIONES
Los botones de Google Maps abren búsquedas con los nombres y direcciones que proporcionaron los novios. Antes de publicar, verificar que cada pin corresponda exactamente al lugar.

PROBAR LOCALMENTE
Abrir la carpeta en Visual Studio Code y usar la extensión Live Server sobre index.html.

PUBLICAR GRATIS
Se puede publicar en GitHub Pages desde un repositorio público. Antes de hacerlo:
- Añadir fotografías autorizadas por los novios.
- Conectar el Google Form.
- Verificar direcciones, enlaces y reproducción musical desde un celular.
- Recordar que el enlace de la invitación puede ser reenviado; el formulario individual no impide técnicamente que alguien comparta el enlace. Para control estricto, se necesitaría una lista de invitados y validación individual.
