/// <reference types="Cypress" />

beforeEach(() => {
  cy.visit('./src/index.html');
});

describe('Central de Atendimento ao Cliente TAT', function () {
  it('Verifica o título da aplicação', function () {
    cy.title().should('be.equal', 'Central de Atendimento ao Cliente TAT')
  })

  it('EX1 - Preencha os campos obrigatorios', () => {

    cy.get('#firstName').type('Adrian')
    cy.get('#lastName').type('me')
    cy.get('#email').type('ad@email.com')
    cy.get('#open-text-area').type('Livro do latim liber, libri[1]) é um objeto transportável, composto por páginas encadernadas, contendo texto manuscrito ou impresso e/ou imagens e que forma uma publicação unitária (ou foi concebido como tal) ou a parte principal de um trabalho literário, científico ou outro, formando um volume', { delay: 0 })

    cy.contains('.button', 'Enviar').click()

    cy.get('.success').should('be.visible');
  })

  it('EX2 - Exibe mensagem de erro ao submeter o formulário com um email com formatação inválida', () => {

    cy.get('#firstName').type('Adrian')
    cy.get('#lastName').type('me')
    cy.get('#email').type('email_Erro')
    cy.contains('.button', 'Enviar').click()

    cy.get('.error').should('be.visible');
  });

  it('EX3 - Validando não numericos no campo telefone', () => {

    cy.get('#firstName').type('Adrian')
    cy.get('#lastName').type('me')
    cy.get('#email').type('ad@email.com')
    cy.get('#phone').type('abc(!!!)').should('have.text', '')
    cy.get('#open-text-area').type('Livro')

    cy.contains('.button', 'Enviar').click()
    cy.get('.success').should('be.visible');
  });

  it('EX4 - Exibe mensagem de erro quando o telefone se torna obrigatório mas não é preenchido antes do envio do formulário', () => {

    cy.get('#firstName').type('Adrian')
    cy.get('#lastName').type('me')
    cy.get('#email').type('ad@email.com')
    cy.get('#open-text-area').type('Livro')

    cy.get('#phone-checkbox').click()

    cy.contains('.button', 'Enviar').click()

    cy.get('.error').should('be.visible');
  });

  it('EX5 - Preenche e limpa os campos nome, sobrenome, email e telefone', () => {
    cy.get('#firstName').type('Adrian').should('have.value', 'Adrian')
      .clear().should('have.value', '')

    cy.get('#lastName').type('me').should('have.value', 'me')
      .clear().should('have.value', '')

    cy.get('#email').type('ad@email.com').should('have.value', 'ad@email.com')
      .clear().should('have.value', '')

    cy.get('#phone').type('123456').should('have.value', '123456')
      .clear().should('have.value', '')

  });

  it('EX6 - Exibe mensagem de erro ao submeter o formulário sem preencher os campos obrigatórios', () => {
    cy.contains('.button', 'Enviar').click()

    cy.get('.error').should('be.visible');
  });

  it('EX7 - Envia o formuário com sucesso usando um comando customizado', () => {
    cy.fillMandatoryFieldsAndSubmit()

    cy.get('.success').should('be.visible');
  });

  it.only('Video 19 - Seleciona um produto (Youtube) por seu texto', () => {
   
    cy.get('#product').select('YouTube').should('have.value','youtube') // seleção por value
  });

  it.only('Video 19 Ex1 - Seleciona um produto (Mentoria) por seu valor (value)', () => {
    cy.get('#product').select('mentoria').should('have.value','mentoria') // seleção por indice
   
  });
  it.only('Video 19 Ex2 - Seleciona um produto (blog) por seu valor (indice)', () => {
    cy.get('#product').select(1).should('have.value','blog') // seleção por indice
   
  });
})

