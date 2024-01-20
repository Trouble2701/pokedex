function searchPokedex() {
    document.getElementById('searchDiv').style.transform = 'translateY(0px)';
    document.getElementById('searchIcon').setAttribute("onclick", "searchPokedexclose()");
}

function searchPokedexclose() {
    document.getElementById('searchDiv').style.transform = 'translateY(-100px)';
    document.getElementById('searchIcon').setAttribute("onclick", "searchPokedex()");
}

function loadid(id) {
    if(id!=undefined){
        if (id.toString().length == 1) {
            return `#00${id}`;
        } else if (id.toString().length == 2) {
            return `#0${id}`;
        } else if (id.toString().length > 2) {
            return `#${id}`;
        }
    }
}

function loading(i){
    let loadButton = document.getElementById('loadNext');
        if(i < load-1){
            loadButton.innerHTML = '';
            loadButton.innerHTML = loadSpeech('load');
            loadButton.disabled = true;
            document.body.style.overflow = 'hidden';
            precentCalc();
        }else if(i == load-1){
            loadButton.innerHTML = '';
            loadButton.innerHTML = loadSpeech(load);
            loadButton.disabled = false;
            document.body.style.overflow = '';
        }
}

function precentCalc() {
    let procentSVG = (procent + calcProcent) / 100;
    let circleTimeCalc = time / 1000;
    document.getElementById('circle').innerHTML = circle(procentSVG, circleTimeCalc);
    let calcPro = Math.round((procentSVG + Number.EPSILON) * 100);
    if(Math.round((procentSVG + Number.EPSILON) * 100) >= 100){
        calcPro = '100';
    }
    document.getElementById('text').innerHTML = `<tspan x="100" dy="-1em">${calcPro}%</tspan><tspan x="100" dy="2em">${loadCount} von ${loadAll}</tspan>`;
    if (Math.round((procentSVG + Number.EPSILON) * 100) >= 100) {
        setTimeout(() => {
            document.getElementById('loadingCircle').style.display = 'none';
            procent = 0;
            calcProcent = 0; 
            loadCount = 0;
            loadAll = 0;   
        }, 200);
    }
}

function loadPokemonColor(id, type) {
    let transperent = ', 0.8';
    if(id == 'pokeCard'){
        transperent = '';
    }
    if (type == 'grass' || type == 'bug') {
        document.getElementById(`${id}`).style.backgroundColor = `rgb(106, 175, 106${transperent})`;
        document.getElementById(`${id}`).style.color = 'rgb(255, 255, 255)';
    } else if (type == 'fire') {
        document.getElementById(`${id}`).style.backgroundColor = `rgb(175, 106, 106${transperent})`;
        document.getElementById(`${id}`).style.color = 'rgb(255, 255, 255)';
    } else if (type == 'water') {
        document.getElementById(`${id}`).style.backgroundColor = `rgb(106, 144, 175${transperent})`;
        document.getElementById(`${id}`).style.color = 'rgb(255, 255, 255)';
    } else if (type == 'normal') {
        document.getElementById(`${id}`).style.backgroundColor = `rgba(128, 128, 128${transperent})`;
        document.getElementById(`${id}`).style.color = 'rgb(255, 255, 255)';
    } else if (type == 'electric') {
        document.getElementById(`${id}`).style.backgroundColor = `rgba(255, 239, 91${transperent})`;
    } else if (type == 'ground') {
        document.getElementById(`${id}`).style.backgroundColor = `rgb(170, 119, 16${transperent})`;
        document.getElementById(`${id}`).style.color = 'rgb(255, 255, 255)';
    } else if (type == 'poison') {
        document.getElementById(`${id}`).style.backgroundColor = `rgb(139, 105, 194${transperent})`;
        document.getElementById(`${id}`).style.color = 'rgb(255, 255, 255)';
    } else if (type == 'fairy') {
        document.getElementById(`${id}`).style.backgroundColor = `rgb(252, 179, 255${transperent})`;
    } else if (type == 'fighting') {
        document.getElementById(`${id}`).style.backgroundColor = `rgb(255, 231, 187${transperent})`;
    } else if (type == 'psychic') {
        document.getElementById(`${id}`).style.backgroundColor = `rgba(130, 0, 170${transperent})`;
        document.getElementById(`${id}`).style.color = 'rgb(255, 255, 255)';
    } else if (type == 'rock') {
        document.getElementById(`${id}`).style.backgroundColor = `rgba(95, 95, 95${transperent})`;
        document.getElementById(`${id}`).style.color = 'rgb(255, 255, 255)';
    } else if (type == 'ghost') {
        document.getElementById(`${id}`).style.backgroundColor = `rgba(255, 255, 255${transperent})`;
    } else if (type == 'dark') {
        document.getElementById(`${id}`).style.backgroundColor = `rgba(24, 24, 24${transperent})`;
        document.getElementById(`${id}`).style.color = 'rgb(255, 255, 255)';
    } else if (type == 'dragon') {
        document.getElementById(`${id}`).style.backgroundColor = `rgba(122, 0, 0${transperent})`;
        document.getElementById(`${id}`).style.color = 'rgb(255, 255, 255)';
    } else if (type == 'ice') {
        document.getElementById(`${id}`).style.backgroundColor = `rgba(133, 237, 255${transperent})`;
    } else if (type == 'steel') {
        document.getElementById(`${id}`).style.backgroundColor = `rgba(56, 56, 56${transperent})`;
    } else {
        document.getElementById(`${id}`).style.backgroundColor = `rgb(255, 255, 255${transperent})`;
    }
}

function loadPokemonBgImg(type) {
    if (type == 'grass' || type == 'bug') {
        document.getElementById(`pokeCard`).style.backgroundImage = 'url("./img/wald.jpg")';
    } else if (type == 'fire') {
        document.getElementById(`pokeCard`).style.backgroundImage = 'url("./img/feuer.jpg")';
    } else if (type == 'water') {
        document.getElementById(`pokeCard`).style.backgroundImage = 'url("./img/wasser.jpg")';
    } else if (type == 'normal') {
        document.getElementById(`pokeCard`).style.backgroundImage = 'url("./img/normal.jpg")';
    } else if (type == 'electric') {
        document.getElementById(`pokeCard`).style.backgroundImage = 'url("./img/elektro.jpg")';
    } else if (type == 'ground') {
        document.getElementById(`pokeCard`).style.backgroundImage = 'url("./img/boden.jpg")';
    } else if (type == 'poison') {
        document.getElementById(`pokeCard`).style.backgroundImage = 'url("./img/gift.jpg")';
    } else if (type == 'fairy') {
        document.getElementById(`pokeCard`).style.backgroundImage = 'url("./img/fee.jpg")';
    } else if (type == 'fighting') {
        document.getElementById(`pokeCard`).style.backgroundImage = 'url("./img/kampf.jpg")';
    } else if (type == 'psychic') {
        document.getElementById(`pokeCard`).style.backgroundImage = 'url("./img/psycho.jpg")';
    } else if (type == 'rock') {
        document.getElementById(`pokeCard`).style.backgroundImage = 'url("./img/gestein.jpg")';
    } else if (type == 'ghost') {
        document.getElementById(`pokeCard`).style.backgroundImage = 'url("./img/ghost.jpg")';
    } else if (type == 'dark') {
        document.getElementById(`pokeCard`).style.backgroundImage = 'url("./img/dark.jpg")';
    } else if (type == 'dragon') {
        document.getElementById(`pokeCard`).style.backgroundImage = 'url("./img/dragon.jpg")';
    } else if (type == 'ice') {
        document.getElementById(`pokeCard`).style.backgroundImage = 'url("./img/eis.jpg")';
    } else if (type == 'steel') {
        document.getElementById(`pokeCard`).style.backgroundImage = 'url("./img/stahl.jpg")';
    }
}

function typeTwoLoading(anableLoad) {
    let typeTwoDisable = document.getElementById(`typeTwo${pokemonID['id']}`);
    typeTwoDisable.style.display = 'none';
    if (anableLoad == 'yes') {
        typeTwoDisable.style.display = 'unset';
    }
}

async function pokeCardTwoTypes(pokedata){
    if (pokedata['types'].length === 2) {
        return await typeLoad(pokedata['types'][1]['type']['name']);
    }
}

function pokeCardTwoTypesAnable(pokeData){
    if (pokeData['types'].length === 2) {
        return 'yes';
    }else{
        return 'no';
    }
}

function pokeCardTwoTypeshow(twoAnable){
    let twoType = document.getElementById('twoType');
    twoType.style.display = 'none';
    if (twoAnable == 'yes') {
        twoType.style.display = 'unset';
    }
}

function loadPokeCardEvo(shiny) {
    let evolutionShow = document.getElementById('evolutionShow');
    let evolutionShinyShow = document.getElementById('evolutionShinyShow');
    if (shiny == 'shiny') {
        evolutionShow.classList.remove('fadeIn');
        evolutionShow.classList.add('fadeOut');
        setTimeout(() => {
            evolutionShow.style.display = 'none';
        }, 500);
        evolutionShinyShow.classList.remove('fadeOut');
        evolutionShinyShow.classList.add('fadeIn');
        evolutionShinyShow.style.display = 'flex';
    } else {
        evolutionShinyShow.classList.remove('fadeIn');
        evolutionShinyShow.classList.add('fadeOut');
        setTimeout(() => {
            evolutionShinyShow.style.display = 'none';
        }, 500);
        evolutionShow.classList.remove('fadeOut');
        evolutionShow.classList.add('fadeIn');
        evolutionShow.style.display = 'flex';
    }
}

function openPokeCard(pokecard){
    document.body.style.overflow = 'hidden';
    pokecard.style.transform = 'translateY(0)';
}

function closeCard() {
    let pokecard = document.getElementById('pokeCard');
    pokecard.style.transform = 'translateY(-2000px)';
    pokecard.innerHTML = '';
    document.body.style.overflow = '';
}

function notClose(event) {
    event.stopPropagation();
}

function loadSize () {
    let width = window.innerWidth || document.documentElement.clientWidth || document.body.clientWidth;
    if (width <= 780) {
        document.getElementById('searchDiv').classList.remove('pokedexHeader');
        document.getElementById('searchDiv').classList.remove('search');
        document.getElementById('searchDiv').classList.add('searchScreen');
    } else {
        document.getElementById('searchDiv').classList.remove('searchScreen');
        document.getElementById('searchDiv').classList.add('pokedexHeader');
        document.getElementById('searchDiv').classList.add('search');
    }
};

window.addEventListener("resize", function () {
    let width = window.innerWidth || document.documentElement.clientWidth || document.body.clientWidth;
    if (width <= 780) {
        document.getElementById('searchDiv').classList.remove('pokedexHeader');
        document.getElementById('searchDiv').classList.remove('search');
        document.getElementById('searchDiv').classList.add('searchScreen');
    } else {
        document.getElementById('searchDiv').classList.remove('searchScreen');
        document.getElementById('searchDiv').classList.add('pokedexHeader');
        document.getElementById('searchDiv').classList.add('search');
    }
});