# ComandFast
Códigos da aplicação ComandFast 

# Documento de Requisitos: ComandFast 

Esse documento contém as especificações tecnicas, assim como as regras de negócios e demais complementos da aplicação. 


## Sobre o sistema:

ComandFast é uma aplicação desenvolvida em NodeJS, React e React Native, na qual trás soluções para os pequenos e médios negócios na área de emissão, controle e gerenciamento de pedidos, especialmente quanto tratado em sistemas de comanda de restaurantes, bares e demais estabelecimentos comerciais.
A aplicação conta com um servidor NodeJS, onde todas as regras de negócios estão situadas. É nesse servidor que toda a permanencia de dados é feita, auxiliada pelo uso de um banco de dados não relacional (MongoDB) e demais outras dependencias (leia mais na ala “dependencias”). 

Para o gerenciamento por parte do administrador, todo controle é feito em uma pagina web, protegida por um sistema de login ligado ao serviços do servidor DevData IA, a qual permite acesso ao sistema contratado. Nessa página o usuario adminirador pode verificar todos os dados da aplicação, assim como modificar/adicionar atributos de acordo com suas necessidades. 

Por fim, a aplicação tem comunicação com uma aplicação mobile, na qual permite a realização de pedidos, abertura/fechamento de mesas e outras funcionalidades. 


## Funções da aplicação:

### → Por parte do sistema web:

- O sistema deve permitir o cadastrado, alteração e exclusão de funcionários, contendo os seguintes atributos:

⦁	Nome completo.
⦁	CPF/RG.
⦁	Endereço.
⦁	Telefone.
⦁	Ano de nascimento.
⦁	Nome de usuário para o sistema.
⦁	Senha de usuário para o sistema.
⦁	Permissão do usuário. (Ver mais em ‘Permissões do sistema’). 

- O sistema deve permitir o cadastro de categorias referente aos produtos oferecidos pelo administrador do sistema, assim como modificação e exclusão.

- O sistema deve permitir o cadastro de produtos em suas devidas categorias, assim como suas modificações e exclusões.

- O sistema deve permitir visualização dos pedidos realizados pela aplicação mobile, assim como sua devida ordem de solicitação em uma tela amigável e intuitiva, que permita fácil reconhecimento dos produtos solicitados.

- O sistema deve permitir a visualização de todos os dados do sistema em uma Dashboard exclusiva do administrador, em que poderá observar dados como:

⦁	Total de pedidos realizados (filtrado por dia, semana, mês ou ano)
⦁	Total dos valores referidos nos pedidos. 
⦁	Visualização da quantidade de pedidos, assim como valores, realizados por cada funcionário.
⦁	Horários de picos, dias movimentados e outras  informações referentes a controle de movimento. 

### → Por parte da aplicação mobile:

- O sistema deve ser capaz de realizar o login, referente ao funcionário que usa a aplicação no momento.

- O sistema deve ser capaz de realizar abertura e fechamento das mesas, a qual permite o registro de pedidos no sistema

- O sistema deve ser capaz de realizar pedidos de produtos cadastrados no sistema, separados por suas devidas categorias, assim como remover (desde que não completados) e realizar modificações de quantidades solicitadas pelos clientes.

- O sistema deve permitir a troca do layout para “baixo consumo”, modificando as cores nativas para cores que economizem bateria do dispositivo utilizado.

### →Por parte do servidor:

- O servidor deve permitir a permanência dos dados, assim como realizar backups diários dos históricos e logs do sistema.

- O servidor deverá permitir a opção de rodar na rede local da instalação.

- O servidor deverá ser responsável por todas as regras de negócios, tanto da aplicação web quanto a mobile, podendo se intercomunicar entre elas.



## Diagrama do Banco de Dados:

![Diagrama da relação do bando de dados](https://raw.githubusercontent.com/cesarsst/ComandFast/master/Diagrama.png)
 
