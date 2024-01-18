function loadTranslate() {
    let searchBar = document.getElementById('searchHeader');
    let loadButton = document.getElementById('loadNext');
    searchBar.placeholder = loadSpeech('searchBar');
    searchBar.title = loadSpeech('searchTitle');
    loadButton.innerHTML = '';
    loadButton.innerHTML = loadSpeech(load);
}

function loadPokemonContent(nameOfPokemon, pokemonId, pokemonIMG, type, typeTwo) {
    return /*html*/`
    <div class="pokemonCard" id="${pokemonID['id']}" onclick="openCard(${pokemonID['id']})">
        <div class="pokemonTop">
            <div class="pokemon">
                <div class="headerPokemon">
                    <p>${nameOfPokemon}</p>
                    <p>${pokemonId}</p>
                </div>
                <div class="headerPokemon">
                    <p>${type}</p>
                    <p id="typeTwo${pokemonID['id']}">${typeTwo}</p>
                </div>
                <img id="img${pokemonID['id']}" src="${pokemonIMG}">
            </div>
        </div>
    </div>
    `;
}

async function pokeCardTemplate(id, type, twoType, sprites, moveLength) {
    return /*html*/`
    <div class="closeCard" onclick="closeCard()">X</div>
        <div class="pokeCardTop">
            <div>
                <p>${await loadSpeechNames(id)}</p>
                <p>${await typeLoad(type)}</p>
            </div>
            <div>
                <p>${loadid(id)}</p>
                <p id="twoType">${twoType}</p>
            </div>
            <img src="${await loadImg(sprites)}">
        </div>
        <div id="pokemonInnerCard">
            <div id="loadingPokeCard"><img src="./icons/loading.gif"></div>
            <div id="cardLink">
                <a class="link" onclick="dataPokemon('basic', ${id})">Basic</a>
                <a class="link" onclick="dataPokemon('stats', ${id})">Stats</a>
                <a class="link" onclick="dataPokemon('moves', ${id})">${moveLength} Moves</a>
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
}

async function loadFirstEvo(evolution, pokeImg, evolutionShow, evolutionShinyShow) {
    if (evolution['chain']['evolves_to'].length > 0) {
        let evoId = evolution['chain']['species']['url'];
        let splitId = evoId.split('/');
        let evoIdSearch = splitId[6];
        evolutionShow.innerHTML = `<a class="link" onclick="openCard(${evoIdSearch})"><img class="evoPoke" src="${await loadImg(pokeImg['sprites'])}"></a>`;
        evolutionShinyShow.innerHTML = `<a class="link" onclick="openCard(${evoIdSearch})"><img class="evoPoke" src="${await loadImgShiny(pokeImg['sprites'])}"></a>`;
    } else if (evolution['chain']['evolves_to'].length == 0) {
        evolutionShow.innerHTML = 'Keine Evolution';
        evolutionShinyShow.innerHTML = 'Keine Evolution';
    }
}

async function loadSecondEvo(evolution, evolutionShow, evolutionShinyShow, e) {
    if (evolution['chain']['evolves_to'].length > 0) {
        let pokeImg = await loadJsonAll(evolution['chain']['evolves_to'][e]['species']['name']);
        let evoId = evolution['chain']['evolves_to'][e]['species']['url'];
        let splitId = evoId.split('/');
        let evoIdSearch = splitId[6];
        evolutionShow.innerHTML += `<img class="evoball" src="./icons/evoball.png"><a class="link" onclick=" openCard(${evoIdSearch})"><img class="evoPoke" src="${await loadImg(pokeImg['sprites'])}"></a>`;
        evolutionShinyShow.innerHTML += `<img class="evoball" src="./icons/evoball.png"><a class="link" onclick=" openCard(${evoIdSearch})"><img class="evoPoke" src="${await loadImgShiny(pokeImg['sprites'])}"></a>`;
    }
}

async function loadLastEvo(evolution, evolutionShow, evolutionShinyShow, e, f) {
    if (evolution['chain']['evolves_to'][e]['evolves_to'].length > 0) {
        let pokeImg = await loadJsonAll(evolution['chain']['evolves_to'][e]['evolves_to'][f]['species']['name']);
        let evoId = evolution['chain']['evolves_to'][e]['evolves_to'][f]['species']['url'];
        let splitId = evoId.split('/');
        let evoIdSearch = splitId[6];
        evolutionShow.innerHTML += `<img class="evoball" src="./icons/evoball.png"><a class="link" onclick=" openCard(${evoIdSearch})"><img class="evoPoke" src="${await loadImg(pokeImg['sprites'])}"></a>`;
        evolutionShinyShow.innerHTML += `<img class="evoball" src="./icons/evoball.png"><a class="link" onclick=" openCard(${evoIdSearch})"><img class="evoPoke" src="${await loadImgShiny(pokeImg['sprites'])}"></a>`;
    }
}

function loadImg(img) {
    if (img['other']['home']['front_default'] == null) {
        if (img['other']['official-artwork']['front_default'] == null) {
            if (img['front_default'] == null) {
                return './img/pokeballtransperant.png';
            } else {
                return img['front_default'];
            }
        } else {
            return img['other']['official-artwork']['front_default'];
        }
    } else {
        return img['other']['home']['front_default'];
    }
}

function loadImgShiny(img) {
    if (img['other']['home']['front_shiny'] == null) {
        if (img['other']['official-artwork']['front_shiny'] == null) {
            if (img['front_shiny'] == null) {
                return './img/pokeballtransperant.png';
            } else {
                return img['front_shiny'];
            }
        } else {
            return img['other']['official-artwork']['front_shiny'];
        }
    } else {
        return img['other']['home']['front_shiny'];
    }
}

function circle(procentSVG, circleTimeCalc) {
    return /*html*/`
    <circle 
        cx="0" 
        cy="100" 
        r="80" 
        stroke="#FD5B4F" 
        stroke-width="10"
        stroke-dasharray="calc(502.634 * ${procentSVG}) calc(502.634 * 1.2)" 
        stroke-dashoffset="calc(502.634 * ${procentSVG})"
        stroke-linecap="round" 
        fill="none" 
        transform="rotate(-90, 50, 50)">
          
        <animate 
        attributeName="stroke-dashoffset" 
        dur="${circleTimeCalc}s" 
        from="calc(502.634 * ${procentSVG})" 
        to="0" 
        fill="freeze"
        calcMode="spline" 
        keySplines="0.25 0.1 0.25 1" 
        keyTimes="0;1" />
        </circle>
        <text
        x="100"
        y="100"
        text-anchor="middle"
        dominant-baseline="central"
        font-size="20"
        font-family="Arial, sans-serif"
        font-weight="700"
        fill="#FD5B4F"
        id="text"
        >
        </text>
    `;
}

function loadTemplate() {
    document.getElementById('loadingCircle').style.display = 'flex';
    document.getElementById('circle').innerHTML = circle(0, 0);
    document.getElementById('text').innerHTML = `0%`;
}

function loadBasicTemplate(evoText, evoGenera, pokeData) {
    let height = `${pokeData['height'] / 10}m`;
    if (pokeData['height'] < '10') height = `0,${pokeData['height']}m`;
    let weight = `${pokeData['weight'] / 10}kg`;
    if (pokeData['weight'] < '1000') weight = `${pokeData['weight'] / 10}kg`;
    if (weight < '1') weight = `${pokeData['weight']}g`;
    return /*html*/`${evoText}<br><br>Gattung: ${evoGenera}<br>Größe: ${height}<br>Gewicht: ${weight}`;
};

function loadStat() {
    document.getElementById('dataPokemon').innerHTML = ``;
    document.getElementById('dataPokemon').innerHTML = `<canvas id="statChart"></canvas>`;
    const ctx = document.getElementById('statChart');

    new Chart(ctx, {
        type: 'bar',
        data: {
            labels: statLabels,
            datasets: [{
                label: '# of Votes',
                data: statData,
                backgroundColor: [
                    'rgb(255, 99, 132)',
                    'rgb(75, 192, 192)',
                    'rgb(255, 205, 86)',
                    'rgb(201, 203, 207)',
                    'rgb(54, 162, 235)',
                    'rgb(0, 126, 0)'
                ]
            }]
        },
        options: {
            scales: {
                y: {
                    beginAtZero: true
                }
            }
        }
    });
    statLabels = [];
    statData = [];
}