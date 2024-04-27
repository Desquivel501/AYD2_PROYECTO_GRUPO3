/// <reference types="cypress" />
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

describe('enable-disable-sellers', () => {
  it('Deshabilita y habilita un determinado vendedor', () => {
    const {email, password} = {email:'admin1@gmail.com', password:'123456'}
    //Inicia sesión del administrador
    cy.login(email, password)
    cy.url().should('include', '/profile')

    //Una vez iniciada sesión, se dirige a la página de habilitar o deshabilitar usuarios
    cy.visit('/enable-disable-seller')

    //Deshabilita un vendedor existente
    cy.get(':nth-child(6) > :nth-child(5) > .buttonDisabled').click();

    //Confirma que si esta seguro
    cy.get('.swal2-confirm').click();
    //Cierra el cuadro de confirmación
    cy.get('.swal2-confirm').click();

    //Realiza una pausa de 5s antes de volver a habilitar un vendedor
    cy.wait(5000);

    //Activa de nuevo el vendedor;
    cy.get('.buttonEnable > img').click();
    //Confirma que si esta seguro
    cy.get('.swal2-confirm').click();
    //Cierra el cuadro de confirmación
    cy.get('.swal2-confirm').click();
  })
})