async function loadPokemon() {
    calcProcent = 100/load;
    let searchBar = document.getElementById('searchHeader');
    let loadButton = document.getElementById('loadNext');
    let response = await fetch(url + offset);
    searchBar.placeholder = loadSpeech('searchBar');
    searchBar.title = loadSpeech('searchTitle');
    loadButton.innerHTML = '';
    loadButton.innerHTML = loadSpeech(load);
    currentPokemon = await response.json();
    loadNames();
    loadSearch();
}

async function loadNames() {
    for (let i = 0; i < load; i++) {
        let resp = await fetch(url + currentPokemon['results'][i]['name']);
        pokemonID = await resp.json();
        await loadPokemonNames();
        procent = procent+calcProcent;
        loading(i);
    }
    load = +document.getElementById('showLimit').value;
    loadStop();
}

function loadStop(){
    let loadButton = document.getElementById('loadNext');
    if(next + load > maxLimit){
        load = next + load - maxLimit;
        loadButton.innerHTML = loadSpeech(load);
    }
    if(next == maxLimit){
        document.getElementById('loadNext').style.display = 'none';
    }
}

async function loadPokemonNames() {
    let nameOfPokemon = await loadSpeechNames(pokemonID['id']);
    let pokemonId = loadid(pokemonID['id']);
    let pokemonIMG = await loadImg(pokemonID['sprites']);
    let type = loadGermanTypes(pokemonID['types'][0]['type']['name']);
    let typeTwo = '';
    let anable = 'no';
    if (pokemonID['types'].length === 2) {
        typeTwo = loadGermanTypes(pokemonID['types'][1]['type']['name']);
        anable = 'yes';
    }
    document.getElementById('content').innerHTML += loadPokemonContent(nameOfPokemon, pokemonId, pokemonIMG, type, typeTwo);
    typeTwoLoading(anable);
    loadPokemonColor(pokemonID['id'], pokemonID['types'][0]['type']['name']);
}

function typeTwoLoading(anable){
    let typeTwoDisable = document.getElementById(`typeTwo${pokemonID['id']}`);
    typeTwoDisable.style.display = 'none';
    if (anable == 'yes') {
        typeTwoDisable.style.display = 'unset';
    }
}

function loadLimit() {
    let loadLimit = +document.getElementById('showLimit').value;
    offset = `?offset=0&limit=${loadLimit}`;
    next = loadLimit;
    load = loadLimit;
    document.getElementById('content').innerHTML = '';
    loadPokemon();
}

async function loadNext() {
    offset = `?offset=${next}&limit=${load}`;
    nextsum = next + load;
    next = nextsum;
    await loadPokemon();
}

async function openCard(id) {
    let resp = await fetch(url + id);
    let pokeData = await resp.json();
    let pokecard = document.getElementById('pokeCard');
    let respEvo = await fetch(urlSpecies + id);
    let evolutionUrl = await respEvo.json();
    let respEvoShow = await fetch(evolutionUrl['evolution_chain']['url']);
    let evolution = await respEvoShow.json();

    console.log(evolution['chain']);
    pokecard.style.transform = 'translateY(0)';
    loadPokemonBgImg(pokeData['types'][0]['type']['name']);
    typeTwoPC = '';
    let twoAnable = 'no';
    if (pokeData['types'].length === 2) {
        typeTwoPC = loadGermanTypes(pokeData['types'][1]['type']['name']);
        twoAnable = 'yes';
    }
    pokecard.innerHTML = /*html*/`
    <div class="closeCard" onclick="closeCard()">X</div>
        <div class="pokeCardTop">
            <div>
                <p>${await loadSpeechNames(pokeData['id'])}</p>
                <p>${loadGermanTypes(pokeData['types'][0]['type']['name'])}</p>
            </div>
            <div>
                <p>${loadid(pokeData['id'])}</p>
                <p id="twoType">${typeTwoPC}</p>
            </div>
            <img src="${loadImg(pokeImg['sprites'])}">
        </div>
        <div id="pokemonInnerCard">
            <div id="cardLink">
                <div class="link">About</div>
                <div class="link">Stats</div>
                <div class="link">Moves</div>
            </div>
            <div class="dataPokemon">
                Lorem ipsum dolor sit amet, consectetur adipisicing elit. In consectetur, ipsum optio ipsam earum explicabo enim minima eveniet voluptas praesentium culpa aspernatur necessitatibus nam magni maiores iste. Assumenda, accusamus. Impedit?
            </div>
            <div class="evolution" id='evolutionShow'></div>
        </div>
        `;
    let twoType = document.getElementById('twoType');
    twoType.style.display = 'none';
    if (twoAnable == 'yes') {
        twoType.style.display = 'unset';
    }
    let evolutionShow = document.getElementById('evolutionShow');
    let respImg = await fetch(url + evolution['chain']['species']['name']);
    let pokeImg = await respImg.json();
    console.log(respImg);
    if(evolution['chain']['evolves_to'].length > 0){
        evolutionShow.innerHTML = `<img class="evoPoke" src="${await loadImg(pokeImg['sprites'])}">`;
    }else if(evolution['chain']['evolves_to'].length == 0){
        evolutionShow.innerHTML = 'Keine Evolution';
    }
    

    for (let e = 0; e < evolution['chain']['evolves_to'].length; e++) {
        if (evolution['chain']['evolves_to'].length > 0) {
            let respImg = await fetch(url + evolution['chain']['evolves_to'][e]['species']['name']);
            let pokeImg = await respImg.json()
            evolutionShow.innerHTML += `<img class="evoball" src="./icons/evoball.png"><img class="evoPoke" src="${await loadImg(pokeImg['sprites'])}">`;
        }
        for (let f = 0; f < evolution['chain']['evolves_to'][e]['evolves_to'].length; f++) {

            if (evolution['chain']['evolves_to'][e]['evolves_to'].length > 0) {
                let respImg = await fetch(url + evolution['chain']['evolves_to'][e]['evolves_to'][f]['species']['name']);
                let pokeImg = await respImg.json()
                evolutionShow.innerHTML += `<img class="evoball" src="./icons/evoball.png"><img class="evoPoke" src="${await loadImg(pokeImg['sprites'])}">`;
            }
        }
    }
    loadPokemonColor('pokeCard', pokeData['types'][0]['type']['name']);
}

function closeCard() {
    let pokecard = document.getElementById('pokeCard');
    pokecard.style.transform = 'translateY(-2000px)';
    pokecard.innerHTML = '';
}


function precentCalc() {
    document.getElementById('loadingCircle').style.display = 'flex';
    let procentSVG = (procent + calcProcent)/100;
    let circleTimeCalc = time/1000;
    document.getElementById('circle').innerHTML = circle(procentSVG, circleTimeCalc);
    document.getElementById('text').innerHTML = `${procent}%`;
    if(procent+calcProcent == 100){
        document.getElementById('loadingCircle').style.display = 'none';
        procent = 0;
        calcProcent = 0;
    }
}