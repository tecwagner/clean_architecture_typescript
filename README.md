# clean_architecture_typescript

## Tecnologias Utilizadas
- TypeScript
- NPM
- Sequelize
- Jest
- Supertest
- Yup (validator)

## Configurações

- **tsconfig.json**: Arquivo de configuração do TypeScript.

## Iniciando o Projeto com TypeScript

1. Para iniciar o projeto com TypeScript, execute:

   ```bash
   npx tsc --init

2. Para compilar o código TypeScript, use:

    ```bash
    - npx tsc
3. Para executar os testes, utilize:

    ```bash
    - npm run test

# Criando os UseCase

    - Os use cases representam a intenção do usuário para executar uma determinada regra operacional ou interação. Eles incluem:

    - UseCase.

      - Customer/ Product / Order

        - Find
        - Create
        - Update
        - FindAll

    - Para cada usecase teremos uma resposablidade de metodo para executar.

    - Utilizaremos DTO (Data Transfer Object) para representar as entradas e saídas, criando uma camada de testes utilizando objetos de DTO que representam a entrada de dados e a estrutura da saída.

        - Customer/ Product / Order

            - Find
            - Create
            - Update
            - FindAll

## Criando a camada de API Rest com Express

1. Instale as dependências:

    ```bash
    - npm i express @types/express dotenv
    - npm i nodemon @types/nodemon

2. A camada de API Rest será implementada nos seguintes diretórios:   

        - infrastructure/api/express.
        - infrastructure/api/server.

3. Configure o servidor da aplicação utilizando o Express e adicione a seguinte linha no seu package.json:

    ```bash
    - "dev": "nodemon src/infrastructure/api/server.ts"

4. Execute o servidor da aplicação utilizando:

    ```bash
    - npm run dev    

## Implementando os Testes End-to-End (e2e)

1. Utilizaremos o Supertest para o desenvolvimento dos testes e2e. Instale as dependências necessárias:

    ```bash
    - npm install --save-dev supertest
    - npm install --save-dev @types/supertest


## Criando as Rotas da API

1. As rotas da API devem ser criadas em api/routes, por exemplo:

    - customer.route.ts

    - Lembre-se de importar as rotas no express.ts.



## Implementando o Notification Pattern

    - O Notification Pattern é utilizado como um container acumulador de erros, permitindo que retornemos todos os erros de uma vez, evitando a geração excessiva de exceções.

1. Estrutura de Implementação

    - Crie um grupo de notificações em @shared/notification para tratar os erros da aplicação.

    - Implemente uma classe abstrata em @shared/entity/entity.abstract.ts como contrato para as notificações.

    - Crie diferentes tipos de erros em @shared/notification/notification.error.ts.

    - Criando uma entidade de classe abstrata para  ser o contrato de Notificações

        - Em @shared/entity/entity.abstract.ts

            - Essa classe será representada para as demais classes como super.
            - Dentro do validate de cada entidade será adicionado as notification

    - Criando NotificationError - Diferentes.

        - Em @shared/notification/notification.error.ts

            - Implementar a chamada de verificação de errors dentro das entidades

            - Criando um metodo em Notification.

                - errors(): Que retorna uma lista de erros que estão armazenadas em NotificationErrorProps[]

## Implementando validação criando interface

1. Crie uma interface de validação em @shared/validator/validator.interface.ts.

    - Em @shared/validator/validator.interface.ts
    - A interface deve ser genérica e reutilizável

## Validação da Entidade de Cliente

1. Crie a pasta de validators dentro de src/domain/customer/validator, onde a classe CustomerYupValidator utilizará a biblioteca Yup para validação:
    
    ```bash
    - npm install --save yup
    - npm install --save @types/yup

## Criando Factory para Validação

    - Crie uma pasta de validators dentro de src/domain/customer/factory e implemente customer.validator.factory.ts.

## Presenter

1. O Presenter é responsável por transformar a API Rest em JSON ou XML. Para isso, instale as bibliotecas necessárias:

        ```bash
        - npm i jstoxml
        - npm i -D @types/jstoxml

    - Presenter ira apresentar os dados de acordo com a solicitação da camada de controller.
        

    - Crie a pasta de presenters em src/infrastructure/api/presenters. O sistema deve retornar dados em XML e JSON, e o cliente deve estar configurado para essa funcionalidade em src/infrastructure/api/routes.

## Identificando e Encerrando Processos pelo Terminal

1. Listar processos que estão usando a porta 3000: Execute o comando abaixo para encontrar o processo que está usando a porta 3000:

        ```bash
        sudo lsof -i :3000

2. Encerrar o processo: Após executar o comando acima, você verá uma lista de processos usando a porta. Localize o PID (Process ID) do processo que está utilizando a porta e então execute o seguinte comando para matá-lo:

        ```bash
        Copiar código
        sudo kill -9 <PID>