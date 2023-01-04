


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
const pokeType = document.getElementById('current-types')
let currentTypesArr = []
const baseURL = 'http://54.215.22.105/teambuild.html/api'
// const baseURL = 'http://localhost:4000/teambuild.html/api'




const randomPoke = async () => {
    let index = Math.floor(Math.random() * 905);
    
    const  { data: pokemonData } = await axios.get(`https://pokeapi.co/api/v2/pokemon/${index}`)
    currentPokeImg.src = pokemonData.sprites.other['official-artwork'].front_default
    
     let nameToUppercase = pokemonData.name.split('-')
    nameToUppercase = upperCase(nameToUppercase)
    currentPokeName.textContent = nameToUppercase.join('-')
   
    let typesArr = pokemonData.types
    
    pokeType.innerHTML = ''
    currentTypesArr = []
    for(i = 0; i < typesArr.length; i++) {
        let type = typesArr[i].type.name.charAt(0).toUpperCase() + typesArr[i].type.name.slice(1)
        let typeCard = document.createElement('div')
        typeCard.classList.add(`type`, `${type}`)
        typeCard.innerHTML = `<h2>${type}</h2>`
        pokeType.appendChild(typeCard) 
        currentTypesArr.push(type)
    }
   
    
    index = Math.floor(Math.random() * pokemonData.abilities.length);
    let abilityToUppercase = pokemonData.abilities[index].ability.name.split('-')
    abilityToUppercase = upperCase(abilityToUppercase)
    abilityToUppercase = abilityToUppercase.join(' ')
    currentAbility.textContent = 'Ability: ' + abilityToUppercase
    
    let movesArr = []
    while(movesArr.length < 4){
        index = Math.floor(Math.random() * pokemonData.moves.length)
            let currentMove = pokemonData.moves[index].move.name.split('-')
            currentMove = upperCase(currentMove)
            currentMove = currentMove.join(' ')
            
            if(!movesArr.includes(currentMove)){
                movesArr.push(currentMove)
                currentMoves[movesArr.length - 1].innerText = currentMove
            }
    }
    //Loops to fill up movesArr array with 4 moves at a random number index of moves the pokemon can learn
    await getItem()
}

const upperCase = (arr) => {
    let upperCase = arr.map(ele =>{
        return ele.charAt(0).toUpperCase() + ele.slice(1)
    })
    return upperCase
}
const getItem = async () => {
    const item = await axios.get(`${baseURL}/item`)
        currentItem.textContent = 'Item: '+ item.data
 

    
}

const getTeam = () => {
    axios.get(`${baseURL}/team`)
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
                            <div id="team-poke-types">
                            <div class="team-type ${poke.types[0]}">
                            <p>${poke.types[0]}</p>
                            </div>
                            ${ poke.types[1] ?
                            `<div class="team-type ${poke.types[1]}">
                            <p>${poke.types[1]}</p>
                            </div>` : ''}
                            </div>
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
  
    axios.post(`${baseURL}/team`, { name:currentPokeName.textContent, types: currentTypesArr, item: currentItem.textContent, ability: currentAbility.textContent, img: currentPokeImg.src, moves: curMoves })
    .then(async res => {
        console.log(res.data)
        const data = res.data
        displayPoke(data)
       await randomPoke()
    }).catch( err => window.alert(err.response.data)
    )
    
}
const deletePoke = (id) => {
    axios.delete(`${baseURL}/team/${id}`)
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
