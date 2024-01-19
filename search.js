async function filter() {
    let search = document.getElementById('searchHeader').value.toLowerCase();
    let content = document.getElementById('content');
    document.getElementById('loadNext').style.display = 'none';
    if (search.length >= 1 && search != '') {
        if (!isNaN(search)) {
            content.innerHTML = '';
            await searchById(search, 'id');

        } else {
            content.innerHTML = '';
            await searchById(search, 'name');
        }
    } else {
        pokemonID = [];
        content.innerHTML = '';
        offset = `?offset=0&limit=${load}`;
        document.getElementById('loadNext').style.display = 'unset';
        searchNames = [];
        await loadPokemon();
    }
}

async function searchById(search, attr) {
    content.innerHTML = '';
    for (let i = 0; i < searchNames.length; i++) {
        let attrShow = await attrReturn(i, attr);
        let idSearch = attrShow;
        if (await idSearch.includes(search)) {
            searchPoke = [];
            searchPoke.push(searchNames[i]); 
            for (let x = 0; x < searchPoke.length; x++){
                pokemonID = [];
                pokemonID = await searchPoke[x];
                await loadPokemonNames();
            }
            pokemonID = [];           
        }
    }
    //await loadSearching();
}

async function loadSearching(){
    for (let x = 0; x < searchPoke.length; x++){
        pokemonID = [];
        pokemonID = await searchPoke[x];
        await loadPokemonNames();
    }
    pokemonID = [];
}

async function attrReturn(i, attr){
    if(attr == 'id'){
        return await splitUrl(searchNames[i]['species']['url']);
    }else if(attr == 'name'){
        return await searchNames[i]['name'];
    }
}

async function splitUrl(url){
    let searching = url;
    let splitId = searching.split('/');
    return await splitId[6];
}

async function loadSearch() {
    searchNames = [];
    let searchBar = document.getElementById('searchHeader');
    searchBar.disabled = true;
    searchBar.placeholder = loadSpeech('disable');
    let searching = await loadJsonAll(searchOffset);
    for(let i = 0; i < searching['results'].length; i++){
        let searchingJson = await loadJsonAll(searching['results'][i]['name']);
        searchNames.push(searchingJson);
        if(i == searching['results'].length-1){
            searchBar.disabled = false;
            searchBar.placeholder = loadSpeech('searchBar');
        }
    }
}