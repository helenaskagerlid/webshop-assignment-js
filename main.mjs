import fantasyMonsters from "./productsarray.mjs";

// DETTA FIXAR SÅ ATT NÄR MAN KLICKAR PÅ DEN LILLA VARUKORGSIKONEN BLIR MAN SKICKAD 
// TILL VARUKORGSSAMMANFATTNINGEN

const cartButton = document.querySelector('#cartButton');
const cartContainer = document.querySelector('#shoppingCartSummary')
const invoiceOption = document.querySelector('#invoice');
const radioInvoiceOption =document.querySelector('#invoiceOption')
const cardOption = document.querySelector('#card');
let selectedPaymentOption = 'invoice';

cartButton.addEventListener('click', function() {
  cartContainer.scrollIntoView({behavior: 'smooth'});
});

/** MINA PRODUKTER INLAGDA I EN OBJEKT-ARRAY MED OLIKA KATEGORIER*/

let productsSorted = false; 

/** SORTERING AV PRODUKTER UTEFTER PRIS/NAMN/KATEGORI*/

const sortingDropdown = document.querySelector('#sortingDropdown');
const productContainer = document.querySelector('#productList');
let sortedMonsters = [...fantasyMonsters];

function sortProductList() {

  const selectedOption = sortingDropdown.value;

  if (selectedOption === 'Price') {
    sortedMonsters.sort((a, b) => a.price - b.price);
  } else if (selectedOption === 'Name') {
    sortedMonsters.sort((prod1, prod2) => prod1.name.localeCompare(prod2.name));
  } else if (selectedOption === 'Category') {
    sortedMonsters.sort((prod1, prod2) => prod1.category.localeCompare(prod2.category));
  } else if (selectedOption === 'Rating') {
    sortedMonsters.sort((b, a) => b.rating - a.rating);
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

  fantasyMonsters.forEach(monster => {
    totalAmount += monster.amount;
  });

  cartItemCountSpan.textContent = totalAmount;
  
  activateOrderButton();
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
    monsters = fantasyMonsters;
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
  const index = fantasyMonsters.findIndex(item => item.productNo == e.currentTarget.dataset.id);
  console.log(e.currentTarget.dataset.id);

  if (fantasyMonsters[index].amount <= 0) {
    fantasyMonsters[index].amount = 0;
  } else {
    fantasyMonsters[index].amount--;
  }
 
  printBabyMonsters();
}

function increaseAmount(e) {
  const index = fantasyMonsters.findIndex(item => item.productNo == e.currentTarget.dataset.id);
  fantasyMonsters[index].amount++;
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
  const today = new Date();
  const itsFriday = today.getDay() === 5;
  const itsMonday = today.getDay() === 1;
  const currentHour = today.getHours();

  cartContainer.innerHTML = '';

  let totalAmount = 0;
  let totalPrice = 0;
  let message = '';


  fantasyMonsters.forEach(monster => {
    if (monster.amount > 0) {

      totalAmount += monster.amount;

      let currentMonsterPrice = monster.amount * monster.price;

      if (monster.amount >= 10) {
        currentMonsterPrice *= 0.9; 
        message += `Congratulations! You get a 10% discount on ${monster.name} because you've ordered 10 or more!`;
      }

      if (itsMonday && currentHour >=3 && currentHour <=10) {
        currentMonsterPrice *= 0.9;
        message = "Hurray, It's Monday morning! You get 10% off!";
      }

      if ((itsFriday && currentHour >14)) {
        currentMonsterPrice *=1.5;
      }

      totalPrice += currentMonsterPrice;

      cartContainer.innerHTML += `
        <article>
          <span>${monster.name}</span> <span>${monster.amount} st</span>
        </article>
      `;
    }
  });

  let shippingCost = 25 + Math.round(0.1 * totalPrice); 
  totalPrice = Math.round(totalPrice);
  shippingCost = Math.round(shippingCost);

  if (totalAmount > 15) {
    shippingCost = 0; 
    message += "Congratulations! You get free shipping because you've ordered more than 15 monsters!";
  } else {
    shippingCost += Math.round(0.1 * totalPrice);
  }

  // Lägg till fraktkostnaden i det totala priset
  totalPrice += shippingCost;

  if (totalPrice > 800) {
    radioInvoiceOption.disabled = true;
  } else {
    radioInvoiceOption.disabled = false;
  }

  cartContainer.innerHTML = `<h3>Shopping Cart Summary</h3>${cartContainer.innerHTML}`;

  if (totalAmount > 0) {
    cartContainer.innerHTML += `
    <p>Total amount: ${totalAmount} st</p>
    <p>Total price: ${totalPrice} kr</p>
    <p>${message}</p>
    <p>Shipping cost: ${shippingCost} kr</p>
    <button id="orderButton">Beställ</button>
  `;
  } else {
    cartContainer.innerHTML += `
      <p>Your shopping cart is empty</p>
    `;
  }
  
}

printCartMonsters();

/**DETTA GÖR ATT FÄRGEN ÄNDRAS NÄR NÅGOT LÄGGS I VARUKORGEN  */
function updateCart() {

  const cartContainer = document.querySelector('#shoppingCartSummary');
  cartContainer.classList.add('updated-cart');

  setTimeout(() => {
    cartContainer.classList.remove('updated-cart');
  }, 1000);

}

// FUNKTION SOM GÖR ATT KLASSEN ACTIVE ADDERAS

function showOrderForm() {
    orderFormSection.classList.add('active');
}

// FUNKTION SOM AKTIVERAR ORDERBUTTON OCH NEDAN FIXAR SÅ ATT ORDERFORM SYNS NÄR KNAPPEN KLICKAS

function activateOrderButton() {
  const showOrderFormBtn = document.querySelector('#orderButton');
  showOrderFormBtn.addEventListener('click', showOrderForm);
}

const showOrderFormBtn = document.querySelector('#orderButton');

showOrderFormBtn.addEventListener('click', function() {
  orderForm.scrollIntoView({ behavior: 'smooth' });
});

// FUNKTION SOM FOKUSERAR PÅ ATT MAN SKA KUNNA TOGGLA MELLAN CARD OCH INVOICE

const cardInvoiceRadios = Array.from(document.querySelectorAll('input[name="payment-option"]'));

cardInvoiceRadios.forEach(radioBtn => {
  radioBtn.addEventListener('change', switchPaymentMethod)
})

function switchPaymentMethod(e) {
  cardOption.classList.toggle('hidden');
  invoiceOption.classList.toggle('hidden');

  selectedPaymentOption = e.target.value;
  
}

//DETTA GÖR SÅ ATT FORM INTE KAN SKICKAS OM INTE ALLA FÄLT ÄR RÄTT IFYLLDA

const identityNumber = document.querySelector('#identityNumber');

identityNumber.addEventListener('change', activateFinalOrderButton);
  
identityNumber.addEventListener('change', isPersonalIdValid);

function activateFinalOrderButton() {
  const finalOrderButton = document.querySelector('#finalOrderButton');
  const firstName = document.querySelector('#firstname').value;
  const lastName = document.querySelector('#lastname').value;
  const streetName = document.querySelector('#streetname').value;
  const postCode = document.querySelector('#postCode').value;
  const city = document.querySelector('#city').value;
  const mobile = document.querySelector('#mobile').value;
  const email = document.querySelector('#email').value;


  if (
    firstName &&
    lastName &&
    streetName &&
    postCode &&
    city &&
    mobile &&
    email &&
    isPersonalIdValid
    ) {
      finalOrderButton.removeAttribute('disabled');
    } else {
      finalOrderButton.setAttribute('disabled', 'disabled');
    }

    isPersonalIdValid();
  }

  activateFinalOrderButton();

  function isPersonalIdValid() {
    const personalIdRegEx = /^(\d{10}|\d{12}|\d{6}-\d{4}|\d{8}-\d{4}|\d{8} \d{4}|\d{6} \d{4})/;
    return personalIdRegEx.test(identityNumber.value);
  }

// DETTA GÖR SÅ ATT FÄLTET RENSAS NÄR MAN KLICKAR PÅ RENSAKNAPPEN

const clearFormButton = document.querySelector('#clearFormButton');

clearFormButton.addEventListener('click', function () {

  const form = document.querySelector('#orderForm');
  form.reset();

  fantasyMonsters.forEach(monster => {
    monster.amount = 0;
  });

  printCartMonsters();
  updateCartItemCount();
  activateOrderButton();
});



/* 
 function activateFinalOrderButton() {
  if (selectedPaymentOption === 'invoice' && isPersonalIdValid()) {
    finalOrderButton.removeAttribute('disable');
    } else if (selectedPaymentOption === 'invoice' && !isPersonalIdValid()) {
    console.log('inaktivera');
  }
  } 
  
/**DETTA DÖLJER ORDERFORM OCH VISAR DET NÄR ANVÄNDAREN KLICKAR PÅ BESTÄLL */
/**const orderFormSection = document.querySelector('#orderFormSection');
 
showOrderFormBtn.addEventListener('click', showOrderForm)**/


/**Skrev ut alla produkter på sidan (i HTML) och fixade funktioner för plus och minus,
 * samt unika ID:n för alla knappar. 
 * 
 * for (let i = 0; i < fantasyMonsters.length; i++) {
  console.log(i); 
  const monster = fantasyMonsters[i];
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
          Amount: ${fantasyMonsters[i].amount}
          Price: ${fantasyMonsters[i].price} kr
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
  console.log(fantasyMonsters[index]);
  fantasyMonsters[index].amount -= 1;
}

const increaseButtons = Array.from(document.querySelectorAll('.add'))

for (let i = 0; i < increaseButtons.length; i++) {
  increaseButtons[i].addEventListener('click', increaseAmount)
}

function increaseAmount(e) {
  const index = e.target.id.replace('add-', '');
  console.log(fantasyMonsters[index]);
} **/





/**Tränade på att sortera i olika kategorier:
 * 
 * fantasyMonsters.sort((a, b) => a.price - b.price);

fantasyMonsters.sort((prod1, prod2) => prod1.name > prod2.name);
console.table(fantasyMonsters);

const categorySlimy = fantasyMonsters.filter(monster => monster.category === 'Slimy')
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