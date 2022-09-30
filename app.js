/* Imports */
// this will check if we have a user and set signout link if it exists
import './auth/user.js';
import { completeItem, createListItem, deleteBoughtItem, getList } from './fetch-utils.js';
import { renderList } from './render.js';
// import { renderItem } from './render.js';
/* Get DOM Elements */
const groceryList = document.getElementById('grocery-list');
const addItemForm = document.getElementById('grocery-form');
const errorDisplay = document.getElementById('error-display');
const removeButton = document.getElementById('remove-button');
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
    if (items) {
        displayList();
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
        displayError();
    } else {
        items.push(item);
        displayList();
        addItemForm.reset();
    }
});

removeButton.addEventListener('click', async () => {
    const response = await deleteBoughtItem();
    error = response.error;
    if (error) {
        displayError();
    } else {
        items = [];
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

        listEl.addEventListener('click', async () => {
            const response = await completeItem(item.id);
            error = response.error;
            const updateItem = response.data;

            if (error) {
                displayError();
            } else {
                // find the index of item in item
                const index = items.indexOf(item);
                // update the items state with response
                items[index] = updateItem;
                // re display
                displayList();
            }
        });
    }
}
