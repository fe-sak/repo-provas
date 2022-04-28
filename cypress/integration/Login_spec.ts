import userFactory from './factories/userFactory';

describe('Login', () => {
  it('should log in successfully', () => {
    const user = userFactory();

    cy.request('POST', 'http://localhost:5000/signup', {
      name: user.name,
      email: user.email,
      password: user.password,
    }).then(() => {
      cy.visit('http://localhost:3000/');

      cy.get('input[placeholder="Email"]').type(user.email);
      cy.get('input[placeholder="Senha"]').type(user.password);

      cy.get('button').click();

      cy.url().should('equal', 'http://localhost:3000/home');
    });
  });
});
