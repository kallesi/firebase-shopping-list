import { initializeApp } from "https://www.gstatic.com/firebasejs/9.15.0/firebase-app.js"
import { getDatabase, ref, push, onValue } from "https://www.gstatic.com/firebasejs/9.15.0/firebase-database.js"

const appSettings = {
    databaseURL: "https://playground-832ca-default-rtdb.asia-southeast1.firebasedatabase.app/"
}


const app = initializeApp(appSettings);
const database = getDatabase(app);
const shoppingListInDB = ref(database, "shoppingList");


const inputFieldEl = document.getElementById("input-field");
const addButtonEl = document.getElementById("add-button");
const shoppingListEl = document.getElementById("shopping-list");


addButtonEl.addEventListener("click", function () {
    let inputValue = inputFieldEl.value;
    clearInputFieldEl();
    push(shoppingListInDB, inputValue);
})


//The Onvalue function scans for changes in the database
onValue(shoppingListInDB, function (snapshot) {
    let itemsArray = Object.entries(snapshot.val())
    clearShoppingListEl()
    for (let i = 0; i < itemsArray.length; i++) {
        let currentItem = itemsArray[i]
        let currentItemID = currentItem[0]
        let currentItemValue = currentItem[1]
        appendItemToShoppingListEl(currentItemValue)
    }
})



function clearInputFieldEl() {
    inputFieldEl.value = "";
}

function clearShoppingListEl() {
    shoppingListEl.innerHTML = "";
}

function appendItemToShoppingListEl(itemValue) {
    shoppingListEl.innerHTML += `<li>${itemValue}</li>`;
}


