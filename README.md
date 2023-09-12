# clean_architecture_typescript

# Tecnologias Utilizadas

    - TypeScript
    - NPM
    - Sequelize
    - Jest

# Configurações no

    - tsconfig.json

# Iniciando o com o typescrit

    - npx tsc -init

# Comando para buildar o codigo

    - npx tsc

# Criando os UseCase

    - Os usecase é representado a intenção do usuário para executar uma determinada regra operacional ou interação do usuario.

    - UseCase.

    - Para cada usecase teremos uma resposablidade de metodo para executar.

    - Utilizaremos DTO interface para representar as entradas e saidas.
        - Criando a camada de test utlizando de objetos de DTO.
        - Que representa a entrada de dados e a estrutura da saida
        - Customer/ Product / Order

            - Find
            - Create
            - Update
            - FindAll

# Criando a camada de API Rest com Express

    - npm i express @types/express dotenv
    - npm i nodemon @types/nodemon

    - A camada de API rest se comunica com mundo externo então ela será implementada dentro da nossa

        - infrastructure/api/express.
        - infrastructure/api/server.

        - Será criado o servidor da aplicação utilizada o express.

    - package.json - configurar o cominho para executar o servidor da aplicação utilizada.

        - "dev": "nodemon src/infrastructure/api/server.ts"

        - execute o servidor da aplicação utilizando: npm run dev

# Implementando os test e2e

    - Iremos utilizar o supertest para o desenvolvimento: npm i -D supertest
    - Instalar o type do supertest: npm i --save-dev @types/supertest

# Criar rotas da api

    - api/routes

        - customer.route.ts
        - importar a rota para o express.ts
