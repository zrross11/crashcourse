import fetch from "node-fetch";
const url = 'https://api.devhub.virginia.edu/v1/courses';
fetch(url)
	.then((resp) => resp.json())
	.then(function(data) {
    	// Use the json data here
		console.log(JSON.stringify(data));
	}).catch(function(error) {
		console.log('Fetch failed!');
	});