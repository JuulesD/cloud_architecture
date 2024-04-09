async function link_api(){
	const options = {
	method: 'GET',
	headers: {
		'X-RapidAPI-Key': '71c89b1928msh4dd545334e32284p1605b3jsnaf0b4e3cc8f7',
		'X-RapidAPI-Host': 'imdb-top-100-movies.p.rapidapi.com'
	}
};

try {
	const response = await fetch('https://imdb-top-100-movies.p.rapidapi.com/top32', options);
	const result = await response.text();
	console.log(result);
} catch (error) {
	console.error(error);
}
}

link_api();

document.getElementById("createGroup").addEventListener("click", function() {
    window.location.href = "createGroup.html";
});

document.getElementById("connection").addEventListener("click", function() {
    window.location.href = "connection.html";
});
document.getElementById("register").addEventListener("click", function() {
    window.location.href = "register.html";
});

function add_group(){
	var url = window.location.href;
	for (var i = 0; i!=url.length;i++)
	{
		if (url[i]=='?' && url[i+8]=='1')
		{
			var button = document.createElement("button");
			var name = url.substring(i+15,url.length);
			button.textContent = name;
            document.getElementById("groupContainers").appendChild(button);
			
			break;
		}
	}
	
}