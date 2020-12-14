<?php

defined ( 'PROVINCIA' ) ? null : define ( 'PROVINCIA', 1);


$ambiente = "dev";

if($ambiente == "dev"){
    defined ('DB_HOST') ? null : define('DB_HOST','192.168.1.5\sisepdev');
    defined ('DB_DATABASE') ? null : define('DB_DATABASE', "Curso");
    defined ('DB_USERNAME') ? null : define('DB_USERNAME', "sa");
    defined ('DB_PASSWORD') ? null : define('DB_PASSWORD', "Digital23");
    
    //Conexion a Auditoria 
    defined ('DB_USER') ? null : define('DB_USER', "sa");
    defined ('DB_PASS') ? null : define('DB_PASS', "Digital23");
    defined ('DB_BASE') ? null : define('DB_BASE', "Curso");

    defined ( 'TOKEN_KEY' ) ? null : define ( 'TOKEN_KEY', '#SoflexasAG#ASX#TS!232323#' );
    defined ( 'REMOTE_STORAGE' ) ? null : define ( 'REMOTE_STORAGE', 'http://192.168.1.17/sisep_same/apps/administrador_archivos/api/index.php/' );
    // defined ( 'REMOTE_STORAGE' ) ? null : define ( 'REMOTE_STORAGE', 'http://localhost:8080/administrador_archivos_api/index.php/' );

    defined ('RENAPER_TIPO') ? null : define('RENAPER_TIPO', "CABA");
    defined ('RENAPER_URL') ? null : define('RENAPER_URL', 'http://10.74.50.114/WSINTEGRACIONRENAPER/server.php?wsdl');

    //Validacion para Captcha - Secret Key
    defined ('CAPTCHA_KEY') ? null : define('CAPTCHA_KEY', "6LfhBQEaAAAAAGlyIYV6hMrCrQ1_BQIeMqP0EH_Q");

   
 } 
else if ($ambiente == "test")
{
    defined ('DB_HOST') ? null : define('DB_HOST','172.24.134.25');
    defined ('DB_DATABASE') ? null : define('DB_DATABASE', "SISEP_Denuncias");
    defined ('DB_USERNAME') ? null : define('DB_USERNAME', "admin");
    defined ('DB_PASSWORD') ? null : define('DB_PASSWORD', "Soflex9112323sql");
    
    //Conexion a Auditoria 
    defined ('DB_USER') ? null : define('DB_USER', "admin");
    defined ('DB_PASS') ? null : define('DB_PASS', "Soflex9112323sql");
    defined ('DB_BASE') ? null : define('DB_BASE', "SISEP_Auditoria");

    defined ( 'TOKEN_KEY' ) ? null : define ( 'TOKEN_KEY', '#SoflexasAG#ASX#TS!232323#' );
    defined ( 'REMOTE_STORAGE' ) ? null : define ( 'REMOTE_STORAGE', 'http://172.24.134.25/sisep/api/administrador-archivos/index.php/' );
    // defined ( 'REMOTE_STORAGE' ) ? null : define ( 'REMOTE_STORAGE', 'http://localhost:8080/administrador_archivos_api/index.php/' );

    defined ('RENAPER_TIPO') ? null : define('RENAPER_TIPO', "CABA");
    defined ('RENAPER_URL') ? null : define('RENAPER_URL', 'http://10.74.50.114/WSINTEGRACIONRENAPER/server.php?wsdl');

   
}
else if ($ambiente == "prod")
{

}

?>