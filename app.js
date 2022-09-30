/* Imports */
// this will check if we have a user and set signout link if it exists
import './auth/user.js';
import {
    completeItem,
    createListItem,
    deleteBoughtItem,
    getList,
    deletePurchased,
} from './fetch-utils.js';
import { renderList } from './render.js';
/* Get DOM Elements */
const groceryList = document.getElementById('grocery-list');
const addItemForm = document.getElementById('grocery-form');
const errorDisplay = document.getElementById('error-display');
const removeButton = document.getElementById('remove-button');
const removeBought = document.getElementById('remove-bought');
/* State */
let error = null;
let items = [];
async function fetchData() {
    const response = await getList();
    items = response.data;
    error = response.error;
}
/* Events */
window.addEventListener('load', async () => {
    await fetchData();

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
    // addItemForm.reset();

    if (error) {
        displayError();
    } else {
        await fetchData();
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

removeBought.addEventListener('click', async () => {
    await deletePurchased();
    displayList();
});
/* Display Functions */
function displayError() {
    if (error) {
        errorDisplay.textContent = error.message;
    } else {
        errorDisplay.textContent = '';
    }
}

async function displayList() {
    await fetchData();
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
                // find the indexOf item in items
                const index = items.indexOf(item);
                // update the items state with response
                items[index] = updateItem;
                // re display
                displayList();
            }
        });
    }
}
