// acessa o objeto 'document' que representa a pagina html
document
  .getElementById("formulario-registro") // seleciona o elemento com o id indicado no <form> 'formulario-registro'
  .addEventListener("submit", function (event) {
    // adiciona o ouvinte do evento 'submit'
    event.preventDefault(); // previne o comportamento padrão do formulário, ou seja, impede que ele seja enviado e recarregue a página

    const name = document.getElementById("nome").value; // capturar os valores dos campos do formulário pelo id
    const cpf = document.getElementById("cpf").value;
    const email = document.getElementById("email").value;
    const password = document.getElementById("senha").value;

    // requisição http para o endpoint de cadastro de usuário
    fetch("http://localhost:5000/api/v1/user", {
      // realiza uma chamada HTTP para o servidor (a rota definida)
      method: "POST",
      headers: {
        // correção aqui
        // a requisição será em formato JSON
        "Content-Type": "application/json", // correção do formato
      },
      // transforma os dados do formulário em uma string json para serem enviados no corpo da requisição
      body: JSON.stringify({ name, cpf, email, password }),
    })
      .then((response) => {
        // tratamento da resposta do servidor /api
        if (response.ok) {
          // verifica se a resposta for bem sucedida (status 200)
          return response.json();
        }
        // convertendo o erro em formato json
        return response.json().then((err) => {
          // Mensagem retornada do servidor acessada pela chave "error"
          throw new Error(err.error);
        });
      }) // fechamento do then
      .then((data) => {
        // correção aqui
        // Executa a resposta de sucesso retorna ao usuario final
        // exibe um alerta com o nome do usuário que acabou de ser cadastrado
        alert("Usuário cadastrado com sucesso! ");
        // Exibe um log no terminal
        console.log("Usuário criado: ", data.user);
        //reseta os campos do formulario apos o sucesso do cadastro
        document.getElementById("formulario-registro").reset();
      })
      .catch((error) => {
        // Tratamento de erro
        alert("Erro no cadastro: " + error.message);

        console.error("Erro: ", error.message);
      });
  });
