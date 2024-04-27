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

describe('enable-users', () => {
  it('Deshabilita y habilita un determinado usuario', () => {
    const {email, password} = {email:'admin1@gmail.com', password:'123456'}
    //Inicia sesión del administrador
    cy.login(email, password)
    cy.url().should('include', '/profile')

    //Una vez iniciada sesión, se dirige a la página de habilitar o deshabilitar usuarios
    cy.visit('/enable-disable-user')
  
    cy.get('.table.table-striped.table-primary tbody tr').each(($row, index) => {
      /******* Deshabilita un usuario existente **********/

      // Verificar si el botón está habilitado o no
      cy.get(':nth-child(' + (index + 1) + ') > :nth-child(5)').then(($buttonContainer) => {
        if ($buttonContainer.find('.buttonDisabled').length > 0) {
          // Si el botón tiene la clase .buttonEnable, utilizar el selector '.buttonDisabled > img'
          cy.get(':nth-child(' + (index + 1) + ') > :nth-child(5) > .buttonDisabled > img').click();
        } else {
          // Si no, utilizar el selector ':nth-child(INDEX) > :nth-child(5) > .buttonDisabled'
          cy.get('.buttonDisabled').click();
        }
        //Confirma que si esta seguro
        cy.get('.swal2-confirm').click();
        //Cierra el cuadro de confirmación
        cy.get('.swal2-confirm').click();
      });

      //Realiza una pausa de 3s antes de volver a habilitar un vendedor
      cy.wait(3000);

      //Activa de nuevo el vendedor;
      //cy.get(':nth-child(' + (index + 1) + ') > :nth-child(5) > .buttonEnable > img').click()

      // Verificar si el botón está habilitado o no
      cy.get(':nth-child(' + (index + 1) + ') > :nth-child(5)').then(($buttonContainer) => {
        if ($buttonContainer.find('.buttonEnable').length > 0) {
          // Si el botón tiene la clase .buttonEnable, utilizar el selector '.buttonEnable > img'
          cy.get(':nth-child(' + (index + 1) + ') > :nth-child(5) > .buttonEnable > img').click();
        } else {
          // Si no, utilizar el selector ':nth-child(INDEX) > :nth-child(5) > .buttonEnable'
          cy.get('.buttonEnable').click();
        }
        //Confirma que si esta seguro
        cy.get('.swal2-confirm').click();
        //Cierra el cuadro de confirmación
        cy.get('.swal2-confirm').click();
      });
    });



    /******* Habilita un usuario existente **********/

    //Deshabilita un vendedor existente
    //cy.get(':nth-child(6) > :nth-child(5) > .buttonDisabled').click();

    

    //Realiza una pausa de 5s antes de volver a habilitar un vendedor
    //cy.wait(5000);

    //Activa de nuevo el vendedor;
    //cy.get('.buttonEnable > img').click();
    //Confirma que si esta seguro
    //cy.get('.swal2-confirm').click();
    //Cierra el cuadro de confirmación
    //cy.get('.swal2-confirm').click();
  })
})