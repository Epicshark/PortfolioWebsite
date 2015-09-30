//storage
var numberOfArtworks = 0;
var displayImage = "#";

$(document).ready(function(){
	$.ajax({
		type: "GET", url: "art.xml", dataType:"xml", success: xmlParser
	});
});

$(document.getElementById("jumboart")).hide(0);
document.getElementById("jumboart").addEventListener("click",function(){
	$(this).slideUp(400);
});

function xmlParser(xml){
	$(xml).find("artwork").each(function(){
		numberOfArtworks ++;
		var _section = $(this).attr("section");
		var firstArtWork = document.getElementById("artworkID0");
		if(numberOfArtworks!= 1){
		duplicateGame($(this).find("name").text(), $(this).find("image").text());
		}
		else{
			var imageText = $(this).find("image").text();
			firstArtWork.getElementsByTagName("p")[0].innerHTML = $(this).find("name").text();
			firstArtWork.getElementsByTagName("img")[0].src = imageText;
			$(firstArtWork.getElementsByTagName("p")[0]).fadeTo(0, 0);
			$(firstArtWork).hover(function() { $(this).find('p').fadeTo(600, 1); }, function() { $(this).find('p').fadeTo(600, 0); });
			firstArtWork.addEventListener("click",function(){displayImage = imageText;});
			firstArtWork.addEventListener("click",displayArt);
		}
		if(numberOfArtworks%3 == 0){
			var linebreak = firstArtWork.parentNode.appendChild(document.createElement("div"));
			linebreak.className = "col-md-12";
		}
	})
}

function duplicateGame(name, image){
	var firstArtWork = document.getElementById("artworkID0");
	var duplication = firstArtWork.cloneNode(true);
	duplication.id = 'artworkID' + numberOfArtworks;
	duplication.getElementsByTagName("p")[0].innerHTML = name;
	duplication.getElementsByTagName("img")[0].src = image;
	//duplication.addEventListener("onmouseover", showLabel());
	$(duplication.getElementsByTagName("p")[0]).fadeTo(0, 0);
	$(duplication).hover(function() { $(this).find('p').fadeTo(600, 1); }, function() { $(this).find('p').fadeTo(600, 0); });
	duplication.addEventListener("click", function(){displayImage = image;});
	duplication.addEventListener("click",displayArt);
	firstArtWork.parentNode.appendChild(duplication);
}

function displayArt(){
	var artDisplay = document.getElementById("jumboart");
	$('html, body').animate({ scrollTop: 0 }, 'fast');
	$(artDisplay).slideDown(400);
	artDisplay.getElementsByTagName("img")[0].src = displayImage;
}