



$(document).ready( async function(){

        var post_url = '/searchAllFunc';																												
        var modalLoading = window.document.getElementById('funcs');
        

        $.ajax({
            type: 'GET',
            url: post_url, 

            beforeSend: function(){    

                $(modalLoading).html('<td></td> <td></td><td><center><div id="spinner" class="spinner"></div></center></td> <td></td><td></td>');	
                 												
            },
            success: function(data) {    
                
                $(modalLoading).html("");
                 
               
                 // Itera sobre todos os elementos de data:
                $(data.data).each(i => {
                    // Cria um novo elemento p:
                    let element = $("<tr>");

                    var func = data.data[i];
                    // Define o conteúdo de p:
                    element.html("<th scope='row'>"+ (i+1) +"</th> <td>"+ func.cpf +"</td> <td>"+ func.name +"</td> <td>"+ func.user_name +"</td> <td>   <a href='#' onclick='store("+ func.cpf +")' class='btn btn-warning btn-circle btn-sm'><i class='fas fa-exclamation-triangle'></i></a>    <a href='#' onclick='onClickDelete("+ func.cpf +")'  class='btn btn-danger btn-circle btn-sm'> <i class='fas fa-trash'></i></a>   </td>");
                    // Adiciona o novo elemento ao DOM:
                    $('#funcs').append(element);
                 });

                 
            }																						
        });


});


function onClickDelete(cpf){

    var modalDeleteConfirm = window.document.getElementById('modalDeleteConfirm');
    var buttonConfirmDelete = window.document.getElementById('buttonConfirmDelete')

    const confirmElement = "<button onclick='deleteFunc("+ cpf +");' type='button' class='btn btn-danger'>Sim</button>"
    
    $(modalDeleteConfirm).modal("show");
    $(buttonConfirmDelete).append(confirmElement)


}

async function deleteFunc(cpf){

    const post_url = "/deleteFunc";
    var modalDelete = window.document.getElementById('modalDelete');
    var modalLoading = window.document.getElementById('funcs');
    var modalDeleteConfirm = window.document.getElementById('modalDeleteConfirm');

    $(modalDeleteConfirm).modal('hide');

    $.ajax({
        type: 'DELETE',
        url: post_url, 
        data: {cpf},

        beforeSend: function(){    
            $(modalLoading).html("");         
            $(modalLoading).html('<td></td> <td></td><td><center><div id="spinner" class="spinner"></div></center></td> <td></td><td></td>');	
                                                            
        },
        success: function(data) {    
            
            $(modalLoading).html("");
            $(modalDelete).modal("show"); 
            
            

            
        }																						
    });

}


async function store(cpfAtualizar){


    const cpf = window.document.getElementById("cpf");
    const name = window.document.getElementById("name");
    const level = window.document.getElementById("level");
    const tel = window.document.getElementById("tel");
    const ano_nasc = window.document.getElementById("ano_nasc");
    const user_name = window.document.getElementById("user_name");
    const password = window.document.getElementById("password");

    
    $.ajax({
        type: "POST",
        url: "/searchFunc", 
        data: {cpf: cpfAtualizar},

        beforeSend: function(){    
                                                                     
        },
        success: async function(data){    

            var modalUpdate = window.document.getElementById('modalUpdate');
            $(modalUpdate).modal("show");

            const funcData = data.data;
            cpf.value = funcData.cpf;
            name.value = funcData.name;
            level.value = funcData.level;
            tel.value = funcData.tel;
            ano_nasc.value= funcData.ano_nasc;
            user_name.value = funcData.user_name;
            password.value = funcData.password;

            $("#buttonUpdate").html("<button class='btn btn-primary' onclick='storeFunc("+ funcData.cpf +")' id='btnEnviarDados'>Atualizar</button>")
            

        }																						
    });

  
   


}


async function storeFunc(cpfFunc){

    console.log(cpfFunc)
    const cpf = window.document.getElementById("cpf").value;
    const name = window.document.getElementById("name").value;
    const level = window.document.getElementById("level").value;
    const tel = window.document.getElementById("tel").value;
    const ano_nasc = window.document.getElementById("ano_nasc").value;
    const user_name = window.document.getElementById("user_name").value;
    const password = window.document.getElementById("password").value;

    $.ajax({
        type: "POST",
        url: "/updateFunc", 
        data: {
            cpfSearch: cpfFunc,
            cpf,
            name,
            level,
            tel,
            ano_nasc,
            user_name,
            password,
            active: true
        },

        beforeSend: function(){    
            var modalUpdate = window.document.getElementById('modalUpdate');
            var modalLoading = window.document.getElementById('funcs');

            $(modalUpdate).modal("hide");        
            $(modalLoading).html("");         
            $(modalLoading).html('<td></td> <td></td><td><center><div id="spinner" class="spinner"></div></center></td> <td></td><td></td>');                                               
        },
        success: function(){    
            var modalLoading = window.document.getElementById('funcs');
            var modalUpdateConfirm = window.document.getElementById('modalUpdateConfirm');  
            $(modalUpdateConfirm).modal("show");

        }																						
    });
    

}