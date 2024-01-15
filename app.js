const poke_container=document.querySelector(".poke-container")
const search=document.querySelector(".search")
const searchBtn=document.querySelector(".searchBtn")
const searchInput=document.querySelector(".searchInput")

const pokemon_count=151

const bg_color={
    grass:'#880369',
    fire:'#ff699f',
    water:'#3399ff',
    bug:'#aabb22',
    normal:'#aaaa99',
    flying:'#9aa8fa',
    poison:'#876ea4',
    electric:'#ffd34e',
    ground:'#e2c56a',
    fairy:'#f1a8ec',
    psychic:'#ff6ea4',
    fighting:'#c56esc',
    rock:'#c58679',
    dragon:'#7766ee',
    ice:'#66ccff',

}


searchBtn.addEventListener("click",()=>{
    search.classList.toggle("active")
})

searchInput.addEventListener("input",(e)=>{
    const searchValue=searchInput.value.toLowerCase()
    const pokemonNames=document.querySelectorAll(".poke-name")

 pokemonNames.forEach((pokemonName)=>{
   
    if(pokemonName.innerHTML.toLowerCase().includes(searchValue)){
        pokemonName.parentElement.parentElement.style.display="block"
    }else{
        pokemonName.parentElement.parentElement.style.display="none"
    }
 })

})


const fetchPokemons = async()=>{
    for(let i=1; i<pokemon_count;i++){
        await getPokemon(i)
    }
}

const getPokemon= async(id)=>{
    const url=`https://pokeapi.co/api/v2/pokemon/${id}
    `
    const res = await fetch(url)
    const data= await res.json()
    createPokemonCard(data)
}
const createPokemonCard = (pokemon)=>{
    const pokemonDiv=document.createElement("div")
    pokemonDiv.classList.add("pokemon")

    const pokemonId=pokemon.id.toString().padStart(3,'0')

    const pokemonType=pokemon.types[0].type.name

    const pokemonBg=bg_color[pokemonType]
    pokemonDiv.style.backgroundColor=`${pokemonBg}`

    const pokemonDivInnerHTML=`<div class="image-container">
    <img src="https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${pokemon.id}.png" alt="first pokemon">
</div>
<div class="poke-info">
    <span class="poke-id">#${pokemonId}</span>
    <h3 class="poke-name">${pokemon.name}</h3>
    <div class="small">
        <small class="pokemon-exp">
            <i class="fa-solid fa-flask"></i> ${pokemon.base_experience} exp
        </small>
        <small class="pokemon-weight">
            <i class="fa-solid fa-flask"></i> ${pokemon.weight} kg
        </small>
    </div>
    <div class="poke-type">
        <i class="fa-brands fa-uncharted"></i> ${pokemonType}
    </div>
</div>`
pokemonDiv.innerHTML=pokemonDivInnerHTML
poke_container.appendChild(pokemonDiv)
}

fetchPokemons()