describe('Blog app', function() {
  beforeEach(function() {
    cy.request('POST', 'http://localhost:3003/api/testing/reset')
    const user = {
      name: 'Jishnu J',
      username: 'jishnu2',
      password: 'asdfzxcv'
    }
    cy.request('POST', 'http://localhost:3003/api/users', user)
    cy.visit('http://localhost:5173')
  })

  it('Login form is shown', function() {
    cy.contains('log in to application')
    cy.contains('username')
    cy.contains('password')
  })

  describe('Login',function() {
    it('succeeds with correct credentials', function() {
      cy.get('#username').type('jishnu2')
      cy.get('#password').type('asdfzxcv')
      cy.get('#login-button').click()

      cy.contains('Jishnu J logged in')
    })

    it('fails with wrong credentials', function() {
      cy.get('#username').type('jishnu2')
      cy.get('#password').type('abcdefgh')
      cy.get('#login-button').click()

      cy.get('.notification')
        .should('contain', 'wrong username or password')
        .and('have.css', 'color', 'rgb(255, 0, 0)')
        .and('have.css', 'border-style', 'solid')
    })
  })
})