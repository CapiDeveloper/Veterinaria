<?php 
namespace MVC;
class Router{
    public $urlGET = [];
    public $urlPOST = [];

    public function comprobarRutas(){
        $urlActual = $_SERVER['PATH_INFO'] ?? '/';
        $metodoActual = $_SERVER['REQUEST_METHOD'];

        if ($metodoActual === 'GET') {
            $fn = $this->urlGET[$urlActual] ?? null;
        }else {
            $fn = $this->urlPOST[$urlActual] ?? null;
        }

        if ($fn) {
            call_user_func($fn,$this);
        }else{
            debuguear('PAGINA NO ENCONTRADA');
        }
    }
    public function get($url,$fn){
        $this->urlGET[$url] = $fn;
    }
    public function post($url,$fn){
        $this->urlPOST[$url] = $fn;
    }
}
?>