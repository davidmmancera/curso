<?php

$app->post('/login', function($request, $response, $args){

    $input = file_get_contents("php://input");
    $data = json_decode($input, true);

    $u = "prueba";
    $p = "1234";

    if($data["usuario"] == $u && $data["password"] == $p){
        $authToken = G::CrearToken($data);
    }

    $res = [];
    $res["usuario"] = $data["usuario"];
    $res["id"] = 01;
    $res["token"] = $authToken;
    $res["perfil"] = "administrador";


    $payload = json_encode($res);

    $response->getBody()->write($payload);
    return $response->withHeader("Content-type", 'application/json');
});

?>

