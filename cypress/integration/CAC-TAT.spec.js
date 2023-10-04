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

    cy.get('#phone-checkbox').check()

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

  it('Video 19 - Seleciona um produto (Youtube) por seu texto', () => {
    cy.get('#product').select('YouTube').should('have.value', 'youtube') // seleção por value
  });

  it('Video 19 Ex1 - Seleciona um produto (Mentoria) por seu valor (value)', () => {
    cy.get('#product')
      .select('mentoria')
      .should('have.value', 'mentoria') // seleção por indice
  });

  it('Video 19 Ex2 - Seleciona um produto (blog) por seu valor (indice)', () => {
    cy.get('#product')
      .select(1)
      .should('have.value', 'blog') // seleção por indice
  });

  it('Video 22 Ex1 - Marca o tipo de atendimento "Feedback"', () => {
    cy.get('input[type="radio"][value="feedback"]')
      .check()
      .should('have.value', 'feedback')
    // cy.get('input[type="radio"]').check('feedback').should('have.value', 'feedback') - assim funciona tambem
  });

  it('Video 22 Ex2 - marca cada tipo de atendimento', () => {
    cy.get('input[type="radio"]')            // pega o campo radio
      .should('have.length', 3)              // confere se pegou todos
      .each(function ($radio) {              // pega cada um deles
        cy.wrap($radio).check()              // empacota o elemento para mandar comandos como o de marcar
        cy.wrap($radio).should('be.checked') // valida se está marcado
      })

  });

  it('Video 26 - marca ambos checkboxes, depois desmarca o ultimo', () => {
    cy.get('input[type="checkbox"]') // seleciona o campo checkbox
      .check()                       // marca todos
      .should('be.checked')          // confirma se estão marcados
      .last()                        // seleciona o ultimo
      .uncheck()                     // desmarca ele
      .should('not.be.checked')      // confirma q está desmarcado
  });

  it('Video 28 Ex - Seleciona um arquivo da pasta fixtures', () => {
    cy.get('input[type="file"]')
      .should('not.have.value')
      .selectFile('cypress/fixtures/example.json')
      .should(function ($input) {
        // console.log($input) -- para poder encontrar as info do arquivo
        expect($input[0].files[0].name).to.equal('example.json')

        //.then(input =>{  --  funciona igual porem fica curto
        //expect(input[0].files[0].name).to.equal('example.json')
        //})

      })

  });

  it('Video 28 Ex1 - Seleciona um arquivo simulando um drag-and-drop', () => {
    cy.get('input[type="file"]')
      .should('not.have.value')
      .selectFile('cypress/fixtures/example.json', { action: 'drag-drop' })
      .should(function ($input) {
        expect($input[0].files[0].name).to.equal('example.json')
      })

  });

  it('Video 28 Ex2 - Seleciona um arquivo utilizando uma fixture para qual foi dada um alias', () => {
    cy.fixture('example.json', { encoding: null }).as('MeuDocumento') //cria um alias para o arquivo da pasta fixture

    cy.get('input[type="file"]')
      .should('not.have.value')
      .selectFile('@MeuDocumento') //usa o alias chamando pelo @alias
      .should(function ($input) {
        expect($input[0].files[0].name).to.equal('example.json')
      })

  });

  it('Video 32 Ex - Verifica que a política de privacidade abre em outra aba sem a necessidade de um clique', () => {
    cy.get('#privacy a').should('have.attr', 'target', '_blank');
  });

  it('Video 32 Ex1 - Acessa a página da política de privacidade removendo o target e então clicando no link', () => {
    cy.get('#privacy a')
    .invoke('removeAttr','target')
    .click()
    cy.contains('CAC TAT - Política de privacidade')
    .should('be.visible')
  });

})

