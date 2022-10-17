const readline = require("readline").createInterface({
    input: process.stdin,
    output: process.stdout
});

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
    //Nordeste R$15,00
};

const PREÇO_SAO_PAULO = 'R$0,00';

const renderMensagem = (endereço, nomeProduto) => {
    const mensagem = [
        "Olá, boas vindas à nossa loja.",
        "Já recebemos as informações e iremos mandar",
        `o produto ${nomeProduto}`,
        `para ${endereço}`
    ];

    return mensagem.join(" ");
}

const calculo = (endereço, nomeProduto) => {
    const mensagem = renderMensagem(endereço, nomeProduto);

    console.log(mensagem);
};

const getCidade = (endereço) => {
    const segmentos = endereço.split('-');
    let cidade = segmentos[0];
    cidade = cidade.trim();

    return cidade;
}

const  getEstado = (endereço) => {
    const segmentos = endereço.split('-');
    let estado = segmentos[1];
    estado = estado.trim();

    return estado;
}


const main = () => {
    readline.question("Endereço: ", function(endereço) {
        readline.question("Qual é o produto: ", function(nomeProduto) {
            //calculo(endereço, nomeProduto);

            console.log(getEstado(endereço) === "SP");

            readline.close();
        });
    });
}

main()