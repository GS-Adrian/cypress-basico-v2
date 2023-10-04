it.only('Video 32 Ex2 - testa a página da política de privacidade de forma independente', () => {
  cy.visit('./src/index.html');

  cy.get('#privacy a')
  .invoke('removeAttr','target')
  .click()
  
  cy.get('#title')
  .should('be.visible')
  .should('have.text','CAC TAT - Política de privacidade')

  cy.get('#white-background')
  .each(function ($lines) {            
    cy.wrap($lines)       
    .should('be.visible')
    .should('not.have.text','')
  })
 
});