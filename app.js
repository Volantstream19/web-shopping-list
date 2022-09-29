/* Imports */
// this will check if we have a user and set signout link if it exists
import './auth/user.js';
import { createListItem } from './fetch-utils.js';
// import { renderItem } from './render-utils.js';
/* Get DOM Elements */
const addItemForm = document.getElementById('grocery-form');
// const lilList = document.getElementById('grocery-list');
/* State */

/* Events */
addItemForm.addEventListener('submit', async (e) => {
    e.preventDefault();
    const data = new FormData(addItemForm);
    const item = data.get('item');
    const quantity = data.get('quantity');

    await createListItem(item, quantity);
    addItemForm.reset();
    console.log(item, quantity);
});

/* Display Functions */
