<?php

$nombre = $_POST['nombre'];
$precio = $_POST['precio'];
$imagen = $_POST['imagen'];
$descripcion = $_POST['descripcion'];



if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    $nombre = $_POST['nombre'];

    // Directorio donde se guardarán las imágenes
    $carpeta_destino = '../img/';

    // Ruta completa de la imagen
    $ruta_imagen = $carpeta_destino . $_FILES['imagen']['name'];

    // Mover el archivo a la carpeta de destino
    move_uploaded_file($_FILES['imagen']['tmp_name'], $ruta_imagen);



    $archivo = '../JSON/productos.json';
    $productos = json_decode(file_get_contents($archivo), true);

    $id = random_int(15,1000);
    // Nuevo producto
    $nuevoProducto = [    
        "id"=>"$id",
        "img"=> "$ruta_imagen",
        "nombre"=>"$nombre",
        "descripcion"=> "$descripcion",
        "precio"=>"$precio"
    
    ];

    // Agregar el nuevo producto al array de productos
    $productos[] = $nuevoProducto;

    // Guardar los productos actualizados en el archivo JSON
    file_put_contents($archivo, json_encode($productos));

    echo json_encode(['status' => 'success', 'message' => 'Producto agregado exitosamente.']);
    header('location: admin.html');



} else {
    echo "Método no permitido.";
}









?>
