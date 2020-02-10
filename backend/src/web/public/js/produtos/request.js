


$(document).ready( async function(){

    var post_url = '/searchProduto/all';																												
    var modalLoading = window.document.getElementById('products');
    
    
    $.ajax({
        type: 'PUT',
        url: post_url,
        dataType: 'json', 

        beforeSend: function(){    

            $(modalLoading).html("");
            $(modalLoading).html('<td></td><td></td> <td></td> <td><center><div id="spinner" class="spinner"></div></center></td> <td></td> <td> </td><td></td> ');	
                                                             
        },
        success: function(data) {    
            
            const produtos = data.data;

            $(modalLoading).html("");
            
            // Ordenando produtos por id
            produtos.sort((a, b)=>{ return a.id_product - b.id_product});

             // Itera sobre todos os elementos de data:
            $(produtos).each(i => {
                // Cria um novo elemento p:
                let element = $("<tr>");

                var produto = produtos[i];

                if(produto.thumbnail == ""){
                    produto.thumbnail_url = "img/product_default.png";
                }

                // Define o conteúdo de p:
                element.html("<th scope='row' style='background-image: url("+ produto.thumbnail_url  +"); background-repeat: no-repeat; background-size: contain;' ></th>" +                
                '<td>'+ produto.id_product + '</td> ' +
                '<td>'+ produto.name + '</td> ' +
                '<td>'+ produto.describe + '</td> ' +
                '<td>R$:'+ produto.price + '</td> ' +
                '<td>'+ produto.categorie + '</td> ' +               
                '<td><a href="#"  onclick="updateProduct('+ produto.id_product +');" title="Atualizar produto"  class="btn btn-success btn-circle btn-sm"> <i class="fas fa-check"></i></a>    <a href="#" onclick="deleteProduct('+ produto.id_product +')" title="Deletar produto" class="btn btn-danger btn-circle btn-sm"> <i class="fas fa-trash"></i></a> </td>)')
               
               
                // Adiciona o novo elemento ao DOM:
                $('#products').append(element);
             });

             
        }																						
    });


    // Buscando categorias cadastradas
    $.ajax({
        type: 'get',
        url: '/searchCategoria',

        success: function(data) {    
            
            var categorieNew = window.document.getElementById('categorieNew');
            var categorie = window.document.getElementById('categorie');

            $(data.data).each(i => {

                var categoria = data.data[i];
                let element = "<option>"+ categoria.name +"</option>"

                $(categorieNew).append(element);
                $(categorie).append(element);
            });

             
        }																						
    });


});


// FUNCTION UPDATE PRODUCT

async function updateProduct(id_product){

    const modalUpdate = window.document.getElementById("modalUpdate");
    const buttonUpdate = window.document.getElementById("buttonUpdate");
    const loading = window.document.getElementById('loading');

    // Preparando requisição 
    var post_url = '/searchProduto/' + id_product;																												
    

    $.ajax({
        type: 'PUT',
        url: post_url, 
        data: {

        },
        beforeSend: () => {    
            $(modalUpdate).modal("show");
            $(loading).html('<center><div id="spinner" class="spinner"></div></center>');  
                                                             
        },
        success: (data) => {    
            $(loading).html('');
            
            const produto = data.data;

            const id_product = window.document.getElementById("id_product").value = produto.id_product;
            const name = window.document.getElementById("name").value = produto.name;
            const price = window.document.getElementById("price").value = produto.price;
            const categorie = window.document.getElementById("categorie").value = produto.categorie;
            const describe = window.document.getElementById("describe").value = produto.describe;

            const element = "<button onclick='efetuaUpdate("+ id_product +");' type='button' class='btn btn-primary'>Atualizar</button>"
            $(buttonUpdate).html(element);

             
        }																						
    });


}


async function efetuaUpdate(idProduct){

    const id_product = window.document.getElementById("id_product").value 
    const name = window.document.getElementById("name").value 
    const price = window.document.getElementById("price").value
    const categorie = window.document.getElementById("categorie").value
    const describe = window.document.getElementById("describe").value

    const modalUpdateContent = window.document.getElementById("modalUpdateContent");
    const buttonUpdate = window.document.getElementById("buttonUpdate");
    const buttonCloseModal = window.document.getElementById("buttonCloseModal");
    const loading = window.document.getElementById('loading');

    var fileInput = document.getElementById('thumbnail');
    var file = fileInput.files[0];
   
  

    var formData = new FormData();
    formData.append('thumbnail', file);
    formData.append('id_product', id_product);
    formData.append('name', name);
    formData.append('price', price);
    formData.append('categorie', categorie);
    formData.append('describe', describe);

    if(idProduct == id_product){

         // Preparando requisição 
        var post_url = '/updateProduto/' + id_product;																												
    

        $.ajax({
            type: 'PUT',
            url: post_url, 
            processData: false, // important
            contentType: false, // important
            dataType : 'json',
            data: formData,

            beforeSend: () => {    
                $(modalUpdateContent).html('');
                $(buttonCloseModal).html('')
                $(loading).html('<center><div id="spinner" class="spinner"></div></center>');  
                                                                
            },
            success: (data) => {    
                $(loading).html('');
                $(buttonUpdate).html('');
               
                const msg = data.msg
                $(modalUpdateContent).html('<div><h4>'+ msg +'</h4></div>');
                $(buttonCloseModal).html('<a href="/gerenciarProdutos" type="button" class="btn btn-secondary">Fechar</a>');

                
            }																						
        });


    }


}

// ===> END UPDATE PRODUCT


// FUNCTION ADD NEW PRODUCT

function newProduct(){

    
    const name = window.document.getElementById("name").value = "";
    const price = window.document.getElementById("price").value = "";
    const categorie = window.document.getElementById("categorie").value = "";
    const describe = window.document.getElementById("describe").value = "";

    const modalNewProduct = window.document.getElementById("modalNewProduct");
    const buttonAddNew = window.document.getElementById("buttonAddNew");

    const element = "<button onclick='addNewProduct();' type='button' class='btn btn-primary'>Adicionar</button>"
    $(buttonAddNew).html(element);
  
    $(modalNewProduct).modal("show");

}

async function addNewProduct(){

    const name = window.document.getElementById("nameNew").value;
    const price = window.document.getElementById("priceNew").value;
    const categorie = window.document.getElementById("categorieNew").value;
    const describe = window.document.getElementById("describeNew").value;

    const modalNewProductContent = window.document.getElementById("modalNewProductContent");
    const buttonAddNew = window.document.getElementById("buttonAddNew");

    var fileInput = document.getElementById('thumbnailNew');
    var file = fileInput.files[0];
   
  

    var formData = new FormData();
    formData.append('thumbnail', file);
    formData.append('id_product', id_product);
    formData.append('name', name);
    formData.append('price', price);
    formData.append('categorie', categorie);
    formData.append('describe', describe)

    $.ajax({
        type: 'POST',
        url: '/registerProduto', 
        processData: false, // important
        contentType: false, // important
        dataType : 'json',
        data: formData,

        beforeSend: () => {    
            $(modalNewProductContent).html('');
            $(buttonAddNew).html('')
            $(modalNewProductContent).html('<center><div id="spinner" class="spinner"></div></center>');  
                                                            
        },
        success: (data) => {    
            $(modalNewProductContent).html('<span>'+ data.msg +'</span>');
            $(buttonUpdate).html('');
           
            const msg = data.msg
            $(modalUpdateContent).html('<div><h4>'+ msg +'</h4></div>');
            $(buttonCloseModal).html('<a href="/gerenciarProdutos" type="button" class="btn btn-secondary">Fechar</a>');

            
        }																						
    });


}





// ===> END ADD NEW PRODUCT



// FUNCTION DELETE PRODUCTS 

function deleteProduct(id_product){

    const modalDeleteConfirm = window.document.getElementById("modalDeleteConfirm");
    const buttonDeleteConfirm = window.document.getElementById("buttonDeleteConfirm");


    $(buttonDeleteConfirm).html('');
    $(buttonDeleteConfirm).html("<button onclick='confirmDeleteProduct("+ id_product +")' type='button' class='btn btn-danger'>Sim</button>");

    $(modalDeleteConfirm).modal("show");

}


async function confirmDeleteProduct(id_product){


    const buttonCloseModalDelete = window.document.getElementById("buttonCloseModalDelete");
    const modalUpdateContentDelete = window.document.getElementById("modalUpdateContentDelete");
    const buttonDeleteConfirm = window.document.getElementById("buttonDeleteConfirm");

    $.ajax({
        type: 'DELETE',
        url: '/deleteProduto/' + id_product, 
        dataType : 'json',

        beforeSend: () => {    
            $(modalUpdateContentDelete).html('');
            $(buttonDeleteConfirm).html('')
            $(modalUpdateContentDelete).html('<center><div id="spinner" class="spinner"></div></center>');  
                                                            
        },
        success: (data) => {    

            $(modalUpdateContentDelete).html('<span>'+ data.msg +'</span>');
            $(buttonCloseModalDelete).html('<a href="/gerenciarProdutos" type="button" class="btn btn-secondary">Fechar</a>');

        }																						
    });


}


// ===> END DELETE PRODUCT