$(document).ready(function(){

	var activeUser,
		chatReload = 1000;

	function loadChat(){
		if($('#chatMsgs #myTabContent').scrollTop() == 0 || $('#chatMsgs #myTabContent').scrollTop() >= $('#chatMsgs #myTabContent')[0].scrollHeight - $('#chatMsgs #myTabContent').height() - 40){

			$('#chatRoom #chatMsgs #myTabContent #general').load('php/chat_posts.php', function(){

				$('#chatMsgs #myTabContent #general').scrollTop($('#chatMsgs #myTabContent #general')[0].scrollHeight);
			});
		}

		$('#chatUsers').load('php/chat_users.php');
	}

	function loadRegister(x){
		$('#welcomeMessage').html('');
		$('#connectForm').fadeOut('slow', function(){
			$('#registerEmail').val(x);
			$('#registerForm').fadeIn();
		});

		$('#registerForm').submit(function(event){

			event.preventDefault();
			$('#error2').html('');

			email = $('#registerEmail').val(),
			pass = $('#registerPass').val();

			activeUser = $('#registerLogin').val();

			if(email == '' || pass == '' || activeUser == ''){
				if(activeUser == ''){
					$('#error2').append('Votre login est vide<br>');
				}
				if(email == ''){
					$('#error2').append('Votre email est vide<br>');
				}
				if(pass == ''){
					$('#error2').append('Votre password est vide<br>');
				}

			}else{
				$.ajax({
					type : 'POST',
					url : 'php/inscription.php',
					data : $('#registerForm').serialize(),
					success: function(msg){
						console.log('Msg inscription =' + msg);
						if(msg == 0){
							$('#welcomeMessage').html('Bienvenue chez vous ' + activeUser);
							$('#registerForm').fadeOut('slow', function(){
									window.setInterval(loadChat, chatReload);
									$('#chatRoom').fadeIn('slow', function(){});
							});
						}else if(msg == 2){
							$('#error2').html('Le pseudo existe déjà');
						}else if(msg == 3){
							$('#error2').html('L\'email existe déjà');
						}else{
							$('#welcomeMessage').html('Un problème est survenu lors de la création de votre compte. Merci de réessayer ultérieurement.');
						}
					},
					complete: function(){

					}
				})
			}
		})
	}

	//Function qui toggle les articles
	function toggleMemo(i){
		$('#memo' + i + ' h3').click(function(){
			$('#memo' + i + ' p').slideToggle('fast');
		});
	}

	$('#connectForm').submit(function(e){
		e.preventDefault();

		var email = $('#connectEmail').val(),
			pass = $('#connectPass').val();

		$('#error').html('');
		$('#welcomeMessage').html('');

		if(email == '' || pass == ''){
			if(email == ''){
				$('#error').append('Votre email est vide<br>');
			}
			if(pass == ''){
				$('#error').append('Votre password est vide<br>');
			}
		}else{

			$.ajax({
				type : 'POST',
				url : 'php/connexion.php',
				data : $('#connectForm').serialize(),
				success: function(msg){
					console.log('msg connexion = ' + msg);
					if(msg == 0){
						$('#error').html('Le password ne correspond pas à l\'email');
					}
					else if(msg == 1){
						$('#welcomeMessage').html('Ce profil n\'existe pas => <a href="#" id="goToRegister">Voulez-vous le créer?</a>');

						$('#goToRegister').click(function(event){

							event.preventDefault();

							loadRegister(email);

						})
					}else{
						activeUser = msg;

						$('#welcomeMessage').html('Bienvenue ' + activeUser);
						$('#connectForm').fadeOut('slow', function(){
							window.setInterval(loadChat, chatReload);
							$('#chatRoom').fadeIn('slow', function(){});

							
						});
					}
				}
			})
		}
	})

	$('#addChatMsg').submit(function(event){
		event.preventDefault();
		pseudo = $('#pseudoChat').val();

		$.ajax({
			type: 'POST',
			url : 'php/chat_add_msg.php',
			data: $('#addChatMsg').serialize() + '&user=' + activeUser,
			complete:function(msg){

				loadChat();
				$('#chatMsgs').scrollTop($('#chatMsgs')[0].scrollHeight);
				$('#message').val('');
			}
		})
	})

	function showMemo(){
		$.ajax({
			type : 'GET',
			url: 'https://spreadsheets.google.com/feeds/list/1vWmav8YusujGN7idSOabeh51khli-hwZp1tOSQQxh0g/od6/public/values?alt=json',
			dataType: 'json',
			success: function(msg){
				var newEntries = msg.feed.entry;


				for (i = 0; i < newEntries.length; i++){
					//console.log(msg.feed.entry[i]);
					//console.log(msg.feed.entry[4].gsx$desc.$t);
					var msg = "";

					msg = newEntries[i].gsx$desc.$t.replace(/[\u00A0-\u9999<>\&]/gim, function(i) {
	   					return '&#'+i.charCodeAt(0)+';';
					});

					//console.log(msg);

					$('#memo').append('<article id="memo' + i + '"><h3><i class="fa fa-circle-o"></i> ' + newEntries[i].title.$t + '</h3><p>' + msg + '</p></article>');
				}
			},
			complete: function(msg){
				//console.log($('#memo'));
				for (i = 0; i < $('#memo')[0].childElementCount; i++){
					toggleMemo(i);
				}

			}

		});
	}

	$(document).on("click", "#chatUsers span", function() {
		var user_name = $(this).html();

    	$('#chatRoom #listTabs').append('<li><a href="#' + user_name + '" role="tab" id="profile-tab" data-toggle="tab" aria-controls="profile" aria-expanded="false">' + user_name + ' <i class="fa fa-times"></i></a> </li>');

    	$('#myTabContent').append('<div role="tabpanel" class="tab-pane fade active in" id="' + user_name + '" aria-labelledby="' + user_name + '-tab"></div>');

    	$('#myTabContent #' + user_name + '').load('php/chat_posts.php', { channel : activeUser + '-' + user_name }, function(){

			$('#chatMsgs #myTabContent #' + user_name + '').scrollTop($('#chatMsgs #myTabContent #' + user_name + '')[0].scrollHeight);
		});


    });

	// TODO Close button to delete private chat room
    /*$('#close').click(function()){ 
    	$('#chatMsgs #listTabs')
    }*/

    $('#listTabs a').click(function (e) {
	  e.preventDefault()
	  $(this).tab('show')
	})


})