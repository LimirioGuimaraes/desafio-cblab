
# Desafio cblab

Este repositório tem como objetivo versionar e hospedar a solução do Desafio Dev Full Stack (Estágio) do cblab. <br>
Para ajudar na organização do processo de desenvolvimento da aplicação, um quadro kanban que pode ser visualizado [aqui](https://github.com/users/LimirioGuimaraes/projects/2).

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

4. Clone o repositório.

   ```bash
   git clone https://github.com/LimirioGuimaraes/desafio-cblab.git
   ```   

5. Instale as dependências do Projeto.

   ```bash
   npm install
   ```
   
6. Para rodar o projeto localmente, utilize o seguinte comando na pasta do repositório:

   ```bash
   ng serve
   ```

Depois de rodar o comando, navegue para `http://localhost:4200/`.

## Como Contribuir

Se você deseja contribuir para este projeto, siga os passos abaixo:

### 1. Fork e Clone o Repositório

1. **Faça um Fork do Repositório:**
   - No GitHub, vá para a página do repositório e clique no botão "Fork" no canto superior direito. 

2. **Clone o Repositório Forked:**
   ```bash
   git clone https://github.com/SEU-USERNAME/desafio-cblab.git
   ```

### 2. Crie um Novo Branch

1. **Crie um Branch para Sua Contribuição:**
   ```bash
   git checkout -b nome-do-branch
   ```

### 3. Faça Suas Alterações

### 4. Commit e Push

1. **Adicione e Commit suas Alterações:**
   ```bash
   git add .
   git commit -m "Descrição das mudanças"
   ```

2. **Envie o Branch para o GitHub:**
   ```bash
   git push origin nome-do-branch
   ```

### 5. Crie um Pull Request
 
