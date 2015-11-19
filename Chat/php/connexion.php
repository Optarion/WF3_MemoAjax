<?php
    require 'db.php';

    /*echo '<pre>';
    echo print_r($_POST);
    echo '</pre>';*/


    $email = htmlentities($_POST['email']);
    $pass = $_POST['password'];

    $request = $bdd->prepare('SELECT email FROM chat_members WHERE email = :email');
    $request->bindValue('email', $email);
    $request->execute();
    $membre = $request->fetch();

    if($email == $membre['email'])
    {
        $request = $bdd->prepare('SELECT email, pass, pseudo FROM chat_members WHERE email = :email AND pass = :pass');
        $request->bindValue('email', $email);
        $request->bindValue('pass', $pass);
        $request->execute();
        $membre = $request->fetch();

        /*echo '<pre>';
    echo print_r($membre);
    echo '</pre>';*/

        if($pass == $membre['pass']){
            $request = $bdd->prepare('UPDATE chat_members SET status = 1 WHERE pseudo = :pseudo');
            $request->bindValue('pseudo', $membre['pseudo']);
            $request->execute();

            echo ucfirst($membre['pseudo']); //On 'retourne' la valeur Succes au javascript si la connexion est bonne
        }else{
           echo 0; //
        }

    }else{
        echo 1; //On 'retourne' une valeur d'error au javascript si la connexion n'est pas bonne
    }
?>