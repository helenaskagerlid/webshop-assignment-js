/**
 * Detta nedan vill jag försöka koppla till objekt-arrayen nedan, men vet inte alls än hur 
 * jag ska koppla dem^^ (det kanske inte alls går) To be continued.... Men nedanför den finns 
 * den JS jag har kopplat till själva sidan.
 * 
const minus = document.querySelector('#subtract');
const plus = document.querySelector('#add');
const currentNumber = document.querySelector('#currentNumber');
const price = document.querySelector('#price');
let totalAmount = Number(currentNumber.value);

minus.addEventListener('click', subtract);

function subtract() {
    currentNumber.value = Math.max(0, Number(currentNumber.value) - 1);
    totalAmount = Number(currentNumber.value);
    updatePrice();
}

plus.addEventListener('click', add);

function add() {
    currentNumber.value = Number(currentNumber.value) + 1;
    totalAmount = Number(currentNumber.value); 
    updatePrice();
}

function updatePrice() {
    price.textContent = totalAmount * 15;
}


**/

const fantasyBabyMonsters = [
  {
      name: 'Brown hairy turtle',
      price: 888,
      category: 'Hairy',
      rating: 5,
      amount: 0,
      image: {
          src: 'assets/fantasy-monster-plushie-brown-hairy-turtle.jpg',
          alt: 'a fantasy plushie that looks like a brown little baby turtle with brown long fur',
          width: '500px',
          height: 'auto',
          loading: 'lazy'
      }
  },
  {
      name: 'Baby snail',
      price: 777,
      category: 'Slimy',
      rating: 4.8,
      amount: 0,
      image: {
          src: 'assets/fantasy-monster-plushie-happy-snail.jpg',
          alt: 'a fantasy monster plushie that looks like a light blue snail that is cute and happy',
          width: '500px',
          height: 'auto',
          loading: 'lazy'
      }
  },
  {
      name: 'Baby spider',
      price: 777,
      category: 'Hairy',
      rating: 4.7,
      amount: 0,
      image: {
          src: 'assets/fantasy-monster-plushie-baby-spider.jpg',
          alt: 'a fantasy monster plushie that looks like a hairy baby spider',
          width: '500px',
          height: 'auto',
          loading: 'lazy'
      }
      
  },
]


const productContainer = document.querySelector('#productList');

for (let i = 0; i < fantasyBabyMonsters.length; i++) {
  console.log(i); 
  const monster = fantasyBabyMonsters[i];
  const imageSource = monster.image.src;
  const imageAltText = monster.image.alt;
  productContainer.innerHTML +=
  `<section id="fantasyMonsters-${i}">
      <img class="fantasyMonsterPhotos" src="${imageSource}" alt="${imageAltText}" width="${monster.image.width}" height="${monster.image.height}" loading="${monster.image.loading}">
      <h3>${monster.name}</h3>
      <p>Price: ${monster.price}</p>
      <p>Category: ${monster.category}</p>
      <p>Rating: ${monster.rating}</p>
      <div class="amountContainer">
          <button class="subtract" id="subtract-${i}">-</button>
          Amount: ${fantasyBabyMonsters[i].amount}
          Price: ${fantasyBabyMonsters[i].price} kr
          <button class="add" id="add-${i}">+</button>
      </div>
  </section>`;

}

const decreaseButtons = Array.from(document.querySelectorAll('.subtract'))

for (let i = 0; i < decreaseButtons.length; i++) {
  decreaseButtons[i].addEventListener('click', decreaseAmount)
}

function decreaseAmount(e) {
  const index = e.target.id.replace('subtract-', '');
  console.log(fantasyBabyMonsters[index]);
}

const increaseButtons = Array.from(document.querySelectorAll('.add'))

for (let i = 0; i < increaseButtons.length; i++) {
  increaseButtons[i].addEventListener('click', increaseAmount)
}

function increaseAmount(e) {
  const index = e.target.id.replace('add-', '');
  console.log(fantasyBabyMonsters[index]);
 
}





