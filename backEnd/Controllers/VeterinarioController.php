<?php

namespace Controller;

use Firebase\JWT\JWT;

include_once __DIR__.'/../Includes/app.php';

use Model\Veterinarios;
use Clases\Email;

class VeterinarioController{
    public static function registrar(){
      $alertas = [];

      if ($_SERVER["REQUEST_METHOD"] === 'POST') {
          
        $veterinarios = new Veterinarios($_POST);
        $existeVeterinario = Veterinarios::find('email',$_POST['email']);
        if (!$existeVeterinario) {
          // Guardarmos registro
          $veterinarios->generarToken();
          $veterinarios->hashearPassoword();
          $resultado = $veterinarios->guardar();
          $alertas=[
            'mensaje'=> 'Usuario Creado correctamente, revisa tu email',
            'tipo' => false
          ];

          // Enviar email
          $email = new Email($veterinarios->nombre,$veterinarios->email,$veterinarios->token);
          $email->enviarConfirmacion();
        }else{
          $alertas=[
            'mensaje'=> 'El usuario ya existe',
            'tipo' => true
          ];
        }
        echo json_encode($alertas);
      }// fin post
    }
    public static function confirmar(){
      $confirmacion = [];
      $token = $_GET['token'];
      //Encontrar al usuario con este token
      $usuario = Veterinarios::find('token',$token);

      if (empty($usuario)) {
          //No se encontro un usuario con ese token
          $confirmacion = [
            'detalle'=>'Token no valido',
            'valido' => true
          ];
      }else{
        $confirmacion = [
          'detalle'=>'Token valido',
          'valido'=> false
        ];
        //Confirmar la cuenta
        $usuario->confirmado = 1;
        $usuario->token=null;

        //Guardar en la BD
        $usuario->guardar();
      }
          echo json_encode($confirmacion);
    }
    public static function autenticar(){
      if ($_SERVER["REQUEST_METHOD"] === 'POST') {
        $email = $_POST['email'];
        $password = $_POST['password'];
        //Verificar si existe usuario
        $existeUsuario = Veterinarios::find('email',$email);
        if ($existeUsuario) {
          // verificar confirmacion
          if ($existeUsuario->confirmado == 'true') {

            // Confirmar password
              if (password_verify($password,$existeUsuario->password)) {

                // Creacion de Token con JWT
                $time = time();
                  $token = [
                    'iat' => $time, // Tiempo que inició el token
                    'exp' => $time + (60*60), // Tiempo que expirará el token (+1 hora)
                    'data' => [ // información del usuario
                        'id' => $existeUsuario->id,
                        'name' => $existeUsuario->nombre
                    ]
                  ];

                  $jwt = JWT::encode($token, $_ENV['JWT_SECRET'],'HS256');
                  echo json_encode($jwt);
              }else{
                // passowrd incorrecto
                echo 'password incorrecto';
              }
          }else{
            // No esta confirmado el usuario
            echo 'No esta confirmado su cuenta';
          }

        }else{
          echo 'No existe usuario';
        }
      }
    }
    public static function perfil(){

        if (! preg_match('/Bearer\s(\S+)/', $_SERVER['HTTP_AUTHORIZATION'], $matches)) {
          header('HTTP/1.0 400 Bad Request');
          echo 'Token not found in request';
          exit;
       }

       //En $jwt esta almacenado el token que tiene el usuario en el navegador
       $jwt = $matches[1];

       //Verificar si el token existe
        if (!$jwt) {
            header('HTTP/1.0 400 Bad Request');
            exit;
        }

        // decodificacion JWT
        $info= json_decode(base64_decode(str_replace('_', '/', str_replace('-','+',explode('.', $jwt)[1]))));

        // id extraido de JWT
        $idVeterinario =  $info->data->id;
        $usuario = Veterinarios::find('id',$idVeterinario);

      }

      public static function olvidePassword(){
        if ($_SERVER["REQUEST_METHOD"] === 'POST') {
          $alerta = [];
          $usuario =  Veterinarios::find('email',$_POST['email']);

          // Si no existe agregar mensaje de errores
          if (!$usuario) {
            //error no existe usuario
            $alerta =[
              'mensaje' => 'No existe usuario',
              'error' => true
            ];
            echo json_encode($alerta);
            return;
          }

          // Generar token en BD
          $usuario->generarToken();

          $resultado =  $usuario->guardar();
          
          $alerta = [
            'mensaje'=> 'Usuario existe, revide su email para recuperarla',
            'error'=> false
          ];

          $email = new Email($usuario->nombre,$usuario->email,$usuario->token);
          $email->enviarInstrucciones();
          echo json_encode($alerta);
        }

      }
      public static function comprobarToken(){
        $array = [];

            $token = $_GET['token'];
            if(!$token) header('location: http://localhost:3000/');

            $existeUsuario = Veterinarios::find('token',$token);
            if (!$existeUsuario) {
              // debuguear('El usuario no existe');
              $array = [
                'mensaje'=>'El usuario no existe',
                'error'=>true
              ];
              echo json_encode($array);
            }else{
              $array = [
                'mensaje'=>'Coloca tu nuevo password',
                'error'=>false
              ];
              echo json_encode($array);
            }
      }

      public static function nuevoPassword(){
        if ($_SERVER["REQUEST_METHOD"] === 'POST') {
          $password = $_POST['password'];
          $existeVeterinario = Veterinarios::find('token',$_POST['token']);
          // echo json_encode($existeUsuario);
          // return;
          if ($existeVeterinario) {
            
            $existeVeterinario->sincronizar($_POST);
            // Eliminamos el token
            $existeVeterinario->token = null;
            // hasheamos password
            $existeVeterinario->hashearPassoword();
            // guardando
            $resultado = $existeVeterinario->guardar();

            $resultado = [
              'mensaje'=>'Password Modificado correctamente',
              'error'=>false
            ];
            echo json_encode($resultado);  
          };
       }
      }
  }
?>