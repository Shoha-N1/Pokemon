// var elSearchPokemon = document.querySelector([data - search - pokemon]);
var elInputHeight = document.querySelector("[data-input-height]");
var elInputWeight = document.querySelector("[data-input-weight]");
var elInputImg = document.querySelector("[data-input-img-url]");
var elInputName = document.querySelector("[data-input-name]");
var elForm = document.querySelector("[data-form]");
var elBox = document.querySelector("[data-Box]");

renderPokemon();
elForm.addEventListener("submit", function (evt)  {
  evt.preventDefault();
  var pokemon = {
    name: null,
    img: null,
    height: null,
    weight: null,
    type: null,
  };

      pokemon.name = elInputName.value;
      pokemon.height = elInputHeight.value;
      pokemon.weight = elInputWeight.value;
      pokemon.img = elInputImg.value

  pokemons.unshift(pokemon);
  elBox.prepend(createDiv(pokemon));
});

function renderPokemon() {
  elBox.innerHTML = "";
  for (var i = 0; i < pokemons.length; i++) {
    var pokemon = pokemons[i];
    elBox.appendChild(createDiv(pokemon));
  }
}
function createDiv(pokemon) {
  var elDiv = document.createElement("div");
  var elImg = document.createElement("img");
  var elSpan = document.createElement("span")
  var elH2 = document.createElement("h2");
  var elP = document.createElement("p");
  var elWeight = document.createElement("h3");
  var elHeight = document.createElement("h3");

  elImg.src = `${pokemon.img}`;
  elH2.textContent = `${pokemon.name}`;
  elWeight.textContent = `${pokemon.weight}`;
  elHeight.textContent = `${pokemon.height}`;


  elDiv.appendChild(elImg);
  elDiv.appendChild(elSpan)
  elDiv.appendChild(elH2);
  elDiv.appendChild(elP);
  elDiv.appendChild(elWeight);
  elDiv.appendChild(elHeight);

  elDiv.classList.add("box-pok");
  
  return elDiv;
}

