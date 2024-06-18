document.addEventListener("DOMContentLoaded", function() {
    const menuList = document.querySelector("#menuList");
    const searchInput = document.querySelector("#searchInput");
    const searchButton = document.querySelector("#searchButton");
    const searchForm = document.querySelector("#searchForm");
    const noResults = document.querySelector("#noResults");

    // Função para filtrar os pratos com base no texto digitado
    function filtrarPratos(texto) {
        const pratos = menuList.querySelectorAll(".prato");
        const filtro = texto.toLowerCase();
        let pratosEncontrados = false;

        pratos.forEach(prato => {
            const nomePrato = prato.querySelector("h4").textContent.toLowerCase();
            if (nomePrato.includes(filtro)) {
                prato.style.display = "block"; // Mostra o prato
                pratosEncontrados = true;
            } else {
                prato.style.display = "none"; // Esconde o prato que não corresponde ao filtro
            }
        });

        // Exibe ou esconde o aviso de "Nenhum prato encontrado"
        noResults.style.display = pratosEncontrados ? "none" : "block";
    }

    // Evento de clique no botão de pesquisa
    searchButton.addEventListener("click", function() {
        const textoPesquisa = searchInput.value.trim(); // Obtém o valor do campo de pesquisa
        filtrarPratos(textoPesquisa); // Chama a função de filtragem
    });

    // Impedir o comportamento padrão do formulário de enviar ao pressionar Enter
    searchForm.addEventListener("submit", function(event) {
        event.preventDefault();
        const textoPesquisa = searchInput.value.trim(); // Obtém o valor do campo de pesquisa
        filtrarPratos(textoPesquisa); // Chama a função de filtragem
    });

    // Carregar os pratos inicialmente
    fetch("http://localhost:3000/Menu")
        .then(response => {
            if (!response.ok) {
                throw new Error('Erro ao carregar o menu.');
            }
            return response.json();
        })
        .then(data => {
            let menuItemsHTML = "";
            data.menu.pratos_principais.forEach(prato => {
                const preco = new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(prato.preco);
                menuItemsHTML += `
                    <div class="prato">
                        <img src="${prato.url}" alt="${prato.nome}" class="prato-imagem">
                        <div class="prato-info">
                            <h4>${prato.nome}</h4>
                            <p>${prato.descricao}</p>
                            <p class="preco">Preço: ${preco}</p>
                        </div>
                    </div>
                `;
            });
            menuList.innerHTML = menuItemsHTML;
        })
        .catch(error => {
            console.error('Erro ao carregar o menu:', error);
            // Exemplo simples de mensagem de erro para o usuário
            menuList.innerHTML = '<p>Ocorreu um erro ao carregar o menu. Por favor, tente novamente mais tarde.</p>';
        });
});
