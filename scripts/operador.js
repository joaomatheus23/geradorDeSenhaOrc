function getOrders() {
    return JSON.parse(localStorage.getItem('orders')) || {};
}

function setOrders(orders) {
    localStorage.setItem('orders', JSON.stringify(orders));
}

function registerOrder() {
    const name = document.getElementById('clientName').value;
    const password = document.getElementById('clientPassword').value;

    if (name && password) {
        const orders = getOrders();
        const id = Date.now().toString(); // Unique ID based on timestamp
        orders[id] = { name, password, status: 'em preparo', createdAt: Date.now() };
        setOrders(orders);
        document.getElementById('orderForm').reset();
        displayOrders(); // Atualiza a lista de pedidos
    } else {
        alert('Por favor, preencha todos os campos.');
    }
}

function markAsReady(id) {
    const orders = getOrders();
    if (orders[id]) {
        orders[id].status = 'pronto';
        setOrders(orders);
        displayOrders(); // Atualiza a lista de pedidos
        
    }
}

function deleteOrder(id) {
    const orders = getOrders();
    delete orders[id];
    setOrders(orders);
    displayOrders(); // Atualiza a lista de pedidos
    
}

function displayOrders() {
    const orders = getOrders();
    const ordersList = document.getElementById('ordersList');
    ordersList.innerHTML = '';

    for (const id in orders) {
        const order = orders[id];
        const orderDiv = document.createElement('div');
        orderDiv.className = 'order';
        orderDiv.innerHTML = `
            <p>Nome: ${order.name}</p>
            <p>Senha: ${order.password}</p>
            <p>Status: ${order.status}</p>
            ${order.status === 'em preparo' ? `<button class="ready-btn" onclick="markAsReady('${id}')">Marcar como Pronto</button>` : ''}
            <button class="delete-btn" onclick="deleteOrder('${id}')">Excluir Pedido</button>
        `;
        ordersList.appendChild(orderDiv);
    }
}

// Atualiza a lista de pedidos a cada 3 segundos
setInterval(displayOrders, 3000);

// Carrega a lista de pedidos inicialmente
window.onload = function() {
    displayOrders();
};