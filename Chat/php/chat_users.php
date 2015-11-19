<?php

	require 'db.php';
	require 'func.php';

	$query = $bdd->query('SELECT pseudo, status FROM chat_members ORDER BY status DESC, pseudo');
	$members_connected = $query->fetchAll();
?>

<body>
	<?php
		foreach($members_connected as $member){
			echo $member['status'] == 1 ? '<p class="user"><span>'.$member['pseudo'].'</span></p>': '<p><span>'.$member['pseudo'].'</span></p>';
		}
	?>

</body>