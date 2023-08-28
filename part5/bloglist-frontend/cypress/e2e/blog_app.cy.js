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

  describe('When logged in', function() {
    beforeEach(function() {
      cy.login({ username: 'jishnu2', password: 'asdfzxcv' })
      cy.contains('Jishnu J logged in')
    })

    it('A blog can be created', function() {
      cy.contains('new blog').click()
      cy.get('#title').type('Test Blog 1')
      cy.get('#author').type('Test Author 1')
      cy.get('#url').type('www.testblog1.com')
      cy.get('#blog-submit').click()

      cy.contains('Test Blog 1 Test Author 1')
    })
  })
})