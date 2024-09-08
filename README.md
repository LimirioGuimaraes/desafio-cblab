# Desafio cblab

Este repositório tem como objetivo versionar e hospedar a solução do Desafio Dev Full Stack (Estágio) do cblab.

## Como rodar o projeto

Para rodar o projeto localmente, é necessário ter o Node.js. Para efetuar a instalação em máquinas Linux/Ubuntu.

1. Adicione o repositório NodeSource para instalar o Node.js:

   ```bash
   curl -fsSL https://deb.nodesource.com/setup_lts.x | sudo -E bash -
   ```

2. Após adicionar o repositório, instale o Node.js com o comando:

   ```bash
   sudo apt-get install -y nodejs
   ```

3. Instale o CLI do Angular globalmente:

   ```bash
   sudo npm install -g @angular/cli
   ```

4. Instale as dependências do Projeto.
   
   ```bash
   npm install
   ```
   
5. Para rodar o projeto localmente, utilize o seguinte comando na pasta do repositório:

   ```bash
   ng serve
   ```

Depois de rodar o comando, navegue para `http://localhost:4200/`.

