const express = require('express');
const axios = require('axios');
const xml2js = require('xml2js');
const { response } = require('express');

const app = express();

const PORT = 8000;

app.get('/frete/:cep', (req, res) => {
    const cepOrigem = req.params.cep;
    const cepDestino = req.query.cepDestino;

    const url = 'http://ws.correios.com.br/calculador/CalcPrecoPrazo.aspx';
    const params = {
        nCdEmpresa: null,
        sDsSenha: null,
        nCdServico: 41106,
        sCepOrigem: cepOrigem,
        sCepDestino: cepDestino,
        nVlPeso: 1,
        nCdFormato: 1,
        nVlComprimento: 20,
        nVlAltura: 20,
        nVlLargura: 20,
        nVlDiametro: 0,
        sCdMaoPropria: "n",
        nVlValorDeclarado: 0,
        sCdAvisoRecebimento: "n",
        StrRetorno: "xml",
        nIndicaCalculo: 3,
    };

    axios({ method: 'GET', url: url, params: params }).then((httpResponse) => {
        const parseString = xml2js.parseString;

        parseString(httpResponse.data, (err, result) => {
            const servico = result.Servicos.cServico[0];

            const rawValor = servico.Valor[0];

            const valor = parseFloat(rawValor.replace(",", "."));
            const prazo = parseInt(servico.PrazoEntrega[0]);

            const body = {
                valor: valor,
                prazo: prazo
            };
        
            res.send(body);
        });
    });
});

app.get("/endereco/:cep", (req, res) => {
    const cep = req.params.cep;
    const url = `https://viacep.com.br/ws/${cep}/json`;

    axios({ method: 'GET', url: url }).then((httpResponse) => {
        const data = (httpResponse.data);

        const body = {
            endereco: data.logradouro,
            cidade: data.localidade
        };

        res.send(body);             
    });


});

app.listen(PORT, () => {
    console.log('API is running');
});