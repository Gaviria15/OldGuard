const iconoUsuarios = document.getElementById('icono-usuarios');
const subMenuUsuarios = document.getElementById('sub-menu-usuarios');

iconoUsuarios.addEventListener('click', () => {
    if (subMenuUsuarios.style.display === 'block') {
        subMenuUsuarios.style.display = 'none';
    } else {
        subMenuUsuarios.style.display = 'block';
    }
});

