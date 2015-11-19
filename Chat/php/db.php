<?php

   // connexion dans la base de données

    global $bdd;
    define('HOST', 'digitalwrdev.mysql.db');
    define('DB', 'digitalwrdev');
    define('USER', 'digitalwrdev');
    define('PASS', 'b94uz4DE');

    try{

        $db_options = array(
            PDO::MYSQL_ATTR_INIT_COMMAND => "SET NAMES utf8", //Force la communication CLIENT/SERVER en utf-8
            PDO::ATTR_DEFAULT_FETCH_MODE => PDO::FETCH_ASSOC,
            PDO::ATTR_ERRMODE => PDO::ERRMODE_WARNING
         );
        $bdd = new PDO('mysql:host='.HOST.';dbname='.DB, USER, PASS, $db_options);
    }
    catch (Exception $e){
        die('Erreur : ' . $e->getMessage());
    }