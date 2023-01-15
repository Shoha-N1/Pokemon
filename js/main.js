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

const favourites = getFavourites();

renderFav(favourites);

elBox.addEventListener("click", (evt) => {
  onFavouriteClick(evt);
});

function onFavouriteClick(evt) {
  const el = evt.target.closest("[data-card-add]");

  if (!el) return;

  const id = +el.dataset.id;
  if (favourites.includes(id)) {
    favourites.splice(favourites.indexOf(id), 1);
  } else {
    favourites.push(id);
  }
  setFavourites(favourites);

  renderPokemons(pokemons);
}

function setFavourites(favourites) {
  localStorage.setItem("favourites", JSON.stringify(favourites));
  renderFav(favourites);
}

function renderFav(favourites) {
  let html = "";

  favourites.forEach((item) => {
    let pokemon = pokemons.find((pokemon) => pokemon.id === item);
    html += `<p class = "pok-mod">${pokemon.name}</p>`;
  });

  elFavorites.innerHTML = html;
}

function getFavourites() {
  const stringFav = localStorage.getItem("favourites") || "[]";
  return JSON.parse(stringFav);
}



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

  

  
});

renderPokemons(pokemons)

function renderPokemons(pPokemons) {
  elBox.innerHTML = "";
  pPokemons.filter((pokemon) => elBox.append(createDiv(pokemon)))
  // for (let i = 0; i < pPokemons.length; i++) {
  //   let pokemon = pPokemons[i];

  //   elBox.appendChild(createDiv(pokemon));
  // }
 
}

function createDiv(pokemon) {
  

  let elCard = elTemplate.content.cloneNode(true);
 
  elCard.querySelector("[data-img-temp]").src = pokemon.img;
  elCard.querySelector("[data-card-name]").textContent = pokemon.name;
  elCard.querySelector("[data-card-type]").textContent = pokemon.type;
  elCard.querySelector("[data-card-weight]").textContent = pokemon.weight;
  elCard.querySelector("[data-card-height]").textContent = pokemon.height;
  elCard.querySelector("[data-card-add]").dataset.id = pokemon.id;
  elCard.querySelector("[data-card-add]").textContent = favourites.includes(pokemon.id) ? "Added" : "Add";

 
  return elCard

  // elHeart.textContent = "❤";
  // elHeart.classList.add("heart")
  // elHeart.addEventListener("click", () => {
  //   // elHeart.classList.add("hert")
  //   // elHeart.style.color = "red"  elHeart.style.color = "white"
    
  // })

  
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

