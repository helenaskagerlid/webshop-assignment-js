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

/** MINA PRODUKTER INLAGDA I EN OBJEKT-ARRAY MED OLIKA KATEGORIER*/

const fantasyBabyMonsters = [
  {
      name: 'Ulla brown hairy turtle',
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
      name: 'Britta Baby snail',
      price: 555,
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
      name: 'Amy Baby spider',
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

/** SORTERING AV PRODUKTER UTEFTER PRIS/NAMN/KATEGORI*/

//const sortingDropdown = document.querySelector('#sortingDropdown');
const productContainer = document.querySelector('#productList');


fantasyBabyMonsters.sort((a, b) => a.price - b.price);

fantasyBabyMonsters.sort((prod1, prod2) => prod1.name > prod2.name);
console.table(fantasyBabyMonsters);

const categorySlimy = fantasyBabyMonsters.filter(monster => monster.category === 'Slimy')
console.table(categorySlimy);

function decreaseAmount(e) {
  const index = e.currentTarget.dataset.id;
  if (fantasyBabyMonsters[index].amount <= 0) {
    fantasyBabyMonsters[index].amount = 0;
  } else {
    fantasyBabyMonsters[index].amount--;
  }

 
  printMonsters();
}

function increaseAmount(e) {
  const index = e.currentTarget.dataset.id;
  fantasyBabyMonsters[index].amount++;
  printMonsters();
  updateCart();
}

const cartContainer = document.querySelector('#shoppingCartSummary')

function printMonsters() {
  productContainer.innerHTML = '';
  fantasyBabyMonsters.forEach((monster, i) => {
    productContainer.innerHTML += `
      <article>
        <img class="fantasyMonsterPhotos" src="${monster.image.src}" 
        alt="${monster.image.alt}" 
        width="${monster.image.width}" 
        height="${monster.image.height}" 
        loading="${monster.image.loading}">
        <h3>${monster.name}</h3>
        <p>Price: ${monster.price}</p>
        <p>Category: ${monster.category}</p>
        <p>Rating: ${monster.rating}</p>
        <div class="amountContainer">
            <button class="subtract" data-id="${i}">-</button>
            Amount: <span>${monster.amount}</span> st
            Price: <span>${monster.price}</span> kr
            <button class="add" data-id="${i}">+</button>
        </div>
      </article>
    `;
  });

  const minusButtons = document.querySelectorAll('.subtract');
  const plusButtons = document.querySelectorAll('.add');

  minusButtons.forEach(btn => {
    btn.addEventListener('click', decreaseAmount)
  })

  plusButtons.forEach(btn => {
  btn.addEventListener('click', increaseAmount)
  })

  printCartMonsters();
}

printMonsters();


function printCartMonsters() {
  cartContainer.innerHTML = '';

  let totalAmount = 0;
  let totalPrice = 0;

  fantasyBabyMonsters.forEach(monster => {
    if (monster.amount > 0) {

      totalAmount += monster.amount;
      totalPrice += monster.amount * monster.price;

      cartContainer.innerHTML += `
        <article>
          <span>${monster.name}</span> <span>${monster.amount} st</span>
        </article>
      `;
    }
  });


  cartContainer.innerHTML = `<h3>Shopping Cart Summary</h3>${cartContainer.innerHTML}`;

  cartContainer.innerHTML += `
    <p>Total amount: ${totalAmount} st</p>
    <p>Total price: ${totalPrice} kr</p>
  `;
}

function updateCart() {
  // Uppdatera varukorgen

  // Lägg till eller ta bort CSS-klassen beroende på om varukorgen är uppdaterad eller inte
  const cartContainer = document.querySelector('#shoppingCartSummary');
  cartContainer.classList.add('updated-cart');

  // Använd setTimeout för att ta bort klassen efter en viss tid (t.ex. 2 sekunder)
  setTimeout(() => {
    cartContainer.classList.remove('updated-cart');
  }, 1000); // 2000 millisekunder (2 sekunder)
}






/**for (let i = 0; i < fantasyBabyMonsters.length; i++) {
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
  fantasyBabyMonsters[index].amount -= 1;
}

const increaseButtons = Array.from(document.querySelectorAll('.add'))

for (let i = 0; i < increaseButtons.length; i++) {
  increaseButtons[i].addEventListener('click', increaseAmount)
}

function increaseAmount(e) {
  const index = e.target.id.replace('add-', '');
  console.log(fantasyBabyMonsters[index]);
} **/





