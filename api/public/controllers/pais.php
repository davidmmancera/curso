<?php
$app->get('/pais', function ($request, $response, $args) {
    //$token = G::Autenticar($request/*, "CONTROL_OPERATIVOS_SECCION_GET"*/);
    $db = SQLSRV::connect();
    $stmt = sqlsrv_query($db,"SELECT paisId
                                ,paisDescripcion
                                ,paisIso2
                                ,paisIso3
                                FROM params.Pais
                                WHERE paisBorrado = 0");
    
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