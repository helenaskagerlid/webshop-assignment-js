


// DETTA FIXAR SÅ ATT NÄR MAN KLICKAR PÅ DEN LILLA VARUKORGSIKONEN BLIR MAN SKICKAD 
// TILL VARUKORGSSAMMANFATTNINGEN

const cartButton = document.querySelector('#cartButton');
const cartContainer = document.querySelector('#shoppingCartSummary')

cartButton.addEventListener('click', function() {
  cartContainer.scrollIntoView();
});

/** MINA PRODUKTER INLAGDA I EN OBJEKT-ARRAY MED OLIKA KATEGORIER*/

const fantasyBabyMonsters = [
  {
      name: 'Ulla brown hairy turtle',
      productNo: 'Product-1',
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
      productNo: 'Product-2',
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
      productNo: 'Product-3',
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

let productsSorted = false; 

/** SORTERING AV PRODUKTER UTEFTER PRIS/NAMN/KATEGORI*/

const sortingDropdown = document.querySelector('#sortingDropdown');
const productContainer = document.querySelector('#productList');
let sortedMonsters = [...fantasyBabyMonsters];

function sortProductList() {

  const selectedOption = sortingDropdown.value;

  if (selectedOption === 'Price') {
    sortedMonsters.sort((a, b) => a.price - b.price);
  } else if (selectedOption === 'Name') {
    sortedMonsters.sort((prod1, prod2) => prod1.name.localeCompare(prod2.name));
  } else if (selectedOption === 'Category') {
    sortedMonsters.sort((prod1, prod2) => prod1.category.localeCompare(prod2.category));
  }

  productsSorted = true; 

  // Uppdatera produktlistan efter sortering
  printBabyMonsters(sortedMonsters);

}

sortingDropdown.addEventListener('change', sortProductList);

// Uppdatera produktlistan vid sidans laddning
sortProductList();
printBabyMonsters();

function updateCartItemCount() {
  const cartItemCountSpan = document.querySelector('#cartItemCount');
  let totalAmount = 0;

  fantasyBabyMonsters.forEach(monster => {
    totalAmount += monster.amount;
  });

  cartItemCountSpan.textContent = totalAmount;
}

updateCartItemCount();

 /**PRINTAR UT MONSTREN PÅ SIDAN SAMT SKAPAR KNAPPARNA FÖR PLUS OCH MINUS OCH GER DEM
  * UNIKA ID-en
  */
function printBabyMonsters(monsters) {
  if (productsSorted) {
    monsters = sortedMonsters;
  }
  else if (monsters == undefined) {
    monsters = fantasyBabyMonsters;
  }
  productList.innerHTML = '';
  monsters.forEach((monster, i) => {
    productList.innerHTML += `
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
            <button class="subtract" data-id="${monster.productNo}">-</button>
            Amount: <span>${monster.amount}</span> st
            Price: <span>${monster.price}</span> kr
            <button class="add" data-id="${monster.productNo}">+</button>
        </div>
      </article>
    `;
  });

  activatePlusMinusButtons();
  printCartMonsters();
  updateCartItemCount();
}

/**GÖR ATT PLUS OCH MINUS KNAPPARNA FUNKAR NÄR MAN KLICKAR PÅ DEM SÅ ATT ANTALET PRODUKTER
 * ÖKAR ELLER MINSKAR
 */

function decreaseAmount(e) {
  //const index = e.currentTarget.dataset.id;
  const index = fantasyBabyMonsters.findIndex(item => item.productNo == e.currentTarget.dataset.id);
  console.log(e.currentTarget.dataset.id);

  if (fantasyBabyMonsters[index].amount <= 0) {
    fantasyBabyMonsters[index].amount = 0;
  } else {
    fantasyBabyMonsters[index].amount--;
  }
 
  printBabyMonsters();
}

function increaseAmount(e) {
  //const index = e.currentTarget.dataset.id;
  const index = fantasyBabyMonsters.findIndex(item => item.productNo == e.currentTarget.dataset.id);
  fantasyBabyMonsters[index].amount++;
  printBabyMonsters();
  updateCart();
}



cartButton.addEventListener('click', function() {
  shoppingCartSummary.scrollIntoView({ behavior: 'smooth' });
});



printBabyMonsters();

function activatePlusMinusButtons() {
  const minusButtons = document.querySelectorAll('.subtract');
  const plusButtons = document.querySelectorAll('.add');

  minusButtons.forEach(btn => {
    btn.addEventListener('click', decreaseAmount)
  })
  
  plusButtons.forEach(btn => {
  btn.addEventListener('click', increaseAmount)
  })
}


/**DETTA PRINTAR UT PRODUKTERNA I VARUKORGSAMMANFATTNINGEN */

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
    <button id="orderButton">Beställ</button>
  `;
}

/**DETTA GÖR ATT FÄRGEN ÄNDRAS NÄR NÅGOT LÄGGS I VARUKORGEN  */
function updateCart() {

  const cartContainer = document.querySelector('#shoppingCartSummary');
  cartContainer.classList.add('updated-cart');

  setTimeout(() => {
    cartContainer.classList.remove('updated-cart');
  }, 1000);
}

/**DETTA DÖLJER ORDERFORM OCH VISAR DET NÄR ANVÄNDAREN KLICKAR PÅ BESTÄLL */

const orderForm = document.querySelector('#orderForm');
const orderButton = document.querySelector('#orderButton');

hideOrderForm();

orderButton.addEventListener('click', () => {

  orderForm.style.display = 'block';
  orderForm.removeAttribute('tabindex');
});

function hideOrderForm() {
  orderForm.style.display = 'none';
  orderForm.setAttribute('tabindex', '-1');
}

hideOrderForm();






/**Skrev ut alla produkter på sidan (i HTML) och fixade funktioner för plus och minus,
 * samt unika ID:n för alla knappar. 
 * 
 * for (let i = 0; i < fantasyBabyMonsters.length; i++) {
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





/**Tränade på att sortera i olika kategorier:
 * 
 * fantasyBabyMonsters.sort((a, b) => a.price - b.price);

fantasyBabyMonsters.sort((prod1, prod2) => prod1.name > prod2.name);
console.table(fantasyBabyMonsters);

const categorySlimy = fantasyBabyMonsters.filter(monster => monster.category === 'Slimy')
console.table(categorySlimy);*/

/**
 * Detta skapar plus och minus funktioner för knapparna till produkterna samt 
 * räknar ut totalsumman av de produkterna man valt
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