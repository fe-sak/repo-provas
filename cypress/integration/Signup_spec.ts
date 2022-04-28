import userFactory from './factories/userFactory';

describe('Signup', () => {
  it('should create user', () => {
    const user = userFactory();

    cy.visit('http://localhost:3000/signup');

    cy.get('input[placeholder="Nome"]').type(user.name);
    cy.get('input[placeholder="Email"]').type(user.email);
    cy.get('input[placeholder="Senha"]').type(user.password);
    cy.get('input[placeholder="Confirme a senha"]').type(user.password);

    cy.get('button').click();

    cy.url().should('equal', 'http://localhost:3000/');
  });
});
