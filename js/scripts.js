$(document).ready(function(){

	/* TODO ---- Change urls to own json's Google spreadsheets */
	//List of the json files for each category
	var urlList = ['1x1jZKph4wasgu6KUcz3ntNXJrhNFHIQNLEm1MMwViPM',
		'1VdXfBis9BavgDonwK96zj_YUC_9o8JhLdqO65xQ-aXI',
		'16L74Wa-nghx1Z_IxL2MZpT3pindS2erixn-wS8I6s9g',
		'1nYWXePQreinKwikmR2vksmhTnXhMOI5JtRlgR_msLho',
		'1fGyzgU495kwSVmHpa0nRmoSGVzoh60OyZPNL0dbd97U',
		'1w1Xxg5hdwAdkoMk_O6OGUQw7iQ3FG2VLz61fPVk6WPk',
		'1mba51bi8yxpT1EKEnNbpPquaSB7eDXAjpXOnMOfclU8',
		'1RmtGI4YA7RvOXBd6vy38lk8SLoP5fy7LewMNHbYcuJY',
		'1RfPXD-n4AUkUQd5FrV3eTL0zaOzCtdwzMDy84L7utmw'
		];


	//Change opacity style to an element
	function opacify(tag, value, callback){
		tag.animate({
			opacity : value
			}, 500, function(){
				callback;
			}
		);
	};

	function capitalizeFirstLetter(string) {
	    return string.charAt(1).toUpperCase() + string.slice(2);
	}

	//Hide the content specified as parameter
	function hideContent(content){
		content.css('display' , 'none');
	}

	//Create Function to Toggle content on click
	function toggle(x, y){
		var btnToggle = $('#slideBox' + x + ' header');

		btnToggle.click(function(){
			for(i = 0; i < y; i++){
				if(i != x){
					//Toggle up all blocs but clicked one
					$('#slideBox' + i + ' main').slideUp();
				}
			}
				//Toggle up or down the clicked one
				$('#slideBox' + x + ' main').slideToggle();

		})
	}

	//Change Section Title
	function changeSectionTitle(title){
		$('#title h3').fadeOut(500, function(){
			if(title.length){
				$('#title h3').html('<h3>' + title + '</h3>').fadeIn(500);
			}else{
				$('#title h3').html('<h3>Choisir une catégorie</h3>').fadeIn(500);
			}
		});
	}

	//Create Breadcrumb
	function changeBreadcrumb(title){
		$('#title h3').fadeOut(500, function(){
			$('header p').html('<p><a href="#">Home</a>' + title + '</p>').fadeIn(500);
		});
	}

	//MAIN FUNCTION wich load content from json when click on btn
	function loadContent(url, sectionTitle){

		//$('#content_Ajax').fadeIn(1000);


		//Change Breadcrumb
		var comaPosition = sectionTitle.indexOf(','); //Get position of coma
			//Slice "HTML, les fondamentaux" to "HTML > Les Fondamentaux"
		var breadcrumb = ' > ' + capitalizeFirstLetter(sectionTitle.slice(0 , comaPosition));

		if(comaPosition > 0){ //If coma exists
			breadcrumb += ' > ' + capitalizeFirstLetter(sectionTitle.slice(comaPosition+1));
		}
		changeBreadcrumb(breadcrumb);


		//Change "Page" Title
		changeSectionTitle(sectionTitle);


		$.ajax({
			url: "https://spreadsheets.google.com/feeds/list/" + url + "/default/public/values?alt=json",
			success: function(data){

				var entries = data.feed.entry;

				//For each node into the json, get contents
				for (i = 0; i < entries.length; i++){
					var content_code = entries[i].gsx$code.$t; //Node of contents

					//Replace < and > with html code to deny browser rendering
					content_code = content_code.replace(/\</g, '&lt;').replace(/\>/g, '&gt;');

					//console.log(content_code.length);

					$('#content_Ajax').append('<article id="slideBox' + i + '"><header><h3 id=""><i class="fa fa-file-o"></i> ' + entries[i].title.$t + '</h3></header><main class="toggle"></main></article');

					$('#content_Ajax #slideBox' + i + ' main').append('<p>' + entries[i].gsx$desc.$t + '</p>');

					if(content_code){//If code is not empty
						$('#content_Ajax #slideBox' + i + ' main').append('<p>Exemple</p>');
						$('#content_Ajax #slideBox' + i + ' main').append('<pre><code>' + content_code + '</code></pre>');
					}

					$('#content_Ajax #slideBox' + i + ' main').append('<p><i class="fa fa-plus-square"></i> <a href="' + entries[i].gsx$link.$t + '" target="_blank">Plus d\'info</a></p>');

					 toggle(i, entries.length);
				}

				//Hide the content of Toggle blocs
				hideContent($('#content_Ajax main'));
			},
			complete: function(){
				//Show loaded Titles
				$('#content_Ajax').animate({
					opacity : 1
				}, 1000, function(){});
			}
		})
	}

	//Header's apparition
	$('header[role="header"]').animate({
		top : 0,
		opacity : 1
		}, 500, function(){
			opacify($('#title'), 1, opacify($('#content'), 1, null));
		});

	//Animate Header on scroll
	$(document).scroll(function(){
		if($(document).stop().scrollTop() > 0){
			$('header[role="header"]').animate({
				'font-size' : '0.8em',
				'padding' : '0.8em'
			}, 200, function(){});
		}else{
			$('header[role="header"]').stop().animate({
				'font-size' : '1em',
				'padding' : '1em'
			}, 200, function(){});
		};
	})

	//Management of return to Home
	$('header').click(function(){
		//Write Breadcrumb to Default
		changeBreadcrumb('');

		//Write Section Title to Default
		changeSectionTitle('');

		opacify($('#content_Ajax'), 0, $('#content').fadeIn(500, function(){

			//Erase previous content
			$('#content_Ajax').html('');
		}));
	});

	// Dynamically create buttons
	$('#content li').click(function(e){

		var sectionTitle = e.currentTarget.innerText.toLowerCase(), //Title of the clicked <li> with only the first letter Capitalized
			index = $('#content li').index(this); // Number of the clicked <li>

		//Get content on click
		$('main').fadeOut('slow', function(){
			loadContent(urlList[index], sectionTitle);
		});
	})

	/* TODO - ADD CHAT */
	//Open chat button
	$('header span').click(function(){
		console.log('bip');
		$('#content_Chat').load('Chat/index.html body', function(){});
	})
})