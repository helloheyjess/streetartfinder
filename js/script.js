
var app = {};
var callURL = "";

app.getStreetArt = function(){
	$.ajax({
		url: callURL,
		type: 'GET',
		dataType: 'jsonp',
		data: {
			count: 33,
			client_id: '07f8e05b591f4014a3730fc6e1949c94'
		},
		success: function(results){
			console.log(results);
			app.displayStreetArt(results.data);
		}
	});
};

app.displayStreetArt = function(streetart){
	$('#results').empty();
	$.each(streetart, function(index, item){
		//Create container for each street art item
		$artItem = $('<div>').addClass('art-item');

		//Create art Link
		$artLink = $('<a>');
		$artLink.attr({
			href: item.link,
			target: '_blank'
		});

		//Create filter text
		$artFilter = $('<p>').addClass('filter');
		$artFilter.text('Filter: ' + item.filter);

		//Create art image
		$artImage = $('<img>').addClass('art-image');
		$artImage.attr('src', item.images.low_resolution.url);

		//Append image to link
		$artLink.append($artImage);

		//Append street art item contents to item
		$artItem.append($artFilter, $artLink);

		//Append each street art item to container
		$('#results').append($artItem);
	});
};

app.init = function(){
	$('#city').on('change', function(){
		app.city = $(this).val();

		if (app.city === "montreal") {
			callURL = "https://api.instagram.com/v1/tags/montrealstreetart/media/recent?";
		} else if (app.city === "toronto"){
			callURL = "https://api.instagram.com/v1/tags/torontostreetart/media/recent?";
		} else if (app.city === "vancouver"){
			callURL = "https://api.instagram.com/v1/tags/vancouverstreetart/media/recent?";
		} else if (app.city === "halifax"){
			callURL = "https://api.instagram.com/v1/tags/halifaxstreetart/media/recent?";
		}
		app.getStreetArt();
	})
};

$(function(){
	app.init();
});