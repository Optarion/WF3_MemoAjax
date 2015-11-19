<?php

	require 'db.php';
	require 'func.php';

	$user = !empty($_POST['user']) ? strip_tags($_POST['user']) : '';
	$message = !empty($_POST['message']) ? strip_tags($_POST['message']) : '';
	$channel = !empty($_POST['channel']) ? strip_tags($_POST['channel']) : 'general';

	if(!empty($_POST)){
		$query = $bdd->prepare('INSERT INTO chat_room SET user = :user, message = :message, created = NOW(), channel = :channel');
		$query->bindValue('user', $user);
		$query->bindValue('message', $message);
		$query->bindValue('channel', $channel);

		$query->execute();

		$last_id = $bdd->lastInsertId();

		if($last_id != 0){
			echo 0;
		}else{
			echo 1;
		}
	}

