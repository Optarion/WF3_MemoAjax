<?php
	require 'db.php';

	$sql = 'SELECT user, message, created FROM chat_room WHERE 1 ';

	$channel = 'general';
	if(!empty($_POST['channel'])){
		$channel = strip_tags($_POST['channel']);
		$channelReverse = explode('-', $channel);
		$channelReverse = $channelReverse[1].'-'.$channelReverse[0];

		$sql .= 'AND channel = "'.$channel.'" OR channel = "'.$channelReverse.'"';
	}else{
		$sql .= 'AND channel = "general"';
	}


	$query = $bdd->prepare($sql);
	$query->execute();
	$msgs = $query->fetchAll();

	function printMsg($list){
		foreach($list as $msg){
			echo '<p><span class="chatTime"><'.$msg['created'].'></span> <span class="user">'.$msg['user'].'</span>: '.stripslashes($msg['message']).'</p>';
		}
	}
?>

<body>
	<?php
	printMsg($msgs);
	?>
<body>