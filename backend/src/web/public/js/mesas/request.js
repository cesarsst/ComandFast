$(document).ready( async function(){

    var post_url = '/searchMesa/all';																												
    var modalLoading = window.document.getElementById('funcs');
    

    $.ajax({
        type: 'PUT',
        url: post_url, 

        beforeSend: function(){    

            $(modalLoading).html("");
            $(modalLoading).html('<td></td><td><center><div id="spinner" class="spinner"></div></center></td><td></td> ');	
                                                             
        },
        success: function(data) {    
            
            const mesas = data.data;

            $(modalLoading).html("");
            
            // Ordenando mesas por id
            mesas.sort((a, b)=>{ return a.id_mesa - b.id_mesa});

      
            $(mesas).each(i => {
                
                let element = $("<tr>");

                var mesa = mesas[i];

                let color = "btn-danger";
                let status = "Fechado";
                let action = true;
                if(mesa.status == true){
                    color = "btn-success";
                    status = "Aberto";
                    action = false;
                } 

            
                element.html("<th scope='row'>"+ mesa.id_mesa +'</th>'+                
                '<td><a href="#" onclick="confirmOpenClose('+ mesa.id_mesa +','+ action +');" class="btn '+ color +'">' +
                '<span class="text">'+ status +'</span>' +
                '</a></td> ' +
                '<td><a href="#" onclick="comanda('+ mesa.id_mesa +');" class="btn btn-info btn-icon-split">' +
                '<span class="text">Comanda</span>' +
                '</a></td> '                
                +"<td><a href='#' title='Endereço do funcionário'  class='btn btn-success btn-circle btn-sm'> <i class='fas fa-check'></i></a>    <a href='#' title='Deletar funcionário' class='btn btn-danger btn-circle btn-sm'> <i class='fas fa-trash'></i></a> </td>");
               
              
                $('#funcs').append(element);
             });

             
        }																						
    });


});


async function comanda(id_mesa){
    var modalPedidos = window.document.getElementById('modalPedidos'); 
    var contentPedidos = window.document.getElementById('contentPedidos'); 
  
    var comandId = window.document.getElementById('comandId');
    var totalComanda = window.document.getElementById('totalComanda');
    var idMesa = window.document.getElementById('idMesa');
    var buttonAddNewProduct = window.document.getElementById('buttonAddNewProduct');

    $.ajax({
        type: 'POST',
        url: '/searchComanda', 
        data: {id_mesa},
        beforeSend: () => {      
            
            //Limpando dados antigos 
            $(idMesa).html('');
            $(contentPedidos).html('');      
            $(comandId).html('');  
            $(totalComanda).html('');

            $(contentPedidos).html('<div id="spinner" class="spinner"></div>');	
                                                             
        },
        success: (data) => {      
            
            const comanda = data.data;
            
            $(idMesa).html('<h4>' + comanda.mesa +'</h4>');
            $(comandId).html('<h4>'+comanda.id_comanda + '</h4>');
            $(totalComanda).html('<h4> R$:'+comanda.total + '</h4>');

            $(contentPedidos).html('');
            if(contentPedidos.length > 0){
                $(contentPedidos).html('<h4>'+ comanda.pedidos  +'</h4>');                
                $(buttonAddNewProduct).html('<button class="btn btn-primary" id="btnEnviarDados">+</button>');
                
            } else {
                $(buttonAddNewProduct).html('<button class="btn btn-primary" id="btnEnviarDados">+</button>');
                $(contentPedidos).html('<h4> Nenhum pedido realizado ainda! </h4>'); 
            }
            

            

        },
        error: (data) => {
            $(contentPedidos).html('');
            $(contentPedidos).html(data.responseJSON.msg);
        }																				
    });

    $(modalPedidos).modal('show');

}



async function confirmOpenClose(id_mesa, status){
    var modalMsg = window.document.getElementById('modalMsg');
    var areaButton = window.document.getElementById('areaButton');

    $(modalMsg).modal("show")
    if(status){
        $(areaMsg).html('<center><h4>Deseja abrir a mesa '+ id_mesa +' ?</h4></center>');
        $(areaButton).html('');
        $(areaButton).append('<a href="#" onclick="openCloseMesa('+ id_mesa +','+ status +')" class="btn bg-success" style="color:#fff"; > Sim </a>');

    } else {
        $(areaMsg).html('<center><h4>Deseja fechar a mesa '+ id_mesa +' ?</h4></center>');
        $(areaButton).html('');
        $(areaButton).append('<a href="#" onclick="openCloseMesa('+ id_mesa +','+ status +')" class="btn bg-success" style="color:#fff"; > Sim </a>');
        
    }      
    
}


async function openCloseMesa(id_mesa, status){

    var modalMsg = window.document.getElementById('modalMsg');
    var areaMsg = window.document.getElementById('areaMsg');
    var areaButton = window.document.getElementById('areaButton');
    
    $.ajax({
        type: 'POST',
        url: '/updateMesa', 
        data: {id_mesa, status},
        beforeSend: () => {    
            $(modalMsg).modal("show")            
            $(areaMsg).html('<center><div id="spinner" class="spinner"></div></center>');	
                                                             
        },
        success: (data) => {         
            $(areaMsg).html('');
            $(areaMsg).html('<h4>'+ data.msg  +'</h4>');   
            $(areaButton).html('');
        },
        error: (data) => {
            $(areaMsg).html('');
            $(areaMsg).html('<h4>'+ data.responseJSON.msg  +'</h4>');
            $(areaButton).html('');
        }																				
    });


}