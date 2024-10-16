# clean_architecture_typescript

# Tecnologias Utilizadas

    - TypeScript
    - NPM
    - Sequelize
    - Jest
    - Supertest
    - yup(validator)

# Configurações no

    - tsconfig.json

# Iniciando o com o typescrit

    - npx tsc -init

# Comando para buildar o codigo

    - npx tsc

# Comando para Executar os teste

    - npm run test

# Criando os UseCase

    - Os usecase é representado a intenção do usuário para executar uma determinada regra operacional ou interação do usuario.

    - UseCase.

      - Customer/ Product / Order

        - Find
        - Create
        - Update
        - FindAll

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

# Implementando o Notification Patterns

    - O notification pattern nos auxilia como um container acumulador de erros para que possamos de uma forma mais simples retornarmos nossos erros todos de uma vez evitando assim a geração excessiva de exceções.

    - Será criado um grupo de notification para tratativa de erros.

        - Em @shared/notification

        - Os erros serão tratados e filtrados para atender todo as notificações da aplicação

    - Criando uma entidade de classe abstrata para  ser o contrato de Notificações

        - Em @shared/entity/entity.abstract.ts

            - Essa classe será representadas para as demais classes como super.
            - Dentro do validate de cada entidade será adicionado as notification

    - Criando NotificationError - Diferentes.

        - Em @shared/notification/notification.error.ts

            - Implementar a chamada de verificação de errors dentro das entidades

            - Criando um metodo em Notification.

                - errors(): Que retorna uma lista de erros que estão armazenadas em NotificationErrorProps[]

# Implementando validação criando interface

    - Em @shared/validator/validator.interface.ts
    - A interaface é uma forma generica para ser reutilizada

# Implementando a Validator a classe de entidade de customer

    - Criando a pasta de validator dentro do src/domain/customer/validator

        - A classe de CustomerYupValidator utilizara de uma biblioteca externa para validação.

            - npm install --save yup
            - npm install --save @types/yup

# Criando factory para validação

    - Criando a pasta de validator dentro do src/domain/customer/factory

        - customer.validator.factory.ts

# Presenter

    - Será responsavel por organizar a nossa transformação de API Rest para JSON ou XML.
    - Presenter ira apresentar os dados de acordo com a solicitação da camada de controller.

    - Instale as bibliotecas.
        - npm i jstoxml
        - npm i -D @types/jstoxml

    - Criando a pasta de presenter
        - src/infrastructure/api/presenters

    - O nosso sistema deve ser capaz de retorna dados em XML e JSON.

    - Em src/infrastructure/api/routes

        - O nosso customer está configurado para retornar os dados seja em Json ou xml

# Identificar e encerrar o processo pelo terminal

    - Listar processos que estão usando a porta 3000: Execute o comando abaixo para encontrar o processo que está usando a porta 3000:

        bash
        sudo lsof -i :3000

    - Encerrar o processo: Após executar o comando acima, você verá uma lista de processos usando a porta. Localize o PID (Process ID) do processo que está utilizando a porta e então execute o seguinte comando para matá-lo:

        bash
        Copiar código
        sudo kill -9 <PID>