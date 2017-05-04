//document.getElementById("unos").focus();

// Funkcija za ucitavanje podataka iz JSON fajla

function loadJson(url, cFunction) {
  var xhttp;
  xhttp = new XMLHttpRequest();
  xhttp.onreadystatechange = function() {
    if (this.readyState == 4 && this.status == 200) {
      
      cFunction(this);
    }
  };
  xhttp.open("GET", url, true);
  xhttp.send();
}

// Funkcija za dobijanje podataka o vremenu i lokaciji

function init(xhttp){
    var odgovor = JSON.parse(xhttp.responseText);
    var dozvoljenoVreme = odgovor.vreme;
    var oblast = odgovor.oblast;
    var pocetnoVreme = new Date();
    var krajnjeVreme = Date.parse(pocetnoVreme) + dozvoljenoVreme * 1000;
    var trenutnoPreostaloVreme;
    document.getElementById("oblast").innerHTML = oblast;

    trenutnoPreostaloVreme = (krajnjeVreme - Date.parse(new Date) )/ 1000;
    var minuti = Math.floor(trenutnoPreostaloVreme / 60);
    var sekunde = trenutnoPreostaloVreme % 60;
    document.getElementById("vreme").innerHTML =  minuti +"m "+ sekunde +"s";
    setInterval(odbrojavanje, 1000);

    function odbrojavanje(){
      trenutnoPreostaloVreme = (krajnjeVreme - Date.parse(new Date) )/ 1000;
      minuti = Math.floor(trenutnoPreostaloVreme / 60);
      sekunde = trenutnoPreostaloVreme % 60;
      document.getElementById("vreme").innerHTML = minuti +"m "+ sekunde +"s";
      if(trenutnoPreostaloVreme == 0){
        kraj_igre(xhttp);
        
      }else{

      }  
    };
}

// Funkcija za autocomplete

function autoComplete(xhttp) {

  if(document.getElementById("unos").value.length == 1){

    var odgovor = JSON.parse(xhttp.responseText);
    var spisakPonudjenihGradova = odgovor.ponudjene;
    var unesenaSlova = document.getElementById("unos").value;
    var spisakAutocomplete = [];
    var autoCompleteWrapper = document.getElementById("wrapperAutocomplete");
  
    for(var i = 0; i <= spisakPonudjenihGradova.length - 1; i++){
     
          if(unesenaSlova.charAt(0).toUpperCase() == spisakPonudjenihGradova[i].charAt(0)){
              spisakAutocomplete.push(spisakPonudjenihGradova[i]);
              var singleAutocomplete = document.createElement("DIV");
              singleAutocomplete.innerHTML = spisakPonudjenihGradova[i];
              singleAutocomplete.classList.add("drop_down");
              singleAutocomplete.addEventListener("click", prebacivanje_u_input_polje);
              autoCompleteWrapper.appendChild(singleAutocomplete);
          }else{
                
                }
       
    };
  
  function prebacivanje_u_input_polje(){
      document.getElementById("unos").value = this.innerHTML;
      autoCompleteWrapper.innerHTML ="";
      
  };
 }

 else if(document.getElementById("unos").value.length == 2){
    var procisceni_spisak_autocomplete = document.getElementsByClassName("drop_down");
    for(var i = 0; i<= procisceni_spisak_autocomplete.length - 1; i++){
        if(document.getElementById("unos").value.charAt(1) != procisceni_spisak_autocomplete[i].innerHTML.charAt(1)){
            procisceni_spisak_autocomplete[i].classList.add("za_brisanje");
        }else{

        }
    };
    var zaBrisanje = document.getElementsByClassName("za_brisanje");
    for(var j = 0; j <= zaBrisanje.length - 1 ; j++){
        zaBrisanje[j].innerHTML = "";
    }
 }

 else if(document.getElementById("unos").value.length == 3){
    var procisceni_spisak_autocomplete = document.getElementsByClassName("drop_down");
    for(var i = 0; i<= procisceni_spisak_autocomplete.length - 1; i++){
        if(document.getElementById("unos").value.charAt(2) != procisceni_spisak_autocomplete[i].innerHTML.charAt(2)){
            procisceni_spisak_autocomplete[i].classList.add("za_brisanje");
        }else{

        }
    };
    var zaBrisanje = document.getElementsByClassName("za_brisanje");
    for(var j = 0; j <= zaBrisanje.length - 1 ; j++){
        zaBrisanje[j].innerHTML = "";
    }
 }

 else if(document.getElementById("unos").value.length == 0){
    document.getElementById("wrapperAutocomplete").innerHTML ="";
 }

 else{

 }

}

// Funkcija za prebacivanje iz input polja u listu ubačenih gradova

function prebacivanje_u_listu_ubacenih_gradova(){
  if(document.getElementById("unos").value != ""){
      var ubaceni_grad_wrapper = document.createElement("DIV"); 
      var ubaceni_grad = document.createElement("DIV");
      var x = document.createElement("DIV");
      ubaceni_grad_wrapper.appendChild(ubaceni_grad);
      ubaceni_grad_wrapper.appendChild(x);
      document.getElementById("lista_ubacenih_gradova").appendChild(ubaceni_grad_wrapper);
      ubaceni_grad.innerHTML = document.getElementById("unos").value; 
      ubaceni_grad.classList.add("ubaceniGradovi");
      x.addEventListener("click", function(){this.parentNode.parentNode.removeChild(ubaceni_grad_wrapper)});
      x.classList.add("izbaciti_iz_liste")
      x.innerHTML = "&times;"; 
      document.getElementById("unos").value = "";
  }else{

    }   
};

// Funkcija za zavrsetak igre

function kraj_igre(xhttp){
    var odgovor = JSON.parse(xhttp.responseText);
    var tacni_odgovori = odgovor.tacno;
    var niz_ubacenih_gradova = document.getElementsByClassName("ubaceniGradovi");
    var counter = 0;
    for(var i = 0; i <= niz_ubacenih_gradova.length -1; i++ ){
        for(var j = 0; j <= tacni_odgovori.length - 1; j++){
          if(niz_ubacenih_gradova[i].innerHTML == tacni_odgovori[j]){
              counter++
          }else{

          }
        }
    }
    
    sessionStorage.setItem("broj_tacnih_odgovora", counter);
    window.location.assign("display.html"); 
};

document.getElementById("play").addEventListener("click", function(){loadJson("data/podaci.json", init)}, false);
document.getElementById("unos").addEventListener("input", function(){loadJson("data/podaci.json", autoComplete)});
document.getElementById("dodaj_u_listu").addEventListener("click", prebacivanje_u_listu_ubacenih_gradova );
document.getElementById("zavrsi_igru").addEventListener("click", function(){loadJson("data/podaci.json", kraj_igre)});