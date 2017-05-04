function moveIcons(event) {
    var x = event.clientX;
    var y = event.clientY;
    
	var parni = document .getElementsByClassName("even");
		for (var i = 0; i <= parni.length - 1; i++){
		parni[i].style.transform =  "rotateZ(" +  60*i +"deg) translate(" +  0 +"%"+ "," +  (x + y)/300 + "%" + ")";
		}

	var neparni = document.getElementsByClassName("odd");
		for (var i = 0; i <= neparni.length - 1; i++){
		neparni[i].style.transform =  "rotateZ(" + (30 + 60*i) +"deg) translate(" +  0 +"%"+ "," + (-(x + y)/300) + "%" + ")";
		}

}

//document.body.addEventListener("mousemove", function(){moveIcons(event)});

function skrol(a){
	var inter1 = setInterval(pomeri, 1);
	function pomeri(){	
		if(window.pageYOffset < document.getElementById("first_page").offsetHeight * (a - 1) - 10){
			window.scrollBy(0,10)
		}else if(window.pageYOffset > document.getElementById("first_page").offsetHeight * (a - 1) + 10){
			window.scrollBy(0,-10)
		}else{
			clearInterval(inter1)
		}
	}
	zatvaranje_menija();	
}

document.getElementById("home").addEventListener("click", function(){skrol(1)});
document.getElementById("about").addEventListener("click", function(){skrol(2)});
document.getElementById("play").addEventListener("click", function(){skrol(3)});



document.getElementById("burger").addEventListener("click", rotacija_menija);

function rotacija_menija(){
	document.getElementById("burger").style.display = "none";
	document.getElementById("exit_rotate_menu").style.display = "block";

	document.getElementById("home").style.display = "block";
	document.getElementById("about").style.display = "block";
	document.getElementById("play").style.display = "block";

	var i = 0;

	var inter2 = setInterval(function(){
		i++;
		if(i<30){
		document.getElementById("rotate_menu").style.transform = "rotateZ(" + i + "deg)";
		}else{
			clearInterval(inter2);
		}
	}, 10);

	var j = 0;

	var inter3 = setInterval(function(){
		j += 0.1;
		if(j < 1){
			document.getElementById("home").style.opacity = j;
			document.getElementById("about").style.opacity = j;
			document.getElementById("play").style.opacity = j;
		}else{
			clearInterval(inter3);
		}
	}, 100);


}

document.getElementById("exit_rotate_menu").addEventListener("click", zatvaranje_menija);


function zatvaranje_menija(){
	
	document.getElementById("home").style.display = "none";
	document.getElementById("about").style.display = "none";
	document.getElementById("play").style.display = "none";

	document.getElementById("burger").style.display = "block";
	document.getElementById("exit_rotate_menu").style.display = "none";


	document.getElementById("home").style.opacity = 0;
	document.getElementById("about").style.opacity = 0;
	document.getElementById("play").style.opacity = 0;
	
	
	var i = 30;
		
	var inter = setInterval(function(){
		i--;
		if(i>=0){
		document.getElementById("rotate_menu").style.transform = "rotateZ(" + i + "deg)";
		}else{
			clearInterval(inter);
		}
	}, 10);
}



