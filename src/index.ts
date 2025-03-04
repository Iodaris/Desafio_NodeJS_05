/**
 * Required External Modules
 */

import * as dotenv from "dotenv";
import express from "express";
import cors from "cors";
import helmet from "helmet";

dotenv.config();

/**
 * App Variables
 */

if (!process.env.PORT) {
	process.exit(1);
}

const PORT: number = parseInt(process.env.PORT as string, 10);

const app = express();

/**
 *  App Configuration
 */

app.use(helmet());
app.use(cors());
app.use(express.json());

/**
 * Server Activation
 */

app.listen(PORT, () => {
        console.log(`Listening on port ${PORT}`);
    });

const fs = require("fs");
const readlineSync = require("readline-sync");

console.log(`-------------------------`);
const quantAlunos = readlineSync.question("Quantos alunos: ");
console.log(`-------------------------`);
const alunos = [];
const minMedia = 7.0;

for (let i = 0; i < quantAlunos; i++) {
    console.log(`-------------------------`);
    const nome = readlineSync.question("Nome do aluno: ");
    console.log(`-------------------------`);
    const quantNotas = readlineSync.questionInt("Quantas notas: ");
    console.log(`-------------------------`);
    const notas = [];

    for (let j = 0; j < quantNotas; j++) {
        const nota = readlineSync.questionFloat(`Digite a nota ${j + 1}: `);
        notas.push(nota);
    }

    const media = notas.reduce((a,b) => a + b, 0) / notas.length;
    const status = media >= minMedia ? "Aprovado" : "Reprovado";

    alunos.push({ nome, notas, media, status });
}

function alinharTexto(texto: string | any[], comprimento: number) {
    return texto + ' '.repeat(comprimento - texto.length);
}

const comprimentoNome = 20;
const comprimentoNotas = 20;
const comprimentoMedia = 7;
const comprimentoStatus = 10;

let tabela = `${alinharTexto("Nome", comprimentoNome)}${alinharTexto("Notas", comprimentoNotas)}${alinharTexto("Média", comprimentoMedia)}${alinharTexto("Status", comprimentoStatus)}\n`;
tabela += `${'-'.repeat(comprimentoNome)}${'-'.repeat(comprimentoNotas)}${'-'.repeat(comprimentoMedia)}${'-'.repeat(comprimentoStatus)}\n`;

alunos.forEach(aluno => {
    const notasFormatadas = aluno.notas.join(", ");
    tabela += `${alinharTexto(aluno.nome, comprimentoNome)}${alinharTexto(notasFormatadas, comprimentoNotas)}${alinharTexto(aluno.media.toFixed(2), comprimentoMedia)}${alinharTexto(aluno.status, comprimentoStatus)}\n`;
})

fs.writeFileSync("alunos.csv", tabela);

console.log(`-------------------------`);
console.log("Tabela gerada com sucesso! Verifique o arquivo alunos.csv");