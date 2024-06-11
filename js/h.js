document.addEventListener("htmx:afterRequest", function(event){

    if(event.target.id === 'searchInput'){
        console.log(event.detail.xhr);
    
        const response = JSON.parse(event.detail.xhr.responseText)
        const produtosDiv = document.querySelector("#menuList");
    
        let htmlDiv = "";
        let preco = 0;
    
        response.menu.pratos_principais.forEach(produto => {

            
            preco = new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(produto.price);
            
            htmlDiv += `
                1\aq
             <li>${produto.id}</li>
            
             <li>${preco}</li>

            `
            indice++
        })
    
        produtosDiv.innerHTML = htmlDiv
    }
    
    });