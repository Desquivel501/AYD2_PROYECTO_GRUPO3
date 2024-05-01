/// <reference types="cypress" />
describe('enable-users', () => {
  beforeEach(()=>{
    cy.request({
      method: 'POST',
      url: 'http://34.16.176.103:8080/user/login',
      body: {
        email: 'admin@gmail.com',
        password: '123456'
      }
    })
    .then((resp)=>{
      console.log(resp)
      window.localStorage.setItem('user', JSON.stringify({"type": 0, "id":resp.body.DATA}))
    })
  })

  it('Deshabilita y habilita un determinado usuario', () => {

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