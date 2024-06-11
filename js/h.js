document.addEventListener("DOMContentLoaded", function() {
    const menuList = document.querySelector("#menuList");

    fetch("http://localhost:3000/Menu")
        .then(response => response.json())
        .then(data => {
            let menuItemsHTML = "";
            data.menu.pratos_principais.forEach(prato => {
                const preco = new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(prato.preco);
                menuItemsHTML += `
                    <div class="prato">
                        <img src="${prato.url}" alt="${prato.nome}" class="prato-imagem">
                        <div class="prato-info">
                            <h4>${prato.nome}</h4>
                            <p>${prato.descricao}
                            </p>
                            <p class="preco">Preço: ${preco}</p>

                        </div>
                    </div>
                `;
            });
            menuList.innerHTML = menuItemsHTML;
        })
        .catch(error => console.error('Erro ao carregar o menu:', error));
});
