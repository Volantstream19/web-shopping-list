export function renderList(item) {
    const li = document.createElement('li');

    if (item.bought) {
        li.classList.add('bought');
        console.log(item.bought);
    }

    const p = document.createElement('p');
    p.textContent = item.quantity + ' ' + item.item;
    li.append(p);

    return li;
}
