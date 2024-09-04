const express = require('express') //Importa o modulo Express

class AppController{ //Define uma classe para organizar a logica de aplicação

    constructor(){
                                     
        this.express = express(); //Cria uma nova instacia do express dentro da classe 
        this.middlewares(); //Chama o metodo middlewares para configurar os metodo
        this.routes(); //Chama o metodo routes para definir as rotas da Api
    
    }
    middlewares(){

        this.express.use(express.json()); //Permitir que a aplicação receba dados em formato JSON nas requisições 
    }
                //Define as rotas da nossa API
    routes(){   //Define uma rota GET para o caminho health

        this.express.get('/health/',(req, res) => { 
            res.send({ status: "OK" ,
            nome:"Hyago"});
        
        //Essa rota é usada para verificar se a API esta OK
        });
    }
} 
        //Exportando a instacia de Express configurada, para que seja acessada em outros arquivos
module.exports = new AppController().express 