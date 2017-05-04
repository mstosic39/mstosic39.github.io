var broj = sessionStorage.getItem("broj_tacnih_odgovora");
var procenat_tacnih_odgovora = 25 * broj;


setInterval(promenaSirine, 5);
var counter = 0;
function promenaSirine(){
	if(counter < procenat_tacnih_odgovora){
		counter = counter + 0.1;
		document.getElementById("indikator").style.width = counter + "%";
		document.getElementById("tekstNaDrugojStrani").innerHTML = Math.floor(counter) + " %"; 
		console.log(counter);

	}else{

	}

};