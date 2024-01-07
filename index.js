import { initializeApp } from "https://www.gstatic.com/firebasejs/9.15.0/firebase-app.js"
import { getDatabase, ref, push, onValue, remove } from "https://www.gstatic.com/firebasejs/9.15.0/firebase-database.js"

const appSettings = {
    databaseURL: ""
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

    if (snapshot.exists()) {
        let itemsArray = Object.entries(snapshot.val())
        clearShoppingListEl()
        for (let i = 0; i < itemsArray.length; i++) {
            let currentItem = itemsArray[i]
            let currentItemID = currentItem[0]
            let currentItemValue = currentItem[1]
            appendItemToShoppingListEl(currentItemID, currentItemValue)
        }
    } else {
        shoppingListEl.innerHTML = "No items here yet..."
    }
})



function clearInputFieldEl() {
    inputFieldEl.value = "";
}

function clearShoppingListEl() {
    shoppingListEl.innerHTML = "";
}

function appendItemToShoppingListEl(itemID, itemValue) {
    // shoppingListEl.innerHTML += `<li>${itemValue}</li>`;
    let newEl = document.createElement("li")
    newEl.textContent = itemValue
    shoppingListEl.append(newEl)
    newEl.id = itemID


    newEl.addEventListener("click", function () {

        let locationOnDB = ref(database, `shoppingList/${itemID}`)
        remove(locationOnDB)
    })


}


