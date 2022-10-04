

 /*essentially a get request, pull from pokemon API */
 /*each ability inside own object*/
 /*html elements - buttons */
 

// fetch('https://pokeapi.co/api/v2/pokemon/300')
//     .then((resp) => resp.json())
//     .then((data) => console.log(data));

/*Fetches the data given url*/
async function getPokemonData() {
    try {
    const response = await fetch("https://pokeapi.co/api/v2/pokemon/");
    const data = await response.json();
    return data;
    } catch (err) {
        console.log(err);
    }
}

/*Gets array of pokemon*/
var pokeDex = getPokemonData();
console.log(pokeDex);

var arrowR = document.getElementById('rightArrow');
var pokeDex = arrowR.addEventListener('click', );



var arrowL = document.getElementById('leftArrow');
arrowL.addEventListener('click', getPokemonData());

/*Need functions to: 
change the photo, 
change the text (header, moves, info),
change the color of the moves and info buttons / switch the panels*/
