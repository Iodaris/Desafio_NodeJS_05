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

class aluno {
    nome: string;
    idade: number;
    nota: number;
	
    constructor(nome: string, idade: number, nota: number) {
        this.nome = nome;
        this.idade = idade;
        this.nota = nota;
    }
}

const aluno1 = new aluno("Guilherme", 15, 8);
const aluno2 = new aluno("Maria", 16, 9);
const aluno3 = new aluno("Gabriel", 17, 6);

const alunos = [aluno1, aluno2, aluno3];

const somaNotas = alunos.reduce((soma, aluno) => soma + aluno.nota, 0);

const dadosAlunosCSV = alunos.map(aluno => `${aluno.nome},${aluno.idade},${aluno.nota},${somaNotas}`).join('\n');
const headerCSV = 'Nome,Idade,Nota,Soma das Notas\n';
const conteudoCSV = headerCSV + dadosAlunosCSV;

fs.writeFile('alunos.csv', conteudoCSV, 'utf8', (err: any) => {
    if (err) {
      console.error('Erro ao salvar o arquivo:', err);
      return;
    }
    console.log('Arquivo salvo!');
	
});