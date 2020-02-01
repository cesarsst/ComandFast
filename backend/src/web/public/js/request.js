const dataResult = {};

function storeFunc(){

    const cpf = window.document.getElementById('cpf').value;
    const name = window.document.getElementById('name').value;
    const level = window.document.getElementById('level').value;
    const user_name = window.document.getElementById('user_name').value;
    const password = window.document.getElementById('password').value;
    const tel = window.document.getElementById('tel').value;
    const ano_nasc = window.document.getElementById('ano_nasc').value;


    const data = {
        cpf,
        name,
        level, 
        user_name,
        password,
        tel,
        ano_nasc
    };

    $(function(){
    
        var post_url = '/registerNewFunc';												
        var post_data = data;																
        var modalConfirm = window.document.getElementById('modalConfirm');
        var modalLoading = window.document.getElementById('modalLoading');

        $.ajax({
            type: 'POST',
            url: post_url, 
            data: post_data,
            beforeSend: function(){    
                $(modalLoading).modal("show")            
                $(modalLoading).html('<center><div id="spinner" class="spinner"></div></center>');	
                 												
            },
            success: function(data) {         
                $(modalLoading).modal("hide");           																			
                $(modalConfirm).modal("show");
            }																						
        });
    });
   


}