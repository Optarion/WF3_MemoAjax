<?php
    require 'db.php';
/*    echo '<pre>';
    echo print_r($_POST);
    echo '</pre>';
*/
    $email = !empty($_POST['email']) ? htmlentities($_POST['email']) : '';
    $pass = !empty($_POST['password']) ? $_POST['password'] : '';
    $pseudo = !empty($_POST['pseudo']) ? $_POST['pseudo'] : '';

    if(!empty($_POST)){
        //Test existance du pseudo
        $request = $bdd->prepare('SELECT pseudo FROM chat_members WHERE pseudo = :pseudo');
        $request->bindValue("pseudo", $pseudo);
        $request->execute();
        $membre =  $request->fetch();

        /*echo '<pre>';
        echo print_r($membre);
        echo '</pre>';*/

        if(!empty($membre)){
            echo 2; //Pseudo existant
        }else{
            //Test existance email
            $request = $bdd->prepare('SELECT email FROM chat_members WHERE email = :email');
            $request->bindValue("email", $email);
            $request->execute();
            $membre =  $request->fetch();

            if(!empty($membre)){
                echo 3; //Email existant
            }else{
                $request = $bdd->prepare('INSERT INTO chat_members SET email = :email, pass = :pass, pseudo = :pseudo');
                $request->bindValue("email", $email);
                $request->bindValue("pass", $pass);
                $request->bindValue("pseudo", $pseudo);
                $request->execute();

                $last_insert_id = $bdd->lastInsertId();

                if($last_insert_id != 0){
                    echo 0; //Succès
                }else{
                    echo 1; //Error
                }
            }
        }
    }else{
        echo 1; //Error
    }
?>