# Trabalho Desenvolvimento Web

Repositório contendo os arquivos desenvolvidos para o trabalho de desenvolvimento web. Grupo com Cesar Guibo e Fabio Destro.

## Desenvolvido por:

- Fabio Fogarin Destro, 10284667
- Leonardo Fonseca, 11219241
- Cesar Henrique de Araujo Guibo, 11218705

# Requisitos

## Tipos de usuarios

O sistema possui 2 tipos de usuarios: Clientes e Administradores.

- Administradores são responsáveis por registrar/gerenciar administradores, clientes e livros (produto principal do sistema). A aplicação já deve contar com um administrador padrão com usuário 'admin' e senha 'admin'.
- Clientes são pessoas que acessam o sistema para comprar livros.

## Entidades do sistema

O sistema conta com 4 principais entidades: administradores, clientes, livros, categorias

- O registro de administradores deve conter: id, nome, telefone e email, senha
- O registro de clientes deve conter: id, nome, endereço, telefone e email, senha.
- O registro de livros deve conter: id, título, foto, descrição, preço, quantidade em estoque, quantidade vendida, autor, categoria, dados de pré-visualização.
- O registro de categorias deve conter: id, nome

## Funcionalidade de compras

Os livros registrados no sistema podem ser comprados pelos clientes.

- Um cliente cadastrado pode selecionar adicionar livros em seu carrinho de compras.
- A quantidade de cada livro no carrinho de compras pode ser alterada pelo usuário.
- Um livro no carrinho de compras pode ser removido pelo usuário.
- As compras são efetuadas com cartão de créditos (por enquanto, qualquer número é aceito pelo sistema).
- Ao efetuar uma compra com sucesso, a quantidade em estoque dos produtos comprados deve ser atualizada.

## Gerenciamento de livros

Os administradores devem ter a capacidade de gerenciar os livros vendidos no e-commerce, sendo capaz de efetuar as seguintes ações:

- Adicionar novos livros
- Editar livros cadastrados (exemplo: editar a quantidade em estoque)
- Ler as informações de um livros cadastrados
- Apagar livros cadastrados

## Pré-visualização de livros vendidos

Um usuário deve ser capaz de visualizar uma página com as informações de cada livro cadastrado no sistema.

Como diferencial, no e-commerce, será possível fazer a pré-visualização de uma parte inicial do livro vendido gratuitamente.

## Interface

A interface do sistema deve buscar oferecer uma boa usabilidade, implementando requisitos de acessibilidade e adaptação a dispositivos móveis (responsividade).

# Descrição do Projeto

O projeto **Livraria Mundo das Letras** tem como intuito ser um e-commerce focado em livros físicos. A livraria digital tem como principal diferencial a pré-visualização gratuita dos livros vendidos.

```
Descreva como seu projeto implementa a funcionalidade nos requisitos. Os diagramas podem ajudar muito aqui.
```
