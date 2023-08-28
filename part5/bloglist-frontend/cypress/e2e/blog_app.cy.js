import { func } from 'prop-types'

describe('Blog app', function() {
  beforeEach(function() {
    cy.request('POST', 'http://localhost:3003/api/testing/reset')
    const user = {
      name: 'Jishnu J',
      username: 'jishnu2',
      password: 'asdfzxcv'
    }
    cy.request('POST', 'http://localhost:3003/api/users', user)
    const user2 = {
      name: 'John Smith',
      username: 'johnsmith4',
      password: 'uiophjkl'
    }
    cy.request('POST', 'http://localhost:3003/api/users', user2)
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
      cy.createBlog({
        title: 'React patterns',
        author: 'Michael Chan',
        url: 'https://reactpatterns.com/'
      })
      cy.createBlog({
        title: 'Go To Statement Considered Harmful',
        author: 'Edsger W. Dijkstra',
        url: 'http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html'
      })
      cy.createBlog({
        title: 'Canonical string reduction',
        author: 'Edsger W. Dijkstra',
        url: 'http://www.cs.utexas.edu/~EWD/transcriptions/EWD08xx/EWD808.html'
      })
      cy.get('#logout-button').click()
      cy.login({ username: 'johnsmith4', password: 'uiophjkl' })
      cy.createBlog({
        title: 'John Smith Blog',
        author: 'John S. Smith',
        url: 'www.johnsmithblog.com'
      })
      cy.get('#logout-button').click()
    })

    it('A blog can be created', function() {
      cy.login({ username: 'jishnu2', password: 'asdfzxcv' })

      cy.contains('new blog').click()
      cy.get('#title').type('Test Blog 1')
      cy.get('#author').type('Test Author 1')
      cy.get('#url').type('www.testblog1.com')
      cy.get('#blog-submit').click()

      cy.contains('Test Blog 1 Test Author 1')
    })

    it('Users can like a blog', function() {
      cy.login({ username: 'jishnu2', password: 'asdfzxcv' })

      cy.get('.blog')
        .contains('React patterns')
        .find('#view-button').click()

      cy.get('.likes').contains('likes 0')
      cy.get('.likes').get('#like-button').click()
      cy.get('.likes').contains('likes 1')
    })

    it('The user who created a blog can delete it', function() {
      cy.login({ username: 'jishnu2', password: 'asdfzxcv' })

      cy.contains('Go To Statement Considered Harmful').parent().as('Blog')
      cy.get('@Blog').find('#view-button').click()
      cy.get('@Blog').find('#remove-button').click()

      cy.contains('Go To Statement Considered Harmful').should('not.exist')
    })

    it('Only the creator can see the delete button of a blog', function() {
      cy.login({ username: 'johnsmith4', password: 'uiophjkl' })

      cy.contains('John Smith Blog').parent().as('Blog')
      cy.get('@Blog').find('#view-button').click()
      cy.get('@Blog').find('#remove-button').should('exist')

      cy.contains('React patterns').parent().as('Blog2')
      cy.get('@Blog2').find('#view-button').click()
      cy.get('@Blog2').find('#remove-button').should('not.exist')
    })
  })
})