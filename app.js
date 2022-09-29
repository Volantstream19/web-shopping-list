/* Imports */
// this will check if we have a user and set signout link if it exists
import './auth/user.js';
import { createListItem, getList } from './fetch-utils.js';
import { renderList } from './render.js';
// import { renderItem } from './render.js';
/* Get DOM Elements */
const groceryList = document.getElementById('grocery-list');
const addItemForm = document.getElementById('grocery-form');
const errorDisplay = document.getElementById('error-display');
/* State */
let error = null;
let items = [];

/* Events */
window.addEventListener('load', async () => {
    const response = await getList();

    items = response.data;
    error = response.error;

    if (error) {
        displayError();
    }
});

addItemForm.addEventListener('submit', async (e) => {
    e.preventDefault();
    const data = new FormData(addItemForm);
    const item = data.get('item');
    const quantity = data.get('quantity');

    await createListItem(item, quantity);
    addItemForm.reset();
    console.log(item, quantity);

    if (error) {
        errorDisplay.textContent = error.message;
    } else {
        items.push(item);
        displayError();
        displayList();
    }
});

/* Display Functions */
function displayError() {
    if (error) {
        errorDisplay.textContent = error.message;
    } else {
        errorDisplay.textContent = '';
    }
}

function displayList() {
    groceryList.innerHTML = '';

    for (const item of items) {
        const listEl = renderList(item);
        groceryList.append(listEl);
    }
}
