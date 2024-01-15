async function loadPokemon() {
    document.body.style.overflow = 'hidden';
    calcProcent = 100 / load;
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
    loadTemplate();
}

async function loadNames() {
    for (let i = 0; i < load; i++) {
        procent = procent + calcProcent;
        let resp = await fetch(url + currentPokemon['results'][i]['name']);
        pokemonID = await resp.json();
        await loadPokemonNames();
        loading(i);
    }
    load = +document.getElementById('showLimit').value;
    loadStop();
    document.body.style.overflow = 'unset';
}

function loadStop() {
    let loadButton = document.getElementById('loadNext');
    if (next + load > maxLimit) {
        load = maxLimit - next;
        loadButton.innerHTML = loadSpeech(load);
    }
    if (next == maxLimit) {
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

function typeTwoLoading(anable) {
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
//Auslagern
async function openCard(id) {
    document.body.style.overflow = 'hidden !important';
    let resp = await fetch(url + id);
    let pokeData = await resp.json();
    let pokecard = document.getElementById('pokeCard');
    let respEvo = await fetch(urlSpecies + id);
    let evolutionUrl = await respEvo.json();
    let respEvoShow = await fetch(evolutionUrl['evolution_chain']['url']);
    let evolution = await respEvoShow.json();
    pokecard.style.transform = 'translateY(0)';
    loadPokemonBgImg(pokeData['types'][0]['type']['name']);
    //console.log(pokeData, evolutionUrl);
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
            <img src="${await loadImg(pokeData['sprites'])}">
        </div>
        <div id="pokemonInnerCard">
            <div id="cardLink">
                <div class="link" onclick="dataPokemon('basic', ${pokeData['id']})">Basic</div>
                <div class="link" onclick="dataPokemon('stats', ${pokeData['id']})">Stats</div>
                <div class="link" onclick="dataPokemon('moves', ${pokeData['id']})">${pokeData['moves'].length} Moves</div>
            </div>
            <div class="dataPokemon" id="dataPokemon"></div>
            <div class="evolutions">
                <a onclick="loadPokeCardEvo('none')"  class="link">Evolution</a>
                <a onclick="loadPokeCardEvo('shiny')" class="link">Evolution Shiny</a>
            </div>
            <div class="evolution animated fadeIn" id='evolutionShow'></div>
            <div class="evolution animated fadeOut" id='evolutionShinyShow'></div>

        </div>
        `;
    dataPokemon('basic', pokeData['id']);
    let twoType = document.getElementById('twoType');
    twoType.style.display = 'none';
    if (twoAnable == 'yes') {
        twoType.style.display = 'unset';
    }
    let evolutionShow = document.getElementById('evolutionShow');
    let evolutionShinyShow = document.getElementById('evolutionShinyShow');
    let respImg = await fetch(url + evolution['chain']['species']['name']);
    let pokeImg = await respImg.json();
    if (evolution['chain']['evolves_to'].length > 0) {
        evolutionShow.innerHTML = `<img class="evoPoke" src="${await loadImg(pokeImg['sprites'])}">`;
        evolutionShinyShow.innerHTML = `<img class="evoPoke" src="${await loadImgShiny(pokeImg['sprites'])}">`;
    } else if (evolution['chain']['evolves_to'].length == 0) {
        evolutionShow.innerHTML = 'Keine Evolution';
    }


    for (let e = 0; e < evolution['chain']['evolves_to'].length; e++) {
        if (evolution['chain']['evolves_to'].length > 0) {
            let respImg = await fetch(url + evolution['chain']['evolves_to'][e]['species']['name']);
            let pokeImg = await respImg.json()
            evolutionShow.innerHTML += `<img class="evoball" src="./icons/evoball.png"><img class="evoPoke" src="${await loadImg(pokeImg['sprites'])}">`;
            evolutionShinyShow.innerHTML += `<img class="evoball" src="./icons/evoball.png"><img class="evoPoke" src="${await loadImgShiny(pokeImg['sprites'])}">`;
        }
        for (let f = 0; f < evolution['chain']['evolves_to'][e]['evolves_to'].length; f++) {

            if (evolution['chain']['evolves_to'][e]['evolves_to'].length > 0) {
                let respImg = await fetch(url + evolution['chain']['evolves_to'][e]['evolves_to'][f]['species']['name']);
                let pokeImg = await respImg.json()
                evolutionShow.innerHTML += `<img class="evoball" src="./icons/evoball.png"><img class="evoPoke" src="${await loadImg(pokeImg['sprites'])}">`;
                evolutionShinyShow.innerHTML += `<img class="evoball" src="./icons/evoball.png"><img class="evoPoke" src="${await loadImgShiny(pokeImg['sprites'])}">`;
            }
        }
    }
    loadPokemonColor('pokeCard', pokeData['types'][0]['type']['name']);
}

function closeCard() {
    let pokecard = document.getElementById('pokeCard');
    pokecard.style.transform = 'translateY(-2000px)';
    pokecard.innerHTML = '';
    document.body.style.overflow = 'unset';
}


function precentCalc() {
    let procentSVG = (procent + calcProcent) / 100;
    let circleTimeCalc = time / 1000;
    document.getElementById('circle').innerHTML = circle(procentSVG, circleTimeCalc);
    document.getElementById('text').innerHTML = `${Math.round(procentSVG * 100)}%`;
    if (Math.round(procentSVG * 100) == 100) {

        document.getElementById('loadingCircle').style.display = 'none';
        procent = 0;
        calcProcent = 0;
    }
}

function dataPokemon(site, id) {
    if (site == 'basic') {
        dataDb('basic', id);
    } else if (site == 'stats') {
        dataDb('stats', id);
    } else if (site == 'moves') {
        dataDb('moves', id);
    }
}

async function dataDb(data, id) {
    let resp = await fetch(url + id);
    let pokeData = await resp.json();

    let respEvo = await fetch(urlSpecies + id);
    let evolutionUrl = await respEvo.json();

    if (data == 'basic') dataBasic(pokeData, evolutionUrl);
    if (data == 'stats') dataStats(pokeData);
    if (data == 'moves') dataMoves(pokeData);
}
//Auslagern
function dataBasic(pokeData, evolutionUrl) {
    setNumber = 0;
    for (i = 0; i < evolutionUrl['flavor_text_entries'].length; i++) {
        if (evolutionUrl['flavor_text_entries'][i]['language']['name'] == readLang()) setNumber = i;
    }
    let evoText = evolutionUrl['flavor_text_entries'][setNumber]['flavor_text'];
    setGeneraNumber = 0;
    for (g = 0; g < evolutionUrl['genera'].length; g++) {
        if (evolutionUrl['genera'][g]['language']['name'] == readLang()) setGeneraNumber = g;
    }
    let evoGenera = evolutionUrl['genera'][setGeneraNumber]['genus'];
    let dataPokemon = document.getElementById('dataPokemon');
    dataPokemon.innerHTML = '';
    dataPokemon.innerHTML = loadBasicTemplate(evoText, evoGenera, pokeData);
}
//Auslagern
async function dataStats(pokeData) {
    let dataPokemon = document.getElementById('dataPokemon');
    dataPokemon.innerHTML = '';
    setNumber = 0;
    for (i = 0; i < pokeData['stats'].length; i++) {
        let statsResp = await fetch(pokeData['stats'][i]['stat']['url']);
        let statLang = await statsResp.json();
        for(s = 0; s < statLang['names'].length; s++){
            if(statLang['names'][s]['language']['name'] == readLang()){
                dataPokemon.innerHTML += `${statLang['names'][s]['name']}: ${pokeData['stats'][i]['base_stat']}<br>`;  
            }
        }   
    }
}
//Auslagern
async function dataMoves(pokeData) {
    let dataPokemon = document.getElementById('dataPokemon');
    dataPokemon.innerHTML = '';
    for(i = 0; i < pokeData['moves'].length; i++){
        let moveResp = await fetch(pokeData['moves'][i]['move']['url']);
        let moveLang = await moveResp.json();
        for(m = 0; m < moveLang['names'].length; m++){
            if(moveLang['names'][m]['language']['name'] == readLang()){
                dataPokemon.innerHTML+= `<div class="dataMoves" id="${moveLang['names'][m]['name']}">${moveLang['names'][m]['name']}</div>`;
                for (t = 0; t < moveLang['flavor_text_entries'].length; t++){
                    if(moveLang['flavor_text_entries'][t]['language']['name'] == readLang()){
                        document.getElementById(`${moveLang['names'][m]['name']}`).title = moveLang['flavor_text_entries'][t]['flavor_text'];
                    }
                }
            }
        }
    }
}

function notClose(event) {
    event.stopPropagation();
}