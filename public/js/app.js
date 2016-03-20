'use strict';

$.ajax('/bookmarks', {
	type: 'GET',
	success: function(bookmarks) {
		var string = '';
		//to loop over we use jquery	
		$.each(posts, function(index, bookmark){
			console.log(post);
			string += bookmark.url; //concatenate the values
			string += ' '; 
		});

		$('#content').html(string);
	}
})