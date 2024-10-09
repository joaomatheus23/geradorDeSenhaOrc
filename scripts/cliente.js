function getOrders() {
    return JSON.parse(localStorage.getItem('orders')) || {};
}

function saveOrders(orders) {
    localStorage.setItem('orders', JSON.stringify(orders));
}

// Array global para armazenar pedidos prontos extras
let readyQueue = [];

function updateOrderStatus() {
    const orders = getOrders();
    const preparingOrders = document.getElementById('preparingOrders');
    const readyOrders = document.getElementById('readyOrders');

    preparingOrders.innerHTML = '<h2>Preparando</h2>'; // Limpa e adiciona título
    readyOrders.innerHTML = '<h2>Pronto</h2>'; // Limpa e adiciona título

    let readyCount = 0; // Contador de pedidos prontos exibidos
    readyQueue = []; // Reinicia a fila de pedidos prontos extras

    for (const id in orders) {
        const order = orders[id];
        const orderDiv = document.createElement('div');
        orderDiv.className = 'order';
        orderDiv.innerHTML = `<p>${order.password}</p>`;

        if (order.status === 'em preparo') {
            preparingOrders.appendChild(orderDiv);
        } else if (order.status === 'pronto') {
            if (readyCount < 10) {
                // Exibe no máximo 10 pedidos prontos
                readyOrders.appendChild(orderDiv);
                readyCount++;
            } else {
                // Armazena os pedidos prontos extras na fila
                readyQueue.push(order);
            }
        }
    }
}

// Evento para remover o pedido pronto quando clicado
document.getElementById('readyOrders').addEventListener('click', function(event) {
    const orderDiv = event.target.closest('.order');
    if (orderDiv) {
        // Remove o elemento da tela
        orderDiv.remove();
        
        // Adiciona um novo pedido da fila, se houver
        if (readyQueue.length > 0) {
            const nextOrder = readyQueue.shift(); // Pega o próximo pedido da fila
            const newOrderDiv = document.createElement('div');
            newOrderDiv.className = 'order';
            newOrderDiv.innerHTML = `<p>${nextOrder.password}</p>`;
            document.getElementById('readyOrders').appendChild(newOrderDiv);
        }
    }
});

// Atualiza a cada 1 segundo
setInterval(updateOrderStatus, 1000);

// Atualiza a página inicialmente
window.onload = function() {
    updateOrderStatus();
};
