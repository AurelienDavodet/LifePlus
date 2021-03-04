/*var monTableau = [
    [11,1],[12,1],[10,2],[9,3],
    [9,4],[9,5],[10,6],[11,7],[12,7],[2,4],[1,5],
    [2,5],[18,28],[17,28],[19,27],[20,26],[20,25],
    [20,24],[19,23],[18,22],[17,22],[27,25],[28,24],
    [27,24],[11,28],[12,28],[10,27],[9,26],[9,25],[9,24],[10,23],
    [11,22],[12,22],[2,25],[1,24],[2,24],[18,1],[17,1],
    [19,2],[20,3],[20,4],[20,5],[19,6],[18,7],[17,7],[27,4],
    [28,5],[27,5]
];*/


var grille; //taille de la grille

var start=false; //génération automatique

countGen = 0; //compteur du nombre de gen

var timer; 
var duree=200;

//tableau de génération
var genPres =[grille];
var genFutur =[grille];


function createTab() {

    for (var i = 0; i < grille; i++) {
        genPres[i] = new Array(grille);
        genFutur[i] = new Array(grille);  
    }

    for (var i = 0; i < grille; i++) {
        for (var j = 0; j < grille; j++) {
            genPres[i][j] = 0;
            genFutur[i][j] = 0;
            
        }
    }
    
}


// remplissage de la grille
function remplissageGrille() {

    var Grid = document.querySelector('#Grid');
    
    var tab = document.createElement('table');
    tab.setAttribute('id','Gridgrid');
    
    for (var i = 0; i < grille; i++) {

        var tr = document.createElement('tr');

        for (var j = 0; j < grille; j++) {

            var cellule = document.createElement('td');
            cellule.setAttribute('id', i + ' ' + j);


            for(var k = 0; k < monTableau.length; k++){
            
                if(monTableau[k][0] == i && monTableau[k][1] == j){
                    cellule.setAttribute('class', 'actif');
                   
                    genPres[i][j] = 1; 
                    
                }
          
            }
        
            tr.appendChild(cellule);
        }

        tab.appendChild(tr);
    }

    Grid.appendChild(tab);
}



//Calcul du nombre de voisns
function nbVoisins(li, col) {

    var count = 0;
    var nbLi=Number(li);
    var nbCol=Number(col);
    
    if (nbLi - 1 >= 0) {

        if (genPres[nbLi - 1][nbCol] == 1){
            count++;
        }         
    }

    if (nbLi - 1 >= 0 && nbCol - 1 >= 0) {

        if (genPres[nbLi - 1][nbCol - 1] == 1){
            count++;
        }      
    }

    if (nbLi - 1 >= 0 && nbCol + 1 < grille) {

        if (genPres[nbLi - 1][nbCol + 1] == 1){
            count++;
        }  
    }

    if (nbCol - 1 >= 0) {

        if (genPres[nbLi][nbCol - 1] == 1){
            count++;
        } 
    }

    if (nbCol + 1 < grille) {

        if (genPres[nbLi][nbCol + 1] == 1){
            count++;
        } 
    }

    if (nbLi + 1 < grille && nbCol - 1 >= 0) {

        if (genPres[nbLi + 1][nbCol - 1] == 1){
            count++;
        } 
    }

    if (nbLi + 1 < grille && nbCol + 1 < grille) {

        if (genPres[nbLi + 1][nbCol + 1] == 1){
            count++;
        } 
    }
    
    if (nbLi + 1 < grille) {

        if (genPres[nbLi + 1][nbCol] == 1){
            count++;
        } 
    }

    return count;

}
    

//Vérification des règles
function etatVoisins() {

    for (li in genPres) {
        
        for (col in genPres[li]) {
           
            var voisin = nbVoisins(li, col);

            // Actif
            if (genPres[li][col] == 1) {
              
                if (voisin < 2) {
                    genFutur[li][col] = 0;
                } 

                else if (voisin == 2 || voisin == 3) {
                    genFutur[li][col] = 1;
                } 
                
                else if (voisin > 3) {
                    genFutur[li][col] = 0;
                }
            } 

            // Inactif
            else if (genPres[li][col] == 0) {
                
                if (voisin == 3) {

                    genFutur[li][col] = 1;
                }
            }
        }
    }
    
}

function newGenPres() {
       
    for (li in genPres) {
        for (col in genPres[li]) {

            genPres[li][col] = genFutur[li][col];
            genFutur[li][col] = 0;
        }
    }
     
}
    
function newGrille() {

    var cellule='';

    for (var i=0; i<genPres.length; i++) {

        for (var j = 0; j<genPres[i].length; j++) {

            cellule = document.getElementById(i + ' ' + j);

            if (genPres[i][j] == 0) {
                cellule.setAttribute('class', 'inactif');
            } 
            else {
                cellule.setAttribute('class', 'actif');
            }
        }
    }
}
    

function begin(){

    countGen++;
    document.getElementById("compteur").innerHTML = "Génération numéro: "+countGen;
    etatVoisins();
    newGenPres();
    newGrille();

    if (start) {
        timer = setTimeout(begin, duree);
    }
}


//lancement manuel
function manuel(){
      
    if (!start) {
        begin();
    }
}
  

//lancement automatique
function AutoPlay(){

    var startStop=document.querySelector('#startStop');
       
    if (!start) {
        start = true;
        startStop.value='Stop';
        begin();
         
    } 
    else {
        start = false;
        startStop.value='Start';
        clearTimeout(timer); 
    }
}

//importer une génération et l'afficher
function impo() {

    let text;
    let file = document.querySelector("#file-input").files[0];
    let reader = new FileReader();

    reader.addEventListener('load', function(e) {
        text = e.target.result;

        grille = text[0]+text[1];
            
        var monTableauString 

        for(var i = 2; i<text.length; i++){
            if(i==2){
                monTableauString = text[2]
            }
            else{
                monTableauString = monTableauString + text[i];
            }
        }
        
        var tamp1;
                
        tamp1 = monTableauString.split(";");
        var tamp2 = new Array(tamp1.length)
                
        for(var i=0; i<tamp1.length; i++){
            tamp2[i]=tamp1[i].split(",");
        }
                
        monTableau = tamp2;
                
        createTab();
        remplissageGrille();
    });

    reader.readAsText(file);
}


//exporter la génération actuelle
function expo(){

    var tablo = [];
    var coor = "";
    var affichage;

    for (var i=0; i<genPres.length; i++) {

        for (var j = 0; j<genPres[i].length; j++) {

            if (genPres[i][j] == 1) {

                tablo.push(i+','+j);
                
            } 
        }
    }
    console.log(tablo);
    

    for(var i=0; i<tablo.length; i++){
        if(i==0){
            coor = tablo[i]
        }
        else{
            coor = coor + ";" + tablo[i];
        }
        
    }
    
    affichage = grille + " " + coor;
    //alert(affichage);
        
        // Convert the text to BLOB.
        const textToBLOB = new Blob([affichage], { type: 'text/plain' });
        const sFileName = 'input.txt';	   // The file to save the data.

        let newLink = document.createElement("a");
        newLink.download = sFileName;

        if (window.webkitURL != null) {
            newLink.href = window.webkitURL.createObjectURL(textToBLOB);
        }
        else {
            newLink.href = window.URL.createObjectURL(textToBLOB);
            newLink.style.display = "none";
            document.body.appendChild(newLink);
        }

        newLink.click(); 

}

