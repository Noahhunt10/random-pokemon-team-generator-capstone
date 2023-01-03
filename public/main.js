


const generatePoke = document.getElementById('generate-poke')
const teamDiv = document.getElementById('team-cards')
const currentPokeImg = document.getElementById('current-pokemon')
const currentPokeName = document.getElementById('current-poke-name')
const newPoke = document.getElementById('new-btn')
const currentMoves = document.querySelectorAll('.current-moves')
const currentAbility = document.getElementById('current-ability')
const currentItem = document.getElementById('current-item')
const myTeamDiv = document.getElementById('team-cards')
const addBtn = document.getElementById('add-btn')
// const baseURL = 'http://54.215.22.105/teambuild.html/api/team'
const baseURL = 'http://localhost:4000/teambuild.html/api/team'




const randomPoke = async () => {
    let index = Math.floor(Math.random() * 905);
    //Sets index to random number to access poki api with
    const  { data: pokemonData } = await axios.get(`https://pokeapi.co/api/v2/pokemon/${index}`)
    currentPokeImg.src = pokemonData.sprites.other['official-artwork'].front_default
    //Set image of random pokemon
    currentPokeName.textContent = pokemonData.name.charAt(0).toUpperCase() + pokemonData.name.slice(1);
    //Set name of random pokemon
    index = Math.floor(Math.random() * pokemonData.abilities.length);
    //Sets index variable to random number based of amount of abilities pokemon can learn
    currentAbility.textContent = 'Ability: ' + pokemonData.abilities[index].ability.name.charAt(0).toUpperCase() + pokemonData.abilities[index].ability.name.slice(1);
    //Sets currentAbility's text content to the ability name at the index of the number set in the index variable, makes the first letter uppercase.
    let movesArr = []
    while(movesArr.length < 4){
        index = Math.floor(Math.random() * pokemonData.moves.length)
        if(!movesArr.includes(pokemonData.moves[index].move.name)){
            movesArr.push(pokemonData.moves[index].move.name)
            currentMoves[movesArr.length - 1].innerText = pokemonData.moves[index].move.name.charAt(0).toUpperCase() + pokemonData.moves[index].move.name.slice(1);
        }
    }
    //Loops to fill up movesArr array with 4 moves at a random number index of moves the pokemon can learn
    
    await getItem()
}
const getItem = async () => {
    let index = Math.floor(Math.random() * 1329);
    const item = await axios.get(`https://pokeapi.co/api/v2/item/${index}`)
    currentItem.textContent = 'Item: ' + item.data.name.charAt(0).toUpperCase() + item.data.name.slice(1);

    
}

const getTeam = () => {
    axios.get(baseURL)
    .then(res => {
        const data = res.data
        displayPoke(data)
    })     
    }
const displayPoke = (arr) => {
    myTeamDiv.innerHTML = ``
    for( let i = 0; i < arr.length; i++ ){
        createPokeCard(arr[i])
    }
}
const createPokeCard = (poke) => {
    const pokeCard = document.createElement('div')
    pokeCard.classList.add('poke-card')
    pokeCard.innerHTML =   `<button onclick="deletePoke(${poke.id})" id='delete'>X</button>
                            <h2 class="team-poke-name">${poke.name}</h2>
                            <img id="poke-img" src="${poke.img}"></img>
                            <div class="team-moves">
                            <div id="team-moves-one">
                            <p class="team-move">${poke.moves[0]}</p>
                            <p class="team-move">${poke.moves[1]}</p>                                      
                            
                            </div>
                            <div id="team-moves-two">                                    
                            <p class="team-move">${poke.moves[2]}</p>
                            <p class="team-move">${poke.moves[3]}</p>
                            </div>
                            </div>
                            <div id="team-ability-item">
                            <p>${poke.item}</p>
                            <p>${poke.ability}</p>
                            </div>`
    myTeamDiv.appendChild(pokeCard)
    
}
const addPoke = (evt) => {
    let curMoves = []
    currentMoves.forEach(ele => {
        curMoves.push(ele.innerHTML)
    })
    axios.post(baseURL, { name:currentPokeName.textContent, item: currentItem.textContent, ability: currentAbility.textContent, img: currentPokeImg.src, moves: curMoves })
    .then(async res => {
        const data = res.data
        displayPoke(data)
       await randomPoke()
    }).catch( err => window.alert(err.response.data)
    )
    
}
const deletePoke = (id) => {
    axios.delete(`${baseURL}/${id}`)
    .then(res => {
        displayPoke(res.data)
    })
   
}
const testFunction = (evt) => {
    
}


window.addEventListener('load', randomPoke)
newPoke.addEventListener('click', randomPoke)
addBtn.addEventListener('click', addPoke)



getTeam()
