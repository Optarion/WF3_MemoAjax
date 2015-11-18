$(document).ready(function(){

	//List of the json files for each category
	var urlList = ['1vWmav8YusujGN7idSOabeh51khli-hwZp1tOSQQxh0g',
		'1VdXfBis9BavgDonwK96zj_YUC_9o8JhLdqO65xQ-aXI',
		'16L74Wa-nghx1Z_IxL2MZpT3pindS2erixn-wS8I6s9g',
		'1nYWXePQreinKwikmR2vksmhTnXhMOI5JtRlgR_msLho',
		'1fGyzgU495kwSVmHpa0nRmoSGVzoh60OyZPNL0dbd97U',
		'1w1Xxg5hdwAdkoMk_O6OGUQw7iQ3FG2VLz61fPVk6WPk',
		'1mba51bi8yxpT1EKEnNbpPquaSB7eDXAjpXOnMOfclU8',
		'1RmtGI4YA7RvOXBd6vy38lk8SLoP5fy7LewMNHbYcuJY',
		'1RfPXD-n4AUkUQd5FrV3eTL0zaOzCtdwzMDy84L7utmw'
		];


	function capitalizeFirstLetter(string) {
	    return string.charAt(1).toUpperCase() + string.slice(2);
	}

	/* Dynamically create buttons */
	$('#content li').click(function(e){
		var sectionTitle = capitalizeFirstLetter(e.currentTarget.innerText.toLowerCase()), //Title of the clicked <li> with only the first letter Capitalized
			index = $('#content li').index(this); // Number of the clicked <li>

		//Get content on click
		$('main').fadeOut('slow', function(){
			loadContent(urlList[index], sectionTitle);
		});
	})

	//Hide the content specified as parameter
	function hideContent(content){
		content.css('display' , 'none');
	}

	//Create Function to Toggle content on click
	function toggle(x){
		var btnToggle = $('#slideBox' + x + ' header');

		btnToggle.click(function(){
			$('#slideBox' + x + ' main').slideToggle();
		})
	}


	//Function wich load content from json when click on btn
	function loadContent(url, sectionTitle){

		//Change Breadcumb
		$('header p').html('<p><a href="index.php">Home</a> > ' + sectionTitle + '</p>');

		//Change "Page" Title
		$('#title h3').html('<h3>' + sectionTitle + '</h3>');

		$.ajax({
			url: "https://spreadsheets.google.com/feeds/list/" + url + "/od6/public/values?alt=json",
			success: function(data){
				var entries = data.feed.entry;
				//console.log(entries);

				for (i = 0; i < entries.length; i++){
					var content_code = entries[i].gsx$code.$t;
					content_code = content_code.replace(/\</g, '&lt;').replace(/\>/g, '&gt;');

					console.log(content_code.length);

					$('#content_Ajax').append('<article id="slideBox' + i + '"><header><h3 id=""><i class="fa fa-file-o"></i> ' + entries[i].title.$t + '</h3></header><main class="toggle"></main></article');

					$('#content_Ajax #slideBox' + i + ' main').append('<p>' + entries[i].gsx$desc.$t + '</p>');
					if(content_code.length){
						$('#content_Ajax #slideBox' + i + ' main').append('<p>Exemple</p>');
						$('#content_Ajax #slideBox' + i + ' main').append('<pre><code>' + content_code + '</code></pre>');
					}

					$('#content_Ajax #slideBox' + i + ' main').append('<p><i class="fa fa-plus-square"></i> Pour en savoir plus: <a href="' + entries[i].gsx$link.$t + '" target="_blank">' + entries[i].gsx$link.$t + '</a></p>');

					 toggle(i);
				}

				//Hide the content of Toggle blocs
				hideContent($('#content_Ajax main'));
			}
		})
	}

})