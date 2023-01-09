let elInputHeight = document.querySelector("[data-input-height]");
let elInputWeight = document.querySelector("[data-input-weight]");
let elInputImg = document.querySelector("[data-input-img-url]");
let elInputName = document.querySelector("[data-input-name]");
let elInputSearch = document.querySelector("[data-input-search]");
let elForm = document.querySelector("[data-form]");
let elBox = document.querySelector("[data-box]");
let elUl = document.querySelector("[data-ul]");
let elTemplate = document.querySelector("[data-template]");
let elSelect = document.querySelector("[data-select]");
let elSelectSort = document.querySelector("[data-select-sort]");
let elFavorites = document.querySelector("[data-favorites]")

let favorites = getFavorites();


elForm.addEventListener("submit", function (evt) {
  evt.preventDefault();
  let pokemon = {
    name: null,
    img: null,
    height: null,
    weight: null,
    type: [],
  };

  pokemon.name = elInputName.value;
  pokemon.height = elInputHeight.value;
  pokemon.weight = elInputWeight.value;
  pokemon.img = elInputImg.value;
  pokemon.search = elInputSearch.value;

  pokemons.unshift(pokemon);
  elBox.prepend(createDiv(pokemon));

  
  renderPokemons(pokemons);
  
});

renderPokemons(pokemons)

function renderPokemons(pPokemons) {
  elBox.innerHTML = "";
  for (let i = 0; i < pPokemons.length; i++) {
    let pokemon = pPokemons[i];

    elBox.appendChild(createDiv(pokemon));
  }
 
}

function createDiv(pokemon) {

  let elCard = elTemplate.content.cloneNode(true);
 
  elCard.querySelector("[data-img-temp]").src = pokemon.img;
  elCard.querySelector("[data-card-name]").textContent = pokemon.name;
  elCard.querySelector("[data-card-type]").textContent = pokemon.type;
  elCard.querySelector("[data-card-weight]").textContent = pokemon.weight;
  elCard.querySelector("[data-card-height]").textContent = pokemon.height;
  elCard.querySelector("[data-card-add]").dataset.id = pokemon.id;
  elCard.querySelector("[data-card-add]").textContent = favorites.includes(pokemon.id) ? "Added" : "Add";



 
  return elCard
  

  // let elDiv = document.createElement("div");
  // let elImg = document.createElement("img");
  // let elSpan = document.createElement("span");
  // let elH2 = document.createElement("h2");
  // let elHeart = document.createElement("b")
  // let elP = document.createElement("p");
  // let elWeight = document.createElement("h3");
  // let elHeight = document.createElement("h3");
  // let elButton = document.createElement("button");

  
  // elButton.dataset.id = pokemon.id;
  // elButton.textContent = favorites.includes(pokemon.id) ? "Added" : "Add";  
  

  // elButton.classList.add("button-1");

  // elButton.textContent = "Add";
  // elImg.src = `${pokemon.img}`;
  // elH2.textContent = `${pokemon.name}`;

  // elHeart.textContent = "❤";
  // elHeart.classList.add("heart")
  // elHeart.addEventListener("click", () => {
  //   // elHeart.classList.add("hert")
  //   // elHeart.style.color = "red"  elHeart.style.color = "white"
    
  // })

  

  // elWeight.textContent = `${pokemon.weight}`;
  // elHeight.textContent = `${pokemon.height}`;
  // elP.textContent = `${pokemon.type}`; 

  // elDiv.appendChild(elButton);
  // elDiv.appendChild(elImg);
  // elDiv.appendChild(elSpan);
  // elDiv.appendChild(elH2);
  // elDiv.appendChild(elHeart)
  // elDiv.appendChild(elP);
  // elDiv.appendChild(elWeight);
  // elDiv.appendChild(elHeight);

  // elDiv.classList.add("box-pok");
  // return elDiv;
  
  
}


elInputSearch.addEventListener("keyup", (evt) => {
  let newPokemons = [];
  pokemons.forEach((pokemon) => {
    if (pokemon.name.includes(elInputSearch.value)) {
      newPokemons.push(pokemon);
    }
  });
  renderPokemons(newPokemons);
});



elBox.addEventListener("click", (evt) => {

  onFavoriteClick(evt)
})


function onFavoriteClick(evt){
  let el = evt.target.closest("[data-card-add]")

  if(!el) return;

  let id = el.dataset.id;

  
 
  if (favorites.includes(id)){
    favorites.splice(favorites.indexOf(id), 1)
  }
  else{
    favorites.push(id)
  }
  setFavorites(favorites)
  renderPokemons(pokemons)
}

function setFavorites(favorites){
  localStorage.setItem("favorites", JSON.stringify(favorites));
  renderFavorites(favorites)
}

function getFavorites(){
  let stringFav = localStorage.getItem("favorites") || "[]"
  return JSON.parse(stringFav)
}

function renderFavorites(favorites){
  let html = "";
  favorites.forEach(item => {
    let pokemon = pokemons.find((pokemon) => (pokemon.id === item));
    html += `${pokemon.name}` ;
  });
  elFavorites.innerHTML = html;
}


elSelect.addEventListener("click", (evt) => {
  let elType = pokemons.filter((pokemon) =>
    pokemon.type.includes(elSelect.value)
  );

  renderPokemons(elType);
});



elSelectSort.addEventListener("click", (evt) => {
  let elSort = pokemons.filter(
    (sort) =>
      pokemons.sort(
        (a, b) =>
          a.name.toLowerCase().charCodeAt() - b.name.toLowerCase().charCodeAt()
      ) 
  );

  renderPokemons(elSort);
});

