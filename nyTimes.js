var films;
var filmCounter = 0;
var emptyList = true;

var addedFilms = [];

$(document).ready(function(){
	
	$('#next').click(function(){
		createFilm(films[filmCounter]);
	});

	$('#email').click(email);

	$.ajax({
		url      : 'http://api.nytimes.com/svc/movies/v2/reviews/search.jsonp',
		type     : 'GET',
		dataType : 'jsonp',
		data     : {"thousand-best" : "Y", "api-key" : "e2065099cd790abfa67a196e89a904a6:13:68174035"},
		success  : function(data){
			films = data.results;
		}
	});

	$('#add').click(addMovie);
})

function createFilm(film) {
	$('.piece').remove();
	$piece = $('<div>').addClass('piece');
	$title = $('<h2>').text(film.display_title);
	$review = $('<p>').text(film.capsule_review);
	$piece.append($title).append($review);
	$('body').append($piece);
	filmCounter++;
}

function email(){
	console.log(addedFilms);
	var email = "";
	for(var i = 0; i < addedFilms.length; i++){
		film = addedFilms[i];
		email += film.sort_name +"\n" + film.capsule_review + "\n \n";
	}
	$(location).attr('href', 'mailto:?subject='
	     + encodeURIComponent("NYT movies")
	     + "&body=" 
	     + encodeURIComponent(email)
	);		
}

function addMovie(){
	if(emptyList){
		emptyList = false;
		$('h3').show();
		$('#email').show().css('display','inline-block').fadeIn();
	}
	film = films[filmCounter - 1];
	if($.inArray(film, addedFilms) == -1){
		addedFilms.push(film);
		$li = $('<li>').addClass('addedMovie').text(film.sort_name);
		$('#saved ul').append($li);
	}

}
