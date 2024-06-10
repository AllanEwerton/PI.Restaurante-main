function displayMenu(data) {
    const menuList = document.getElementById('menuList');
    menuList.innerHTML = ''; // Limpar a lista antes de adicionar novos itens

    data.menu.pratos_principais.forEach(item => {
        // Criar elemento li para cada item do menu
        const listItem = document.createElement('li');
        listItem.textContent = `${item.nome} - R$ ${item.preco.toFixed(2)}`;
        menuList.appendChild(listItem);
    });
}

// Evento de finalização de carregamento HTMX para exibir os dados do menu e esconder o indicador de carregamento
document.addEventListener('htmx:loadend', function(event) {
    if (event.detail.elt.id === 'menuList') {
        displayMenu(event.detail.xhr.response);
        document.getElementById('loading').style.display = 'none';
    }
});