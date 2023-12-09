import fantasyMonsters from "./productsarray.mjs";


const cartButton = document.querySelector('#cartButton');
const cartContainer = document.querySelector('#shoppingCartSummary');
const invoiceOption = document.querySelector('#invoice');
const radioInvoiceOption =document.querySelector('#invoiceOption');
const cardOption = document.querySelector('#card');
let selectedPaymentOption = document.querySelector('#invoice');

// FUNKTION SOM GÖR ATT MAN KAN SKIFTA MELLAN MÖRKT OCH LJUST TEMA

const darkThemeButton = document.querySelector('#darkThemeButton');

darkThemeButton.addEventListener('click', themeToggle);

function themeToggle() {
  if (document.body.classList.contains('darkMode')) {
    document.body.classList.remove('darkMode');
  } else {
    document.body.classList.add('darkMode');
  }
}


// DETTA FIXAR SÅ ATT NÄR MAN KLICKAR PÅ DEN LILLA VARUKORGSIKONEN BLIR MAN SKICKAD 
// TILL VARUKORGSSAMMANFATTNINGEN

cartButton.addEventListener('click', scrollToCart); 

function scrollToCart() {
  cartContainer.scrollIntoView({behavior: 'smooth'});
};

let productsSorted = false; 

/** SORTERING AV PRODUKTER UTEFTER PRIS/NAMN/KATEGORI*/

const sortingDropdown = document.querySelector('#sortingDropdown');
const productContainer = document.querySelector('#productList');
let sortedMonsters = [...fantasyMonsters];

function sortProductList() {

  const selectedOption = sortingDropdown.value;

  if (selectedOption === 'price') {
    sortedMonsters.sort((a, b) => a.price - b.price);
  } else if (selectedOption === 'name') {
    sortedMonsters.sort((prod1, prod2) => prod1.name.localeCompare(prod2.name));
  } else if (selectedOption === 'category') {
    sortedMonsters.sort((prod1, prod2) => prod1.category.localeCompare(prod2.category));
  } else if (selectedOption === 'rating') {
    sortedMonsters.sort((b, a) => b.rating - a.rating);
  }

  productsSorted = true; 

  printBabyMonsters(sortedMonsters);

};

sortingDropdown.addEventListener('change', sortProductList);

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

/**DETTA PRINTAR UT PRODUKTERNA I VARUKORGSAMMANFATTNINGEN OCH CHECKAR AV OM DET SKA LÄGGAS TILL RABATTAR/PÅSLAG
 * OCH ISF LÄGGER TILL DEM
*/

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
        <article style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 10px;">
        <img style="margin-right: 2.5vw" src="${monster.image.src}" 
        alt="${monster.image.alt}" 
        width="60px" 
        height="60px" 
        loading="${monster.image.loading}">
        <div style="text-align: center;">
        <span style="margin-left: 2vw font-size: 0.4rem">${monster.name}</span> <span style="margin-left: 5vw">${monster.amount} st</span>
        </div>
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

  totalPrice += shippingCost;

  if (totalPrice > 800) {
    radioInvoiceOption.disabled = true;
  } else {
    radioInvoiceOption.disabled = false;
  }

  cartContainer.innerHTML = `<h3>Shopping Cart Summary</h3>${cartContainer.innerHTML}`;

  if (totalAmount > 0) {
    cartContainer.innerHTML += `
    <p style="font-weight: bold">Total amount: ${totalAmount} st</p>
    <p style="font-weight: bold">Total price: ${totalPrice} kr</p>
    <p>${message}</p>
    <p>Shipping cost: ${shippingCost} kr</p>
  `;
  orderButton.disabled = false;

  } else {
    cartContainer.innerHTML += `
      <p>Your shopping cart is empty</p>
    `;
    orderButton.disabled = true;
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
  radioBtn.addEventListener('click', switchPaymentMethod)
})

function switchPaymentMethod(e) {
  cardOption.classList.toggle('hide');
  invoiceOption.classList.toggle('hide');

  selectedPaymentOption = e.target.value;
  
}

//DETTA CHECKAR SÅ ATT ALLA INPUT FÄLT ÄR RÄTT IFYLLDA SAMT SKA "POPPA UPP" ETT
//FELMEDDELANDE OM DE INTE ÄR DET

const finalOrderButton = document.querySelector('#finalOrderButton');
const firstName = document.querySelector('#firstname');
const firstNameError = document.querySelector('#firstnameErrorMessage');
const firstNameRegEx = /^[A-Za-z]+$/;

firstName.addEventListener('blur', isFirstnameValid);

function isFirstnameValid() {
  const firstNameRegExResult = firstNameRegEx.exec(firstName.value);
if (firstNameRegExResult == null) {
  firstNameError.classList.remove('hideError');
  return false;
} else {
  firstNameError.classList.add('hideError');
  return true;
 }
}

const lastName = document.querySelector('#lastname');
const lastNameError = document.querySelector('#lastnameErrorMessage');
const lastNameRegEx = /^[A-Za-z]+$/;

lastName.addEventListener('blur', isLastnameValid);

function isLastnameValid() {
  const lastNameRegExResult = lastNameRegEx.exec(lastName.value);
  console.log(lastNameRegExResult);
if (lastNameRegExResult == null) {
  lastNameError.classList.remove('hideError');
  return false;
} else {
  lastNameError.classList.add('hideError');
  return true; 
 }
}


const streetname = document.querySelector('#streetname');
const streetnameError = document.querySelector('#streetnameErrorMessage');
const streetnameRegEx = (/^[a-zA-ZåäöÅÄÖ\s.,-]+ \d+$/);

streetname.addEventListener('blur', isStreetnameValid);

function isStreetnameValid() {
  const streetnameRegExResult = streetnameRegEx.exec(streetname.value);
if (streetnameRegExResult == null) {
  streetnameError.classList.remove('hideError');
  return false;
} else {
  streetnameError.classList.add('hideError');
  return true;
 }
}


const postCode = document.querySelector('#postCode');
const postCodeError = document.querySelector('#postCodeErrorMessage');
const postCodeRegEx = /^\d{5}$/;

postCode.addEventListener('blur', isPostCodeValid);

function isPostCodeValid() {
  const postCodeRegExResult = postCodeRegEx.exec(postCode.value);
if (postCodeRegExResult == null) {
  postCodeError.classList.remove('hideError');
  return false;
} else {
  postCodeError.classList.add('hideError');
  return true;
 }
}


const city = document.querySelector('#city');
const cityError = document.querySelector('#cityErrorMessage');
const cityRegEx = /^[A-Za-z]+$/;

city.addEventListener('blur', isCitynameValid);

function isCitynameValid() {
  const cityRegExResult = cityRegEx.exec(city.value);
if (cityRegExResult == null) {
  cityError.classList.remove('hideError');
  return false;
} else {
  cityError.classList.add('hideError');
  return true;
 }
}


const mobileNumber = document.querySelector('#mobile');
const mobileError = document.querySelector('#mobileErrorMessage');
const mobileRegEx = /^[0-9]{7,15}$/;

mobile.addEventListener('blur', isMobileNumberValid);

function isMobileNumberValid() {
  const mobileRegExResult = mobileRegEx.exec(mobileNumber.value);
if (mobileRegExResult == null) {
  mobileError.classList.remove('hideError');
  return false;
} else {
  mobileError.classList.add('hideError');
  return true;
 }
}


const email = document.querySelector('#email');
const emailError = document.querySelector('#emailErrorMessage');
const emailRegEx = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

email.addEventListener('blur', isEmailValid);

function isEmailValid() {
  const emailRegExResult = emailRegEx.exec(email.value);
if (emailRegExResult == null) {
  emailError.classList.remove('hideError');
  return false;
} else {
  emailError.classList.add('hideError');
  return true;
 }
}


const personalId = document.querySelector('#identityNumber');
const personalIdRegEx = /^(\d{10}|\d{12}|\d{6}-\d{4}|\d{8}-\d{4}|\d{8} \d{4}|\d{6} \d{4})/;

personalId.addEventListener('blur', isPersonalIdValid);

function isPersonalIdValid() {
  const personalIdRegExResult = personalIdRegEx.exec(personalId.value);
  if (personalIdRegExResult == null) {
    personalIdErrorMessage.classList.remove('hideError');
    return false;
  } else {
    personalIdErrorMessage.classList.add('hideError');
    return true; 
   }
  }

  // FUNKTION SOM CHECKAR ATT ALLA FUNKTIONER HAR VÄRDET TRUE (ALLTSÅ ALLA FÄLT ÄR VALIDERADE MOT REGEX)
  // INNAN FINALORDERBUTTON KAN AKTIVERAS

  const privacyPolicyCheckbox = document.querySelector('#privacyPolicyCheckbox');

  function activateFinalOrderButton() {
    if (
      isFirstnameValid() &&
      isLastnameValid() &&
      isStreetnameValid() &&
      isPostCodeValid() &&
      isCitynameValid() &&
      isMobileNumberValid() &&
      isEmailValid() &&
      isPersonalIdValid() &&
      privacyPolicyCheckbox.checked
    ) {
      finalOrderButton.removeAttribute('disabled');
    } else {
      finalOrderButton.setAttribute('disabled', 'disabled');
    }
  }

  firstName.addEventListener('blur', activateFinalOrderButton);
  lastName.addEventListener('blur', activateFinalOrderButton);
  streetname.addEventListener('blur', activateFinalOrderButton);
  postCode.addEventListener('blur', activateFinalOrderButton);
  city.addEventListener('blur', activateFinalOrderButton);
  mobileNumber.addEventListener('blur', activateFinalOrderButton);
  email.addEventListener('blur', activateFinalOrderButton);
  personalId.addEventListener('blur', activateFinalOrderButton);
  privacyPolicyCheckbox.addEventListener('click', activateFinalOrderButton);

  activateFinalOrderButton();

// DETTA GÖR SÅ ATT FÄLTET RENSAS NÄR MAN KLICKAR PÅ RENSAKNAPPEN

const clearFormButton = document.querySelector('#clearFormButton');

clearFormButton.addEventListener('click', clearForm) 

  function clearForm() {

  const form = document.querySelector('#orderForm');
  form.reset();

  fantasyMonsters.forEach(monster => {
    monster.amount = 0;
  });

  printCartMonsters();
  updateCartItemCount();
  activateOrderButton();
};

// FUNKTION SOM VISAR ORDERMESSAGE NÄR KUNDEN KLICKAT PÅ FINALORDERBUTTON

finalOrderButton.addEventListener('click', activateOrderMessage);
const orderMessage = document.querySelector('#orderMessage');

function activateOrderMessage() {
  orderMessage.classList.remove('hideStyling');
  orderMessage.innerHTML = 'Thank you for your order! It will be delivered in 3-5 business days.';
};

// FUNKTION SOM GÖR ATT SIDAN SCROLLAR TILL ORDERMESSAGE VID KLICK PÅ FINALORDERBUTTON

const orderMessageContainer = document.querySelector('#orderMessageContainer');
finalOrderButton.addEventListener('click', scrollToOrderMessage); 

function scrollToOrderMessage() {
  orderMessageContainer.scrollIntoView({behavior: 'smooth'});
};

// FUNKTION SOM GÖMMER ORDERFORM NÄR BESTÄLLNINGEN GJORTS

finalOrderButton.addEventListener('click', hideOrderForm);

function hideOrderForm() {
  orderFormSection.classList.remove('active');
}

/* 

finalOrderButton.setAttribute('disabled', 'disabled');
  finalOrderButton.removeAttribute('disabled');

const identityNumber = document.querySelector('#identityNumber');

identityNumber.addEventListener('change', activateFinalOrderButton);
  
identityNumber.addEventListener('change', isPersonalIdValid);

firstName.addEventListener('input', activateFinalOrderButton);

function activateFinalOrderButton() {
  
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
    email 
    ) {
      finalOrderButton.removeAttribute('disabled');
    } else {
      finalOrderButton.setAttribute('disabled', 'disabled');
    }
    
  }

  activateFinalOrderButton();

  
  const firstNameRegEx = /^[A-Za-z]+$/;
  firstName.addEventListener('change', isFirstNameValid)

  function isFirstNameValid() {
    const result = firstNameRegEx.exec(firstName.value);
    if (result === null) {
    return;
    }
    activateFinalOrderButton();
  }

  /** 
  function isFirstNameValid() {
    const firstNameRegEx = /^[A-Za-z]+$/;
    const firstNameInput = document.getElementById("firstname");
    const firstNameErrorMessage = document.querySelector(".firstnameErrorMessage");
  
    if (firstNameRegEx.test(firstNameInput.value)) {
      firstNameErrorMessage.textContent = "Not valid first name";
      console.log("Validation Failed");
      return false;
    } else {
      firstNameErrorMessage.textContent = "";
      console.log("Validation Passed");
      return true;
    }
  }
*/



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