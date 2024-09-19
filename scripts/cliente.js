function getOrders() {
    return JSON.parse(localStorage.getItem('orders')) || {};
}

function saveOrders(orders) {
    localStorage.setItem('orders', JSON.stringify(orders));
}

function updateOrderStatus() {
    const orders = getOrders();
    const preparingOrders = document.getElementById('preparingOrders');
    const readyOrders = document.getElementById('readyOrders');

    preparingOrders.innerHTML = '<h2>Preparando</h2>'; // Limpa e adiciona título
    readyOrders.innerHTML = '<h2>Pronto</h2>'; // Limpa e adiciona título

    for (const id in orders) {
        const order = orders[id];
        const orderDiv = document.createElement('div');
        orderDiv.className = 'order';
        orderDiv.innerHTML = `<p>${order.password}</p>`;

        if (order.status === 'em preparo') {
            preparingOrders.appendChild(orderDiv);
        } else if (order.status === 'pronto') {
            readyOrders.appendChild(orderDiv);
        }
    }
}

// Atualiza a cada 1 segundo
setInterval(updateOrderStatus, 1000);

// Atualiza a página inicialmente
window.onload = function() {
    updateOrderStatus();
};