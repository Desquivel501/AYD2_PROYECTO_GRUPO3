Cypress.Commands.add('login', (email, password) => {
  cy.visit('/')

  //Debe ir a la página para iniciar sesión al presionar "Inicia Sesión"
  cy.contains('Inicia Sesion').click()
  cy.url().should('include', 'log-in')

  //Debe existir un componente para escribir un usuario
  cy.get('[id="email"]').type(email)
  cy.get('[id="email"]').should('have.value', email)

  //Debe existir un componente para escribir contraseña
  cy.get('[id="password"]').type(password)
  cy.get('[id="password"]').should('have.value', password)

  cy.contains('Log in').click()
})

describe('admin_login', () => {
  it('iniciar sesión correctamente como administrador', () => {
    const {email, password} = {email:'admin@gmail.com', password:'123456'}
    cy.login(email, password)
    cy.url().should('include', '/profile')
  })
})

describe('user_login', ()=> {
  it('iniciar sesión correctamente como usuario', () => {
    const {email, password} = {email:'usuario@gmail.com', password:'123456'}
    cy.login(email, password)
    cy.url().should('include', '/catalogo')
  })
})

describe('seller_login', ()=> {
  it('iniciar sesión correctamente como vendedor', () => {
    const {email, password} = {email:'vendedor2@gmail.com', password:'123456'}
    cy.login(email, password)
    cy.url().should('include', '/profile')
  })

  it('iniciar sesión como vendedor no confirmado', () => {
    const {email, password} = {email:'vendedor@gmail.com', password:'123456'}
    cy.login(email, password)
    cy.contains('Error de inicio de sesión, su cuenta se encuentra pendiente de confirmación por parte de un administrador')
  })
})

describe('wrong_login', ()=> {
  it('iniciar sesión con cuenta no existente', () => {
    const {email, password} = {email:'noexist@gmail.com', password:'noexists'}
    cy.login(email, password)
    cy.contains('Credenciales de inicio de sesión incorrectas, revise su usuario o contraseña')
  })
})