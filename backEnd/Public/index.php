<?php 
    include_once __DIR__.'/../Includes/app.php';

    // Cabeceras para otros dominios puedan hacer peticiones
    header("Access-Control-Allow-Origin: *");
    header("Access-Control-Allow-Headers: content-type");
    header("Access-Control-Allow-Methods: OPTIONS,GET,PUT,POST,DELETE");

    use MVC\Router;
    use Controller\VeterinarioController;
    use Model\PacienteController;

    $router = new Router;

    // **               RUTAS DE VETERINARIO              **
    // Rutas no protegidas
    $router->post('/api/veterinarios',[VeterinarioController::class,'registrar']);
    $router->get('/api/veterinarios/confirmar',[VeterinarioController::class,'confirmar']);
    $router->post('/api/veterinarios/login',[VeterinarioController::class,'autenticar']);

    $router->post('/api/veterinarios/olvide-password',[VeterinarioController::class,'olvidePassword']);
    $router->post('/api/veterinarios/nuevo-password',[VeterinarioController::class,'nuevoPassword']);
    
    $router->get('/api/veterinarios/establecer-password',[VeterinarioController::class,'comprobarToken']);
    $router->post('/api/veterinarios/nuevo-password',[VeterinarioController::class,'nuevoPassword']);

    // Ruta protegida con JWT
    $router->get('/api/veterinarios/perfil',[VeterinarioController::class,'perfil']);

    // **               RUTAS DE PACIENTE              **
    $router->post('/api/pacientes',[PacienteController::class,'agregarPaciente']);
    $router->get('/api/pacientes',[PacienteController::class,'obtenerPacientes']);

    $router->comprobarRutas();

?>