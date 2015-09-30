//storage
var numberOfGames = 0; 

$(document).ready(function(){
	$.ajax({
		type: "GET", url: "games.xml", dataType:"xml", success: xmlParser
	});
});

function xmlParser(xml){
	$(xml).find("game").each(function(){
		numberOfGames ++;
		var _section = $(this).attr("section");
		if(numberOfGames!= 1){
		duplicateGame($(this).find("name").text(), $(this).find("image").text(), $(this).find("link").text(), _section);
		}
		else{
			var firstGame = document.getElementById("gameID0");
			firstGame.getElementsByTagName("p")[0].innerHTML = $(this).find("name").text();
			firstGame.getElementsByTagName("a")[0].href = $(this).find("link").text();
			firstGame.getElementsByTagName("img")[0].src = $(this).find("image").text();
		}
	})
}

function duplicateGame(name, image, link, section){
	var originalGame = document.getElementById("gameID0");
	var duplication = originalGame.cloneNode(true);
	duplication.id = 'gameID' + 1;
	duplication.getElementsByTagName("p")[0].innerHTML = name;
	duplication.getElementsByTagName("a")[0].href = link;
	duplication.getElementsByTagName("img")[0].src = image;
	if(section == "experiments"){
		document.getElementById("unfinishedSection").appendChild(duplication);
	}
	else{
		document.getElementById("gamesSection").appendChild(duplication);
	}

}

