// listen for form submit
document.getElementById('myForm').addEventListener('submit', saveBookmark);

// save bookmark
function saveBookmark(e) {
	//Get form values
	var siteName =document.getElementById('siteName').value;
	var siteUrl =document.getElementById('siteUrl').value;

	if (!siteName || !siteUrl) {
		alert('Please fill in the Form');
		return fasle;
	}

	var expression = /[-a-zA-Z0-9@:%_\+.~#?&//=]{2,256}\.[a-z]{2,4}\b(\/[-a-zA-Z0-9@:%_\+.~#?&//=]*)?/gi;
	var regex = new RegExp(expression);
	var t = 'www.google.com';

	if (!siteUrl.match(regex)) {
	  alert("Please use a valid URL");
	  return fasle;
	}

	//save in object
	var bookmark = {
		name: siteName,
		url: siteUrl
	}

	// Test if bookmarks is null
	if(localStorage.getItem('bookmarks') === null){
		// Init array
		var bookmarks = [];
		// Add to array
		bookmarks.push(bookmark);
		// Set to localStorage
		localStorage.setItem('bookmarks', JSON.stringify(bookmarks));
	} else {
		// Get bookmarks from localStorage
		var bookmarks = JSON.parse(localStorage.getItem('bookmarks'));
		// Add bookmark to Array
		bookmarks.push(bookmark);
		// Re-set back to localStorage
		localStorage.setItem('bookmarks', JSON.stringify(bookmarks));
	}
	fetchBookmarks();

	// prevents form submitting
	e.preventDefault();
}

// Delete bookmark
function deleteBookmark(url) {
	// Get bookmarks from localStorage
	var bookmarks = JSON.parse(localStorage.getItem('bookmarks'));
	// Loop through bookmarks
	for (var i = 0;i < bookmarks.length;i++){
		if (bookmarks[i].url === url) {
			//remove from url
			bookmarks.splice(i, 1);
		}
	}
	// Re-set back to localStorage
		localStorage.setItem('bookmarks', JSON.stringify(bookmarks));
	// Re-fetch bookmarks
	fetchBookmarks();
}

//Fetch bookmarks

function fetchBookmarks(){
	// Get bookmarks from localStorage
	var bookmarks = JSON.parse(localStorage.getItem('bookmarks'));
	// Get ouput id
	var bookmarksResults = document.getElementById('bookmarksResults');
	//Build output
	bookmarksResults.innerHTML = '';
	for (var i = 0; i < bookmarks.length; i++) {
		var name = bookmarks[i].name;
		var url = bookmarks[i].url;
	
	bookmarksResults.innerHTML += '<div class="well">'+
								   '<h3>' +name+
								   	' <a href="'+url+'" class="btn btn-primary" target="_blank">Visit</a> ' +
								   	' <a onclick="deleteBookmark(\''+url+'\')" href="#" class="btn btn-danger">Delete</a> ' +
								   '</h3>'+
								   '</div>';
	}

}