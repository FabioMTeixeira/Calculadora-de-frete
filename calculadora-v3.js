const http = require('http');
const url = require('url');

const PREÇOS_ESTADO = {
    //Sudeste
    SP: 'R$5,00',
    RJ: 'R$6,50',
    MG: 'R$7,20',
    ES: 'R$8,00',
    //Sul
    PR: 'R$8,00',
    SC: 'R$10,00',
    RS: 'R$10,00',
    //Norte
    AM: 'R$23,50',
    AC: 'R$23,50',
    RO: 'R$22,00',
    RR: 'R$22,00',
    PA: 'R$20,00',
    AP: 'R$20,00',
    TO: 'R$20,00',
    //Centro Oeste
    GO: 'R$11,50',
    MT: 'R$11,50',
    MS: 'R$11,50',
    //Nordeste
    BA: 'R$15,00',
    CE: 'R$15,00',
    MA: 'R$15,00',
    RN: 'R$15,00',
    PE: 'R$15,00',
    AL: 'R$15,00',
    SE: 'R$15,00',
    PB: 'R$15,00'
};

const PREÇO_SAO_PAULO = 'R$0,00';

const PORTA = 3000;

const renderMensagem = (cidade, estado, nomeProduto, valorFrete) => {
    const mensagem = [
        "Olá, boas vindas à nossa loja.",
        "Já recebemos as informações e iremos mandar",
        `o produto ${nomeProduto}`,
        `para ${cidade.toUpperCase()} - ${estado}.`,
        `O valor do frete será ${valorFrete}`
    ];

    return mensagem.join(" ");
}

const calculoFrete = (cidade, estado) => {
    let valorFrete = "R$0,00";

    if(cidade === "sao paulo") {
        valorFrete = PREÇO_SAO_PAULO;
    } else {
        valorFrete = PREÇOS_ESTADO[estado];
    }
    if(valorFrete === undefined) {
        valorFrete = "R$0,00, não enviamos para tão longe.";
    };

    return valorFrete;
};

const getCidade = (endereco) => {
    try{
        const segmentos = endereco.split('-');
        let cidade = segmentos[0];
        cidade = cidade.trim(); // tira o espaço extra
        cidade = cidade.toLowerCase();
        cidade = cidade.replace('ã', 'a');
    
        return cidade;
    } catch(e) {
        console.log(e);
        
        return "";
    }
}

const  getEstado = (endereco) => {
    try {
        const segmentos = endereco.split('-');
        let estado = segmentos[1];
        estado = estado.trim();
        estado = estado.toUpperCase();
    
        return estado;
    } catch(e) {
        console.log(e);

        return "";
    }
}


const main = () => {
    const servidor = http.createServer((request, response) => {
        const parsedUrl = url.parse(request.url, true);
        if(parsedUrl.pathname === "/") {

            const query = parsedUrl.query;
    
            const endereco = query.endereco;
            const nomeProduto = query.nomeProduto;
        
            const cidade = getCidade(endereco);
            const estado = getEstado(endereco);
        
            const frete = calculoFrete(cidade, estado);
            const mensagem = renderMensagem(cidade, estado, nomeProduto, frete);

            const body = {
                mensagem: mensagem,
                frete: frete,
                cidade: cidade,
                estado: estado
            };
        
            response.writeHead(200, {
                'Content-Type': 'application/json; charset=UTF-8'
            });
            response.end(JSON.stringify(body)); 
        } else {
            response.writeHead(404, {
                'Content-Type': 'application/json; charset=UTF-8'
            });
            response.end();
        }
    });
        

    console.log(`Servidor rodando na porta ${PORTA}`);
    servidor.listen(PORTA);
};

main();