<?php

$app->post('/login', function($request, $response, $args){

    $input = file_get_contents("php://input");
    $data = json_decode($input, true);

    if($data["usuario"] == "prueba" && $data["password"] == "1234"){
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

