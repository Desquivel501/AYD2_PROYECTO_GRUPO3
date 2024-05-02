Cypress.Commands.add('register', (email, password, name, dpi) => {
  //Debe existir un componente para escribir el nombre
  cy.get('[id="name"]').type(name)
  cy.get('[id="name"]').should('have.value', name)

  //Debe existir un componente para escribir el correo electronico
  cy.get('[id="email"]').type(email)
  cy.get('[id="email"]').should('have.value', email)

  //Debe existir un componente para subir imagen de perfil
  cy.get('[id="cv"]').selectFile('cypress/fixtures/images/image1.jpg')

  //Debe existir un componente para escribir el dpi
  cy.get('[id="phone"]').type(dpi)
  cy.get('[id="phone"]').should('have.value', dpi)

  //Debe existir un componente para escribir la contraseña
  cy.get('[id="password"]').type(password)
  cy.get('[id="password"]').should('have.value', password)

  //Debe existir un componente para confirmar la contraseña
  cy.get('[id="Cpassword"]').type(password)
  cy.get('[id="Cpassword"]').should('have.value', password)

  //Haciendo click sobre botón para registrarse 
  cy.contains('Registrarse').click()
})

describe('user_register', () => {
  const val = Math.floor(Math.random()*1000000)

  const {dpi, name, password, email}  = {
    dpi: val,
    name: 'register_test',
    password: '123456',
    email: 'user'+val+'@gmail.com'
  }

  it('registrarse como un usuario normal', () => {
    cy.visit('/register')
    cy.register(email, password, name, dpi)
    cy.contains('El usuario ha sido registrado exitosamente')
  })

  it('registrarse con un usuario ya existente en base de datos', () => {
    cy.visit('/register')
    cy.register('usuario@gmail.com', '123456', name, dpi)
    //Comprobar que el mensaje sea de que el correo ya se encuentra registrado
    //cy.contains('El correo que ha ingresado ya se encuentra registrado')
  })

  it('registrarse con datos no válidos', () => {
    cy.visit('/register')
    cy.register('@gmail.com', '123456', name, dpi)
    //Comprobar que el mensaje sea de que el correo ya se encuentra registrado
    //cy.contains('El correo que ha ingresado ya se encuentra registrado')
  })  
})

describe('seller_register', () => {
  const val = Math.floor(Math.random()*1000000)

  const {dpi, name, password, email}  = {
    dpi: val,
    name: 'seller_register_test',
    password: '123456',
    email: 'seller'+val+'@gmail.com'
  }

  it('registrarse como un vendedor', () => {
    cy.visit('/register/vendedor')
    cy.register(email, password, name, dpi)
    cy.contains('El usuario ha sido registrado exitosamente')
  })

  it('registrarse con un vendedor ya existente en base de datos', () => {
    cy.visit('/register/vendedor')
    cy.register('vendedor@gmail.com', '123456', name, dpi)
    //Comprobar que el mensaje sea de que el correo ya se encuentra registrado
    //cy.contains('El correo que ha ingresado ya se encuentra registrado')
  })

  it('registrarse con datos no válidos', () => {
    cy.visit('/register/vendedor')
    cy.register('@gmail.com', '123456', name, dpi)
    //Comprobar que el mensaje sea de que el correo ya se encuentra registrado
    //cy.contains('El correo que ha ingresado ya se encuentra registrado')
  })  
})