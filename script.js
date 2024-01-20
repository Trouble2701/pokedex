async function loadPokemon() {
    loadSize ();
    loadTranslate();
    calcProcent = 100 / load;
    loadAll = load;
    currentPokemon = await loadJsonAll(offset);
    loadNames();
    loadSearch();
    loadTemplate();
}

async function loadNames() {
    loadCount++;
    for (let i = 0; i < load; i++) {
        procent = procent + calcProcent;
        loadCount++;
        pokemonID = await loadJsonAll(currentPokemon['results'][i]['name']);
        await loadPokemonNames();
        loading(i);
    }
    load = +document.getElementById('showLimit').value;
    loadStop();
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
    let type = await typeLoad(pokemonID['types'][0]['type']['name']);
    let typeTwo = await loadTypeTwo('type');
    let anable = await loadTypeTwo('anable');
    document.getElementById('content').innerHTML += loadPokemonContent(nameOfPokemon, pokemonId, pokemonIMG, type, typeTwo);
    typeTwoLoading(anable);
    loadPokemonColor(pokemonID['id'], pokemonID['types'][0]['type']['name']);
}

async function loadTypeTwo(type) {
    if (pokemonID['types'].length === 2) {
        if (type == 'anable') {
            return 'yes';
        } else if (type == 'type') {
            return await typeLoad(pokemonID['types'][1]['type']['name']);
        }

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
    let pokeData = await loadJsonAll(id);
    let pokecard = document.getElementById('pokeCard');
    openPokeCard(pokecard);
    loadPokemonBgImg(pokeData['types'][0]['type']['name']);
    let typeTwoPC = await pokeCardTwoTypes(pokeData);
    let twoAnable = pokeCardTwoTypesAnable(pokeData);
    pokecard.innerHTML = await pokeCardTemplate(pokeData['id'], pokeData['types'][0]['type']['name'], typeTwoPC, pokeData['sprites'], pokeData['moves'].length);
    dataPokemon('basic', pokeData['id']);
    pokeCardTwoTypeshow(twoAnable);
    pokeCardEvo(id);
    loadPokemonColor('pokeCard', pokeData['types'][0]['type']['name']);
}

async function pokeCardEvo(id) {
    let evolutionUrl = await loadJsonSpecies(id);
    let evolution = await loadJsonEvo(evolutionUrl['evolution_chain']['url']);
    let pokeImg = await loadJsonAll(evolution['chain']['species']['name']);
    let evolutionShow = document.getElementById('evolutionShow');
    let evolutionShinyShow = document.getElementById('evolutionShinyShow');
    loadFirstEvo(evolution, pokeImg, evolutionShow, evolutionShinyShow);
    for (let e = 0; e < evolution['chain']['evolves_to'].length; e++) {
        loadSecondEvo(evolution, evolutionShow, evolutionShinyShow, e);
        for (let f = 0; f < evolution['chain']['evolves_to'][e]['evolves_to'].length; f++) {
            loadLastEvo(evolution, evolutionShow, evolutionShinyShow, e, f);
        }
    }
}

function dataPokemon(site, id) {
    let loadCard = document.getElementById('loadingPokeCard');
    if (site == 'basic') {
        dataDb('basic', id, loadCard);
        loadCard.style.display = 'flex';
    } else if (site == 'stats') {
        loadTemplate();
        dataDb('stats', id, loadCard);
    } else if (site == 'moves') {
        loadTemplate();
        dataDb('moves', id, loadCard);
    }
}

async function dataDb(data, id, loadCard) {
    let pokeData = await loadJsonAll(id);
    let evolutionUrl = await loadJsonSpecies(id);

    if (data == 'basic') dataBasic(pokeData, evolutionUrl, loadCard);
    if (data == 'stats') dataStats(pokeData, loadCard);
    if (data == 'moves') dataMoves(pokeData, loadCard);
}

function dataBasic(pokeData, evolutionUrl, loadCard) {
    let dataPokemon = document.getElementById('dataPokemon');
    dataPokemon.innerHTML = '';
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
    dataPokemon.innerHTML = loadBasicTemplate(evoText, evoGenera, pokeData);
    loadCard.style.display = 'none';
}

async function dataStats(pokeData) {
    calcProcent = 100/pokeData['stats'].length;
    loadAll = pokeData['stats'].length;
    let dataPokemon = document.getElementById('dataPokemon');
    dataPokemon.innerHTML = '';
    for (i = 0; i < pokeData['stats'].length; i++) {
        let statLang = await loadJsonEvo(pokeData['stats'][i]['stat']['url']);
        for (s = 0; s < statLang['names'].length; s++) {
            if (statLang['names'][s]['language']['name'] == readLang()) {
                statLabels.push(statLang['names'][s]['name']);
                statData.push(pokeData['stats'][i]['base_stat']);
                procent = procent + calcProcent;
                loadCount++;
                precentCalc();
            }
        }
    }
    loadStat();
}

async function dataMoves(pokeData) {
    calcProcent = 100/pokeData['moves'].length;
    procent = procent + calcProcent;
    loadAll = pokeData['moves'].length
    let dataPokemon = document.getElementById('dataPokemon');
    dataPokemon.innerHTML = '';
    for (i = 0; i < pokeData['moves'].length; i++) {
        let moveLang = await loadJsonEvo(pokeData['moves'][i]['move']['url']);
        for (m = 0; m < moveLang['names'].length; m++) {
            if (moveLang['names'][m]['language']['name'] == readLang()) {
                dataPokemon.innerHTML += `<div class="dataMoves" id="${moveLang['names'][m]['name']}">${moveLang['names'][m]['name']}</div>`;
            }
        }
        procent = procent + calcProcent;
        loadCount++;
        precentCalc();
    }
}