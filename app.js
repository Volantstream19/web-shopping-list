/* Imports */
// this will check if we have a user and set signout link if it exists
import './auth/user.js';
import { createListItem } from './fetch-utils.js';
/* Get DOM Elements */
const addItemForm = document.getElementById('grocery-form');
/* State */

/* Events */
addItemForm.addEventListener('submit', async (e) => {
    e.preventDefault();
    const data = new FormData(addItemForm);
    const item = data.get('item');
    const quantity = data.get('quantity');

    await createListItem(item, quantity);
    addItemForm.reset();
});

/* Display Functions */
