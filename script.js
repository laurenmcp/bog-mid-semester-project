var pokemon;
var pokeIndex = 1;
var pokeLocation = "https://pokeapi.co/api/v2/pokemon/";
var showMoves = false;
var showInfo = true;
document.body.onload = loadBulbasaur();
console.log(pokeIndex);

var arrowR = document.getElementById("rightArrow");
arrowR.addEventListener("click", () => {
        console.log("right arrow click triggered");
        updateUp(pokeLocation + pokeIndex);
});

var arrowL = document.getElementById("leftArrow");
arrowL.addEventListener("click", () => {
        console.log("left arrow click triggered");
        if (pokeIndex > 1) {
        updateDown(pokeLocation + (pokeIndex - 1));
        }
});

var moves = document.getElementById("moves");
moves.addEventListener("click", () => {
    console.log("move button clicked");
    showInfo = false;
    showMoves = true;
    buildMovesMenu();
});

var info = document.getElementById("info");
info.addEventListener("click", () => {
    console.log("info button clicked");
    showInfo = true;
    showMoves = false;
    buildInfoMenu();
});

function loadBulbasaur() {
    console.log("loadBulbasaur is running.");
    updateUp(pokeLocation + pokeIndex);

}

async function getPokemonData(url) {
    console.log("getPokemon Data is running.");
    try {
    const response = await fetch(url);
    const data = await response.json();
    pokemon = data;
    } catch (err) {
        console.log(err);
    }
}

async function updateUp(url) {
    console.log("updateUp is running.");
    try {
        await getPokemonData(url);
        console.log(pokemon);
        pokeIndex++;
        console.log(pokeIndex);
        setImage(pokemon.sprites.other["official-artwork"].front_default);
        setName(pokemon.name);
        setTypes(pokemon);
    if (showInfo) {
        buildInfoMenu();
    } else {
        buildMovesMenu();
    }
    } catch (err) {
        console.log(err);
    }   
}

/**
 * decrements pokeIndex to revert to previous pokemon
 */
async function updateDown(url) {
        pokeIndex--;
    if (!pokeIndex <= 0) {
        console.log("updateDown is running.");
        try {
            await getPokemonData(url);
            console.log(pokemon);
            console.log(pokeIndex);
            setImage(pokemon.sprites.other["official-artwork"].front_default);
            setName(pokemon.name);
            setTypes(pokemon);
            if (showInfo) {
                buildInfoMenu();
            } else {
                buildMovesMenu();
            }
        } catch (err) {
            console.log(err);
        }
    }
}

/**
 * Sets image
 * @param {string} url 
 */
function setImage(url) {
    console.log("setImage is running");
    console.log(url);
    let newImageTag = document.createElement("img");
    newImageTag.src = url;
    newImageTag.setAttribute('src', url);
    newImageTag.id = "image";
    let oldImage = document.getElementById("image");
    let imageContainer = document.getElementById("imageBox");
    imageContainer.removeChild(oldImage);
    imageContainer.appendChild(newImageTag);
    console.log(imageContainer.lastElementChild);
}

/**
 * Sets the name of the pokemon by deleting old name paragraph and 
 * appending new name paragraph.
 * Paragraphs identified with id "n" under the parent with id "pokeName"
 * @param {string} name 
 */
function setName(name) {
    console.log("setName is running.");
    let newPara = document.createElement("p");
    let newName = document.createTextNode(name);
    newPara.appendChild(newName);
    newPara.id = "n";
    let nameContainer = document.getElementById("pokeName");
    let oldName = document.getElementById("n");
    nameContainer.removeChild(oldName);
    nameContainer.appendChild(newPara);
    console.log(oldName);
    console.log(newName);
    console.log(newPara.id);
}

function setTypes(pokemon) {
    let typeArr = pokemon.types;
    console.log(typeArr);
    console.log(document.getElementById("typeBox"));
    let boxOfTypes = document.getElementById("typeBox");
    boxOfTypes.innerHTML = "";
    console.log(document.getElementById("typeBox"));
    let i = 0;
    while (i < typeArr.length) {
        let type = typeArr[i].type.name;
        console.log(type)
        let typeBubble = document.createElement("div"); 
        typeBubble.id = "tBubble";
        let typeIndividual = document.createElement("div");
        let typeText = document.createTextNode(type);
        typeIndividual.classList.add("typeLabel");
        typeIndividual.appendChild(typeText);
        typeBubble.appendChild(typeIndividual);
        typeBubble.classList.add(type);
        boxOfTypes.appendChild(typeBubble);
        i++;
    }
}

function buildInfoMenu() {
    switchColors(document.getElementById("info"), document.getElementById("moves"));
    switchTitle(document.getElementById("panelTitle"), "Info");
    let menu = document.getElementById('panelBox');
    // menu.innerHTML = "";
    clear(menu);
    var items = ["height: " + Math.round(pokemon.height * 0.1 * 10) / 10 + "m", "weight: " + (pokemon.weight / 10) + "kg"];
    var startArr = pokemon.stats;
    for (var i = 0; i < startArr.length; i++){
        items.push(startArr[i].stat.name + ": " + startArr[i].base_stat)
    }
    replacePanelContent(menu, items);
}

function buildMovesMenu() {
    switchColors(document.getElementById("moves"), document.getElementById("info"));
    switchTitle(document.getElementById("panelTitle"), "Moves");
    let menu = document.getElementById('panelBox');
    // menu.innerHtml = "";
    clear(menu);
    var items = [];
    console.log(items);
    var arr = pokemon.moves;
    console.log(arr);
    for (var i = 0; i < arr.length; i++){
        items.push(arr[i].move.name)
    }
    console.log(items);
    replacePanelContent(menu, items);
}

function clear(el) {
    while(el.lastChild) {
        el.removeChild(el.lastChild);
    }
}

function replacePanelContent(menu, items) {
    for (i = 0; i < items.length; i++) {
        let item = document.createElement("p"); 
        let text = document.createTextNode(items[i]);
        item.appendChild(text);
        menu.appendChild(item);
    }
}

function switchTitle(cur, to) {
    clear(cur);
    let newHeader = document.createElement("p");
    let newTitle = document.createTextNode(to);
    newHeader.appendChild(newTitle);
    cur.appendChild(newHeader);
}

function switchColors(greenButton, greyButton) {
    greenButton.style.backgroundColor =  "#7CFF79";
    greyButton.style.backgroundColor = "#E8E8E8";
}