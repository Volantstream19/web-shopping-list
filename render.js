export function renderList(item) {
    const li = document.createElement('li');

    if (item.complete) {
        li.classList.add('complete');
    }

    const p = document.createElement('p');
    p.textContent = item.quantity + ' ' + item.item;
    li.append(p);

    return li;
}
