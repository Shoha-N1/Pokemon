var elInputHeight = document.querySelector("[data-input-height]");
var elInputWeight = document.querySelector("[data-input-weight]");
var elInputImg = document.querySelector("[data-input-img-url]");
var elInputName = document.querySelector("[data-input-name]");
var elInputSearch = document.querySelector("[data-input-search]");
var elForm = document.querySelector("[data-form]");
var elBox = document.querySelector("[data-Box]");
var elUl = document.querySelector("[data-ul]");
var elTemplate = document.querySelector("[data-template]");
var elSelect = document.querySelector("[data-select]");
var elSelectSort = document.querySelector("[data-select-sort]");

var pokemons = getPokemons();

renderPokemons(pokemons)

elForm.addEventListener("submit", function (evt) {
  evt.preventDefault();
  var pokemon = {
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

  
  renderPokemons(pokemon);


});

renderPokemons(pokemons);

function renderPokemons(pPokemons) {
  elBox.innerHTML = "";
  for (var i = 0; i < pPokemons.length; i++) {
    var pokemon = pPokemons[i];

    elBox.appendChild(createDiv(pokemon));
  }
  setPokemons();
}

function createDiv(pokemon) {
  // var elCard = elTemplate.content.cloneNode(true);
  // elCard.querySelector("img").src = pokemon.img;
  // elCard.querySelector("[data-card-name]").textContent = pokemon.name;
  // elCard.querySelector("[data-card-type]").textContent = pokemon.type;
  // elCard.querySelector("[data-card-weight]").textContent = pokemon.weight;
  // elCard.querySelector("[data-card-height]").textContent = pokemon.height;

  // elCard.clssList.add("box-pok")
  // return elCard

  var elDiv = document.createElement("div");
  var elImg = document.createElement("img");
  var elSpan = document.createElement("span");
  var elH2 = document.createElement("h2");
  var elHeart = document.createElement("span")
  var elP = document.createElement("p");
  var elWeight = document.createElement("h3");
  var elHeight = document.createElement("h3");
  var elButton = document.createElement("button");

  elButton.addEventListener("click", (evt) => {
    elDiv.remove();
  });

  elButton.classList.add("button-1");

  elButton.textContent = "Delete";
  elImg.src = `${pokemon.img}`;
  elH2.textContent = `${pokemon.name}`;

  elHeart.textContent = "❤";
  elHeart.classList.add("heart")
  elHeart.addEventListener("click", () => {
    elHeart.classList.add("hert")
    
  })

  elWeight.textContent = `${pokemon.weight}`;
  elHeight.textContent = `${pokemon.height}`;
  elP.textContent = `${pokemon.type}`;

  elDiv.appendChild(elButton);
  elDiv.appendChild(elImg);
  elDiv.appendChild(elSpan);
  elDiv.appendChild(elH2);
  elDiv.appendChild(elHeart)
  elDiv.appendChild(elP);
  elDiv.appendChild(elWeight);
  elDiv.appendChild(elHeight);

  elDiv.classList.add("box-pok");
  return elDiv;
  
}

elInputSearch.addEventListener("keyup", (evt) => {
  var newPokemons = [];
  pokemons.forEach((pokemon) => {
    if (pokemon.name.includes(elInputSearch.value)) {
      newPokemons.push(pokemon);
    }
  });
  renderPokemons(newPokemons);
});

// function pokemonName() {
//   elBox.innerHTML = "";
//   pokemons.forEach((pokemon) => {
//     var elDiv = elTemplate.content.cloneNode(true);
//     elDiv.querySelector("img").textContent = pokemon.img;
//     elDiv.querySelector("[data-card-name]") = pokemon.name;
//     elDiv.querySelector("[data-card-type]") = pokemon.type;
//     elDiv.querySelector("[data-card-weight]") = pokemon.weight;
//     elDiv.querySelector("[data-card-height]") = pokemon.height;

//     elBox.appendChild(elDiv);
//   });
// }

elSelect.addEventListener("click", (evt) => {
  var elType = pokemons.filter((pokemon) =>
    pokemon.type.includes(elSelect.value)
  );

  renderPokemons(elType);
});

// const button = document.querySelector("delete");
// for (let i = 0; i < button.length; i++) {
//   button[i].addEventListener("click", () => {
//     button[i].style.display = "none";
//     button[i].parentElement.remove();
//   });
// }

elSelectSort.addEventListener("click", (evt) => {
  var elSort = pokemons.filter(
    (sort) =>
      pokemons.sort(
        (a, b) =>
          a.name.toLowerCase().charCodeAt() - b.name.toLowerCase().charCodeAt()
      ) 
  );

  renderPokemons(elSort);
});

function getPokemons() {
  const stringPokemons = localStorage.getItem("pokemons") || "[]"
  return JSON.parse(stringPokemons);
}

function setPokemons() {
  const stringPokemons = JSON.stringify(pokemons)
  localStorage.setItem("pokemons", stringPokemons)
}