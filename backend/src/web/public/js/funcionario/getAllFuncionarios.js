
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
                 
                const funcionarios = data.data;
                let i = 0;
                 // Itera sobre todos os elementos de data:
                funcionarios.forEach(func => {
                    i++;
                    // Cria um novo elemento p:
                    let element = $("<tr>");

                    // Define o conteúdo de p:
                    element.html("<th scope='row'>"+ (i) +"</th> <td>"+ func.cpf +"</td> <td>"+ func.name +"</td> <td>"+ func.user_name +"</td> <td>    <a href='#' title='Endereço do funcionário' onclick='onClickEndereco("+ func.cpf +")'  class='btn btn-success btn-circle btn-sm'> <i class='fas fa-check'></i></a>  <a href='#' title='Atualizar dados' onclick='store("+ func.cpf +")' class='btn btn-warning btn-circle btn-sm'><i class='fas fa-exclamation-triangle'></i></a>    <a href='#' title='Deletar funcionário' onclick='onClickDelete("+ func.cpf +")'  class='btn btn-danger btn-circle btn-sm'> <i class='fas fa-trash'></i></a>    </td>");
                    // Adiciona o novo elemento ao DOM:
                    $('#funcs').append(element);
                 });

                 
            }																						
        });


});







// UPDATE DADOS FUNCIONÁRIO
async function store(cpfAtualizar){

    var modalUpdate = window.document.getElementById('modalUpdate');
    var loading = window.document.getElementById('loading');


    $.ajax({
        type: "POST",
        url: "/searchFunc", 
        data: {cpf: cpfAtualizar},

        beforeSend: function(){    
            $(modalUpdate).modal("show");    
            $(loading).html('<center><div id="spinner" class="spinner"></div></center>');                                   
        },
        success: async (data) => {    

            $(loading).html('');  

            const dadosFunc = data.data;

            const cpf = window.document.getElementById("cpf").value = dadosFunc.cpf;
            const name = window.document.getElementById("name").value = dadosFunc.name;
            const level = window.document.getElementById("level").value = dadosFunc.level;
            const tel = window.document.getElementById("tel").value = dadosFunc.tel;
            const ano_nasc = window.document.getElementById("ano_nasc").value = dadosFunc.ano_nasc;
            const user_name = window.document.getElementById("user_name").value = dadosFunc.user_name;
            const password = window.document.getElementById("password").value = dadosFunc.password;


            $("#buttonUpdate").html("<button class='btn btn-primary' onclick='storeFunc("+ cpf +")' id='btnEnviarDados'>Atualizar</button>")
        }																					
    });

  
   


}

async function storeFunc(cpfFunc){

    const cpf = window.document.getElementById("cpf").value;
    const name = window.document.getElementById("name").value;
    const level = window.document.getElementById("level").value;
    const tel = window.document.getElementById("tel").value;
    const ano_nasc = window.document.getElementById("ano_nasc").value;
    const user_name = window.document.getElementById("user_name").value; 
    const password = window.document.getElementById("password").value;

    if(cpf == cpfFunc){

        $.ajax({
            type: "POST",
            url: "/updateFunc", 
            data: {
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
        
                var modalUpdateConfirm = window.document.getElementById('modalUpdateConfirm');  
                $(modalUpdateConfirm).modal("show");

            }																						
        });
    
    }
}


// ENDEREÇO FUNCTIONS
async function onClickEndereco(cpf){

    const cpfFunc = window.document.getElementById("cpfFunc");
    const num = window.document.getElementById("num");
    const rua = window.document.getElementById("rua");
    const bairro = window.document.getElementById("bairro");
    const cidade = window.document.getElementById("cidade");
    const estado = window.document.getElementById("estado");
   

    $.ajax({
        type: "POST",
        url: "/searchEndereco", 
        data: {cpf},

        success: (data) => {    
           
            const endereco = data.data;
            cpfFunc.value = cpf;
            num.value = endereco.num;
            rua.value = endereco.rua;
            bairro.value = endereco.bairro;
            cidade.value = endereco.cidade;
            estado.value = endereco.estado;

            var modalEndereco = window.document.getElementById('modalEndereco'); 
            $(modalEndereco).modal("show");

            $("#buttonEndereco").html("<button class='btn btn-primary' onclick='updateEndereco("+ cpf +")' id='btnEnviarDados'>Atualizar</button>")

        },
        error: (data) =>{
            cpfFunc.value = cpf;
            num.value = "";
            rua.value = "";
            bairro.value = "";
            cidade.value = "";
            estado.value = "";

            var modalEndereco = window.document.getElementById('modalEndereco'); 
            $(modalEndereco).modal("show");

            $("#buttonEndereco").html("<button class='btn btn-primary' onclick='registerEndereco("+ cpf +")' id='btnEnviarDados'>Cadastrar</button>")

        }																						

    });


}


async function updateEndereco(cpf){

    const num = window.document.getElementById("num").value;
    const rua = window.document.getElementById("rua").value;
    const bairro = window.document.getElementById("bairro").value;
    const cidade = window.document.getElementById("cidade").value;
    const estado = window.document.getElementById("estado").value;

    $.ajax({
        type: "PUT",
        url: "/updateEndereco/" + cpf, 
        data: {
            num,
            rua,
            bairro,
            cidade,
            estado
        },
        beforeSend: function(){   

            var modalLoading = window.document.getElementById('funcs');
            var modalEndereco = window.document.getElementById('modalEndereco'); 

            $(modalEndereco).modal("hide");     
            $(modalLoading).html("");         
            $(modalLoading).html('<td></td> <td></td><td><center><div id="spinner" class="spinner"></div></center></td> <td></td><td></td>');                                               
        },
        success: (data) => {    

            var modalEnderecoConfirm = window.document.getElementById('modalEnderecoConfirm');  

            $(modalEnderecoConfirm).modal("show");
        },
        error: (data) =>{
            alert(data.responseJSON.msg);
        }
     																				
    });


}

async function registerEndereco(cpf){

    const num = window.document.getElementById("num").value;
    const rua = window.document.getElementById("rua").value;
    const bairro = window.document.getElementById("bairro").value;
    const cidade = window.document.getElementById("cidade").value;
    const estado = window.document.getElementById("estado").value;

    $.ajax({
        type: "POST",
        url: "/registerEndereco", 
        data: {
            cpf,
            num,
            rua,
            bairro,
            cidade,
            estado
        },
        beforeSend: function(){   

            var modalLoading = window.document.getElementById('funcs');
            var modalEndereco = window.document.getElementById('modalEndereco'); 

            $(modalEndereco).modal("hide");     
            $(modalLoading).html("");         
            $(modalLoading).html('<td></td> <td></td><td><center><div id="spinner" class="spinner"></div></center></td> <td></td><td></td>');                                               
        },
        success: (data) => {    

            var modalEnderecoConfirm = window.document.getElementById('modalEnderecoConfirm');  

            $(modalEnderecoConfirm).modal("show");
        },
        error: (data) =>{
            alert(data.responseJSON.msg);
        }
     																				
    });


}



// DELETE FUNCINAIRO FUNCTION
function onClickDelete(cpf){

    var modalDeleteConfirm = window.document.getElementById('modalDeleteConfirm');
    var buttonConfirmDelete = window.document.getElementById('buttonConfirmDelete')

    const confirmElement = "<button onclick='deleteFunc("+ cpf +");' type='button' class='btn btn-danger'>Sim</button>"
    
    $(modalDeleteConfirm).modal("show");
    $(buttonConfirmDelete).html(confirmElement)


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