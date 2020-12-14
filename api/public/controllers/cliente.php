<?php
$app->get('/cliente', function ($request, $response, $args) {
    //$token = G::Autenticar($request/*, "CONTROL_OPERATIVOS_SECCION_GET"*/);
    $db = SQLSRV::connect();
    $stmt = sqlsrv_query($db,"SELECT clienId
                                ,clienNombre
                                ,clienDireccion
                                ,clienFechaAlta
                                ,clienBorrado
                                FROM dbo.Cliente
                                WHERE clienBorrado = 0");
    
    if($stmt === false) {
        SQLSRV::error(500, 'Error interno del servidor', $db);
    }

    $results = array();
    while ($row = sqlsrv_fetch_array($stmt, SQLSRV_FETCH_ASSOC)) {
        $results[] = $row;
    }

    sqlsrv_free_stmt($stmt);
    SQLSRV::close($db);

    $payload = json_encode($results);

    $response->getBody()->write($payload);
    return $response
              ->withHeader('Content-Type', 'application/json');
});

?>