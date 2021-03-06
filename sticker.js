var scrape	= [
	{
		name: "naam test",
		domain : "http://www.yourdecoshop.nl", 
		url : "/nl/Shop/detail/Id/10172815/?typeGroup[]=WallTattoo&offset=0&", 
		targetElement : "div#pricing p#productPrice",
		targetImage : "img#first_prod_img",			// Set to null to skip
	},
	{ 
		name: "naam test", 
		domain : "http://www.wallart-deco.nl",
		url : "/raamsticker-gummibeer-paashaas-fb-ge-1009.html", 
		targetElement : "span#ProductPrice",
		targetImage : "img#largeImage",
	}
];

$(document).ready(function() {
	scrape.forEach(function(e){
		$.ajax({
			url: e.domain + e.url,
			type: 'GET',
			success: function(res) {
			var price = $(res.responseText).find(e.targetElement).text();
			var image = null;
			if (e.targetImage){
				image = $(res.responseText).find(e.targetImage);
				var src = image.attr('src');
				console.log(image);
				if (src.slice(0, 4) != 'http'){
					src = e.domain + src;		// Make the image src path include the domain
					image.attr('src', src);		// Update the src to the src including the domain
				}
			}else{
			}
			var a	= $('<a>', {href : e.domain + e.url, target : '_blank', class : "price-link"}).text(e.domain + e.url);
			$('#sites').append($('<p class="sticker-link">').html('<span class="store-name">' + e.name + '</span>').append(a).append('<span class="price">' + price + '</span>'));
			if (e.targetImage){
				console.log('adding target image');
				console.log(image);
				// Add image to where you need it
				$('#sites').append(image);
			}
			
			}
		});
	}); 
});
